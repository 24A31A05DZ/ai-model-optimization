import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="py-16 bg-card border-t border-border/50">
    <div className="container mx-auto px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight">Green AI Optimizer</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Developed as a Design Thinking &amp; Innovation Project
        </p>
        <div className="w-16 h-px bg-border mb-6" />
        <p className="text-xs text-muted-foreground/60">© 2026 Green AI Optimizer. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
