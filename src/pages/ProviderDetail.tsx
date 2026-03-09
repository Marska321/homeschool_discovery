import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Globe, Mail, Phone, MapPin, CheckCircle2, ExternalLink } from "lucide-react";
import { providers, categoryLabels } from "@/data/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import ReviewCard from "@/components/ReviewCard";
import { trackEvent } from "@/lib/analytics";

const ProviderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const provider = providers.find((p) => p.id === id);

  if (!provider) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-3xl text-foreground">Provider not found</h1>
        <p className="mt-2 text-muted-foreground">The provider you're looking for doesn't exist.</p>
        <Button asChild className="mt-6">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  useDocumentTitle(provider.name);

  const ratingStars = Array.from({ length: 5 }, (_, i) => i < Math.round(provider.rating));

  return (
    <>

      {/* Hero banner */}
      <div className="relative h-56 overflow-hidden md:h-72">
        <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0">
          <div className="container mx-auto px-4">
            <Link to="/" className="mb-3 inline-flex items-center gap-1.5 text-sm text-primary-foreground/80 hover:text-primary-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to all providers
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-start gap-3">
              <h1 className="text-3xl text-foreground md:text-4xl">{provider.name}</h1>
              {provider.badge && (
                <Badge className="mt-1.5 bg-accent text-accent-foreground">{provider.badge}</Badge>
              )}
            </div>

            <div className="mt-2 flex items-center gap-3">
              <Badge variant="outline" className="text-xs font-normal">
                {categoryLabels[provider.category]}
              </Badge>
              <div className="flex items-center gap-1">
                {ratingStars.map((filled, i) => (
                  <Star key={i} className={`h-4 w-4 ${filled ? "fill-accent text-accent" : "text-muted"}`} />
                ))}
                <span className="ml-1 text-sm font-medium text-foreground">{provider.rating}</span>
                <span className="text-sm text-muted-foreground">· {provider.reviewCount} reviews</span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {provider.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>

            <Separator className="my-8" />

            <h2 className="text-2xl text-foreground">About</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{provider.fullDescription}</p>

            {provider.features && provider.features.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl text-foreground">Key Features</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {provider.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {provider.curricula && provider.curricula.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl text-foreground">Curricula Offered</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {provider.curricula.map((c) => (
                    <Badge key={c} variant="secondary" className="text-sm">{c}</Badge>
                  ))}
                </div>
              </>
            )}

            {provider.pricing && (
              <div className="mt-8 rounded-lg border bg-secondary/30 p-5">
                <h2 className="text-lg font-medium text-foreground">Pricing</h2>
                <p className="mt-1 text-lg text-primary font-semibold">{provider.pricing}</p>
              </div>
            )}

            {provider.pros && provider.pros.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl text-foreground">Pros</h2>
                <ul className="mt-3 space-y-2">
                  {provider.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 text-primary">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {provider.cons && provider.cons.length > 0 && (
              <>
                <h2 className="mt-8 text-2xl text-foreground">Cons</h2>
                <ul className="mt-3 space-y-2">
                  {provider.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 text-destructive">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Separator className="my-10" />

            {/* Reviews */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl text-foreground">
                Reviews <span className="text-lg text-muted-foreground">({provider.reviews.length})</span>
              </h2>
              {provider.externalReviewUrl && (
                <a
                  href={provider.externalReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({
                    name: "provider_view_reviews",
                    properties: {
                      providerId: provider.id,
                      providerName: provider.name,
                      source: provider.externalReviewSource || "external"
                    }
                  })}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline hover:text-primary/80 transition-colors"
                >
                  View all reviews on {provider.externalReviewSource || "external source"}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            <div className="mt-6 space-y-4">
              {provider.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>

          {/* Sidebar – Contact info */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="font-serif text-lg text-card-foreground">Contact & Info</h3>

              {provider.grades && (
                <div className="mt-4 text-sm">
                  <span className="font-medium text-foreground">Grades:</span>
                  <span className="ml-2 text-muted-foreground">{provider.grades}</span>
                </div>
              )}

              <Separator className="my-4" />

              <div className="space-y-3">
                {provider.website && (
                  <a href={provider.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-primary hover:underline">
                    <Globe className="h-4 w-4" /> {provider.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
                {provider.email && (
                  <a href={`mailto:${provider.email}`} className="flex items-center gap-2.5 text-sm text-primary hover:underline">
                    <Mail className="h-4 w-4" /> {provider.email}
                  </a>
                )}
                {provider.phone && (
                  <a href={`tel:${provider.phone}`} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" /> {provider.phone}
                  </a>
                )}
                {provider.location && (
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {provider.location}
                  </div>
                )}
              </div>

              {provider.website && (
                <Button
                  className="mt-6 w-full"
                  asChild
                  onClick={() => trackEvent({
                    name: "provider_visit_website",
                    properties: { providerId: provider.id, providerName: provider.name }
                  })}
                >
                  <a href={provider.website} target="_blank" rel="noopener noreferrer">
                    Visit website
                  </a>
                </Button>
              )}
            </div>
          </aside>
        </div>
      </div>

    </>
  );
};

export default ProviderDetail;
