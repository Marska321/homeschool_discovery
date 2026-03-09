import {
    CheckCircle2, AlertTriangle, Globe, MapPin,
    Brain, FileText, Landmark, GraduationCap, Coins,
    Plus, X, ChevronDown,
} from "lucide-react";
import { type Curriculum } from "@/data/curricula";
import { Separator } from "@/components/ui/separator";

/* ── Status badge formatter ── */
export const StatusText = ({ text }: { text: string }) => {
    const content = text.toLowerCase();

    if (content.includes("danger") || content.includes("rarely")) {
        return (
            <span className="inline-flex items-center text-destructive font-semibold bg-destructive/10 px-2 py-1 rounded border border-destructive/20 text-xs">
                <AlertTriangle className="w-3.5 h-3.5 mr-1 shrink-0" /> {text}
            </span>
        );
    }
    if (content.includes("conditional") || content.includes("requires")) {
        return (
            <span className="inline-flex items-center text-accent-foreground font-semibold bg-accent/20 px-2 py-1 rounded border border-accent/30 text-xs">
                <AlertTriangle className="w-3.5 h-3.5 mr-1 shrink-0" /> {text}
            </span>
        );
    }
    if (content.includes("guaranteed") || content.includes("excellent") || content.includes("highly regarded")) {
        return (
            <span className="inline-flex items-center text-primary font-semibold bg-primary/10 px-2 py-1 rounded border border-primary/20 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 shrink-0" /> {text}
            </span>
        );
    }
    if (content.includes("very high") && !content.includes("cost")) {
        return <span className="text-primary font-bold text-sm">{text}</span>;
    }
    if (content.includes("low") || content.includes("standard")) {
        return <span className="text-muted-foreground font-medium text-sm">{text}</span>;
    }
    return <span className="text-foreground font-medium text-sm">{text}</span>;
};

/* ── Desktop compare row ── */
export const CompareRow = ({
    label,
    icon,
    section,
    fieldKey,
    curricula,
    emptySlots,
}: {
    label: string;
    icon: React.ReactNode;
    section: "academics" | "university" | "logistics";
    fieldKey: string;
    curricula: Curriculum[];
    emptySlots: number;
}) => (
    <div
        className="grid border-b border-border hover:bg-secondary/30 transition-colors"
        style={{ gridTemplateColumns: `220px repeat(3, 1fr)` }}
    >
        <div className="py-4 px-4 flex items-center text-sm font-semibold text-foreground border-r border-border bg-card">
            {icon} <span className="ml-2">{label}</span>
        </div>
        {curricula.map((c) => (
            <div key={`${c.id}-${fieldKey}`} className="py-4 px-4 flex items-center justify-center text-center border-r border-border last:border-r-0">
                <StatusText text={(c[section] as unknown as Record<string, string>)[fieldKey]} />
            </div>
        ))}
        {Array.from({ length: emptySlots }).map((_, i) => (
            <div key={`empty-${i}`} className="py-4 px-4 border-r border-border last:border-r-0 bg-secondary/20" />
        ))}
    </div>
);

/* ── Desktop section header ── */
export const SectionHeader = ({ title }: { title: string }) => (
    <div className="bg-secondary/40 px-4 py-3 border-b border-border">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">{title}</h3>
    </div>
);

/* ── Mobile: info row inside a card ── */
export const MobileInfoRow = ({ label, icon, value }: { label: string; icon: React.ReactNode; value: string }) => (
    <div className="flex items-start gap-3 py-2.5">
        <div className="shrink-0 mt-0.5">{icon}</div>
        <div className="min-w-0">
            <span className="block text-xs font-medium text-muted-foreground mb-1">{label}</span>
            <StatusText text={value} />
        </div>
    </div>
);

