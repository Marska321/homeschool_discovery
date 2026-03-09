import { Link } from "react-router-dom";
import { Star, CheckCircle2, Globe } from "lucide-react";
import { categoryLabels, type Provider } from "@/data/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/* ── Desktop table row ── */
export const CompareRow = ({
    label,
    values,
}: {
    label: string;
    values: (string | React.ReactNode)[];
}) => (
    <div className="grid border-b" style={{ gridTemplateColumns: `200px repeat(${values.length}, 1fr)` }}>
        <div className="flex items-start border-r bg-secondary/30 p-4 text-sm font-medium text-foreground">
            {label}
        </div>
        {values.map((val, i) => (
            <div key={i} className="border-r p-4 text-sm text-muted-foreground last:border-r-0">
                {val || <span className="text-muted">—</span>}
            </div>
        ))}
    </div>
);

/* ── Simple info pair ── */
export const InfoRow = ({ label, value }: { label: string; value?: string }) => {
    if (!value) return null;
    return (
        <div>
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            <p className="text-sm text-foreground">{value}</p>
        </div>
    );
};

/* ── Mobile stacked card ── */
export const MobileCompareCard = ({ provider }: { provider: Provider }) => (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <img src={provider.image} alt={provider.name} className="h-40 w-full object-cover" />
        <div className="p-5 space-y-4">
            <div>
                <div className="flex items-start justify-between gap-2">
                    <Link to={`/provider/${provider.id}`} className="font-serif text-xl text-foreground hover:text-primary">
                        {provider.name}
                    </Link>
                    {provider.badge && (
                        <Badge className="shrink-0 bg-accent text-accent-foreground text-xs">{provider.badge}</Badge>
                    )}
                </div>
                <div className="mt-1 flex items-center gap-1 text-sm">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="font-medium text-foreground">{provider.rating}</span>
                    <span className="text-muted-foreground">· {provider.reviewCount} reviews</span>
                </div>
                <Badge variant="outline" className="mt-2 text-xs font-normal">{categoryLabels[provider.category]}</Badge>
            </div>

            {provider.pricing && (
                <div className="rounded-md bg-secondary/30 p-3">
                    <span className="text-xs font-medium text-muted-foreground">Pricing</span>
                    <p className="text-base font-semibold text-primary">{provider.pricing}</p>
                </div>
            )}

            <InfoRow label="Grades" value={provider.grades} />
            {provider.curricula && provider.curricula.length > 0 && (
                <div>
                    <span className="text-xs font-medium text-muted-foreground">Curricula</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                        {provider.curricula.map((c) => (
                            <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                        ))}
                    </div>
                </div>
            )}
            <InfoRow label="Location" value={provider.location} />

            {provider.website && (
                <a href={provider.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                    <Globe className="h-3.5 w-3.5" /> Visit website
                </a>
            )}

            <Separator />

            {provider.features && provider.features.length > 0 && (
                <div>
                    <span className="text-xs font-medium text-muted-foreground">Key Features</span>
                    <ul className="mt-1.5 space-y-1">
                        {provider.features.map((f) => (
                            <li key={f} className="flex items-start gap-1.5 text-sm text-muted-foreground">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {provider.pros && provider.pros.length > 0 && (
                <div>
                    <span className="text-xs font-medium text-muted-foreground">Pros</span>
                    <ul className="mt-1.5 space-y-1">
                        {provider.pros.map((pro) => (
                            <li key={pro} className="flex items-start gap-1.5 text-sm text-muted-foreground">
                                <span className="mt-0.5 text-primary">✓</span> {pro}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {provider.cons && provider.cons.length > 0 && (
                <div>
                    <span className="text-xs font-medium text-muted-foreground">Cons</span>
                    <ul className="mt-1.5 space-y-1">
                        {provider.cons.map((con) => (
                            <li key={con} className="flex items-start gap-1.5 text-sm text-muted-foreground">
                                <span className="mt-0.5 text-destructive">✗</span> {con}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <Button variant="outline" asChild className="w-full mt-2">
                <Link to={`/provider/${provider.id}`}>View full details</Link>
            </Button>
        </div>
    </div>
);
