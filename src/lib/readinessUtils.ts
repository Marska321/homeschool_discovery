import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export interface Question {
    id: string;
    category: string;
    text: string;
    options: { label: string; score: number; detail?: string }[];
}

export const CATEGORIES = [
    { id: "motivation", label: "Motivation & Mindset", icon: "🧠" },
    { id: "time", label: "Time & Availability", icon: "⏰" },
    { id: "environment", label: "Learning Environment", icon: "🏠" },
    { id: "academics", label: "Academic Confidence", icon: "📚" },
    { id: "social", label: "Socialisation Plan", icon: "👫" },
    { id: "legal", label: "Legal & Admin", icon: "📋" },
];

export const QUESTIONS: Question[] = [
    // Motivation
    {
        id: "q1", category: "motivation", text: "Why are you considering homeschooling?", options: [
            { label: "My child is struggling and needs a different approach", score: 3 },
            { label: "We want more flexibility (travel, sport, etc.)", score: 3 },
            { label: "Faith or values alignment", score: 3 },
            { label: "I'm not really sure yet", score: 1 },
        ]
    },
    {
        id: "q2", category: "motivation", text: "How committed are you to managing your child's education long-term?", options: [
            { label: "Very committed — I've been researching for months", score: 3 },
            { label: "Fairly committed — willing to learn as I go", score: 2 },
            { label: "Unsure — just exploring options", score: 1 },
        ]
    },
    // Time
    {
        id: "q3", category: "time", text: "How many hours per day can you (or a supervisor) dedicate to homeschooling?", options: [
            { label: "4+ hours — I'm a stay-at-home parent", score: 3 },
            { label: "2-3 hours — I work part-time or from home", score: 2 },
            { label: "Less than 2 hours — I work full-time", score: 1, detail: "Consider a teacher-led online school like Brainline or Teneo" },
        ]
    },
    {
        id: "q4", category: "time", text: "Are you comfortable with daily lesson planning and record-keeping?", options: [
            { label: "Yes, I enjoy organising and planning", score: 3 },
            { label: "I'd prefer a curriculum that does most of it for me", score: 2, detail: "Providers like Impaq or CambriLearn offer structured plans" },
            { label: "No — I find admin overwhelming", score: 1 },
        ]
    },
    // Environment
    {
        id: "q5", category: "environment", text: "Do you have a dedicated, quiet space for learning at home?", options: [
            { label: "Yes — a proper desk/room set up", score: 3 },
            { label: "We can make a space work (dining table, etc.)", score: 2 },
            { label: "Not really — space is very limited", score: 1 },
        ]
    },
    {
        id: "q6", category: "environment", text: "Does your child have reliable access to a computer and internet?", options: [
            { label: "Yes — dedicated device and fast internet", score: 3 },
            { label: "Shared device but decent internet", score: 2 },
            { label: "Limited or unreliable access", score: 1, detail: "Consider print-based curricula like Clonard or Impaq DIY" },
        ]
    },
    // Academics
    {
        id: "q7", category: "academics", text: "How confident are you teaching or supervising core subjects (Maths, English, Science)?", options: [
            { label: "Very confident — I can teach most subjects myself", score: 3 },
            { label: "Somewhat confident — I'll need help with some subjects", score: 2 },
            { label: "Not confident — I'd need full teacher support", score: 1, detail: "Teacher-led online schools handle all instruction for you" },
        ]
    },
    {
        id: "q8", category: "academics", text: "What grade is your child currently in?", options: [
            { label: "Foundation Phase (Gr R-3) — easier to start here", score: 3 },
            { label: "Intermediate/Senior (Gr 4-9)", score: 2 },
            { label: "FET / Matric (Gr 10-12) — most complex", score: 1, detail: "Use our Pathway Mapper to check curriculum compatibility" },
        ]
    },
    // Social
    {
        id: "q9", category: "social", text: "Do you have a plan for your child's socialisation?", options: [
            { label: "Yes — co-ops, sport clubs, community groups", score: 3 },
            { label: "I know it's important but haven't planned yet", score: 2 },
            { label: "I'm worried about this aspect", score: 1 },
        ]
    },
    // Legal
    {
        id: "q10", category: "legal", text: "Are you aware of the legal requirements for homeschooling in South Africa?", options: [
            { label: "Yes — I know I need to register with the provincial DoE", score: 3 },
            { label: "I've heard about it but don't know the details", score: 2 },
            { label: "No — I had no idea there were legal requirements", score: 1, detail: "You must register with your provincial Department of Education" },
        ]
    },
];

export interface ResultLevel {
    label: string;
    icon: typeof CheckCircle2;
    className: string;
    bg: string;
    message: string;
}

export const getResultLevel = (percentage: number): ResultLevel => {
    if (percentage >= 80) return { label: "You're Ready!", icon: CheckCircle2, className: "text-primary", bg: "bg-primary/10", message: "You have the mindset, resources, and preparation to start homeschooling with confidence. Browse our providers to find the perfect fit for your family." };
    if (percentage >= 55) return { label: "Almost There", icon: AlertTriangle, className: "text-accent-foreground", bg: "bg-accent/10", message: "You're on the right track but have a few areas to address. Review the recommendations below, then explore our tools to fill the gaps." };
    return { label: "More Preparation Needed", icon: XCircle, className: "text-destructive", bg: "bg-destructive/10", message: "Homeschooling is a big decision and you may need more time to prepare. That's completely okay — use our resources to build confidence before jumping in." };
};
