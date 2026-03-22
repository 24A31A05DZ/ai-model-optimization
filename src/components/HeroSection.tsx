import { motion } from "framer-motion";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const ease = [0.22, 1, 0.36, 1];

const HeroSection = ({ onRunDemo }: { onRunDemo: () => void }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px] animate-pulse-soft" style={{ animationDelay: "1.5s" }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: "radial-gradient(circle, hsl(125 46% 33%) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 rounded-full bg-accent/70 border border-primary/10 px-4 py-1.5 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-accent-foreground">Sustainable AI Computing</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.05] mb-7"
            >
              <span className="text-gradient">Green AI</span>
              <br />
              <span className="text-foreground">Optimizer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="text-lg md:text-xl text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              Making AI Models Energy Efficient and Sustainable — reduce compute, cut carbon, and accelerate inference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={onRunDemo}
                className="group inline-flex items-center gap-2.5 bg-gradient-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl shadow-glow transition-all duration-500 ease-out hover:shadow-premium hover:scale-[1.03] active:scale-[0.97]"
              >
                Run Optimization Demo
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a
                href="#problem"
                className="inline-flex items-center gap-2 border border-border bg-card/80 glass font-medium px-7 py-4 rounded-xl transition-all duration-400 hover:border-primary/20 hover:shadow-card hover:bg-card"
              >
                Learn More
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="mt-14 flex items-center gap-6 text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium">Carbon Aware</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <span className="text-xs font-medium">75% Reduction</span>
              <div className="w-px h-4 bg-border" />
              <span className="text-xs font-medium">Real-time Analytics</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-[0.06] scale-110" />
              <img
                src={heroIllustration}
                alt="AI and sustainability abstract illustration"
                className="w-full max-w-md animate-float relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
