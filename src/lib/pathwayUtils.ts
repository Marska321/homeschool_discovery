import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export type Destination = "sa_degree" | "international" | "sa_diploma";
export type Field = "stem" | "commerce" | "humanities";
export type Status = "highly_recommended" | "recommended" | "conditional" | "danger";
export type CurriculumId = "ieb" | "caps" | "cambridge" | "ged";

export const CURRICULA: Record<CurriculumId, { name: string }> = {
    ieb: { name: "IEB (Independent Exams Board)" },
    caps: { name: "CAPS (SACAI / DBE)" },
    cambridge: { name: "Cambridge International" },
    ged: { name: "American GED" },
};

export const DESTINATIONS: { id: Destination; label: string; desc: string }[] = [
    { id: "sa_degree", label: "South African University (Degree)", desc: "UCT, Stellies, Tuks, Wits, etc." },
    { id: "international", label: "International University", desc: "UK, USA, Europe, Australia" },
    { id: "sa_diploma", label: "Private College / Diploma", desc: "Boston, Varsity College, Trades" },
];

export const FIELDS: { id: Field; label: string; desc: string }[] = [
    { id: "stem", label: "STEM & Medical", desc: "Engineering, Medicine, IT, Science" },
    { id: "commerce", label: "Commerce", desc: "Accounting, Business, Actuarial" },
    { id: "humanities", label: "Humanities & Arts", desc: "Law, Education, Design, Psychology" },
];

export interface PathwayResult {
    id: CurriculumId;
    status: Status;
    title: string;
    details: string;
    providers: string;
}

export const STATUS_CONFIG: Record<Status, { icon: typeof CheckCircle2; label: string; className: string }> = {
    highly_recommended: { icon: CheckCircle2, label: "Highly Recommended", className: "bg-primary/10 text-primary" },
    recommended: { icon: CheckCircle2, label: "Recommended", className: "bg-accent/10 text-accent-foreground" },
    conditional: { icon: AlertTriangle, label: "Caution / Conditional", className: "bg-accent/20 text-accent-foreground" },
    danger: { icon: XCircle, label: "Not Recommended", className: "bg-destructive/10 text-destructive" },
};

export const CURRICULUM_STYLES: Record<CurriculumId, string> = {
    ieb: "border-primary/30",
    caps: "border-primary/20",
    cambridge: "border-primary/40",
    ged: "border-destructive/20",
};

export function evaluatePathway(destination: Destination, field: Field): PathwayResult[] {
    const results: PathwayResult[] = [];

    if (destination === "sa_degree") {
        results.push({
            id: "ieb", status: "highly_recommended", title: "The Gold Standard for SA Degrees",
            details: field === "stem"
                ? "IEB is highly regarded by top SA universities. You MUST take Core Mathematics and Physical Sciences for STEM degrees."
                : "IEB is highly regarded. Ensure you check specific university APS (Admission Point Score) requirements for your target degree.",
            providers: "Brainline, Teneo",
        });
        results.push({
            id: "caps", status: "recommended", title: "Standard National Pathway",
            details: field === "stem"
                ? "Fully accepted. You MUST take Core Mathematics (not Math Lit) and Physical Sciences. High marks (70%+) are usually needed for competitive degrees."
                : "Fully accepted by all SA universities. Math Literacy is acceptable for most Humanities degrees, but check Law requirements.",
            providers: "Impaq, CambriLearn, Saving Grace",
        });
        results.push({
            id: "cambridge", status: "conditional", title: "Accepted, but requires strict planning",
            details: "You must apply for a USAf Exemption. Generally requires passing at least 4 AS-Levels (including English) and 1 IGCSE. Incorrect subject choices can result in no SA university acceptance.",
            providers: "Wingu, CambriLearn, Teneo",
        });
        results.push({
            id: "ged", status: "danger", title: "High Risk for SA Degrees",
            details: "Universities South Africa (USAf) NO LONGER issues blanket degree exemptions for the GED. It is extremely difficult to get into a traditional SA degree program (like Engineering or Medicine) with a GED.",
            providers: "Various online tutors",
        });
    }

    if (destination === "international") {
        results.push({
            id: "cambridge", status: "highly_recommended", title: "The Global Standard",
            details: "Recognized by almost all universities globally. Top-tier universities (Oxford, Ivy League) will require full A-Levels, not just AS-Levels.",
            providers: "Wingu, CambriLearn, Teneo",
        });
        results.push({
            id: "ieb", status: "recommended", title: "Widely Accepted",
            details: "Accepted by most international universities (UK, Aus, US), though some Ivy League or Oxbridge programs may require additional SATs or A-Level conversions.",
            providers: "Brainline, Teneo",
        });
        results.push({
            id: "ged", status: "conditional", title: "Good for USA/Canada",
            details: "Widely accepted by community colleges and many state universities in the USA. Not ideal for top-tier European or UK universities.",
            providers: "Various online tutors",
        });
        results.push({
            id: "caps", status: "conditional", title: "Accepted with caveats",
            details: "Accepted by many international universities, but students often need to achieve very high marks (80%+) and may need to take additional entrance exams (like the SAT for the US).",
            providers: "Impaq, CambriLearn",
        });
    }

    if (destination === "sa_diploma") {
        results.push({
            id: "caps", status: "highly_recommended", title: "Standard & Straightforward",
            details: "Perfect for Higher Certificate or Diploma studies at private colleges like Varsity College, Boston, or Rosebank College.",
            providers: "Impaq, CambriLearn, Saving Grace",
        });
        results.push({
            id: "ieb", status: "highly_recommended", title: "Overqualified but accepted",
            details: "Easily accepted by all private colleges and technical institutions.",
            providers: "Brainline, Teneo",
        });
        results.push({
            id: "ged", status: "recommended", title: "Viable alternative",
            details: "Many private colleges in SA (like Boston City Campus or Eduvos) accept the GED for Higher Certificate or Diploma tracks, which can later be bridged into a degree.",
            providers: "Various online tutors",
        });
        results.push({
            id: "cambridge", status: "recommended", title: "Accepted but expensive",
            details: "Easily accepted, though IGCSEs alone may be enough for some certificate programs. Generally an expensive route if a diploma is the end goal.",
            providers: "Wingu, CambriLearn",
        });
    }

    return results;
}
