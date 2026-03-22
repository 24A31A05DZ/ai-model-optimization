(function () {
  "use strict";

  // ——— Nav toggle (mobile) ———
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle?.addEventListener("click", function () {
    navLinks?.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks?.classList.remove("open");
    });
  });

  // ——— Navbar scroll effect ———
  const navbar = document.getElementById("navbar");
  function onScroll() {
    if (window.scrollY > 20) navbar?.classList.add("scrolled");
    else navbar?.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ——— Tabs (Solution section) ———
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-tab");
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tabContents.forEach(function (c) { c.classList.remove("active"); });
      this.classList.add("active");
      const content = document.getElementById(target);
      if (content) content.classList.add("active");
    });
  });

  // ——— Reveal on scroll ———
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  // ——— Optimization demo ———
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
})();
