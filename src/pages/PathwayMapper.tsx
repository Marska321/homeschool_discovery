import { useState, useEffect } from "react";
import {
  MapPin, Globe, GraduationCap, Building2,
  Microscope, Briefcase, Palette,
  ChevronRight, Info,
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  type Destination, type Field,
  DESTINATIONS, FIELDS,
  STATUS_CONFIG, CURRICULUM_STYLES,
  evaluatePathway,
  CURRICULA,
} from "@/lib/pathwayUtils";
import { trackEvent } from "@/lib/analytics";

const DESTINATION_ICONS = {
  sa_degree: MapPin,
  international: Globe,
  sa_diploma: Building2,
} as const;

const FIELD_ICONS = {
  stem: Microscope,
  commerce: Briefcase,
  humanities: Palette,
} as const;

const PathwayMapper = () => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [field, setField] = useState<Field | null>(null);

  const results = destination && field ? evaluatePathway(destination, field) : null;

  useEffect(() => {
    if (results) {
      trackEvent({ name: "tool_complete", properties: { toolName: "mapper" } });
    }
  }, [!!results]);

  useDocumentTitle("University Pathway Mapper");

  return (
    <>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <header>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <GraduationCap className="h-4 w-4" />
              <span>Matric Exemption Guide</span>
            </div>
            <h1 className="font-serif text-3xl text-foreground md:text-5xl">
              University <span className="text-primary">Pathway Mapper</span>
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
              Don't limit your child's future. Select their study goals below to see which South African homeschool curricula are compatible with their university dreams.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* LEFT: Wizard */}
            <div className="space-y-6 lg:col-span-4">
              {/* Step 1: Destination */}
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="mb-4 flex items-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs">1</span>
                  Where to study?
                </h3>
                <div className="space-y-3">
                  {DESTINATIONS.map((d) => {
                    const Icon = DESTINATION_ICONS[d.id];
                    return (
                      <button
                        key={d.id}
                        onClick={() => setDestination(d.id)}
                        className={`flex w-full items-start rounded-xl border p-4 text-left transition-all ${destination === d.id
                          ? "border-primary bg-primary/10 ring-1 ring-primary"
                          : "border-border bg-card hover:border-primary/50"
                          }`}
                      >
                        <Icon className={`mr-3 mt-0.5 h-6 w-6 shrink-0 ${destination === d.id ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <div className={`font-semibold ${destination === d.id ? "text-primary" : "text-card-foreground"}`}>{d.label}</div>
                          <div className={`mt-1 text-xs ${destination === d.id ? "text-primary/70" : "text-muted-foreground"}`}>{d.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Field */}
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="mb-4 flex items-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs">2</span>
                  Field of Study
                </h3>
                <div className="space-y-3">
                  {FIELDS.map((f) => {
                    const Icon = FIELD_ICONS[f.id];
                    return (
                      <button
                        key={f.id}
                        onClick={() => setField(f.id)}
                        className={`flex w-full items-start rounded-xl border p-4 text-left transition-all ${field === f.id
                          ? "border-primary bg-primary/10 ring-1 ring-primary"
                          : "border-border bg-card hover:border-primary/50"
                          }`}
                      >
                        <Icon className={`mr-3 mt-0.5 h-6 w-6 shrink-0 ${field === f.id ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <div className={`font-semibold ${field === f.id ? "text-primary" : "text-card-foreground"}`}>{f.label}</div>
                          <div className={`mt-1 text-xs ${field === f.id ? "text-primary/70" : "text-muted-foreground"}`}>{f.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT: Results */}
            <div className="lg:col-span-8">
              {!results ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-card p-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Info className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-serif text-xl text-foreground">Discover Your Pathway</h3>
                  <p className="max-w-sm text-muted-foreground">Select a study destination and field on the left to see which curricula will grant you access.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Goal banner */}
                  <div className="mb-6 flex items-center justify-between rounded-2xl bg-foreground p-6 text-background shadow-lg">
                    <div>
                      <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-primary">Your Pathway Goal</p>
                      <h2 className="flex items-center text-xl font-bold">
                        {DESTINATIONS.find((d) => d.id === destination)!.label}
                        <ChevronRight className="mx-2 h-5 w-5 text-background/40" />
                        {FIELDS.find((f) => f.id === field)!.label}
                      </h2>
                    </div>
                  </div>

                  {results.map((result) => {
                    const curr = CURRICULA[result.id];
                    const status = STATUS_CONFIG[result.status];
                    const StatusIcon = status.icon;
                    return (
                      <div key={result.id} className={`rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md ${CURRICULUM_STYLES[result.id]}`}>
                        <div className="mb-4 flex items-start justify-between">
                          <h3 className="text-xl font-extrabold text-primary">{curr.name}</h3>
                          <div className={`flex items-center rounded-full px-3 py-1.5 text-xs font-bold ${status.className}`}>
                            <StatusIcon className="mr-1.5 h-4 w-4" />
                            {status.label}
                          </div>
                        </div>
                        <h4 className="mb-2 text-lg font-semibold text-foreground">{result.title}</h4>
                        <p className="mb-4 leading-relaxed text-muted-foreground">{result.details}</p>
                        <div className="flex items-center border-t pt-4 text-sm">
                          <span className="mr-2 font-medium text-muted-foreground">Top Providers:</span>
                          <span className="font-semibold text-foreground">{result.providers}</span>
                        </div>
                      </div>
                    );
                  })}

                  {destination === "sa_degree" && (
                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-accent-foreground">
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <p><strong>Important Note on Exemption:</strong> Universities South Africa (USAf) makes the final decision on foreign curriculum exemptions (like Cambridge). Always consult with your chosen curriculum provider about exemption requirements in Grade 10 to avoid subject choice errors.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
export default PathwayMapper;
