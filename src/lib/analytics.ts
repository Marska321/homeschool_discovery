import { track } from "@vercel/analytics";

/**
 * Type-safe analytics events for the SA Homeschool Hub
 */
export type AnalyticsEvent =
    | { name: "provider_visit_website"; properties: { providerId: string; providerName: string } }
    | { name: "provider_view_reviews"; properties: { providerId: string; providerName: string; source: string } }
    | { name: "provider_compare_view"; properties: { count: number; providerIds: string[] } }
    | { name: "tool_complete"; properties: { toolName: "calculator" | "mapper" | "readiness" } }
    | { name: "search_perform"; properties: { query: string; resultsCount: number } }
    | { name: "filter_change"; properties: { category: string } };

/**
 * Track a custom event with Vercel Analytics
 */
export const trackEvent = (event: AnalyticsEvent) => {
    try {
        track(event.name, event.properties as any);
        console.log(`[Analytics] Tracked: ${event.name}`, event.properties);
    } catch (error) {
        console.error("[Analytics] Error tracking event:", error);
    }
};
