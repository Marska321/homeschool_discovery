import { useState } from "react";
import {
  CheckCircle2, Globe, MapPin,
  Brain, FileText, Landmark, GraduationCap, Coins,
  Plus, X, ChevronDown, BookText,
} from "lucide-react";
import { CURRICULA } from "@/data/curricula";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  CompareRow,
  SectionHeader,
  MobileCurriculumCard,
  MobileSelector,
} from "@/components/curriculum-compare/CurriculumCompareWidgets";

/* ── Main page ── */
const CurriculumCompare = () => {
  const [selectedIds, setSelectedIds] = useState(["caps", "ieb", "cambridge"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const availableOptions = Object.values(CURRICULA).filter((p) => !selectedIds.includes(p.id));
  const selectedCurricula = selectedIds.map((id) => CURRICULA[id]);
  const emptySlots = 3 - selectedCurricula.length;

  const addCurriculum = (id: string) => {
    if (selectedIds.length < 3) setSelectedIds([...selectedIds, id]);
    setIsDropdownOpen(false);
  };

  const removeCurriculum = (idToRemove: string) => {
    setSelectedIds(selectedIds.filter((id) => id !== idToRemove));
  };

  useDocumentTitle("Curriculum Compare");

  return (
    <>
      <div className="container mx-auto px-4 py-10 max-w-6xl space-y-8">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            <BookText className="w-4 h-4" />
            <span>Pathway Matchmaker</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground">
            Curriculum{" "}
            <span className="text-primary">Head-to-Head</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-base md:text-lg">
            Before choosing a school, you must choose a path. Compare SA National standards against International boards and fast-track alternatives.
          </p>
        </header>

        {/* ── Mobile: selector + stacked cards ── */}
        <div className="md:hidden space-y-4">
          <MobileSelector
            selectedIds={selectedIds}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            availableOptions={availableOptions}
            addCurriculum={addCurriculum}
          />
          {selectedCurricula.map((c) => (
            <MobileCurriculumCard
              key={c.id}
              curriculum={c}
              canRemove={selectedIds.length > 1}
              onRemove={() => removeCurriculum(c.id)}
            />
          ))}
        </div>

        {/* ── Desktop: grid table ── */}
        <div className="hidden md:block bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
          {/* Sticky header */}
          <div
            className="grid bg-card border-b-2 border-border sticky top-16 z-20 shadow-sm"
            style={{ gridTemplateColumns: "220px repeat(3, 1fr)" }}
          >
            {/* Selector */}
            <div className="p-6 flex flex-col justify-center border-r border-border bg-secondary/20">
              <h3 className="font-bold text-foreground mb-2">Selected Curricula</h3>
              <p className="text-xs text-muted-foreground mb-4">Choose up to 3 pathways to compare.</p>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={selectedIds.length >= 3}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${selectedIds.length >= 3
                    ? "bg-muted border-border text-muted-foreground cursor-not-allowed"
                    : "bg-card border-primary/30 text-primary hover:bg-primary/5"
                    }`}
                >
                  <span>{selectedIds.length >= 3 ? "Maximum Selected" : "Add Pathway..."}</span>
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
            </div>

            {/* Selected curricula headers */}
            {selectedCurricula.map((c) => (
              <div key={c.id} className="p-6 relative border-r border-border last:border-r-0 flex flex-col items-center text-center">
                {selectedIds.length > 1 && (
                  <button
                    onClick={() => removeCurriculum(c.id)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <div className={`w-12 h-12 rounded-2xl ${c.logoColor} text-primary-foreground flex items-center justify-center font-bold text-xl mb-3 shadow-md`}>
                  {c.name.substring(0, 2).toUpperCase()}
                </div>
                <h2 className="font-bold text-foreground text-lg leading-tight">{c.name}</h2>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1 mb-2">{c.origin}</div>
                <p className="text-xs text-muted-foreground line-clamp-2">{c.tagline}</p>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <div key={`empty-h-${i}`} className="p-6 border-r border-border last:border-r-0 bg-secondary/20 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground/30 mb-3">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Empty Slot</span>
              </div>
            ))}
          </div>

          {/* University Acceptance */}
          <SectionHeader title="University Acceptance" />
          <CompareRow label="SA Degree Acceptance" icon={<MapPin className="w-4 h-4 text-primary" />} section="university" fieldKey="sa_degree" curricula={selectedCurricula} emptySlots={emptySlots} />
          <CompareRow label="Matric Exemption (USAf)" icon={<Landmark className="w-4 h-4 text-primary" />} section="university" fieldKey="exemption" curricula={selectedCurricula} emptySlots={emptySlots} />
          <CompareRow label="International Study" icon={<Globe className="w-4 h-4 text-primary" />} section="university" fieldKey="international" curricula={selectedCurricula} emptySlots={emptySlots} />

          {/* Academic Style */}
          <SectionHeader title="Academic Style" />
          <CompareRow label="Academic Rigour" icon={<Brain className="w-4 h-4 text-accent" />} section="academics" fieldKey="rigour" curricula={selectedCurricula} emptySlots={emptySlots} />
          <CompareRow label="Primary Focus" icon={<CheckCircle2 className="w-4 h-4 text-accent" />} section="academics" fieldKey="focus" curricula={selectedCurricula} emptySlots={emptySlots} />
          <CompareRow label="Subject Flexibility" icon={<Plus className="w-4 h-4 text-accent" />} section="academics" fieldKey="flexibility" curricula={selectedCurricula} emptySlots={emptySlots} />
          <CompareRow label="Assessment Format" icon={<FileText className="w-4 h-4 text-accent" />} section="academics" fieldKey="assessment" curricula={selectedCurricula} emptySlots={emptySlots} />

          {/* Logistics & Cost */}
          <SectionHeader title="Logistics & Cost" />
          <CompareRow label="Final Exam Fees" icon={<Coins className="w-4 h-4 text-[hsl(var(--terracotta))]" />} section="logistics" fieldKey="examCost" curricula={selectedCurricula} emptySlots={emptySlots} />
          <CompareRow label="Provider Availability" icon={<GraduationCap className="w-4 h-4 text-[hsl(var(--terracotta))]" />} section="logistics" fieldKey="providerAvail" curricula={selectedCurricula} emptySlots={emptySlots} />
          <CompareRow label="Exam Writing Windows" icon={<FileText className="w-4 h-4 text-[hsl(var(--terracotta))]" />} section="logistics" fieldKey="examFormat" curricula={selectedCurricula} emptySlots={emptySlots} />
        </div>

        <p className="text-center text-xs text-muted-foreground">
          *Note: USAf (Universities South Africa) regulations change frequently. Always consult with a curriculum provider regarding exact subject combinations required for university exemption.
        </p>
      </div>
    </>
  );
};

export default CurriculumCompare;
