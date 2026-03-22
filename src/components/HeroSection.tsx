import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = ({ onRunDemo }: { onRunDemo: () => void }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-secondary/30 blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 mb-6">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">Sustainable AI Computing</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
              <span className="text-gradient">Green AI</span>
              <br />
              <span className="text-foreground">Optimizer</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Making AI Models Energy Efficient and Sustainable — reduce compute, cut carbon, and accelerate inference without sacrificing accuracy.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onRunDemo}
                className="group inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-7 py-3.5 rounded-full shadow-glow transition-all duration-300 hover:shadow-card-hover hover:scale-[1.03] active:scale-[0.98]"
              >
                Run Optimization Demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#problem"
                className="inline-flex items-center gap-2 border border-border bg-card font-medium px-7 py-3.5 rounded-full transition-all duration-300 hover:border-primary/30 hover:shadow-card"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <img
              src={heroIllustration}
              alt="AI and sustainability abstract illustration"
              className="w-full max-w-lg animate-float"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
