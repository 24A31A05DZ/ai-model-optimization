import { motion } from "framer-motion";
import { Scissors, Binary, Cpu, Layers } from "lucide-react";

const solutions = [
  {
    icon: Scissors,
    title: "Model Pruning",
    description: "Remove redundant parameters and connections to create leaner, faster models.",
    tag: "Structure",
    metric: "40–90%",
    metricLabel: "params removed",
  },
  {
    icon: Binary,
    title: "Quantization",
    description: "Reduce numerical precision from 32-bit to 8-bit, cutting memory and compute.",
    tag: "Precision",
    metric: "4×",
    metricLabel: "less memory",
  },
  {
    icon: Cpu,
    title: "Knowledge Distillation",
    description: "Train a compact student model to replicate a larger teacher's performance.",
    tag: "Transfer",
    metric: "10×",
    metricLabel: "smaller models",
  },
  {
    icon: Layers,
    title: "Efficient Architectures",
    description: "Leverage architectures designed from the ground up for minimal overhead.",
    tag: "Design",
    metric: "5×",
    metricLabel: "faster inference",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const SolutionSection = () => (
  <section id="solution" className="py-28 lg:py-36 bg-gradient-subtle relative">
    <div className="container mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="section-label">Our Solutions</span>
        <h2 className="section-title">Optimization Techniques</h2>
        <p className="section-desc">Cutting-edge methods to make AI models smaller, faster, and greener.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {solutions.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
            className="card-premium group relative p-7 lg:p-8 overflow-hidden"
          >
            {/* Tag */}
            <div className="absolute top-0 right-0 px-3 py-1.5 bg-accent/80 rounded-bl-xl text-[10px] font-bold tracking-wider uppercase text-accent-foreground">
              {item.tag}
            </div>

            <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-gradient-primary group-hover:shadow-glow">
              <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
            </div>
            <h3 className="text-base font-bold mb-2 tracking-tight">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{item.description}</p>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-gradient">{item.metric}</span>
              <span className="text-[11px] text-muted-foreground font-medium">{item.metricLabel}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
