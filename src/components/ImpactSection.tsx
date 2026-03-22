import { motion } from "framer-motion";
import { Gauge, Timer, BatteryCharging, Leaf } from "lucide-react";

const impacts = [
  { icon: Gauge, title: "Reduced Computation", description: "Up to 75% fewer FLOPs per inference pass", stat: "75%" },
  { icon: Timer, title: "Faster Performance", description: "3–5× speedup on edge devices", stat: "5×" },
  { icon: BatteryCharging, title: "Lower Energy Usage", description: "Dramatically cut data center power draw", stat: "60%" },
  { icon: Leaf, title: "Supports Green AI", description: "Align AI development with sustainability goals", stat: "∞" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const ImpactSection = () => (
  <section id="impact" className="py-28 lg:py-36 bg-gradient-subtle relative overflow-hidden">
    {/* Decorative */}
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[80px]" />

    <div className="container mx-auto px-6 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="section-label">Impact</span>
        <h2 className="section-title">Why It Matters</h2>
        <p className="section-desc">Tangible benefits for developers, organizations, and the planet.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {impacts.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
            className="card-premium group flex flex-col items-center text-center p-8 lg:p-10"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow transition-transform duration-500 group-hover:scale-110">
              <item.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-3xl font-extrabold text-gradient mb-2">{item.stat}</span>
            <h3 className="text-base font-bold mb-1.5 tracking-tight">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
