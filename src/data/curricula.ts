export interface CurriculumAcademics {
  rigour: string;
  focus: string;
  assessment: string;
  flexibility: string;
}

export interface CurriculumUniversity {
  sa_degree: string;
  international: string;
  exemption: string;
}

export interface CurriculumLogistics {
  examCost: string;
  providerAvail: string;
  examFormat: string;
}

export interface Curriculum {
  id: string;
  name: string;
  logoColor: string;
  tagline: string;
  origin: string;
  academics: CurriculumAcademics;
  university: CurriculumUniversity;
  logistics: CurriculumLogistics;
}

export const CURRICULA: Record<string, Curriculum> = {
  caps: {
    id: 'caps',
    name: 'CAPS (National)',
    logoColor: 'bg-primary',
    tagline: 'The standard South African national curriculum.',
    origin: 'South Africa',
    academics: {
      rigour: 'Standard',
      focus: 'Broad knowledge, rote & application',
      assessment: 'Continuous (SBA) + Final Exams',
      flexibility: 'Low (Strict subject groupings)',
    },
    university: {
      sa_degree: 'Guaranteed (with passing grades)',
      international: 'Good (Accepted in many countries)',
      exemption: 'Automatic via Umalusi',
    },
    logistics: {
      examCost: 'Standard (approx. R14k for Matric)',
      providerAvail: 'Extremely High',
      examFormat: 'Written paper (Nov)',
    },
  },
  ieb: {
    id: 'ieb',
    name: 'IEB',
    logoColor: 'bg-[hsl(235,50%,50%)]',
    tagline: 'The premium South African independent board.',
    origin: 'South Africa',
    academics: {
      rigour: 'High',
      focus: 'Critical thinking & problem solving',
      assessment: 'Continuous (SBA) + Final Exams',
      flexibility: 'Low (Strict subject groupings)',
    },
    university: {
      sa_degree: 'Highly Regarded',
      international: 'Very Good (UK, Aus, USA)',
      exemption: 'Automatic via Umalusi',
    },
    logistics: {
      examCost: 'Premium (approx. R16k+ for Matric)',
      providerAvail: 'Medium (Brainline, Teneo)',
      examFormat: 'Written paper (Nov)',
    },
  },
  cambridge: {
    id: 'cambridge',
    name: 'Cambridge Int.',
    logoColor: 'bg-[hsl(152,50%,35%)]',
    tagline: 'The global gold standard for academics.',
    origin: 'United Kingdom',
    academics: {
      rigour: 'Very High',
      focus: 'Deep subject mastery & analysis',
      assessment: '100% Final Exams (No SBA)',
      flexibility: 'Very High (Mix and match subjects)',
    },
    university: {
      sa_degree: 'Conditional (USAf Exemption required)',
      international: 'Excellent (Globally accepted)',
      exemption: 'Requires strict subject combos',
    },
    logistics: {
      examCost: 'Very High (Billed in GBP / £)',
      providerAvail: 'High',
      examFormat: 'Written paper (May/Jun & Oct/Nov)',
    },
  },
  pearson: {
    id: 'pearson',
    name: 'Pearson Edexcel',
    logoColor: 'bg-[hsl(175,50%,35%)]',
    tagline: 'Modern British curriculum alternative.',
    origin: 'United Kingdom',
    academics: {
      rigour: 'High to Very High',
      focus: 'Application of knowledge & real-world skills',
      assessment: '100% Final Exams (Modular options)',
      flexibility: 'Very High (Mix and match subjects)',
    },
    university: {
      sa_degree: 'Conditional (USAf Exemption required)',
      international: 'Excellent (Globally accepted)',
      exemption: 'Requires strict subject combos',
    },
    logistics: {
      examCost: 'Very High (Billed in GBP / £)',
      providerAvail: 'Low (Wingu, etc.)',
      examFormat: 'Written (Jan, May/Jun, Oct/Nov)',
    },
  },
  ged: {
    id: 'ged',
    name: 'American GED',
    logoColor: 'bg-destructive',
    tagline: 'Fast-track high school equivalency.',
    origin: 'USA',
    academics: {
      rigour: 'Lower / Fast-Track',
      focus: 'Basic high-school proficiency (4 subjects)',
      assessment: '100% Computer-based multiple choice',
      flexibility: 'High (Write anytime)',
    },
    university: {
      sa_degree: 'Danger (Rarely accepted for degrees)',
      international: 'Good for USA/Canada only',
      exemption: 'USAf no longer grants degree exemption',
    },
    logistics: {
      examCost: 'Low (approx. $80 per subject)',
      providerAvail: 'High (Many independent tutors)',
      examFormat: 'Computer-based (Year-round)',
    },
  },
};
