import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CompareProvider } from "@/contexts/CompareContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/Layout";
import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

// Eagerly load the homepage for fast first paint
import Index from "./pages/Index";

// Lazy-load all other pages for code splitting
const ProvidersPage = lazy(() => import("./pages/ProvidersPage"));
const TrueCostCalculator = lazy(() => import("./pages/TrueCostCalculator"));
const PathwayMapper = lazy(() => import("./pages/PathwayMapper"));
const ReadinessChecklist = lazy(() => import("./pages/ReadinessChecklist"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const ProviderDetail = lazy(() => import("./pages/ProviderDetail"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const CurriculumCompare = lazy(() => import("./pages/CurriculumCompare"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const SubmitProvider = lazy(() => import("./pages/SubmitProvider"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CompareProvider>
        <Toaster />
        <Sonner />
        <Analytics />
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/providers" element={<ProvidersPage />} />
                  <Route path="/true-cost-calculator" element={<TrueCostCalculator />} />
                  <Route path="/pathway-mapper" element={<PathwayMapper />} />
                  <Route path="/readiness-checklist" element={<ReadinessChecklist />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/provider/:id" element={<ProviderDetail />} />
                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/curriculum-compare" element={<CurriculumCompare />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/submit-provider" element={<SubmitProvider />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </CompareProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
