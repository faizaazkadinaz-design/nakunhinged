/* ===========================================================
   APP.JS — Full Gift Website Logic
   =========================================================== */

// ==========================================
// 🎯 CONFIG — PERSONALIZE EVERYTHING HERE
// ==========================================
const CONFIG = {
  password: "noor16",          // ← secret password
  friendName: "sis noor",        // ← her name
  yourName: "faiza",           // ← your name
  hintText: "your name & your age this year (2026)",

  // Song info (shows in player + vinyl)
  song: {
    title: "XXL",
    artist: "LANY",
  },

  // Face photos — add 2-3 (or more!)
  faces: [
    { src: "assets/face1.png", label: "Classic" },
    { src: "assets/face2.png", label: "Silly" },
    { src: "assets/face3.png", label: "Iconic" },
  ],

  // Wall of Fame awards — one per face photo
  awards: [
    {
      face: "assets/face1.png",
      title: "world's weirdest human",
      reason: "for consistently being weird without even trying",
      ribbon: "Certified",
      trophy: "🏆",
    },
    {
      face: "assets/face2.png",
      title: "ceo of unwanted behavior",
      reason: "you are actually tweaking. like for real seek help immediately",
      ribbon: "certified menace to society",
      trophy: "👹",
    },
    {
      face: "assets/face3.png",
      title: "professional weirdo enthusiast",
      reason: "if being a freak was a job, you'd be the richest person alive. it's actually impressive.",
      ribbon: "unmatched freak energy",
      trophy: "💀",
    },
  ],

  // Compliments
  compliments: [
    "you're actually a glitch in the matrix 🌀",
    "ur brain needs to be studied by scientists 🧪",
    "it's impressive how you're the weirdest in the room 🏆",
    "you're a professional at making things awkward 🎤",
    "your vibes are genuinely unhinged. seek help 🚩",
    "you have the energy of a stray cat at 3am 🐈",
    "if being a freak was a sport, you'd have gold 🥇",
    "you're the reason why instruction manuals exist 📖",
    "but thanks for being my friend anyway 🤝",
    "oo, your sense of music is good though 🎧",
    "btw congrats, you get older 🎂",
    "death is coming for you faster now, stay strong ⚰️",
    "always do your best, i guess ✊",
    "yeaay 🎈",
  ],

  // ─── PHOTOBOOTH SETTINGS ───
  // (this whole block was missing — that's why it crashed)
  photobooth: {
    defaultWatermark: "noor's photobooth ✨",
    countdownSeconds: 3,

    themes: {
      retro: {
        name: "Retro Film",
        bgColor: "#F4EBD0",
        borderColor: "#B68D40",
        textColor: "#122620",
        fontFamily: "'Press Start 2P', cursive",
        borderWidth: 15,
        photoRadius: 2,
        padding: 20,
        photoPadding: 8,
        shadowColor: "rgba(184,134,11,0.3)",
        grain: true,
        dateStamp: true,
      },
      modern: {
        name: "Modern",
        bgColor: "#ffffff",
        borderColor: "#E2E8F0",
        textColor: "#1E293B",
        fontFamily: "'Space Grotesk', sans-serif",
        borderWidth: 0,
        photoRadius: 12,
        padding: 24,
        photoPadding: 6,
        shadowColor: "rgba(0,0,0,0.12)",
        grain: false,
        dateStamp: false,
      },
      cute: {
        name: "Cute",
        bgColor: "#FFF5F7",
        borderColor: "#f9a8d4",
        textColor: "#9D174D",
        fontFamily: "'Quicksand', sans-serif",
        borderWidth: 6,
        photoRadius: 24,
        padding: 22,
        photoPadding: 8,
        shadowColor: "rgba(244,114,182,0.2)",
        grain: false,
        dateStamp: false,
      },
    },

    filters: {
      none:    { label: "None",    css: "none" },
      bw:      { label: "B&W",    css: "grayscale(100%) contrast(1.1)" },
      sepia:   { label: "Sepia",  css: "sepia(80%) contrast(1.05) brightness(1.05)" },
      vintage: { label: "Vintage", css: "sepia(30%) contrast(1.1) brightness(0.95) saturate(1.3)" },
      cool:    { label: "Cool",   css: "saturate(0.8) brightness(1.05) hue-rotate(15deg) contrast(1.1)" },
      pink:    { label: "Pink",   css: "saturate(1.4) brightness(1.05) hue-rotate(-10deg) contrast(1.05)" },
    },

    bgColors: [
      "#0b0e1a", "#fef9c3", "#fce7f3", "#dbeafe",
      "#d1fae5", "#ffffff", "#1a1a2e", "#2d1b69",
    ],
  },
};

