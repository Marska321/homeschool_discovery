import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import ProviderCard from "@/components/ProviderCard";
import CategorySection from "@/components/CategorySection";
import CompareBar from "@/components/CompareBar";
import { providers } from "@/data/providers";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Index = () => {
  useDocumentTitle("Home — SA Homeschool Discovery");

  return (
    <>
      <HeroSection />

      {/* Top Providers */}
      <section id="providers" className="border-b py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl text-foreground">Top Providers</h2>
              <p className="mt-2 text-muted-foreground">
                Trusted by homeschooling families across South Africa
              </p>
            </div>
            <Link
              to="/providers"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {providers.filter(p => ["online-school"].includes(p.category)).slice(0, 4).map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      <CategorySection />

      {/* More Providers */}
      <section className="border-b py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-foreground">Curriculum Providers</h2>
          <p className="mt-2 text-muted-foreground">
            Structured curricula and resources for your homeschooling journey
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {providers.filter(p => p.category === "curriculum-provider").map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* Christian & Faith-Based */}
      <section className="border-b py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-foreground">Christian & Faith-Based</h2>
          <p className="mt-2 text-muted-foreground">
            Faith-integrated education with biblical worldview
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {providers.filter(p => p.category === "christian").map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* Alternative Approaches */}
      <section className="border-b py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-foreground">Alternative Approaches</h2>
          <p className="mt-2 text-muted-foreground">
            Charlotte Mason, classical, project-based and other innovative methods
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {providers.filter(p => p.category === "alternative").map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      <CompareBar />
    </>
  );
};

export default Index;
