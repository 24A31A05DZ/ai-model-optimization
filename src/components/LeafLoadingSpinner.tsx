import { Leaf } from "lucide-react";

/** Leaf-in-circle loading spinner — inspired by Green AI branding */
const LeafLoadingSpinner = ({ className = "w-6 h-6" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
    {/* Outer rotating hexagon */}
    <svg
      viewBox="0 0 40 40"
      className="absolute inset-0 w-full h-full animate-spin"
      style={{ animationDuration: "1.8s" }}
    >
      <polygon
        points="20,2 32,10 32,26 20,34 8,26 8,10"
        stroke="hsl(140, 52%, 55%)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6 4"
        opacity="0.9"
      />
    </svg>
    {/* Inner rotating ring */}
    <svg
      viewBox="0 0 28 28"
      className="absolute top-1/2 left-1/2 w-[70%] h-[70%] -translate-x-1/2 -translate-y-1/2 animate-spin"
      style={{ animationDuration: "1.2s", animationDirection: "reverse" }}
    >
      <circle
        cx="14"
        cy="14"
        r="11"
        stroke="hsl(152, 100%, 80%)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 6"
        opacity="0.85"
      />
    </svg>
    {/* Central leaf icon */}
    <div className="relative z-10">
      <Leaf
        className="w-5 h-5 text-[hsl(140,52%,55%)]"
        strokeWidth={2.5}
        fill="currentColor"
      />
    </div>
  </div>
);

export default LeafLoadingSpinner;
