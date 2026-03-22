import { motion } from "framer-motion";
import { Scissors, Binary, Cpu, Layers } from "lucide-react";

const solutions = [
  {
    icon: Scissors,
    title: "Model Pruning",
    description: "Remove redundant parameters and connections to create leaner, faster models without significant accuracy loss.",
    tag: "Structure",
  },
  {
    icon: Binary,
    title: "Quantization",
    description: "Reduce numerical precision from 32-bit to 8-bit or lower, drastically cutting memory and compute requirements.",
    tag: "Precision",
  },
  {
    icon: Cpu,
    title: "Knowledge Distillation",
    description: "Train a smaller student model to replicate a larger teacher model's performance with a fraction of the resources.",
    tag: "Transfer",
  },
  {
    icon: Layers,
    title: "Efficient Architectures",
    description: "Leverage modern efficient architectures designed from the ground up for minimal computational overhead.",
    tag: "Design",
  },
];

const SolutionSection = () => (
  <section id="solution" className="py-24 lg:py-32 bg-gradient-subtle">
    <div className="container mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-3 block">Our Solutions</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Optimization Techniques</h2>
        <p className="text-muted-foreground text-lg">Cutting-edge methods to make AI models smaller, faster, and greener.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {solutions.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative bg-card rounded-2xl p-7 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-accent rounded-bl-xl text-xs font-semibold text-accent-foreground">
              {item.tag}
            </div>
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5 transition-all group-hover:bg-gradient-primary group-hover:shadow-glow">
              <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-base font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
