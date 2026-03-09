import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, CheckCircle2, Globe } from "lucide-react";
import { useCompare } from "@/contexts/CompareContext";
import { categoryLabels } from "@/data/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
<<<<<<< HEAD
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  CompareRow,
  MobileCompareCard,
} from "@/components/compare/CompareWidgets";
import { trackEvent } from "@/lib/analytics";
=======
import Layout from "@/components/Layout";

/* ── Desktop table row ── */
const CompareRow = ({
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

/* ── Mobile stacked card ── */
const MobileCompareCard = ({ provider }: { provider: Provider }) => (
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

const InfoRow = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
};
>>>>>>> 810ee7659f1ea347eea0e752e0b55171391e7d89

const ComparePage = () => {
  const { selected, clear } = useCompare();
  useDocumentTitle("Compare Providers");

  useEffect(() => {
    if (selected.length >= 2) {
      trackEvent({
        name: "provider_compare_view",
        properties: {
          count: selected.length,
          providerIds: selected.map((p) => p.id),
        },
      });
    }
  }, [selected.length, selected]);

  if (selected.length < 2) {
    return (
<<<<<<< HEAD
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-3xl text-foreground">Select providers to compare</h1>
        <p className="mt-2 text-muted-foreground">
          Go back and select 2-3 providers using the compare checkbox on each card.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Browse providers</Link>
        </Button>
      </div>
=======
      <Layout>
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="text-3xl text-foreground">Select providers to compare</h1>
          <p className="mt-2 text-muted-foreground">
            Go back and select 2-3 providers using the compare checkbox on each card.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">Browse providers</Link>
          </Button>
        </div>
      </Layout>
>>>>>>> 810ee7659f1ea347eea0e752e0b55171391e7d89
    );
  }

  return (
<<<<<<< HEAD
    <>
=======
    <Layout>
>>>>>>> 810ee7659f1ea347eea0e752e0b55171391e7d89

        <div className="container mx-auto px-4 py-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link to="/" className="mb-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to all providers
              </Link>
              <h1 className="text-3xl text-foreground">Compare Providers</h1>
              <p className="mt-1 text-muted-foreground">
                Side-by-side comparison of {selected.length} providers
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={clear} asChild>
              <Link to="/">Clear & go back</Link>
            </Button>
          </div>

          {/* ── Mobile: stacked cards ── */}
          <div className="space-y-6 md:hidden">
            {selected.map((p) => (
              <MobileCompareCard key={p.id} provider={p} />
            ))}
          </div>

          {/* ── Desktop: table layout ── */}
          <div className="hidden md:block">
            {/* Provider headers */}
            <div
              className="grid rounded-t-lg border"
              style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}
            >
              <div className="border-r bg-secondary/30 p-4" />
              {selected.map((p) => (
                <div key={p.id} className="border-r p-4 last:border-r-0">
                  <img src={p.image} alt={p.name} className="mb-3 h-28 w-full rounded-md object-cover" />
                  <Link to={`/provider/${p.id}`} className="font-serif text-lg text-foreground hover:text-primary">
                    {p.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-1 text-sm">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="font-medium text-foreground">{p.rating}</span>
                    <span className="text-muted-foreground">· {p.reviewCount} reviews</span>
                  </div>
                  {p.badge && (
                    <Badge className="mt-2 bg-accent text-accent-foreground text-xs">{p.badge}</Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Comparison rows */}
            <div className="overflow-hidden rounded-b-lg border-x border-b">
              <CompareRow label="Category" values={selected.map((p) => categoryLabels[p.category])} />
              <CompareRow label="Pricing" values={selected.map((p) => (
                <span className="font-semibold text-primary">{p.pricing || "Contact for pricing"}</span>
              ))} />
              <CompareRow label="Grades" values={selected.map((p) => p.grades)} />
              <CompareRow label="Curricula" values={selected.map((p) => (
                <div className="flex flex-wrap gap-1">
                  {p.curricula?.map((c) => (
                    <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                  )) || "—"}
                </div>
              ))} />
              <CompareRow label="Location" values={selected.map((p) => p.location)} />
              <CompareRow label="Website" values={selected.map((p) =>
                p.website ? (
                  <a href={p.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                    <Globe className="h-3.5 w-3.5" /> Visit
                  </a>
                ) : null
              )} />
              <Separator />
              <CompareRow label="Key Features" values={selected.map((p) => (
                <ul className="space-y-1.5">
                  {p.features?.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              ))} />
              <CompareRow label="Pros" values={selected.map((p) => (
                <ul className="space-y-1.5">
                  {p.pros?.map((pro) => (
                    <li key={pro} className="flex items-start gap-1.5 text-xs">
                      <span className="mt-0.5 text-primary">✓</span> {pro}
                    </li>
                  )) || "—"}
                </ul>
              ))} />
              <CompareRow label="Cons" values={selected.map((p) => (
                <ul className="space-y-1.5">
                  {p.cons?.map((con) => (
                    <li key={con} className="flex items-start gap-1.5 text-xs">
                      <span className="mt-0.5 text-destructive">✗</span> {con}
                    </li>
                  )) || "—"}
                </ul>
              ))} />
            </div>

            {/* View detail buttons */}
            <div className="mt-6 grid gap-4" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
              <div />
              {selected.map((p) => (
                <Button key={p.id} variant="outline" asChild className="w-full">
                  <Link to={`/provider/${p.id}`}>View full details</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

<<<<<<< HEAD
    </>
=======
    </Layout>
>>>>>>> 810ee7659f1ea347eea0e752e0b55171391e7d89
  );
};

export default ComparePage;
