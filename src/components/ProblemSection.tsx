import { motion } from "framer-motion";
import { Zap, CloudCog, Thermometer } from "lucide-react";

const problems = [
  {
    icon: Zap,
    title: "Massive Energy Consumption",
    description: "Training a single large AI model can consume as much electricity as five cars over their entire lifetimes.",
    stat: "284 tons",
    statLabel: "CO₂ per model",
  },
  {
    icon: CloudCog,
    title: "Growing Carbon Footprint",
    description: "Data centers powering AI workloads emit millions of tons of CO₂ annually, accelerating climate change.",
    stat: "2.5%",
    statLabel: "Global energy use",
  },
  {
    icon: Thermometer,
    title: "Unsustainable Scaling",
    description: "Compute costs and energy demands scale exponentially as models grow — an unsustainable trajectory.",
    stat: "10×",
    statLabel: "Growth every 2 years",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const ProblemSection = () => (
  <section id="problem" className="py-28 lg:py-36 bg-background relative">
    <div className="container mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="section-label">The Problem</span>
        <h2 className="section-title">AI's Hidden Environmental Cost</h2>
        <p className="section-desc">The rapid growth of artificial intelligence comes with a significant — and often overlooked — environmental price.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {problems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease }}
            className="card-premium group p-8 lg:p-10"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/80 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-primary/10 group-hover:shadow-glow">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-3 tracking-tight">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>
            <div className="pt-5 border-t border-border/50">
              <span className="text-2xl font-extrabold text-gradient">{item.stat}</span>
              <span className="text-xs text-muted-foreground ml-2 font-medium">{item.statLabel}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
