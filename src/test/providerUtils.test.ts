import { describe, it, expect } from "vitest";
import { maxPrice } from "@/lib/providerUtils";

describe("maxPrice", () => {
    it('parses "R25,000–R45,000/year" correctly', () => {
        expect(maxPrice("R25,000–R45,000/year")).toBe(45000);
    });

    it('parses "R8,000/year" correctly', () => {
        expect(maxPrice("R8,000/year")).toBe(8000);
    });

    it("returns null for undefined", () => {
        expect(maxPrice(undefined)).toBeNull();
    });

    it("returns null for empty string", () => {
        expect(maxPrice("")).toBeNull();
    });

    it("returns null for non-numeric string", () => {
        expect(maxPrice("Contact for pricing")).toBeNull();
    });

    it('parses "R120,000+" correctly', () => {
        expect(maxPrice("R120,000+")).toBe(120000);
    });

    it("picks the max from multiple numbers", () => {
        expect(maxPrice("From R5,000 to R15,000 per year")).toBe(15000);
    });
});
