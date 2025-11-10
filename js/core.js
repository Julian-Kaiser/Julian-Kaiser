const body = document.body;
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuToggle = document.getElementById("menuToggle");
const themeButtons = document.querySelectorAll("[data-theme]");

// ===== Sidebar Toggle =====
menuToggle?.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
});
overlay?.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
});

// ===== Theme Handling =====
function applyTheme(mode) {
  if (mode === "auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    body.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    body.setAttribute("data-theme", mode);
  }
  localStorage.setItem("theme", mode);
}

themeButtons.forEach(btn => {
  btn.addEventListener("click", () => applyTheme(btn.dataset.theme));
});

const saved = localStorage.getItem("theme") || "auto";
applyTheme(saved);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
  if (localStorage.getItem("theme") === "auto") applyTheme("auto");
});

// ===== Fade-In Observer =====
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("visible"));
}, { threshold: 0.2 });
document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));

// ===== Jahr =====
document.getElementById("year").textContent = new Date().getFullYear();