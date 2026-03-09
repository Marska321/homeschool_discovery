import { MapPin, Users, Calendar, ArrowRight } from "lucide-react";
import { TYPE_CONFIG, CURRICULA_LABELS, type Community } from "@/data/communities";
import { Badge } from "@/components/ui/badge";

interface CommunityCardProps {
  community: Community;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const type = TYPE_CONFIG[community.type];
  const TypeIcon = type.icon;

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 duration-300">
      {/* Card Header */}
      <div className="border-b border-border/50 p-5 pb-4">
        <div className="mb-3 flex items-start justify-between">
          <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${type.bgClass} ${type.colorClass}`}>
            <TypeIcon className="h-3.5 w-3.5" />
            {type.label}
          </div>
          <Badge
            variant={community.spots.includes("Waitlist") ? "destructive" : "outline"}
            className="text-[10px]"
          >
            {community.spots}
          </Badge>
        </div>

        <h3 className="font-serif text-lg leading-tight text-card-foreground transition-colors group-hover:text-primary">
          {community.name}
        </h3>

        <div className="mt-1.5 flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{community.location}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 py-4">
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {community.description}
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center text-sm text-card-foreground">
            <Users className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            {community.ages}
          </div>
          <div className="flex items-center text-sm text-card-foreground">
            <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            {community.days}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto bg-muted/40 p-5 pt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Supported Curricula
        </p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {community.curricula.map((c) => (
            <span
              key={c}
              className="rounded-md border border-border bg-card px-2 py-0.5 text-xs font-medium text-card-foreground"
            >
              {CURRICULA_LABELS[c]}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border/50 pt-3">
          <span className="text-lg font-bold text-card-foreground">{community.price}</span>
          <button className="flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80">
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
