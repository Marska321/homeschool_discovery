import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Provider } from "@/data/providers";
import { accessibilityTagLabels } from "@/data/providers";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useCompare } from "@/contexts/CompareContext";

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const { toggle, isSelected } = useCompare();
  const checked = isSelected(provider.id);

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      {/* Compare checkbox */}
      <label
        className="absolute left-3 top-3 z-10 flex cursor-pointer items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-xs font-medium text-card-foreground backdrop-blur-sm transition-opacity group-hover:opacity-100"
        style={{ opacity: checked ? 1 : undefined }}
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={checked}
          onCheckedChange={() => toggle(provider)}
          className="h-3.5 w-3.5"
        />
        Compare
      </label>

      <Link to={`/provider/${provider.id}`} className="block cursor-pointer">
        <div className="relative h-44 overflow-hidden">
          <img
            src={provider.image}
            alt={`${provider.name} banner`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {provider.badge && (
            <Badge className="absolute right-3 top-3 bg-accent text-accent-foreground">
              {provider.badge}
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg text-card-foreground">{provider.name}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="font-medium text-foreground">{provider.rating}</span>
            <span>· {provider.reviewCount} reviews</span>
          </div>
          {provider.pricing && (
            <p className="mt-1.5 text-xs font-medium text-primary">{provider.pricing}</p>
          )}
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {provider.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {provider.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          {provider.accessibilityTags && provider.accessibilityTags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {provider.accessibilityTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary"
                >
                  {accessibilityTagLabels[tag]?.icon} {accessibilityTagLabels[tag]?.label}
                </span>
              ))}
              {provider.accessibilityTags.length > 3 && (
                <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  +{provider.accessibilityTags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProviderCard;
