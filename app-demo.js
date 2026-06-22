const BASE_W = 393;
const BASE_H = 852;

const HOME = "APP/demo-frames/home-active.png";
const MAP = "APP/demo-frames/map-active.png";
const PLAY_ICON = "public/assets/buttons/archive-play.png";
const PAUSE_ICON = "public/assets/buttons/archive-pause.png";

const locationOrder = [
  "liziba",
  "grand-theater",
  "jiefangbei",
  "nanshan",
];

const labels = {
  liziba: "Liziba Station",
  "grand-theater": "Grand Theater",
  jiefangbei: "JieFangBei",
  nanshan: "NanShan",
};

const audioFiles = {
  liziba: "public/audio/liziba.mp3",
  "grand-theater": "public/audio/grand-theatre.mp3",
  jiefangbei: "public/audio/jiefangbei.mp3",
  nanshan: "public/audio/nanshan.mp3",
};

const archiveFrames = Object.fromEntries(
  locationOrder.map((slug) => [
    slug,
    [0, 1, 2].map((index) => `APP/demo-frames/archive-${slug}-${index}.png`),
  ]),
);

const state = {
  view: "home",
  slug: "liziba",
  photo: 0,
};

const audioState = {
  key: null,
  slug: null,
  media: null,
  playing: false,
  frame: null,
};

const imageCache = new Map();
const audioCache = new Map();
const app = document.getElementById("appDemo");
const phone = document.createElement("section");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

phone.className = "phone";
phone.setAttribute("aria-label", "HEAR CHONGQING app demo");
canvas.className = "screen-canvas";
canvas.width = BASE_W;
canvas.height = BASE_H;
phone.append(canvas);
app.replaceChildren(phone);

function loadImage(src) {
  if (imageCache.has(src)) return imageCache.get(src);

  const img = new Image();
  const entry = {
    img,
    loaded: false,
    promise: new Promise((resolve, reject) => {
      img.onload = () => {
        entry.loaded = true;
        resolve(img);
      };
      img.onerror = reject;
    }),
  };
  img.decoding = "async";
  img.src = src;
  imageCache.set(src, entry);
  return entry;
}

function warmAudio(slug) {
  if (audioCache.has(slug)) return audioCache.get(slug);

  const media = new Audio(audioFiles[slug]);
  media.preload = "auto";
  media.addEventListener("ended", stopAudio);
  audioCache.set(slug, media);
  return media;
}

function archiveSrc(slug = state.slug, photo = state.photo) {
  return archiveFrames[slug]?.[photo] || archiveFrames.liziba[0];
}

function currentSrc() {
  if (state.view === "home") return HOME;
  if (state.view === "map") return MAP;
  return archiveSrc();
}

function preloadFrames() {
  [
    HOME,
    MAP,
    PLAY_ICON,
    PAUSE_ICON,
    ...Object.values(archiveFrames).flat(),
  ].forEach((src) => loadImage(src));

  Object.keys(audioFiles).forEach((slug) => warmAudio(slug));
}

function clampState() {
  if (!["home", "map", "archive"].includes(state.view)) state.view = "home";
  if (!archiveFrames[state.slug]) state.slug = "liziba";
  if (state.photo < 0 || state.photo > 2) state.photo = 0;
}

function updateUrl() {
  const hash = `#/${state.view}/${state.slug}/${state.photo}`;
  if (window.location.hash !== hash) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
  }
}

function drawPlayState(now = performance.now()) {
  if (!audioState.playing) return;

  if (state.view === "map" && audioState.key === "map-liziba") {
    drawAudioControl({
      wave: [139, 642, 154, 50],
      button: [301, 632, 54, 58],
      bars: 16,
      barWidth: 4,
      gap: 5,
      now,
    });
    return;
  }

  if (state.view === "archive" && audioState.key === `archive-${state.slug}`) {
    drawAudioControl({
      wave: [137, 504, 218, 51],
      button: [55, 506, 63, 62],
      bars: 22,
      barWidth: 5,
      gap: 5,
      now,
    });
  }
}

function drawAudioControl(config) {
  const pause = imageCache.get(PAUSE_ICON);
  const [bx, by, bw, bh] = config.button;

  ctx.save();
  ctx.fillStyle = "#f2adf2";
  ctx.fillRect(config.wave[0] - 3, config.wave[1] - 3, config.wave[2] + 6, config.wave[3] + 6);
  ctx.fillRect(bx - 4, by - 4, bw + 8, bh + 8);
  drawWave(config);

  if (pause?.loaded) {
    ctx.drawImage(pause.img, bx, by, bw, bh);
  } else {
    ctx.fillStyle = "#214aad";
    ctx.fillRect(bx + bw * 0.28, by + bh * 0.2, bw * 0.16, bh * 0.6);
    ctx.fillRect(bx + bw * 0.56, by + bh * 0.2, bw * 0.16, bh * 0.6);
  }
  ctx.restore();
}

function drawWave({ wave, bars, barWidth, gap, now }) {
  const baseHeights = [28, 42, 54, 36, 48, 24, 34, 44, 30, 58, 66, 36, 44, 30, 26, 40, 52, 34, 46, 28, 36, 50];
  const [x, y, width, height] = wave;
  const totalWidth = bars * barWidth + (bars - 1) * gap;
  const startX = x + Math.max(0, (width - totalWidth) / 2);
  const centerY = y + height / 2;
  const phase = (now % 720) / 720;

  ctx.fillStyle = "#df75dc";
  for (let i = 0; i < bars; i += 1) {
    const pulse = 0.82 + 0.34 * Math.sin((phase - i * 0.075) * Math.PI * 2);
    const rawHeight = baseHeights[i % baseHeights.length] * pulse;
    const barHeight = Math.max(8, Math.min(height, rawHeight * (height / 66)));
    const barX = startX + i * (barWidth + gap);
    const barY = centerY - barHeight / 2;
    roundRect(barX, barY, barWidth, barHeight, barWidth / 2);
    ctx.fill();
  }
}

function roundRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawFrame(now = performance.now()) {
  clampState();
  const src = currentSrc();
  const entry = loadImage(src);

  if (!entry.loaded) {
    entry.promise.then(() => drawFrame(now));
    return;
  }

  ctx.clearRect(0, 0, BASE_W, BASE_H);
  ctx.drawImage(entry.img, 0, 0, BASE_W, BASE_H);
  drawPlayState(now);
}

function startAnimation() {
  if (audioState.frame) return;

  const loop = (now) => {
    drawFrame(now);
    audioState.frame = audioState.playing ? requestAnimationFrame(loop) : null;
  };
  audioState.frame = requestAnimationFrame(loop);
}

function render() {
  clampState();
  drawFrame();
  updateUrl();
}

function go(view, slug = state.slug, photo = 0) {
  const nextSlug = archiveFrames[slug] ? slug : state.slug;
  const leavingAudioSurface =
    view !== state.view ||
    (view === "archive" && nextSlug !== state.slug) ||
    (state.view === "map" && view !== "map");

  if (leavingAudioSurface) stopAudio();

  state.view = view;
  state.slug = nextSlug;
  state.photo = photo;
  render();
}

function inRect(x, y, rect) {
  return x >= rect[0] && x <= rect[0] + rect[2] && y >= rect[1] && y <= rect[1] + rect[3];
}

function handleNav(x, y) {
  if (y < 748) return false;
  if (x < 101) go("home");
  else if (x < 199) go("map");
  else if (x < 294) go("archive");
  else go("home");
  return true;
}

function toggleAudio(key, slug) {
  if (audioState.playing && audioState.key === key) {
    stopAudio();
    return;
  }

  stopAudio(true);
  const media = warmAudio(slug);
  media.pause();
  media.currentTime = 0;

  audioState.key = key;
  audioState.slug = slug;
  audioState.media = media;
  audioState.playing = true;

  media.play().catch(() => {});
  drawFrame();
  startAnimation();
}

function stopAudio(skipRender = false) {
  if (audioState.frame) {
    cancelAnimationFrame(audioState.frame);
    audioState.frame = null;
  }

  if (audioState.media) {
    audioState.media.pause();
  }

  audioState.key = null;
  audioState.slug = null;
  audioState.media = null;
  audioState.playing = false;

  if (!skipRender) render();
}

function handleHome(x, y) {
  if (handleNav(x, y)) return;

  const actions = [
    [[25, 311, 334, 52], () => go("archive", "liziba")],
    [[25, 407, 75, 75], () => go("map", "liziba")],
    [[110, 407, 75, 75], () => go("map", "jiefangbei")],
    [[198, 407, 75, 75], () => go("map", "grand-theater")],
    [[283, 407, 75, 75], () => go("map", "nanshan")],
    [[25, 543, 102, 164], () => go("archive", "liziba")],
    [[141, 543, 102, 164], () => go("archive", "jiefangbei")],
    [[257, 543, 102, 164], () => go("archive", "nanshan")],
  ];

  actions.find(([rect, action]) => {
    if (!inRect(x, y, rect)) return false;
    action();
    return true;
  });
}

function handleMap(x, y) {
  if (handleNav(x, y)) return;

  if (inRect(x, y, [300, 630, 58, 64])) {
    toggleAudio("map-liziba", "liziba");
    return;
  }

  const actions = [
    [[29, 110, 332, 50], () => go("archive")],
    [[165, 211, 104, 92], () => go("archive", "grand-theater")],
    [[201, 388, 146, 63], () => go("archive", "jiefangbei")],
    [[30, 560, 333, 146], () => go("archive", "liziba")],
  ];

  actions.find(([rect, action]) => {
    if (!inRect(x, y, rect)) return false;
    action();
    return true;
  });
}

function handleArchive(x, y) {
  if (handleNav(x, y)) return;

  if (inRect(x, y, [55, 506, 63, 62])) {
    toggleAudio(`archive-${state.slug}`, state.slug);
    return;
  }

  if (inRect(x, y, [330, 82, 33, 28])) {
    const current = locationOrder.indexOf(state.slug);
    const nextSlug = locationOrder[(current + 1) % locationOrder.length];
    go("archive", nextSlug, 0);
    return;
  }

  if (inRect(x, y, [30, 111, 333, 238])) {
    go("archive", state.slug, (state.photo + 1) % 3);
  }
}

function handleScreenClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * BASE_W;
  const y = ((event.clientY - rect.top) / rect.height) * BASE_H;

  if (state.view === "home") handleHome(x, y);
  else if (state.view === "map") handleMap(x, y);
  else handleArchive(x, y);
}

function syncFromHash() {
  const [, view, slug, photo] = window.location.hash.split("/");
  state.view = view || "home";
  state.slug = archiveFrames[slug] ? slug : "liziba";
  state.photo = Number.isInteger(Number(photo)) ? Number(photo) : 0;
  render();
}

canvas.addEventListener("click", handleScreenClick);
preloadFrames();
syncFromHash();
