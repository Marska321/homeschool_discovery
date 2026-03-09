import { describe, it, expect } from "vitest";
import { evaluatePathway } from "@/lib/pathwayUtils";

describe("evaluatePathway", () => {
    it("returns 4 results for sa_degree + stem", () => {
        const results = evaluatePathway("sa_degree", "stem");
        expect(results).toHaveLength(4);
    });

    it("marks IEB as highly_recommended for sa_degree", () => {
        const results = evaluatePathway("sa_degree", "stem");
        const ieb = results.find((r) => r.id === "ieb");
        expect(ieb).toBeDefined();
        expect(ieb!.status).toBe("highly_recommended");
    });

    it("marks GED as danger for sa_degree", () => {
        const results = evaluatePathway("sa_degree", "commerce");
        const ged = results.find((r) => r.id === "ged");
        expect(ged).toBeDefined();
        expect(ged!.status).toBe("danger");
    });

    it("marks Cambridge as highly_recommended for international", () => {
        const results = evaluatePathway("international", "stem");
        const cambridge = results.find((r) => r.id === "cambridge");
        expect(cambridge).toBeDefined();
        expect(cambridge!.status).toBe("highly_recommended");
    });

    it("returns 4 results for international + humanities", () => {
        const results = evaluatePathway("international", "humanities");
        expect(results).toHaveLength(4);
    });

    it("marks CAPS as highly_recommended for sa_diploma", () => {
        const results = evaluatePathway("sa_diploma", "commerce");
        const caps = results.find((r) => r.id === "caps");
        expect(caps).toBeDefined();
        expect(caps!.status).toBe("highly_recommended");
    });

    it("includes STEM-specific details for sa_degree + stem", () => {
        const results = evaluatePathway("sa_degree", "stem");
        const ieb = results.find((r) => r.id === "ieb")!;
        expect(ieb.details).toContain("Core Mathematics");
    });

    it("includes non-STEM details for sa_degree + humanities", () => {
        const results = evaluatePathway("sa_degree", "humanities");
        const caps = results.find((r) => r.id === "caps")!;
        expect(caps.details).toContain("Math Literacy");
    });
});
