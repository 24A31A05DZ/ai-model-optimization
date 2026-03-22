import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, TrendingDown, Cpu, Layers, Percent, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const METRICS = {
  totalParams: 138_000_000,
  before: 138_000_000,
  after: 34_500_000,
  reduction: 75,
};

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!run) { setValue(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // quartic ease-out
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

const ease = [0.22, 1, 0.36, 1] as const;

const DemoSection = () => {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const totalParams = useCountUp(METRICS.totalParams, done);
  const before = useCountUp(METRICS.before, done);
  const after = useCountUp(METRICS.after, done, 1600);
  const reduction = useCountUp(METRICS.reduction, done);

  const handleRun = () => {
    setRunning(true);
    setDone(false);
    setProgress(0);

    // Smooth progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 40);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setRunning(false);
      setDone(true);
    }, 2200);
  };

  const handleReset = () => {
    setDone(false);
    setRunning(false);
    setProgress(0);
  };

  const chartData = [
    { name: "Before", value: METRICS.before },
    { name: "After", value: METRICS.after },
  ];

  const metrics = [
    { label: "Total Parameters", value: formatNumber(totalParams), icon: Layers, color: "bg-accent" },
    { label: "Before Optimization", value: formatNumber(before), icon: Cpu, color: "bg-muted" },
    { label: "After Optimization", value: formatNumber(after), icon: TrendingDown, color: "bg-accent" },
    { label: "Reduction", value: `${reduction}%`, icon: Percent, color: "bg-primary/8" },
  ];

  return (
    <section id="demo" className="py-28 lg:py-36 bg-background relative">
      {/* Ambient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.02] blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="section-label">Interactive Demo</span>
          <h2 className="section-title">See It In Action</h2>
          <p className="section-desc">Run a simulated optimization pass and watch the parameter reduction in real-time.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl border border-border/50 shadow-premium p-8 md:p-14">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <span className="ml-3 text-xs font-medium text-muted-foreground">optimization_engine.py</span>
            </div>

            {/* Button area */}
            <div className="flex flex-col items-center mb-10">
              {!done ? (
                <>
                  <button
                    onClick={handleRun}
                    disabled={running}
                    className="group inline-flex items-center gap-3 bg-gradient-primary text-primary-foreground font-semibold px-10 py-4.5 rounded-xl shadow-glow transition-all duration-500 hover:shadow-premium hover:scale-[1.03] active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
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

                  {/* Progress bar */}
                  {running && (
                    <motion.div
                      initial={{ opacity: 0, width: "60%" }}
                      animate={{ opacity: 1 }}
                      className="mt-6 w-full max-w-sm"
                    >
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-primary rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 text-center font-medium">{progress}% — Applying pruning & quantization…</p>
                    </motion.div>
                  )}
                </>
              ) : (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 border border-border bg-card font-medium px-7 py-3.5 rounded-xl transition-all duration-400 hover:border-primary/20 hover:shadow-card active:scale-[0.97]"
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
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  {/* Metric cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {metrics.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 16, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.08, duration: 0.5, ease }}
                        className={`${m.color} rounded-2xl p-6 text-center border border-border/30`}
                      >
                        <m.icon className="w-5 h-5 text-primary mx-auto mb-3 opacity-70" />
                        <p className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">{m.value}</p>
                        <p className="text-[11px] text-muted-foreground mt-1.5 font-semibold tracking-wide uppercase">{m.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="bg-muted/30 rounded-2xl p-6 border border-border/30"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold">Parameter Comparison</span>
                    </div>
                    <div className="h-52 md:h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} barCategoryGap="40%">
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 91%)" />
                          <XAxis dataKey="name" tick={{ fontSize: 13, fill: "hsl(220, 10%, 44%)", fontWeight: 500 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 44%)" }} tickFormatter={(v) => formatNumber(v)} axisLine={false} tickLine={false} />
                          <Tooltip
                            formatter={(v: number) => [formatNumber(v), "Parameters"]}
                            contentStyle={{ borderRadius: 12, border: "1px solid hsl(220, 14%, 91%)", boxShadow: "0 4px 12px hsl(0 0% 0% / 0.06)", fontSize: 13 }}
                          />
                          <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                            <Cell fill="hsl(220, 10%, 78%)" />
                            <Cell fill="hsl(140, 45%, 32%)" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {!done && !running && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Click the button above to simulate an AI model optimization.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
