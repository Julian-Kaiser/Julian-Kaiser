// -----------------------------
// STANDARD JS – GLOBAL
// -----------------------------

const root = document.documentElement;
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarOverlayEl = document.getElementById('sidebarOverlay');
const themePoints = document.querySelectorAll(".theme-points span");
const themeMarker = document.getElementById("themeMarker");
const miniName = document.getElementById('miniName');
const openLogin = document.getElementById('openLogin');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const saveUser = document.getElementById('saveUser');
const usernameInput = document.getElementById('username');

// ===== Sidebar Toggle / Overlay =====
if(sidebarToggle && sidebarOverlayEl){
  sidebarToggle.addEventListener('click', ()=>{
    sidebar.classList.add('open');
    sidebarOverlayEl.classList.remove('hidden');
  });
  sidebarOverlayEl.addEventListener('click', ()=>{
    sidebar.classList.remove('open');
    sidebarOverlayEl.classList.add('hidden');
  });
}

// ===== Theme Switcher =====
function setTheme(mode){
  if(mode === "auto"){
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    root.setAttribute("data-theme", mode);
  }
  localStorage.setItem("theme", mode);

  const map = { auto:0, light:1, dark:2 };
  const index = map[mode] ?? 0;
  themeMarker.style.transform = `translateX(${index*100}%)`;
}

themePoints.forEach(span=>{
  span.addEventListener("click", ()=>{
    setTheme(span.dataset.mode);
  });
});

let savedTheme = localStorage.getItem("theme") || "auto";
setTheme(savedTheme);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e=>{
  if(localStorage.getItem("theme")==="auto") setTheme("auto");
});

// ===== Mini Name Login =====
if(openLogin && modal && modalClose && saveUser && usernameInput){
  openLogin.addEventListener('click', ()=>{
    modal.classList.remove('hidden');
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  });

  modalClose.addEventListener('click', ()=>{
    modal.classList.remove('show');
    setTimeout(()=> modal.classList.add('hidden'),250);
    modal.setAttribute('aria-hidden','true');
  });

  saveUser.addEventListener('click', ()=>{
    const name = usernameInput.value.trim();
    if(!name) return alert('Bitte Name eingeben');
    localStorage.setItem('user', name);
    miniName.textContent = name;
    modal.classList.remove('show');
    setTimeout(()=> modal.classList.add('hidden'),250);
  });
}

// ===== Footer Jahr =====
document.addEventListener("DOMContentLoaded", ()=>{
  const yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();
});

// ===== Fade-In Scroll =====
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{ threshold:0.15 });

document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));