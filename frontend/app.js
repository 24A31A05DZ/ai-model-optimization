(function () {
  const runBtn = document.getElementById("run-btn");
  const resetBtn = document.getElementById("reset-btn");
  const optimizationSlider = document.getElementById("optimization-level");
  const optimizationValue = document.getElementById("optimization-value");
  const modelSizeSelect = document.getElementById("model-size");
  const errorMsg = document.getElementById("error-msg");
  const progressWrap = document.getElementById("progress-wrap");
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");
  const resultsEl = document.getElementById("results");
  const placeholderEl = document.getElementById("placeholder");
  const btnText = runBtn?.querySelector(".btn-text");
  const spinner = runBtn?.querySelector(".spinner");

  function formatNumber(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
    return String(n);
  }

  function animateValue(el, target, suffix = "", duration = 1200) {
    const start = parseInt(el.textContent.replace(/\D/g, "")) || 0;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(start + (target - start) * eased);
      el.textContent = suffix ? current + suffix : formatNumber(current);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  optimizationSlider?.addEventListener("input", function () {
    optimizationValue.textContent = this.value + "%";
  });

  runBtn?.addEventListener("click", async function () {
    const level = parseInt(optimizationSlider?.value || 50);
    const size = modelSizeSelect?.value || "medium";

    runBtn.disabled = true;
    errorMsg.classList.add("hidden");
    resultsEl.classList.add("hidden");
    placeholderEl.classList.add("hidden");
    resetBtn.classList.add("hidden");
    progressWrap.classList.remove("hidden");
    spinner?.classList.remove("hidden");
    btnText.textContent = "Optimizing…";

    let progress = 0;
    const progressInterval = setInterval(function () {
      progress = Math.min(progress + 4, 90);
      progressFill.style.width = progress + "%";
      progressText.textContent = progress + "% — Applying pruning & quantization…";
    }, 80);

    try {
      const res = await fetch("/optimize?optimization_level=" + level + "&model_size=" + size);
      clearInterval(progressInterval);
      progressFill.style.width = "100%";
      progressText.textContent = "100% — Complete";

      if (!res.ok) throw new Error("API error: " + res.status);

      const data = await res.json();

      document.getElementById("total-params").textContent = formatNumber(data.total_params);
      document.getElementById("before").textContent = formatNumber(data.before_pruning);
      document.getElementById("after").textContent = formatNumber(data.after_pruning);
      document.getElementById("reduction").textContent = Math.round(data.percentage_reduction) + "%";
      document.getElementById("energy-saved").textContent = Math.round(data.estimated_energy_saved) + "%";
      document.getElementById("energy-banner-value").textContent = Math.round(data.estimated_energy_saved) + "%";

      const maxVal = Math.max(data.before_pruning, data.after_pruning, 1);
      document.getElementById("bar-before").style.height = (data.before_pruning / maxVal) * 150 + "px";
      document.getElementById("bar-after").style.height = (data.after_pruning / maxVal) * 150 + "px";

      progressWrap.classList.add("hidden");
      spinner?.classList.add("hidden");
      btnText.textContent = "Run Optimization";
      runBtn.disabled = false;
      runBtn.classList.add("hidden");
      resetBtn.classList.remove("hidden");
      resultsEl.classList.remove("hidden");
    } catch (err) {
      clearInterval(progressInterval);
      progressWrap.classList.add("hidden");
      spinner?.classList.add("hidden");
      btnText.textContent = "Run Optimization";
      runBtn.disabled = false;
      errorMsg.textContent = (err.message || "Failed to optimize") + " — Check if the server is running.";
      errorMsg.classList.remove("hidden");
      placeholderEl.classList.remove("hidden");
    }
  });

  resetBtn?.addEventListener("click", function () {
    resultsEl.classList.add("hidden");
    resetBtn.classList.add("hidden");
    runBtn.classList.remove("hidden");
    placeholderEl.classList.remove("hidden");
  });

  runBtn.disabled = false;
})();
