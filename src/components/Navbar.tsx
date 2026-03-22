import { Leaf } from "lucide-react";

const links = [
  { label: "Problem", href: "#problem" },
  { label: "Solutions", href: "#solution" },
  { label: "Demo", href: "#demo" },
  { label: "Impact", href: "#impact" },
];

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
    <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
      <a href="#" className="flex items-center gap-2 font-bold text-lg">
        <Leaf className="w-5 h-5 text-primary" />
        Green AI Optimizer
      </a>
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {l.label}
          </a>
        ))}
      </div>
    </div>
  </nav>
);

export default Navbar;
