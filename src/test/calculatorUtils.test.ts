import { describe, it, expect } from "vitest";
import { formatZAR, calculateCosts, getAvailableProviders, PROVIDERS } from "@/lib/calculatorUtils";

describe("formatZAR", () => {
    it("formats a number as ZAR currency with no decimals", () => {
        const result = formatZAR(14500);
        // Intl may use narrow no-break space — normalise
        const normalised = result.replace(/\s/g, " ");
        expect(normalised).toContain("14");
        expect(normalised).toContain("500");
    });

    it("formats zero", () => {
        const result = formatZAR(0);
        expect(result).toContain("0");
    });
});

describe("calculateCosts", () => {
    const impaqDiy = PROVIDERS.find((p) => p.id === "impaq_diy")!;

    it("returns correct breakdown for impaq_diy / fet / caps", () => {
        const costs = calculateCosts(impaqDiy, "fet", "caps");
        expect(costs).not.toBeNull();
        expect(costs!.baseTuition).toBe(14500);
        expect(costs!.bookCosts).toBe(4000);
        expect(costs!.examCosts).toBe(14500);
        expect(costs!.adminCosts).toBe(1200);
        expect(costs!.totalAnnual).toBe(14500 + 4000 + 14500 + 1200);
        expect(costs!.totalMonthly).toBeCloseTo(costs!.totalAnnual / 12);
    });

    it("returns correct breakdown for impaq_diy / foundation / caps", () => {
        const costs = calculateCosts(impaqDiy, "foundation", "caps");
        expect(costs).not.toBeNull();
        expect(costs!.baseTuition).toBe(6500);
        expect(costs!.examCosts).toBe(0); // no exams in foundation
    });

    it("returns null when phase not available for provider", () => {
        const impaqOnline = PROVIDERS.find((p) => p.id === "impaq_online")!;
        const costs = calculateCosts(impaqOnline, "foundation", "caps");
        expect(costs).toBeNull();
    });

    it("calculates cambridge hidden costs correctly", () => {
        const cambriCamb = PROVIDERS.find((p) => p.id === "cambrilearn_camb")!;
        const costs = calculateCosts(cambriCamb, "fet", "cambridge");
        expect(costs).not.toBeNull();
        expect(costs!.baseTuition).toBe(85000);
        expect(costs!.bookCosts).toBe(9500);
        expect(costs!.examCosts).toBe(24000);
        expect(costs!.adminCosts).toBe(2500);
    });
});

describe("getAvailableProviders", () => {
    it("returns only providers matching phase and curriculum", () => {
        const results = getAvailableProviders("foundation", "ieb");
        expect(results.length).toBe(1);
        expect(results[0].id).toBe("brainline");
    });

    it("returns multiple providers for common combos", () => {
        const results = getAvailableProviders("fet", "caps");
        expect(results.length).toBeGreaterThan(1);
        expect(results.every((p) => p.phases.includes("fet") && p.curriculums.includes("caps"))).toBe(true);
    });

    it("returns empty array for impossible combos", () => {
        const results = getAvailableProviders("foundation", "cambridge");
        // Only cambrilearn_camb has cambridge + foundation
        const ids = results.map((p) => p.id);
        expect(ids).toContain("cambrilearn_camb");
    });
});
