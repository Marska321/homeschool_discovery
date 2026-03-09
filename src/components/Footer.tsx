import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔮</span>
            <span className="font-serif text-lg text-foreground">Kaleidoscope</span>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Helping South African families discover the best homeschooling options.
            Built by parents, for parents.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/faq" className="hover:text-foreground">FAQ</Link>
            <Link to="/community" className="hover:text-foreground">Community</Link>
            <Link to="/submit-provider" className="hover:text-foreground">Submit a Provider</Link>
          </div>
          <div className="mt-4 max-w-2xl rounded-lg border border-border bg-secondary/30 px-4 py-3 text-xs text-muted-foreground leading-relaxed text-left">
            <p className="font-semibold text-foreground mb-1">Disclaimer</p>
            <p>
              Kaleidoscope is an independent information platform and is not affiliated with, endorsed by, or partnered with any curriculum provider, online school, or educational institution listed on this site. All information is provided for general informational purposes only and should not be construed as professional educational, legal, or financial advice.
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            © 2026 Kaleidoscope. Made with ❤️ in South Africa.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
