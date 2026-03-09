/** Parse a pricing string like "R25,000–R45,000/year" into a max numeric value */
export function maxPrice(pricing?: string): number | null {
    if (!pricing) return null;
    const nums = pricing.match(/[\d,]+/g);
    if (!nums) return null;
    return Math.max(...nums.map((n) => parseInt(n.replace(/,/g, ""), 10)));
}
