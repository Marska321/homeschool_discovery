import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";

const CompareBar = () => {
  const { selected, toggle, clear } = useCompare();

  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card shadow-lg animate-in slide-in-from-bottom-4">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="shrink-0 text-sm font-medium text-foreground">
            Compare ({selected.length}/3):
          </span>
          {selected.map((p) => (
            <div
              key={p.id}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
            >
              {p.name}
              <button
                onClick={() => toggle(p)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear
          </Button>
          {selected.length >= 2 && (
            <Button size="sm" asChild>
              <Link to="/compare" className="flex items-center gap-1.5">
                Compare <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
