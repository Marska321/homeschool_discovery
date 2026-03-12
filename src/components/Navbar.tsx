import { useState } from "react";
import { Search, Calculator, GraduationCap, ClipboardCheck, ChevronDown, BookText, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🔮</span>
            <span className="font-serif text-xl text-foreground">Kaleidoscope</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            <Link to="/providers" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Providers
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Products <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/true-cost-calculator" className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    True Cost Calculator
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/pathway-mapper" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    University Pathway Mapper
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/readiness-checklist" className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4" />
                    Readiness Checklist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/curriculum-compare" className="flex items-center gap-2">
                    <BookText className="h-4 w-4" />
                    Curriculum Compare
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/#categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Categories
            </Link>
            <Link to="/community" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Community
            </Link>
            <Link to="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Blog
            </Link>
            <Link to="/faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              FAQ
            </Link>
          </div>
        </div>

        {/* Desktop right actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-4 w-4" />
          </Button>
          <div className="hidden gap-2 md:flex">
            <Button variant="outline" size="sm">Log in</Button>
            <Button size="sm">Sign up</Button>
          </div>
          {/* Burger button — mobile only */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t bg-card px-4 pb-6 pt-4 md:hidden animate-fade-in origin-top">
          <div className="flex flex-col gap-1">
            <Link
              to="/providers"
              onClick={closeMobile}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Providers
            </Link>

            {/* Products section */}
            <div className="mt-1">
              <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                Products
              </p>
              <Link
                to="/true-cost-calculator"
                onClick={closeMobile}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Calculator className="h-4 w-4" />
                True Cost Calculator
              </Link>
              <Link
                to="/pathway-mapper"
                onClick={closeMobile}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <GraduationCap className="h-4 w-4" />
                University Pathway Mapper
              </Link>
              <Link
                to="/readiness-checklist"
                onClick={closeMobile}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ClipboardCheck className="h-4 w-4" />
                Readiness Checklist
              </Link>
              <Link
                to="/curriculum-compare"
                onClick={closeMobile}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <BookText className="h-4 w-4" />
                Curriculum Compare
              </Link>
            </div>

            <Link
              to="/#categories"
              onClick={closeMobile}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Categories
            </Link>
            <Link
              to="/community"
              onClick={closeMobile}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Community
            </Link>
            <Link
              to="/blog"
              onClick={closeMobile}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              to="/faq"
              onClick={closeMobile}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              FAQ
            </Link>

            {/* Auth buttons */}
            <div className="mt-4 flex flex-col gap-2 border-t pt-4">
              <Button variant="outline" className="w-full" onClick={closeMobile}>Log in</Button>
              <Button className="w-full" onClick={closeMobile}>Sign up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
