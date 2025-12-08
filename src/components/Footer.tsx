import { Scale, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              PriceCompare SA
            </span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link
              to="/about"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
          </nav>

          {/* Made with Love */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-destructive text-destructive" />
            <span>by LC Studio</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            Prices may vary. Data sourced via publicly accessible online product
            listings.
            <br />© {new Date().getFullYear()} PriceCompare SA. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
