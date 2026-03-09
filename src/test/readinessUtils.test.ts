import { describe, it, expect } from "vitest";
import { getResultLevel, QUESTIONS, CATEGORIES } from "@/lib/readinessUtils";

describe("getResultLevel", () => {
    it('returns "You\'re Ready!" for >= 80%', () => {
        const result = getResultLevel(80);
        expect(result.label).toBe("You're Ready!");
    });

    it('returns "You\'re Ready!" for 100%', () => {
        const result = getResultLevel(100);
        expect(result.label).toBe("You're Ready!");
    });

    it('returns "Almost There" for 55-79%', () => {
        expect(getResultLevel(55).label).toBe("Almost There");
        expect(getResultLevel(79).label).toBe("Almost There");
    });

    it('returns "More Preparation Needed" for < 55%', () => {
        expect(getResultLevel(54).label).toBe("More Preparation Needed");
        expect(getResultLevel(0).label).toBe("More Preparation Needed");
    });

    it("returns correct class for each tier", () => {
        expect(getResultLevel(85).className).toContain("primary");
        expect(getResultLevel(60).className).toContain("accent");
        expect(getResultLevel(30).className).toContain("destructive");
    });
});

describe("QUESTIONS data integrity", () => {
    it("has 10 questions", () => {
        expect(QUESTIONS).toHaveLength(10);
    });

    it("every question belongs to a valid category", () => {
        const categoryIds = CATEGORIES.map((c) => c.id);
        QUESTIONS.forEach((q) => {
            expect(categoryIds).toContain(q.category);
        });
    });

    it("every question has at least 2 options", () => {
        QUESTIONS.forEach((q) => {
            expect(q.options.length).toBeGreaterThanOrEqual(2);
        });
    });

    it("max possible score per question is 3", () => {
        QUESTIONS.forEach((q) => {
            const maxScore = Math.max(...q.options.map((o) => o.score));
            expect(maxScore).toBe(3);
        });
    });
});
