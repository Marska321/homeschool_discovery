import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b bg-secondary/50">
      <div className="container mx-auto grid min-h-[480px] items-center gap-12 px-4 py-16 md:grid-cols-2">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
            Discover homeschooling
            <br />
            <span className="text-primary">in South Africa.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            A discovery platform to help you find the perfect online school, curriculum provider, or learning path for your child. Backed by honest parent reviews.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="gap-2" asChild>
              <a href="#providers">
                Explore providers <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#categories">Browse categories</a>
            </Button>
          </div>
        </div>
        <div className="hidden justify-center md:flex" style={{ animationDelay: "0.2s" }}>
          <img
            src={heroImage}
            alt="Child studying at home with books and laptop"
            className="w-full max-w-md rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
