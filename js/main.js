/* =========================================================
   Invitación navideña · lógica
   ========================================================= */

/* ---- CONFIGURACIÓN (cambia solo esto si hace falta) ---- */
// Fecha y hora del evento. OJO: el mes empieza en 0 (enero = 0, noviembre = 10).
// Formato: new Date(año, mes, día, hora(24h), minutos)
const EVENT_DATE = new Date(2026, 10, 8, 10, 0, 0);
const MUSIC_SRC = "assets/audio/navidad.mp3";

const $ = (id) => document.getElementById(id);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Luces navideñas de la pantalla inicial ---- */
(function buildLights() {
  const box = $("lights");
  const colors = ["#f0d28a", "#d9a441", "#c23b50", "#f8f6f0"];
  for (let i = 0; i < 12; i++) {
    const bulb = document.createElement("i");
    bulb.style.setProperty("--c", colors[i % colors.length]);
    bulb.style.setProperty("--y", i % 2 ? 14 : 4);      // zigzag sutil
    bulb.style.setProperty("--d", (i * 0.37).toFixed(2) + "s");
    box.appendChild(bulb);
  }
})();

/* ---- Nieve en canvas (ligera: pocas partículas, se pausa si la pestaña no se ve) ---- */
(function snow() {
  if (reduceMotion) return;
  const canvas = $("snow");
  const ctx = canvas.getContext("2d");
  let w, h, flakes = [], running = true;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    flakes = Array.from({ length: innerWidth < 600 ? 45 : 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: (Math.random() * 1.8 + 0.8) * dpr,
      v: (Math.random() * 0.5 + 0.35) * dpr,   // velocidad lenta
      s: Math.random() * Math.PI * 2           // fase del vaivén
    }));
  }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(248,246,240,.85)";
    for (const f of flakes) {
      f.y += f.v; f.s += 0.01;
      f.x += Math.sin(f.s) * 0.4;
      if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });
  addEventListener("resize", resize);
  resize(); frame();
})();

/* ---- Aparición progresiva de textos ---- */
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.2 })
  : null;

function watchReveals() {
  document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
}

/* ---- Abrir invitación ---- */
$("openBtn").addEventListener("click", () => {
  const welcome = $("welcome");
  welcome.classList.add("opening");                 // animación de salida
  setTimeout(() => {
    welcome.hidden = true;
    $("invitation").hidden = false;
    document.body.classList.remove("locked");
    window.scrollTo(0, 0);
    watchReveals();
    startCountdown();
  }, reduceMotion ? 0 : 1100);
});

/* ---- Cuenta regresiva ---- */
function startCountdown() {
  const els = { d: $("d"), h: $("h"), m: $("m"), s: $("s") };
  function tick() {
    const diff = EVENT_DATE - new Date();
    if (diff <= 0) {                                 // el evento ya llegó
      $("timer").hidden = true; $("done").hidden = false;
      return clearInterval(timer);
    }
    const sec = Math.floor(diff / 1000);
    els.d.textContent = Math.floor(sec / 86400);
    els.h.textContent = String(Math.floor((sec % 86400) / 3600)).padStart(2, "0");
    els.m.textContent = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    els.s.textContent = String(sec % 60).padStart(2, "0");
  }
  const timer = setInterval(tick, 1000);
  tick();
}

/* ---- Música (opcional, solo al tocar el botón) ---- */
(function music() {
  const btn = $("musicBtn"), toast = $("toast");
  const audio = new Audio(MUSIC_SRC);
  audio.loop = true; audio.volume = 0.5;

  function notice(msg) {
    toast.textContent = msg; toast.hidden = false;
    setTimeout(() => (toast.hidden = true), 3500);
  }
  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play()
        .then(() => { btn.setAttribute("aria-pressed", "true"); btn.setAttribute("aria-label", "Pausar música"); })
        .catch(() => notice("No se encontró la música. Agrega assets/audio/navidad.mp3"));
    } else {
      audio.pause();
      btn.setAttribute("aria-pressed", "false"); btn.setAttribute("aria-label", "Activar música");
    }
  });
})();
