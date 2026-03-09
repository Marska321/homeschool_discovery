import { useState, useMemo, useEffect } from "react";
import { Calculator, AlertTriangle, BookOpen, GraduationCap, School, CheckCircle2, Info } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  type Phase, type Curriculum,
  PROVIDERS, PHASES, CURRICULUMS,
  formatZAR, calculateCosts, getAvailableProviders,
} from "@/lib/calculatorUtils";
import { trackEvent } from "@/lib/analytics";

const TrueCostCalculator = () => {
  const [phase, setPhase] = useState<Phase>("fet");
  const [curriculum, setCurriculum] = useState<Curriculum>("caps");
  const [providerId, setProviderId] = useState(PROVIDERS[0].id);

  const availableProviders = useMemo(
    () => getAvailableProviders(phase, curriculum),
    [phase, curriculum]
  );

  // Keep provider in sync
  useEffect(() => {
    if (availableProviders.length > 0 && !availableProviders.find((p) => p.id === providerId)) {
      setProviderId(availableProviders[0].id);
    }
  }, [availableProviders, providerId]);

  const selectedProvider = PROVIDERS.find((p) => p.id === providerId);

  const costs = useMemo(() => {
    if (!selectedProvider) return null;
    return calculateCosts(selectedProvider, phase, curriculum);
  }, [selectedProvider, phase, curriculum]);

  useEffect(() => {
    if (costs) {
      trackEvent({ name: "tool_complete", properties: { toolName: "calculator" } });
    }
  }, [!!costs]);

  useDocumentTitle("True Cost Calculator");

  return (
    <>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <header>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Calculator className="h-4 w-4" />
              <span>Parent Toolkit 2026</span>
            </div>
            <h1 className="font-serif text-3xl text-foreground md:text-5xl">
              The <span className="text-primary">True Cost</span> Calculator
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
              Don't get caught out by hidden fees. Select your child's grade and curriculum to see the real estimated costs of homeschooling in South Africa.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* LEFT: Controls */}
            <div className="space-y-6 lg:col-span-5">
              {/* Step 1: Phase */}
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="mb-4 flex items-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs">1</span>
                  Select Grade Phase
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {PHASES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPhase(p.id)}
                      className={`rounded-xl border p-3 text-sm font-medium transition-all ${phase === p.id
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                        : "border-border bg-card text-card-foreground hover:border-primary/50"
                        }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Curriculum */}
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="mb-4 flex items-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs">2</span>
                  Select Curriculum
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {CURRICULUMS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCurriculum(c.id)}
                      className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center text-sm font-medium transition-all ${curriculum === c.id
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                        : "border-border bg-card text-card-foreground hover:border-primary/50"
                        }`}
                    >
                      <BookOpen className={`mb-1 h-5 w-5 ${curriculum === c.id ? "text-primary" : "text-muted-foreground"}`} />
                      {c.name}
                    </button>
                  ))}
                </div>
                {curriculum === "cambridge" && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3 text-xs text-accent-foreground">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p>Cambridge exam fees are charged by the British Council in GBP (£). Total costs may fluctuate based on the Rand exchange rate.</p>
                  </div>
                )}
              </div>

              {/* Step 3: Provider */}
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="mb-4 flex items-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs">3</span>
                  Choose Provider
                </h3>
                {availableProviders.length === 0 ? (
                  <div className="rounded-lg border border-dashed bg-muted/30 p-4 text-center text-sm text-muted-foreground">
                    No providers match these specific filters. Try changing the curriculum or phase.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {availableProviders.map((provider) => (
                      <button
                        key={provider.id}
                        onClick={() => setProviderId(provider.id)}
                        className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${providerId === provider.id
                          ? "border-primary bg-primary/10 ring-1 ring-primary"
                          : "border-border bg-card hover:border-primary/50"
                          }`}
                      >
                        <div>
                          <div className={`font-semibold ${providerId === provider.id ? "text-primary" : "text-card-foreground"}`}>
                            {provider.name}
                          </div>
                          <div className={`mt-1 text-xs ${providerId === provider.id ? "text-primary/70" : "text-muted-foreground"}`}>
                            {provider.type}
                          </div>
                        </div>
                        <div className={`text-sm font-bold ${providerId === provider.id ? "text-primary" : "text-muted-foreground"}`}>
                          {formatZAR((provider.tuition as Record<Phase, number>)[phase])}/yr
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Receipt */}
            <div className="lg:col-span-7">
              {costs ? (
                <div className="sticky top-20 overflow-hidden rounded-3xl border bg-card shadow-xl">
                  {/* Receipt Header */}
                  <div className="bg-foreground p-8 text-background">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-serif text-2xl">{selectedProvider?.name}</h2>
                        <p className="mt-1 flex items-center text-background/60">
                          <GraduationCap className="mr-1.5 h-4 w-4" />
                          {PHASES.find((p) => p.id === phase)?.name} • {CURRICULUMS.find((c) => c.id === curriculum)?.name}
                        </p>
                      </div>
                      <div className="rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-medium text-background/70">
                        {selectedProvider?.type}
                      </div>
                    </div>
                    <div className="mt-8">
                      <p className="text-sm font-semibold uppercase tracking-wider text-background/50">True Annual Cost Estimate</p>
                      <div className="mt-1 text-5xl font-extrabold">{formatZAR(costs.totalAnnual)}</div>
                      <p className="mt-2 font-medium text-primary">Est. {formatZAR(costs.totalMonthly)} per month (12 months)</p>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-6 p-8">
                    <h3 className="font-semibold text-foreground">Cost Breakdown</h3>

                    <div className="flex items-end justify-between border-b pb-4">
                      <div>
                        <div className="flex items-center font-medium text-foreground">
                          <School className="mr-2 h-4 w-4 text-muted-foreground" /> Advertised Tuition
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">Provider's base fee for curriculum access.</div>
                      </div>
                      <div className="font-semibold text-foreground">{formatZAR(costs.baseTuition)}</div>
                    </div>

                    <div className="flex items-end justify-between border-b pb-4">
                      <div>
                        <div className="flex items-center font-medium text-foreground">
                          <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" /> Textbooks & Materials
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">Estimated cost for physical/digital books.</div>
                      </div>
                      <div className="font-semibold text-foreground">{formatZAR(costs.bookCosts)}</div>
                    </div>

                    <div className="flex items-end justify-between border-b pb-4">
                      <div>
                        <div className="flex items-center font-medium text-foreground">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" /> Platform / Registration Fee
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">Annual admin, software, or placement fees.</div>
                      </div>
                      <div className="font-semibold text-foreground">{formatZAR(costs.adminCosts)}</div>
                    </div>

                    <div className={`flex items-end justify-between rounded-xl p-4 ${costs.examCosts > 0 ? "border border-destructive/20 bg-destructive/5" : "border bg-muted/30"}`}>
                      <div>
                        <div className={`flex items-center font-medium ${costs.examCosts > 0 ? "text-destructive" : "text-foreground"}`}>
                          <AlertTriangle className={`mr-2 h-4 w-4 ${costs.examCosts > 0 ? "text-destructive" : "text-muted-foreground"}`} />
                          Final Examination Fees
                        </div>
                        <div className={`mt-1 text-sm ${costs.examCosts > 0 ? "text-destructive/80" : "text-muted-foreground"}`}>
                          {costs.examCosts > 0
                            ? `External fees paid to ${curriculum === "caps" ? "SACAI" : curriculum === "ieb" ? "IEB" : "British Council"}.`
                            : "No external board exams required for this phase."}
                        </div>
                      </div>
                      <div className={`font-semibold ${costs.examCosts > 0 ? "text-destructive" : "text-foreground"}`}>
                        {formatZAR(costs.examCosts)}
                      </div>
                    </div>

                    {/* Bar chart */}
                    <div className="mt-8 pt-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cost Proportion</p>
                      <div className="flex h-4 w-full overflow-hidden rounded-full bg-secondary">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(costs.baseTuition / costs.totalAnnual) * 100}%` }} />
                        <div className="h-full bg-primary/60 transition-all duration-500" style={{ width: `${(costs.bookCosts / costs.totalAnnual) * 100}%` }} />
                        <div className="h-full bg-muted-foreground/40 transition-all duration-500" style={{ width: `${(costs.adminCosts / costs.totalAnnual) * 100}%` }} />
                        {costs.examCosts > 0 && (
                          <div className="h-full bg-destructive/60 transition-all duration-500" style={{ width: `${(costs.examCosts / costs.totalAnnual) * 100}%` }} />
                        )}
                      </div>
                      <div className="mt-2 flex justify-between px-1 text-xs text-muted-foreground">
                        <span>Advertised: {((costs.baseTuition / costs.totalAnnual) * 100).toFixed(0)}%</span>
                        <span className="font-medium text-destructive">Hidden: {(((costs.totalAnnual - costs.baseTuition) / costs.totalAnnual) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[400px] items-center justify-center rounded-3xl border-2 border-dashed bg-muted/30">
                  <p className="flex items-center text-muted-foreground">
                    <Info className="mr-2 h-5 w-5" /> Select options to see true cost
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default TrueCostCalculator;
