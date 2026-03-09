import { useState, useMemo } from "react";
import { MapPin, Compass, List, Map as MapIcon, X } from "lucide-react";
<<<<<<< HEAD
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
=======
import Layout from "@/components/Layout";
>>>>>>> 810ee7659f1ea347eea0e752e0b55171391e7d89
import CommunityCard from "@/components/CommunityCard";
import CommunityMap from "@/components/CommunityMap";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { communities, REGION_LABELS, type CurriculumSupport } from "@/data/communities";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterCurriculum, setFilterCurriculum] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const filtered = useMemo(() => {
    return communities.filter((c) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q);
      const matchesRegion = filterRegion === "all" || c.region === filterRegion;
      const matchesType = filterType === "all" || c.type === filterType;
      const matchesCurriculum =
        filterCurriculum === "all" ||
        c.curricula.includes(filterCurriculum as CurriculumSupport) ||
        c.curricula.includes("all");
      return matchesSearch && matchesRegion && matchesType && matchesCurriculum;
    });
  }, [searchTerm, filterRegion, filterType, filterCurriculum]);

  const clearAll = () => {
    setSearchTerm("");
    setFilterRegion("all");
    setFilterType("all");
    setFilterCurriculum("all");
  };

  useDocumentTitle("Community Discovery");

  return (
<<<<<<< HEAD
    <>
=======
    <Layout>
>>>>>>> 810ee7659f1ea347eea0e752e0b55171391e7d89

        {/* Hero */}
        <section className="relative overflow-hidden bg-primary py-16 pb-24 text-primary-foreground">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/80 opacity-50 blur-3xl" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-sm font-medium text-primary-foreground/80">
              <Compass className="h-4 w-4" />
              <span>Community Discovery</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl">
              Find your{" "}
              <span className="text-accent">tribe.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Homeschooling doesn't mean learning alone. Discover local
              micro-schools, parent co-ops, and tutor centres in your exact suburb.
            </p>
          </div>
        </section>

        {/* Search & Filters — overlapping hero */}
        <div className="container relative z-20 mx-auto -mt-10 px-4">
          <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-lg md:flex-row md:p-6">
            {/* Search */}
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search suburb (e.g. Durbanville, Sandton)…"
                className="pl-10 pr-10"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Community Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="tutor_center">Tutor Centres</SelectItem>
                  <SelectItem value="micro_school">Micro-Schools</SelectItem>
                  <SelectItem value="co_op">Parent Co-ops</SelectItem>
                  <SelectItem value="club">Clubs</SelectItem>
                  <SelectItem value="sports">Sports Groups</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCurriculum} onValueChange={setFilterCurriculum}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Curriculum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Curriculum</SelectItem>
                  <SelectItem value="impaq">Supports Impaq</SelectItem>
                  <SelectItem value="cambrilearn">Supports CambriLearn</SelectItem>
                  <SelectItem value="brainline">Supports Brainline</SelectItem>
                  <SelectItem value="wingu">Supports Wingu</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger className="w-full sm:w-[170px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(REGION_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container mx-auto px-4 py-12">
          {/* Header & view toggle */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-2xl text-foreground">Local Communities</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Showing {filtered.length} option{filtered.length !== 1 && "s"} near you.
              </p>
            </div>
            <div className="hidden rounded-lg border bg-muted p-1 sm:flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${viewMode === "grid"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <List className="h-4 w-4" /> Grid
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${viewMode === "map"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <MapIcon className="h-4 w-4" /> Map
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-muted/30 py-16 text-center">
              <Compass className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
              <p className="text-lg font-medium text-foreground">No communities found</p>
              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                We couldn't find any centres matching your filters. Try widening
                your search or removing curriculum restrictions.
              </p>
              <Button variant="outline" size="sm" className="mt-4" onClick={clearAll}>
                Clear all filters
              </Button>
            </div>
          ) : viewMode === "map" ? (
            <CommunityMap communities={filtered} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <CommunityCard key={c.id} community={c} />
              ))}
            </div>
          )}
        </div>

<<<<<<< HEAD
    </>
=======
    </Layout>
>>>>>>> 810ee7659f1ea347eea0e752e0b55171391e7d89
  );
};

export default CommunityPage;
