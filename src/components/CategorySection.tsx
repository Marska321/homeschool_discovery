import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { categories, providers, type ProviderCategory } from "@/data/providers";
import { Badge } from "@/components/ui/badge";
import { trackEvent } from "@/lib/analytics";

import catOnlineSchool from "@/assets/cat-online-school.jpg";
import catCurriculumProvider from "@/assets/cat-curriculum-provider.jpg";
import catCurriculum from "@/assets/cat-curriculum.jpg";
import catChristian from "@/assets/cat-christian.jpg";
import catAlternative from "@/assets/cat-alternative.jpg";

const CATEGORY_IMAGES: Record<ProviderCategory, string> = {
  "online-school": catOnlineSchool,
  "curriculum-provider": catCurriculumProvider,
  curriculum: catCurriculum,
  christian: catChristian,
  alternative: catAlternative,
  extracurricular: "https://upload.wikimedia.org/wikipedia/commons/7/72/MIT_2006_Latin_Intermediate.jpg",
};

/** Parse a pricing string into a numeric max value */
function maxPrice(pricing?: string): number | null {
  if (!pricing) return null;
  const nums = pricing.match(/[\d,]+/g);
  if (!nums) return null;
  return Math.max(...nums.map((n) => parseInt(n.replace(/,/g, ""), 10)));
}

function minPrice(pricing?: string): number | null {
  if (!pricing) return null;
  const nums = pricing.match(/[\d,]+/g);
  if (!nums) return null;
  return Math.min(...nums.map((n) => parseInt(n.replace(/,/g, ""), 10)));
}

interface CategoryStats {
  count: number;
  priceRange: string | null;
  topProvider: { name: string; rating: number } | null;
}

function getCategoryStats(categoryId: ProviderCategory): CategoryStats {
  const catProviders = providers.filter((p) => p.category === categoryId);
  const count = catProviders.length;

  // Price range
  const mins = catProviders.map((p) => minPrice(p.pricing)).filter((v): v is number => v !== null);
  const maxes = catProviders.map((p) => maxPrice(p.pricing)).filter((v): v is number => v !== null);
  const priceRange =
    mins.length > 0 && maxes.length > 0
      ? `R${Math.min(...mins).toLocaleString()} – R${Math.max(...maxes).toLocaleString()}/yr`
      : null;

  // Top rated
  const sorted = [...catProviders].sort((a, b) => b.rating - a.rating);
  const topProvider = sorted[0] ? { name: sorted[0].name, rating: sorted[0].rating } : null;

  return { count, priceRange, topProvider };
}

const CategorySection = () => {
  const stats = useMemo(
    () =>
      Object.fromEntries(
        categories.map((c) => [c.id, getCategoryStats(c.id)])
      ) as Record<ProviderCategory, CategoryStats>,
    []
  );

  return (
    <section id="categories" className="border-b bg-background py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl text-foreground">Browse by category</h2>
        <p className="mt-2 text-muted-foreground">
          Find the right education option for your family
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const s = stats[cat.id];
            return (
              <Link
                key={cat.id}
                to={`/providers?category=${cat.id}`}
                onClick={() => trackEvent({ name: "filter_change", properties: { category: cat.id } })}
                className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={CATEGORY_IMAGES[cat.id]}
                    alt={cat.label}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3 className="font-serif text-lg text-white">{cat.label}</h3>
                  </div>
                  <Badge className="absolute right-3 top-3 bg-card/90 text-card-foreground backdrop-blur-sm">
                    {s.count} provider{s.count !== 1 && "s"}
                  </Badge>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-sm text-muted-foreground">{cat.description}</p>

                  {/* Stats row */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-border pt-3">
                    {s.priceRange && (
                      <span className="text-xs font-medium text-primary">{s.priceRange}</span>
                    )}
                    {s.topProvider && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <span className="font-medium text-foreground">{s.topProvider.rating}</span>
                        {s.topProvider.name}
                      </span>
                    )}
                  </div>

                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
