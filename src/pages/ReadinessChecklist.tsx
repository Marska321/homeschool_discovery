import { useState, useMemo } from "react";
import { ClipboardCheck, ChevronRight, RotateCcw, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { CATEGORIES, QUESTIONS, getResultLevel } from "@/lib/readinessUtils";
import { trackEvent } from "@/lib/analytics";

const ReadinessChecklist = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedIndex, setSelectedIndex] = useState<Record<string, number>>({});
  const [details, setDetails] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const progress = (Object.keys(answers).length / QUESTIONS.length) * 100;

  const handleAnswer = (questionId: string, optionIndex: number, score: number, detail?: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
    setSelectedIndex((prev) => ({ ...prev, [questionId]: optionIndex }));

    if (detail) setDetails((prev) => [...prev.filter((d) => d !== detail), detail]);

    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ((prev) => prev + 1), 300);
    }
  };

  const totalScore = useMemo(() => Object.values(answers).reduce((a, b) => a + b, 0), [answers]);
  const maxScore = QUESTIONS.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const categoryScores = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const qs = QUESTIONS.filter((q) => q.category === cat.id);
      const earned = qs.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      const max = qs.length * 3;
      return { ...cat, earned, max, percentage: max > 0 ? Math.round((earned / max) * 100) : 0 };
    });
  }, [answers]);

  const result = getResultLevel(percentage);
  const ResultIcon = result.icon;

  const handleSubmit = () => {
    trackEvent({ name: "tool_complete", properties: { toolName: "readiness" } });
    setSubmitted(true);
  };
  const handleReset = () => {
    setCurrentQ(0);
    setAnswers({});
    setSelectedIndex({});
    setDetails([]);
    setSubmitted(false);
  };

  const allAnswered = Object.keys(answers).length === QUESTIONS.length;
  const question = QUESTIONS[currentQ];

  useDocumentTitle("Readiness Checklist");

  return (
    <>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header */}
          <header>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <ClipboardCheck className="h-4 w-4" />
              <span>Self-Assessment</span>
            </div>
            <h1 className="font-serif text-3xl text-foreground md:text-5xl">
              Homeschool <span className="text-primary">Readiness</span> Checklist
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
              Answer 10 quick questions to find out if you're ready to start homeschooling — and get personalised recommendations.
            </p>
          </header>

          {!submitted ? (
            <>
              {/* Progress */}
              <div>
                <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                  <span>
                    Question {currentQ + 1} of {QUESTIONS.length}
                  </span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Question navigation dots */}
              <div className="flex flex-wrap gap-2">
                {QUESTIONS.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQ(i)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all ${i === currentQ
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : answers[q.id] !== undefined
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {/* Current question */}
              <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {CATEGORIES.find((c) => c.id === question.category)?.icon}{" "}
                  {CATEGORIES.find((c) => c.id === question.category)?.label}
                </p>
                <h2 className="mb-6 font-serif text-xl text-foreground md:text-2xl">{question.text}</h2>
                <div className="space-y-3">
                  {question.options.map((opt, oi) => {
                    const isSelected = selectedIndex[question.id] === oi;
                    return (
                      <button
                        key={oi}
                        onClick={() => handleAnswer(question.id, oi, opt.score, opt.detail)}
                        className={`flex w-full items-center rounded-xl border p-4 text-left transition-all ${isSelected ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border bg-card hover:border-primary/50"
                          }`}
                      >
                        <div
                          className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${isSelected ? "border-primary bg-primary" : "border-border"
                            }`}
                        >
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-primary-foreground" />}
                        </div>
                        <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-card-foreground"}`}>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Nav */}
                <div className="mt-8 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentQ === 0}
                      onClick={() => setCurrentQ((p) => p - 1)}
                    >
                      Previous
                    </Button>
                    {currentQ < QUESTIONS.length - 1 ? (
                      <Button size="sm" onClick={() => setCurrentQ((p) => p + 1)}>
                        Next <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button size="sm" disabled={!allAnswered} onClick={handleSubmit}>
                        See My Results
                      </Button>
                    )}
                  </div>
                  {!allAnswered && Object.keys(answers).length > 0 && (() => {
                    const firstUnanswered = QUESTIONS.findIndex((q) => answers[q.id] === undefined);
                    const unansweredCount = QUESTIONS.filter((q) => answers[q.id] === undefined).length;
                    return firstUnanswered >= 0 ? (
                      <button
                        onClick={() => setCurrentQ(firstUnanswered)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-accent/50 px-3 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent"
                      >
                        <AlertTriangle className="h-4 w-4" />
                        {unansweredCount} unanswered — jump to Q{firstUnanswered + 1}
                      </button>
                    ) : null;
                  })()}
                </div>
              </div>
            </>
          ) : (
            /* Results */
            <div className="space-y-6">
              {/* Score hero */}
              <div className="overflow-hidden rounded-3xl border bg-card shadow-xl">
                <div className="bg-foreground p-8 text-background">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-background/50">Your Readiness Score</p>
                      <div className="text-5xl font-extrabold">{percentage}%</div>
                    </div>
                    <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${result.bg} ${result.className}`}>
                      <ResultIcon className="h-5 w-5" />
                      {result.label}
                    </div>
                  </div>
                  <p className="mt-4 max-w-lg text-background/70">{result.message}</p>
                </div>

                {/* Category breakdown */}
                <div className="space-y-4 p-8">
                  <h3 className="font-semibold text-foreground">Breakdown by Category</h3>
                  {categoryScores.map((cat) => (
                    <div key={cat.id}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">{cat.icon} {cat.label}</span>
                        <span className={`font-bold ${cat.percentage >= 80 ? "text-primary" : cat.percentage >= 50 ? "text-accent-foreground" : "text-destructive"}`}>
                          {cat.percentage}%
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className={`h-full transition-all duration-700 ${cat.percentage >= 80 ? "bg-primary" : cat.percentage >= 50 ? "bg-accent" : "bg-destructive"}`}
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              {details.length > 0 && (
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <h3 className="mb-4 font-semibold text-foreground">💡 Personalised Recommendations</h3>
                  <ul className="space-y-3">
                    {details.map((d, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-lg bg-muted/50 p-3 text-sm text-foreground">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Retake
                </Button>
                <Button asChild>
                  <Link to="/providers">Browse Providers</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default ReadinessChecklist;