/* ── Mobile: stacked curriculum card ── */
export const MobileCurriculumCard = ({
    curriculum,
    canRemove,
    onRemove,
}: {
    curriculum: Curriculum;
    canRemove: boolean;
    onRemove: () => void;
}) => (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="p-5 flex items-start gap-4 border-b border-border bg-secondary/10">
            <div className={`w-12 h-12 rounded-2xl ${curriculum.logoColor} text-primary-foreground flex items-center justify-center font-bold text-xl shadow-md shrink-0`}>
                {curriculum.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
                <h2 className="font-bold text-foreground text-lg leading-tight">{curriculum.name}</h2>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">{curriculum.origin}</div>
                <p className="text-xs text-muted-foreground mt-1">{curriculum.tagline}</p>
            </div>
            {canRemove && (
                <button onClick={onRemove} className="shrink-0 text-muted-foreground hover:text-destructive transition-colors p-1">
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>

        {/* Sections */}
        <div className="p-5 space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">University Acceptance</h4>
            <MobileInfoRow label="SA Degree Acceptance" icon={<MapPin className="w-4 h-4 text-primary" />} value={curriculum.university.sa_degree} />
            <MobileInfoRow label="Matric Exemption (USAf)" icon={<Landmark className="w-4 h-4 text-primary" />} value={curriculum.university.exemption} />
            <MobileInfoRow label="International Study" icon={<Globe className="w-4 h-4 text-primary" />} value={curriculum.university.international} />

            <Separator className="my-3" />

            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Academic Style</h4>
            <MobileInfoRow label="Academic Rigour" icon={<Brain className="w-4 h-4 text-accent" />} value={curriculum.academics.rigour} />
            <MobileInfoRow label="Primary Focus" icon={<CheckCircle2 className="w-4 h-4 text-accent" />} value={curriculum.academics.focus} />
            <MobileInfoRow label="Subject Flexibility" icon={<Plus className="w-4 h-4 text-accent" />} value={curriculum.academics.flexibility} />
            <MobileInfoRow label="Assessment Format" icon={<FileText className="w-4 h-4 text-accent" />} value={curriculum.academics.assessment} />

            <Separator className="my-3" />

            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Logistics & Cost</h4>
            <MobileInfoRow label="Final Exam Fees" icon={<Coins className="w-4 h-4 text-[hsl(var(--terracotta))]" />} value={curriculum.logistics.examCost} />
            <MobileInfoRow label="Provider Availability" icon={<GraduationCap className="w-4 h-4 text-[hsl(var(--terracotta))]" />} value={curriculum.logistics.providerAvail} />
            <MobileInfoRow label="Exam Writing Windows" icon={<FileText className="w-4 h-4 text-[hsl(var(--terracotta))]" />} value={curriculum.logistics.examFormat} />
        </div>
    </div>
);

/* ── Mobile selector ── */
export const MobileSelector = ({
    selectedIds,
    isDropdownOpen,
    setIsDropdownOpen,
    availableOptions,
    addCurriculum,
}: {
    selectedIds: string[];
    isDropdownOpen: boolean;
    setIsDropdownOpen: (v: boolean) => void;
    availableOptions: Curriculum[];
    addCurriculum: (id: string) => void;
}) => (
    <div className="relative">
        <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={selectedIds.length >= 3}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${selectedIds.length >= 3
                ? "bg-muted border-border text-muted-foreground cursor-not-allowed"
                : "bg-card border-primary/30 text-primary hover:bg-primary/5"
                }`}
        >
            <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {selectedIds.length >= 3 ? "Maximum Selected (3/3)" : `Add Pathway... (${selectedIds.length}/3)`}
            </span>
            <ChevronDown className="w-4 h-4" />
        </button>
        {isDropdownOpen && selectedIds.length < 3 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-30">
                {availableOptions.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => addCurriculum(option.id)}
                        className="w-full text-left px-4 py-3 hover:bg-secondary border-b border-border last:border-0 text-sm font-medium text-foreground flex items-center"
                    >
                        <div className={`w-2 h-2 rounded-full mr-2 ${option.logoColor}`} />
                        {option.name}
                    </button>
                ))}
            </div>
        )}
    </div>
);
