import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="py-12 bg-card border-t border-border">
    <div className="container mx-auto px-6 lg:px-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Leaf className="w-5 h-5 text-primary" />
        <span className="font-bold text-lg">Green AI Optimizer</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Developed as a Design Thinking &amp; Innovation Project
      </p>
    </div>
  </footer>
);

export default Footer;