// ==========================================
// HELPERS
// ==========================================
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// ==========================================
// DOM REFS
// ==========================================
const loginScreen = $("#login-screen");
const launchScreen = $("#launch-screen");
const universe = $("#universe");
const passwordInput = $("#password-input");
const loginBtn = $("#login-btn");
const errorMsg = $("#error-msg");
const countdownEl = $("#countdown");
const musicToggle = $("#music-toggle");
const bgMusic = $("#bg-music");

// ==========================================
// STARFIELD
// ==========================================
function initStarfield() {
  const c = $("#starsCanvas");
  const ctx = c.getContext("2d");
  const stars = [];
  const COUNT = 180;

  function resize() {
    c.width = innerWidth;
    c.height = innerHeight;
  }

  function create() {
    stars.length = 0;
    for (let i = 0; i < COUNT; i++) {
      stars.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.8 + 0.4,
        dy: Math.random() * 0.25 + 0.04,
        o: Math.random() * 0.6 + 0.3,
        ts: Math.random() * 0.02 + 0.004,
        to: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, c.width, c.height);
    for (const s of stars) {
      const tw = Math.sin(t * s.ts + s.to) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,190,255,${s.o * tw})`;
      ctx.fill();
      s.y += s.dy;
      if (s.y > c.height + 5) {
        s.y = -5;
        s.x = Math.random() * c.width;
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  create();
  requestAnimationFrame(draw);
  addEventListener("resize", () => {
    resize();
    create();
  });
}

// ==========================================
// SCREEN & PLANET MANAGEMENT
// ==========================================
function showScreen(el) {
  $$(".screen").forEach((s) => s.classList.remove("active"));
  el.classList.add("active");
}

// Track which planet is active (needed for spacebar capture)
let currentPlanet = "planet-1";

function showPlanet(id) {
  // Stop camera if leaving photobooth
  if (currentPlanet === "planet-4" && id !== "planet-4") {
    stopCamera();
  }
  currentPlanet = id;

  $$(".planet").forEach((p) => p.classList.remove("active-planet"));
  $(`#${id}`).classList.add("active-planet");
  $$(".nav-dot").forEach((d) => d.classList.remove("active"));
  $(`.nav-dot[data-target="${id}"]`)?.classList.add("active");
  // re-trigger animation
  const pl = $(`#${id}`);
  pl.style.animation = "none";
  pl.offsetHeight;
  pl.style.animation = "";
  scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// LOGIN
// ==========================================
function handleLogin() {
  if (passwordInput.value.trim().toLowerCase() === CONFIG.password.toLowerCase()) {
    errorMsg.classList.remove("visible");
    showScreen(launchScreen);
    startLaunch();
  } else {
    errorMsg.classList.add("visible");
    passwordInput.value = "";
    passwordInput.focus();
  }
}
loginBtn.addEventListener("click", handleLogin);
passwordInput.addEventListener("keydown", (e) => e.key === "Enter" && handleLogin());

// ==========================================
// LAUNCH SEQUENCE
// ==========================================
function startLaunch() {
  let n = 3;
  countdownEl.textContent = n;
  const iv = setInterval(() => {
    n--;
    if (n > 0) countdownEl.textContent = n;
    else if (n === 0) countdownEl.textContent = "🚀";
    else {
      clearInterval(iv);
      showScreen(universe);
      showPlanet("planet-1");
    }
  }, 1000);
}

// ==========================================
// NAV
// ==========================================
$$(".nav-dot").forEach((d) =>
  d.addEventListener("click", () => showPlanet(d.dataset.target))
);
$$(".next-planet-btn").forEach((b) =>
  b.addEventListener("click", () => showPlanet(b.dataset.next))
);

// ==========================================
// MUSIC PLAYER
// ==========================================
let musicPlaying = false;

function toggleMusic() {
  if (musicPlaying) {
    bgMusic.pause();
    musicToggle.querySelector(".play-icon").textContent = "▶";
    $(".mp-album-thumb")?.classList.remove("spinning");
    $("#vinyl-record")?.classList.remove("playing");
    $("#vinyl-arm")?.classList.remove("playing");
    const vBtn = $("#vinyl-play-btn");
    if (vBtn) { vBtn.classList.remove("active"); vBtn.textContent = "▶ Play The Anthem"; }
  } else {
    bgMusic.play().catch(() => {});
    musicToggle.querySelector(".play-icon").textContent = "❚❚";
    $(".mp-album-thumb")?.classList.add("spinning");
    $("#vinyl-record")?.classList.add("playing");
    $("#vinyl-arm")?.classList.add("playing");
    const vBtn = $("#vinyl-play-btn");
    if (vBtn) { vBtn.classList.add("active"); vBtn.textContent = "❚❚ Playing..."; }
  }
  musicPlaying = !musicPlaying;
}

musicToggle.addEventListener("click", toggleMusic);
$("#vinyl-play-btn").addEventListener("click", toggleMusic);

// ==========================================
// PLANET 1 — WALL OF FAME (generate cards)
// ==========================================
function buildWallOfFame() {
  const grid = $("#fame-grid");
  grid.innerHTML = "";

  CONFIG.awards.forEach((award, i) => {
    const card = document.createElement("div");
    card.className = "fame-card";
    card.style.setProperty("--i", i);

    card.innerHTML = `
      <div class="fame-ribbon">${award.ribbon}</div>
      <div class="fame-img-wrap">
        <img src="${award.face}" alt="Award ${i + 1}" />
      </div>
      <div class="fame-body">
        <div class="fame-award">${award.title}</div>
        <div class="fame-reason">"${award.reason}"</div>
        <span class="fame-trophy">${award.trophy}</span>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ==========================================
// PLANET 2 — COMPLIMENT GENERATOR
// ==========================================
let complimentCount = 0;
let lastIdx = -1;

$("#compliment-btn").addEventListener("click", () => {
  let idx;
  do {
    idx = Math.floor(Math.random() * CONFIG.compliments.length);
  } while (idx === lastIdx && CONFIG.compliments.length > 1);
  lastIdx = idx;

  const el = $("#compliment-text");
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = CONFIG.compliments[idx];
    el.style.opacity = 1;
  }, 300);

  complimentCount++;
  $("#compliment-count").textContent = complimentCount;

  const colors = ["#a78bfa", "#f472b6", "#38bdf8", "#34d399", "#fbbf24"];
  $(".compliment-display").style.borderColor =
    colors[complimentCount % colors.length];
});

// ==========================================
// PLANET 3 — BEAT CATCHER GAME
// ==========================================
const game = {
  on: false,
  score: 0,
  streak: 0,
  iv: null,
  dur: 30000,
  fall: 2,
};

const KEYS = ["d", "f", "j", "k"];

function startGame() {
  game.on = true;
  game.score = 0;
  game.streak = 0;
  updateHUD();
  $("#game-start-btn").style.display = "none";
  $("#game-result").classList.add("hidden");

  if (!musicPlaying) toggleMusic();

  game.iv = setInterval(() => {
    if (!game.on) return;
    spawnNote(Math.floor(Math.random() * 4));
  }, 600);

  setTimeout(endGame, game.dur);
}

function spawnNote(lane) {
  const el = document.createElement("div");
  el.className = "note";
  el.style.setProperty("--fall-speed", game.fall + "s");
  el.dataset.lane = lane;
  $$(".lane")[lane].appendChild(el);
  setTimeout(() => {
    if (el.parentNode) {
      el.remove();
      if (game.on) {
        game.streak = 0;
        updateHUD();
      }
    }
  }, game.fall * 1000 + 200);
}

function hitLane(i) {
  if (!game.on) return;
  const lane = $$(".lane")[i];
  const lr = lane.getBoundingClientRect();
  const top = lr.bottom - 60;
  let hit = false;

  lane.querySelectorAll(".note").forEach((n) => {
    if (hit) return;
    const nr = n.getBoundingClientRect();
    const cy = nr.top + nr.height / 2;
    if (cy >= top - 25 && cy <= lr.bottom + 10) {
      hit = true;
      n.remove();
      game.score += 10 + game.streak;
      game.streak++;
      lane.classList.add("hit");
      setTimeout(() => lane.classList.remove("hit"), 120);
      const fb = document.createElement("div");
      fb.className = "hit-feedback";
      fb.textContent = game.streak > 3 ? `🔥+${10 + game.streak}` : `✨+${10 + game.streak}`;
      fb.style.cssText = "left:50%;bottom:70px;transform:translateX(-50%)";
      lane.appendChild(fb);
      setTimeout(() => fb.remove(), 500);
      updateHUD();
    }
  });

  const kh = $$(".key-hint");
  if (kh[i]) {
    kh[i].classList.add("pressed");
    setTimeout(() => kh[i].classList.remove("pressed"), 100);
  }
}

function updateHUD() {
  $("#game-score").textContent = game.score;
  $("#game-streak").textContent = game.streak;
}

function endGame() {
  game.on = false;
  clearInterval(game.iv);
  $$(".note").forEach((n) => n.remove());
  $("#final-score").textContent = game.score;
  $("#game-result").classList.remove("hidden");
  $("#game-start-btn").style.display = "inline-block";
}

document.addEventListener("keydown", (e) => {
  const i = KEYS.indexOf(e.key.toLowerCase());
  if (i !== -1) hitLane(i);
});

$$(".lane").forEach((l, i) => {
  l.addEventListener("touchstart", (e) => {
    e.preventDefault();
    hitLane(i);
  });
  l.addEventListener("click", () => hitLane(i));
});

$("#game-start-btn").addEventListener("click", startGame);
$("#game-restart-btn")?.addEventListener("click", startGame);


// ===========================================================
// ===========================================================
//  PLANET 4 — PHOTOBOOTH
// ===========================================================
// ===========================================================

const pb = {
  stream: null,
  selectedTheme: "retro",
  selectedLayout: "strip",
  selectedFilter: "none",
  selectedBgColor: CONFIG.photobooth.bgColors[0],
  photos: [],
  maxPhotos: 4,

  layouts: {
    strip:  { cols: 1, rows: 4, count: 4, label: "Strip" },
    grid:   { cols: 2, rows: 2, count: 4, label: "Grid" },
    single: { cols: 1, rows: 1, count: 1, label: "Single" },
  },

  setup:       () => $("#pb-setup"),
  cameraStage: () => $("#pb-camera-stage"),
  review:      () => $("#pb-review"),
  video:       () => $("#pb-video"),
  viewfinder:  () => $("#pb-viewfinder"),
  countdownOv: () => $("#pb-countdown-overlay"),
  countdownNum:() => $("#pb-countdown-num"),
  flash:       () => $("#pb-flash"),
  thumbs:      () => $("#pb-thumbnails"),
  captureBtn:  () => $("#pb-capture-btn"),
  finalCanvas: () => $("#pb-final-canvas"),
};

// ── Theme Selection ──
$$(".pb-theme-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".pb-theme-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    pb.selectedTheme = btn.dataset.theme;
  });
});

// ── Layout Selection ──
$$(".pb-layout-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".pb-layout-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    pb.selectedLayout = btn.dataset.layout;
  });
});

// ── Background Color ──
$$(".pb-color-dot").forEach(dot => {
  dot.addEventListener("click", () => {
    $$(".pb-color-dot").forEach(d => d.classList.remove("selected"));
    dot.classList.add("selected");
    pb.selectedBgColor = dot.dataset.color;
  });
});

// ── Filter ──
$$(".pb-filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".pb-filter-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    pb.selectedFilter = btn.dataset.filter;
    applyVideoFilter();
  });
});

function applyVideoFilter() {
  const v = pb.video();
  if (!v) return;
  const f = CONFIG.photobooth.filters[pb.selectedFilter];
  v.style.filter = f ? f.css : "none";
}

// ── Start Camera ──
$("#pb-start-camera").addEventListener("click", async () => {
  try {
    const layout = pb.layouts[pb.selectedLayout];
    pb.maxPhotos = layout.count;
    pb.photos = [];

    $("#pb-photo-current").textContent = "0";
    $("#pb-photo-total").textContent = pb.maxPhotos;
    pb.thumbs().innerHTML = "";

    pb.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
      audio: false,
    });

    pb.video().srcObject = pb.stream;
    await pb.video().play();

    applyVideoFilter();

    pb.setup().classList.add("hidden");
    pb.cameraStage().classList.remove("hidden");
    pb.review().classList.add("hidden");

  } catch (err) {
    console.error("Camera error:", err);
    alert("📷 Couldn't access camera!\n\nPlease allow camera access and try again.\n\nOn iOS: Settings → Safari → Camera → Allow");
  }
});

// ── Stop Camera ──
function stopCamera() {
  if (pb.stream) {
    pb.stream.getTracks().forEach(t => t.stop());
    pb.stream = null;
  }
  const v = pb.video();
  if (v) { v.srcObject = null; v.style.filter = "none"; }
}

// ── Capture Photo ──
function capturePhoto() {
  if (pb.photos.length >= pb.maxPhotos) return;

  const cd = CONFIG.photobooth.countdownSeconds;

  pb.countdownOv().classList.remove("hidden");
  let count = cd;
  pb.countdownNum().textContent = count;

  const iv = setInterval(() => {
    count--;
    if (count > 0) {
      pb.countdownNum().textContent = count;
    } else {
      clearInterval(iv);
      pb.countdownOv().classList.add("hidden");

      // Flash
      const flash = pb.flash();
      flash.classList.add("active");
      setTimeout(() => flash.classList.remove("active"), 400);

      // Capture frame
      const video = pb.video();
      const captureCanvas = document.createElement("canvas");
      captureCanvas.width = video.videoWidth;
      captureCanvas.height = video.videoHeight;
      const cCtx = captureCanvas.getContext("2d");

      // Mirror
      cCtx.translate(captureCanvas.width, 0);
      cCtx.scale(-1, 1);

      // Apply filter
      const filterDef = CONFIG.photobooth.filters[pb.selectedFilter];
      if (filterDef && filterDef.css !== "none") {
        cCtx.filter = filterDef.css;
      }

      cCtx.drawImage(video, 0, 0);
      cCtx.setTransform(1, 0, 0, 1, 0, 0);
      cCtx.filter = "none";

      const dataUrl = captureCanvas.toDataURL("image/jpeg", 0.92);
      pb.photos.push(dataUrl);

      // Thumbnail
      const thumb = document.createElement("div");
      thumb.className = "pb-thumb";
      thumb.innerHTML = `<img src="${dataUrl}" alt="Photo ${pb.photos.length}" />`;
      pb.thumbs().appendChild(thumb);

      $("#pb-photo-current").textContent = pb.photos.length;

      // Done?
      if (pb.photos.length >= pb.maxPhotos) {
        setTimeout(() => {
          stopCamera();
          composeFinal();
        }, 600);
      }
    }
  }, 1000);
}

// Capture button
pb.captureBtn().addEventListener("click", capturePhoto);

// Spacebar to capture
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && currentPlanet === "planet-4" &&
      !pb.cameraStage().classList.contains("hidden") &&
      pb.countdownOv().classList.contains("hidden")) {
    e.preventDefault();
    capturePhoto();
  }
});

// ── Compose Final Image ──
function composeFinal() {
  const theme = CONFIG.photobooth.themes[pb.selectedTheme];
  const layout = pb.layouts[pb.selectedLayout];
  const canvas = pb.finalCanvas();
  const ctx = canvas.getContext("2d");

  const watermark = $("#pb-watermark").value.trim() || CONFIG.photobooth.defaultWatermark;

  const PHOTO_W = 400;
  const PHOTO_H = 300;
  const pad = theme.padding;
  const gap = theme.photoPadding;

  const totalW = pad * 2 + layout.cols * PHOTO_W + (layout.cols - 1) * gap;
  const bottomSpace = 60;
  const totalH = pad * 2 + layout.rows * PHOTO_H + (layout.rows - 1) * gap + bottomSpace;

  canvas.width = totalW;
  canvas.height = totalH;

  // Background
  ctx.fillStyle = pb.selectedBgColor;
  ctx.fillRect(0, 0, totalW, totalH);

  // Theme border
  if (theme.borderWidth > 0) {
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = theme.borderWidth;
    const bw = theme.borderWidth / 2;
    ctx.strokeRect(bw, bw, totalW - theme.borderWidth, totalH - theme.borderWidth);
  }

  // Load all photos then draw
  const images = pb.photos.map(src => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  });

  Promise.all(images).then(imgs => {
    imgs.forEach((img, i) => {
      const col = i % layout.cols;
      const row = Math.floor(i / layout.cols);
      const x = pad + col * (PHOTO_W + gap);
      const y = pad + row * (PHOTO_H + gap);

      ctx.shadowColor = theme.shadowColor;
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;

      const r = theme.photoRadius;
      roundRect(ctx, x, y, PHOTO_W, PHOTO_H, r);
      ctx.save();
      ctx.clip();

      // Cover fit
      const imgRatio = img.width / img.height;
      const slotRatio = PHOTO_W / PHOTO_H;
      let sx, sy, sw, sh;
      if (imgRatio > slotRatio) {
        sh = img.height; sw = sh * slotRatio;
        sx = (img.width - sw) / 2; sy = 0;
      } else {
        sw = img.width; sh = sw / slotRatio;
        sx = 0; sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, x, y, PHOTO_W, PHOTO_H);
      ctx.restore();
      ctx.shadowColor = "transparent";

      if (theme.borderWidth > 0) {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 1;
        roundRect(ctx, x, y, PHOTO_W, PHOTO_H, r);
        ctx.stroke();
      }
    });

    // Film grain (retro)
    if (theme.grain) {
      const grainData = ctx.getImageData(0, 0, totalW, totalH);
      const pixels = grainData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        const noise = (Math.random() - 0.5) * 25;
        pixels[i] += noise;
        pixels[i + 1] += noise;
        pixels[i + 2] += noise;
      }
      ctx.putImageData(grainData, 0, 0);
    }

    // Date stamp (retro)
    if (theme.dateStamp) {
      const dateStr = new Date().toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
      });
      ctx.font = "14px 'Press Start 2P', monospace";
      ctx.fillStyle = "rgba(255,150,50,0.8)";
      ctx.textAlign = "right";
      ctx.fillText(dateStr, totalW - pad - 5, totalH - bottomSpace - 8);
    }

    // Watermark
    ctx.font = `bold 20px ${theme.fontFamily}`;
    ctx.fillStyle = theme.textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(watermark, totalW / 2, totalH - bottomSpace / 2 + pad / 2);

    // Show review
    pb.cameraStage().classList.add("hidden");
    pb.review().classList.remove("hidden");
  });
}

// Rounded rect helper
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── Download ──
$("#pb-download").addEventListener("click", () => {
  const a = document.createElement("a");
  a.download = `${CONFIG.friendName}-photobooth-${Date.now()}.png`;
  a.href = pb.finalCanvas().toDataURL("image/png");
  a.click();
});

// ── Retake ──
$("#pb-retake").addEventListener("click", () => {
  pb.photos = [];
  pb.thumbs().innerHTML = "";
  pb.review().classList.add("hidden");
  pb.setup().classList.remove("hidden");
});


// ==========================================
// PLANET 5 — CONFETTI
// ==========================================
function fireConfetti() {
  const c = $("#confettiCanvas");
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;
  const colors = ["#a78bfa", "#f472b6", "#38bdf8", "#34d399", "#fbbf24", "#f87171", "#fb923c"];
  const pieces = [];

  for (let i = 0; i < 160; i++) {
    pieces.push({
      x: Math.random() * c.width,
      y: Math.random() * c.height - c.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      rs: (Math.random() - 0.5) * 10,
      dx: (Math.random() - 0.5) * 3,
      dy: Math.random() * 3 + 2,
      o: 1,
    });
  }

  let f = 0;
  const MAX = 300;

  (function draw() {
    if (f > MAX) {
      ctx.clearRect(0, 0, c.width, c.height);
      return;
    }
    f++;
    ctx.clearRect(0, 0, c.width, c.height);
    for (const p of pieces) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = Math.max(p.o, 0);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.x += p.dx;
      p.y += p.dy;
      p.rot += p.rs;
      p.dy += 0.05;
      if (f > MAX - 60) p.o -= 0.02;
    }
    requestAnimationFrame(draw);
  })();
}

$("#confetti-btn").addEventListener("click", () => {
  fireConfetti();
  const b = $("#confetti-btn");
  b.textContent = "🎉 yeay, congrats 🎉";
  b.classList.remove("pulse");
  b.style.pointerEvents = "none";
});

// ==========================================
// PERSONALIZE TEXT
// ==========================================
function personalize() {
  $$(".friend-name").forEach((e) => (e.textContent = CONFIG.friendName));
  $(".hint-text").textContent = `Hint: ${CONFIG.hintText}`;
  $(".letter-greeting").textContent = `Dear ${CONFIG.friendName},`;
  $(".letter-name").textContent = CONFIG.yourName;
  $(".launch-title").innerHTML = `welcome, <span class="friend-name">${CONFIG.friendName}</span>!`;

  $(".mp-song-name").textContent = CONFIG.song.title;
  $(".mp-artist").textContent = CONFIG.song.artist;
  $(".vinyl-song-name").textContent = CONFIG.song.title;
  $(".vinyl-artist").textContent = CONFIG.song.artist;

  // Set default watermark
  $("#pb-watermark").value = CONFIG.photobooth.defaultWatermark;
}

// ==========================================
// INIT
// ==========================================
addEventListener("DOMContentLoaded", () => {
  initStarfield();
  personalize();
  buildWallOfFame();
  // NOTE: buildFacePicker() was removed — photobooth now uses camera, not face photos
  passwordInput.focus();
});

addEventListener("resize", () => {
  const cc = $("#confettiCanvas");
  cc.width = innerWidth;
  cc.height = innerHeight;
});
