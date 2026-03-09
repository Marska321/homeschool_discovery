export type Phase = "foundation" | "intermediate" | "senior" | "fet";
export type Curriculum = "caps" | "ieb" | "cambridge";

export interface CalculatorProvider {
  id: string;
  name: string;
  curriculums: Curriculum[];
  phases: Phase[];
  tuition: Partial<Record<Phase, number>>;
  type: string;
}

export const PROVIDERS: CalculatorProvider[] = [
  { id: "impaq_diy", name: "Impaq (DIY Homeschool)", curriculums: ["caps"], phases: ["foundation", "intermediate", "senior", "fet"], tuition: { foundation: 6500, intermediate: 8500, senior: 11500, fet: 14500 }, type: "Parent-Led" },
  { id: "impaq_online", name: "Impaq Online School", curriculums: ["caps"], phases: ["intermediate", "senior", "fet"], tuition: { intermediate: 25500, senior: 28500, fet: 31500 }, type: "Teacher-Led" },
  { id: "cambrilearn_caps", name: "CambriLearn (CAPS)", curriculums: ["caps"], phases: ["foundation", "intermediate", "senior", "fet"], tuition: { foundation: 14500, intermediate: 22000, senior: 30000, fet: 39500 }, type: "Hybrid" },
  { id: "cambrilearn_camb", name: "CambriLearn (Cambridge)", curriculums: ["cambridge"], phases: ["foundation", "intermediate", "senior", "fet"], tuition: { foundation: 25000, intermediate: 38000, senior: 65000, fet: 85000 }, type: "Hybrid" },
  { id: "teneo_live", name: "Teneo Online (Live)", curriculums: ["caps", "ieb", "cambridge"], phases: ["intermediate", "senior", "fet"], tuition: { intermediate: 57600, senior: 65000, fet: 75600 }, type: "Teacher-Led" },
  { id: "teneo_recorded", name: "Teneo Online (Recorded)", curriculums: ["caps", "ieb", "cambridge"], phases: ["intermediate", "senior", "fet"], tuition: { intermediate: 36000, senior: 39600, fet: 48000 }, type: "Self-Paced" },
  { id: "brainline", name: "Brainline", curriculums: ["ieb"], phases: ["foundation", "intermediate", "senior", "fet"], tuition: { foundation: 26000, intermediate: 37000, senior: 45000, fet: 48000 }, type: "Teacher-Led" },
  { id: "wingu", name: "Wingu Academy", curriculums: ["caps", "cambridge"], phases: ["foundation", "intermediate", "senior", "fet"], tuition: { foundation: 28000, intermediate: 35000, senior: 48000, fet: 60000 }, type: "Teacher-Led" },
  { id: "saving_grace", name: "Saving Grace Education", curriculums: ["caps"], phases: ["foundation", "intermediate", "senior", "fet"], tuition: { foundation: 17250, intermediate: 22500, senior: 26500, fet: 34500 }, type: "Self-Paced" },
];

export const HIDDEN_COSTS: {
  books: Record<Curriculum, Record<Phase, number>>;
  exams: Record<Curriculum, Record<Phase, number>>;
  admin: Record<Curriculum, number>;
} = {
  books: {
    caps: { foundation: 2000, intermediate: 2500, senior: 3500, fet: 4000 },
    ieb: { foundation: 2200, intermediate: 2800, senior: 3800, fet: 4500 },
    cambridge: { foundation: 3500, intermediate: 5000, senior: 7500, fet: 9500 },
  },
  exams: {
    caps: { foundation: 0, intermediate: 0, senior: 0, fet: 14500 },
    ieb: { foundation: 0, intermediate: 0, senior: 0, fet: 16000 },
    cambridge: { foundation: 0, intermediate: 0, senior: 18000, fet: 24000 },
  },
  admin: { caps: 1200, ieb: 1500, cambridge: 2500 },
};

export const PHASES: { id: Phase; name: string }[] = [
  { id: "foundation", name: "Foundation (Gr R-3)" },
  { id: "intermediate", name: "Intermediate (Gr 4-6)" },
  { id: "senior", name: "Senior (Gr 7-9)" },
  { id: "fet", name: "FET / Matric (Gr 10-12)" },
];

export const CURRICULUMS: { id: Curriculum; name: string }[] = [
  { id: "caps", name: "CAPS (SACAI)" },
  { id: "ieb", name: "IEB" },
  { id: "cambridge", name: "Cambridge Int." },
];

export const formatZAR = (amount: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(amount);

export interface CostBreakdown {
  baseTuition: number;
  bookCosts: number;
  examCosts: number;
  adminCosts: number;
  totalAnnual: number;
  totalMonthly: number;
}

export function calculateCosts(
  provider: CalculatorProvider,
  phase: Phase,
  curriculum: Curriculum,
): CostBreakdown | null {
  const baseTuition = (provider.tuition as Record<Phase, number>)[phase];
  if (baseTuition === undefined) return null;

  const bookCosts = HIDDEN_COSTS.books[curriculum][phase];
  const examCosts = HIDDEN_COSTS.exams[curriculum][phase];
  const adminCosts = HIDDEN_COSTS.admin[curriculum];
  const totalAnnual = baseTuition + bookCosts + examCosts + adminCosts;
  return { baseTuition, bookCosts, examCosts, adminCosts, totalAnnual, totalMonthly: totalAnnual / 12 };
}

export function getAvailableProviders(phase: Phase, curriculum: Curriculum): CalculatorProvider[] {
  return PROVIDERS.filter((p) => p.phases.includes(phase) && p.curriculums.includes(curriculum));
}
