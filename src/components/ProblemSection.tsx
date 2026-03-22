import { motion } from "framer-motion";
import { Zap, CloudCog, Thermometer } from "lucide-react";

const problems = [
  {
    icon: Zap,
    title: "Massive Energy Consumption",
    description: "Training a single large AI model can consume as much electricity as five cars over their lifetimes.",
  },
  {
    icon: CloudCog,
    title: "Growing Carbon Footprint",
    description: "Data centers powering AI workloads emit millions of tons of CO₂ annually, contributing to climate change.",
  },
  {
    icon: Thermometer,
    title: "Unsustainable Scaling",
    description: "As AI models grow larger, compute costs and energy demands scale exponentially — an unsustainable trajectory.",
  },
];

const ProblemSection = () => (
  <section id="problem" className="py-24 lg:py-32 bg-background">
    <div className="container mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-3 block">The Problem</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">AI's Hidden Environmental Cost</h2>
        <p className="text-muted-foreground text-lg">The rapid growth of artificial intelligence comes with a significant — and often overlooked — environmental price.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {problems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="group bg-card rounded-2xl p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 transition-colors group-hover:bg-primary/10">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
