import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Provider } from "@/data/providers";

interface CompareContextType {
  selected: Provider[];
  toggle: (provider: Provider) => void;
  isSelected: (id: string) => boolean;
  clear: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
};

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<Provider[]>([]);

  const toggle = useCallback((provider: Provider) => {
    setSelected((prev) => {
      const exists = prev.find((p) => p.id === provider.id);
      if (exists) return prev.filter((p) => p.id !== provider.id);
      if (prev.length >= 3) return prev;
      return [...prev, provider];
    });
  }, []);

  const isSelected = useCallback(
    (id: string) => selected.some((p) => p.id === id),
    [selected]
  );

  const clear = useCallback(() => setSelected([]), []);

  return (
    <CompareContext.Provider value={{ selected, toggle, isSelected, clear }}>
      {children}
    </CompareContext.Provider>
  );
};
