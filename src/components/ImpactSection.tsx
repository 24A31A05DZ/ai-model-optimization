import { motion } from "framer-motion";
import { Gauge, Timer, BatteryCharging, Leaf } from "lucide-react";

const impacts = [
  { icon: Gauge, title: "Reduced Computation", description: "Up to 75% fewer FLOPs per inference pass" },
  { icon: Timer, title: "Faster Performance", description: "3–5× speedup on edge devices" },
  { icon: BatteryCharging, title: "Lower Energy Usage", description: "Dramatically cut data center power draw" },
  { icon: Leaf, title: "Supports Green AI", description: "Align AI development with sustainability goals" },
];

const ImpactSection = () => (
  <section id="impact" className="py-24 lg:py-32 bg-gradient-subtle">
    <div className="container mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-3 block">Impact</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why It Matters</h2>
        <p className="text-muted-foreground text-lg">Tangible benefits for developers, organizations, and the planet.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {impacts.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center text-center bg-card rounded-2xl p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5 shadow-glow">
              <item.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-base font-bold mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
