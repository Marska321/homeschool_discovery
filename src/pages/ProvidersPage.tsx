import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import ProviderCard from "@/components/ProviderCard";
import CompareBar from "@/components/CompareBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { providers, categories, accessibilityTagLabels, type ProviderCategory, type AccessibilityTag } from "@/data/providers";
import { maxPrice } from "@/lib/providerUtils";
import { trackEvent } from "@/lib/analytics";

const allCurricula = Array.from(
  new Set(providers.flatMap((p) => p.curricula ?? []))
).sort();

const PRICE_CEIL = 120_000;

const ProvidersPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ProviderCategory[]>(() => {
    const cat = searchParams.get("category");
    return cat && categories.some((c) => c.id === cat) ? [cat as ProviderCategory] : [];
  });
  const [selectedCurricula, setSelectedCurricula] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([PRICE_CEIL]);
  const [selectedAccessibility, setSelectedAccessibility] = useState<AccessibilityTag[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  const toggleCategory = (c: ProviderCategory) =>
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const toggleCurriculum = (c: string) =>
    setSelectedCurricula((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const toggleAccessibility = (t: AccessibilityTag) =>
    setSelectedAccessibility((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return providers.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.tags.some((t) => t.toLowerCase().includes(q))) return false;
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
      if (selectedCurricula.length && !(p.curricula ?? []).some((c) => selectedCurricula.includes(c))) return false;
      if (selectedAccessibility.length && !selectedAccessibility.every((t) => (p.accessibilityTags ?? []).includes(t))) return false;
      if (priceRange[0] < PRICE_CEIL) {
        const mp = maxPrice(p.pricing);
        if (mp === null || mp > priceRange[0]) return false;
      }
      return true;
    });
  }, [query, selectedCategories, selectedCurricula, selectedAccessibility, priceRange]);

  // Track search queries (debounced)
  useEffect(() => {
    if (!query) return;
    const timer = setTimeout(() => {
      trackEvent({
        name: "search_perform",
        properties: { query, resultsCount: filtered.length }
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [query]);

  // Track filter changes
  useEffect(() => {
    if (activeFilterCount > 0) {
      trackEvent({
        name: "filter_change",
        properties: { category: selectedCategories.join(",") }
      });
    }
  }, [selectedCategories.length, selectedCurricula.length, selectedAccessibility.length, priceRange[0]]);

  const activeFilterCount =
    selectedCategories.length + selectedCurricula.length + selectedAccessibility.length + (priceRange[0] < PRICE_CEIL ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setSelectedCategories([]);
    setSelectedCurricula([]);
    setSelectedAccessibility([]);
    setPriceRange([PRICE_CEIL]);
  };

  useDocumentTitle("Browse Providers");

  return (
    <>
      {/* Header */}
      <section className="border-b bg-muted/40 py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl text-foreground md:text-4xl">
            Browse Providers
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Search and filter to find the perfect homeschool provider for your family.
          </p>

          {/* Search bar */}
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, keyword, or curriculum…"
              className="pl-10 pr-10"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="flex items-center gap-2 text-sm font-medium text-foreground lg:pointer-events-none"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </button>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {showFilters && (
              <div className="mt-4 space-y-6">
                {/* Category */}
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => toggleCategory(c.id)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${selectedCategories.includes(c.id)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-card-foreground hover:border-primary/50"
                          }`}
                      >
                        {c.icon} {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Curriculum */}
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Curriculum
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allCurricula.map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleCurriculum(c)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${selectedCurricula.includes(c)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-card-foreground hover:border-primary/50"
                          }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Neurodiversity & Special Needs */}
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    🧩 Neurodiversity & Special Needs
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(Object.entries(accessibilityTagLabels) as [AccessibilityTag, { label: string; icon: string }][]).map(([id, { label, icon }]) => (
                      <button
                        key={id}
                        onClick={() => toggleAccessibility(id)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${selectedAccessibility.includes(id)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-card-foreground hover:border-primary/50"
                          }`}
                      >
                        {icon} {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Max price (per year)
                  </h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={5000}
                    max={PRICE_CEIL}
                    step={5000}
                    className="mt-3"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {priceRange[0] >= PRICE_CEIL
                      ? "Any price"
                      : `Up to R${priceRange[0].toLocaleString()}`}
                  </p>
                </div>
              </div>
            )}
          </aside>

          {/* Results */}
          <div className="flex-1">
            <p className="mb-6 text-sm text-muted-foreground">
              {filtered.length} provider{filtered.length !== 1 && "s"} found
            </p>

            {filtered.length === 0 ? (
              <div className="rounded-lg border border-dashed bg-muted/30 py-16 text-center">
                <p className="text-lg font-medium text-foreground">
                  No providers match your filters
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search or clearing some filters.
                </p>
                <Button variant="outline" size="sm" className="mt-4" onClick={clearAll}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CompareBar />
    </>
  );
};

export default ProvidersPage;
