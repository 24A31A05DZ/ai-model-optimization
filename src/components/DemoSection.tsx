import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, TrendingDown, Cpu, Layers, Percent } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const METRICS = {
  totalParams: 138_000_000,
  before: 138_000_000,
  after: 34_500_000,
  reduction: 75,
};

function useCountUp(target: number, run: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!run) { setValue(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, run, duration]);

  return value;
}

function formatNumber(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

const DemoSection = () => {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const totalParams = useCountUp(METRICS.totalParams, done);
  const before = useCountUp(METRICS.before, done);
  const after = useCountUp(METRICS.after, done);
  const reduction = useCountUp(METRICS.reduction, done);

  const handleRun = () => {
    setRunning(true);
    setDone(false);
    setTimeout(() => {
      setRunning(false);
      setDone(true);
    }, 1800);
  };

  const handleReset = () => {
    setDone(false);
    setRunning(false);
  };

  const chartData = [
    { name: "Before", value: METRICS.before, fill: "hsl(0, 0%, 75%)" },
    { name: "After", value: METRICS.after, fill: "hsl(125, 46%, 33%)" },
  ];

  const metrics = [
    { label: "Total Parameters", value: formatNumber(totalParams), icon: Layers },
    { label: "Before Optimization", value: formatNumber(before), icon: Cpu },
    { label: "After Optimization", value: formatNumber(after), icon: TrendingDown },
    { label: "Reduction", value: `${reduction}%`, icon: Percent },
  ];

  return (
    <section id="demo" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-3 block">Interactive Demo</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See It In Action</h2>
          <p className="text-muted-foreground text-lg">Run a simulated optimization pass and watch the parameter reduction in real-time.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl shadow-card p-8 md:p-12 border border-border/50">
            {/* Button */}
            <div className="flex justify-center mb-10">
              {!done ? (
                <button
                  onClick={handleRun}
                  disabled={running}
                  className="group inline-flex items-center gap-2.5 bg-gradient-primary text-primary-foreground font-semibold px-8 py-4 rounded-full shadow-glow transition-all duration-300 hover:shadow-card-hover hover:scale-[1.03] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {running ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Optimizing…
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Run Optimization
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 border border-border bg-card font-medium px-7 py-3.5 rounded-full transition-all duration-300 hover:border-primary/30 hover:shadow-card"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Demo
                </button>
              )}
            </div>

            {/* Results */}
            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Metric cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {metrics.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="bg-accent/60 rounded-xl p-5 text-center"
                      >
                        <m.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="text-2xl md:text-3xl font-extrabold text-foreground">{m.value}</p>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">{m.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="h-56 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} barCategoryGap="35%">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
                        <XAxis dataKey="name" tick={{ fontSize: 13, fill: "hsl(210, 10%, 46%)" }} />
                        <YAxis tick={{ fontSize: 12, fill: "hsl(210, 10%, 46%)" }} tickFormatter={(v) => formatNumber(v)} />
                        <Tooltip formatter={(v: number) => formatNumber(v)} />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {chartData.map((entry, idx) => (
                            <Cell key={idx} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!done && !running && (
              <p className="text-center text-muted-foreground text-sm">Click the button above to simulate an AI model optimization.</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
