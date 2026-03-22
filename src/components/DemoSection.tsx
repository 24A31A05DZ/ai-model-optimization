import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  TrendingDown,
  Cpu,
  Layers,
  Percent,
  Activity,
  AlertCircle,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import LeafLoadingSpinner from "@/components/LeafLoadingSpinner";

/** API response shape from backend /optimize */
interface OptimizeResult {
  total_params: number;
  before_pruning: number;
  after_pruning: number;
  percentage_reduction: number;
  estimated_energy_saved: number;
}

type ModelSize = "small" | "medium" | "large";

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!run) {
      setValue(0);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, run, duration]);

  return value;
}

function formatNumber(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

const ease = [0.22, 1, 0.36, 1] as const;

const API_BASE = "/api";

const DemoSection = () => {
  const [optimizationLevel, setOptimizationLevel] = useState([50]);
  const [modelSize, setModelSize] = useState<ModelSize>("medium");
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<OptimizeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalParams = useCountUp(results?.total_params ?? 0, done);
  const before = useCountUp(results?.before_pruning ?? 0, done);
  const after = useCountUp(results?.after_pruning ?? 0, done, 1600);
  const reduction = useCountUp(
    Math.round(results?.percentage_reduction ?? 0),
    done
  );
  const energySaved = useCountUp(
    Math.round(results?.estimated_energy_saved ?? 0),
    done,
    1800
  );

  const handleRun = async () => {
    setRunning(true);
    setDone(false);
    setProgress(0);
    setResults(null);
    setError(null);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 4, 90));
    }, 80);

    try {
      const params = new URLSearchParams({
        optimization_level: String(optimizationLevel[0]),
        model_size: modelSize,
      });
      const res = await fetch(`${API_BASE}/optimize?${params}`);
      clearInterval(progressInterval);
      setProgress(100);

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data: OptimizeResult = await res.json();
      setResults(data);
      setRunning(false);
      setDone(true);
    } catch (err) {
      clearInterval(progressInterval);
      setError(
        err instanceof Error ? err.message : "Failed to optimize"
      );
      setRunning(false);
    }
  };

  const handleReset = () => {
    setDone(false);
    setRunning(false);
    setProgress(0);
    setResults(null);
    setError(null);
  };

  const chartData = results
    ? [
        { name: "Before", value: results.before_pruning },
        { name: "After", value: results.after_pruning },
      ]
    : [];

  const dashboardCards = [
    {
      label: "Total Parameters",
      value: formatNumber(totalParams),
      icon: Layers,
      color: "bg-accent",
    },
    {
      label: "Before Optimization",
      value: formatNumber(before),
      icon: Cpu,
      color: "bg-muted",
    },
    {
      label: "After Optimization",
      value: formatNumber(after),
      icon: TrendingDown,
      color: "bg-accent",
    },
    {
      label: "Percentage Reduction",
      value: `${reduction}%`,
      icon: Percent,
      color: "bg-primary/10",
    },
    {
      label: "Estimated Energy Saved",
      value: `${energySaved}%`,
      icon: Zap,
      color: "bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <section id="demo" className="py-28 lg:py-36 bg-background relative">
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
          <h2 className="section-title">AI Optimization Dashboard</h2>
          <p className="section-desc">
            Adjust parameters, run optimization, and visualize how pruning
            reduces model size and energy consumption.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl border border-border/50 shadow-premium p-8 md:p-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <span className="ml-3 text-xs font-medium text-muted-foreground">
                optimization_engine.py
              </span>
            </div>

            {/* Controls */}
            <div className="grid gap-6 mb-8 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground">
                  Optimization Level
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={optimizationLevel}
                    onValueChange={setOptimizationLevel}
                    max={100}
                    min={0}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-bold text-primary min-w-[3rem] tabular-nums">
                    {optimizationLevel[0]}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Higher = more aggressive pruning
                </p>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground">
                  Model Size
                </Label>
                <Select
                  value={modelSize}
                  onValueChange={(v) => setModelSize(v as ModelSize)}
                  disabled={running}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select model size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Model complexity / parameter count
                </p>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-destructive"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{error}</span>
                <span className="text-xs opacity-80">
                  — Is the backend running on port 8000?
                </span>
              </motion.div>
            )}

            {/* Run / Reset */}
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
                        <LeafLoadingSpinner className="w-7 h-7" />
                        Optimizing…
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Run Optimization
                      </>
                    )}
                  </button>

                  {running && (
                    <motion.div
                      initial={{ opacity: 0 }}
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
                      <p className="text-xs text-muted-foreground mt-2 text-center font-medium">
                        {progress}% — Applying pruning & quantization…
                      </p>
                    </motion.div>
                  )}
                </>
              ) : (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 border border-border bg-card font-medium px-7 py-3.5 rounded-xl transition-all duration-400 hover:border-primary/20 hover:shadow-card active:scale-[0.97]"
                >
                  <RotateCcw className="w-4 h-4" />
                  Run Again
                </button>
              )}
            </div>

            {/* Results Dashboard */}
            <AnimatePresence>
              {done && results && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Results
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      {dashboardCards.map((m, i) => (
                        <motion.div
                          key={m.label}
                          initial={{ opacity: 0, y: 16, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            delay: i * 0.06,
                            duration: 0.5,
                            ease,
                          }}
                          className={`${m.color} rounded-2xl p-5 text-center border border-border/30 transition-shadow hover:shadow-card`}
                        >
                          <m.icon className="w-5 h-5 text-primary mx-auto mb-2 opacity-70" />
                          <p className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                            {m.value}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-1 font-semibold tracking-wide uppercase">
                            {m.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Energy Saved Highlight */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 py-4 px-6"
                  >
                    <Zap className="w-6 h-6 text-emerald-600" />
                    <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                      Estimated Energy Saved: {energySaved}%
                    </span>
                  </motion.div>

                  {/* Chart */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="bg-muted/30 rounded-2xl p-6 border border-border/30"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold">
                        Parameter Comparison
                      </span>
                    </div>
                    <div className="h-52 md:h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          barCategoryGap="40%"
                          margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="hsl(220, 14%, 91%)"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="name"
                            tick={{
                              fontSize: 13,
                              fill: "hsl(220, 10%, 44%)",
                              fontWeight: 500,
                            }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{
                              fontSize: 11,
                              fill: "hsl(220, 10%, 44%)",
                            }}
                            tickFormatter={(v) => formatNumber(v)}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip
                            formatter={(v: number) => [
                              formatNumber(v),
                              "Parameters",
                            ]}
                            contentStyle={{
                              borderRadius: 12,
                              border: "1px solid hsl(220, 14%, 91%)",
                              boxShadow:
                                "0 4px 12px hsl(0 0% 0% / 0.06)",
                              fontSize: 13,
                            }}
                          />
                          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            <Cell fill="hsl(220, 14%, 85%)" />
                            <Cell fill="hsl(140, 52%, 55%)" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {!done && !running && (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  Choose optimization level and model size, then click Run
                  Optimization.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
