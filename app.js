const routes = {
  home: "home",
  map: "map",
  detail: "detail",
  archive: "archive",
  about: "about",
  login: "login",
};

const locations = [
  {
    slug: "liziba",
    title: "Liziba Station",
    homeLabel: "Liziba",
    category: "Transportation",
    district: "Yuzhong",
    signature: "Passing Monorail",
    audio: "public/audio/liziba.mp3",
    preview: "public/assets/preview/liziba.jpg",
    detail: "public/assets/detail/liziba.jpg",
    archive: "public/assets/archive/liziba.png",
    intro: "The iconic station where trains pass through a residential building, creating one of Chongqing's most recognizable sounds.",
    about: "A landmark where the monorail passes directly through a residential building, showcasing Chongqing's unique urban landscape.",
    related: [
      ["Huangjuewang Overpass", "One of the largest and most complex interchanges in China, showcasing Chongqing's layered transportation network."],
      ["Yangtze River Cableway", "A historic cable car crossing the Yangtze River, offering a unique perspective of the city."],
    ],
    mapPoint: [214, 322],
    homeFocus: [745, 610, 112, 48],
  },
  {
    slug: "jiefangbei",
    title: "JieFangBei",
    homeLabel: "JieFangBei",
    category: "Street Life",
    district: "Yuzhong",
    signature: "Urban Ambience",
    audio: "public/audio/jiefangbei.mp3",
    preview: "public/assets/preview/jiefangbei.jpg",
    detail: "public/assets/detail/jiefangbei.jpg",
    archive: "public/assets/archive/jiefangbei.png",
    intro: "The heartbeat of urban life, filled with movement, commerce, traffic, and everyday city activity.",
    about: "The vibrant center of Chongqing, where crowds, traffic, and daily activities create the rhythm of city life.",
    related: [
      ["Hongyadong", "Layered night views, riverside crowds, and constant movement around a landmark city block."],
      ["Chaotianmen", "A meeting point of river traffic, public life, and Chongqing's urban energy."],
    ],
    mapPoint: [662, 391],
    homeFocus: [1132, 547, 112, 48],
  },
  {
    slug: "ranjiaba",
    title: "RanJiaBa",
    homeLabel: "RanJiaBa",
    category: "Street Life",
    district: "Yubei",
    signature: "Public Activity",
    audio: "public/audio/ranjiaba.mp3",
    preview: "public/assets/preview/ranjiaba.jpg",
    detail: "public/assets/detail/ranjiaba.jpg",
    archive: "public/assets/archive/ranjiaba.png",
    intro: "A hub of connection and movement, shaped by commuters, conversations, and everyday public activity.",
    about: "A busy transportation district filled with commuters, conversations, and the fast pace of everyday movement.",
    related: [
      ["Guanyinqiao", "Busy streets, shopping routes, and overlapping public sounds across the district."],
      ["Yubei Commute", "Transit rhythm and daily movement from station entrances to road crossings."],
    ],
    mapPoint: [160, 112],
    homeFocus: [693, 457, 112, 48],
  },
  {
    slug: "eling",
    title: "ELing Park",
    homeLabel: "ELing Park",
    category: "Culture",
    district: "Yuzhong",
    signature: "Cultural Landscape",
    audio: "public/audio/eling.mp3",
    preview: "public/assets/preview/eling.jpg",
    detail: "public/assets/detail/eling.jpg",
    archive: "public/assets/archive/eling.png",
    intro: "A place where history meets the city, combining heritage, architecture, and panoramic views.",
    about: "A historic park that combines cultural heritage, architecture, and panoramic views of the city.",
    related: [
      ["Eling Testbed 2", "A creative district where old industrial textures meet contemporary cultural activity."],
      ["Fotu Pass", "A slower hillside route where footsteps, trees, and city views overlap."],
    ],
    mapPoint: [158, 424],
    homeFocus: [844, 702, 112, 48],
  },
  {
    slug: "nanshan",
    title: "NanShan",
    homeLabel: "NanShan",
    category: "Nature",
    district: "Nan'an",
    signature: "Mountain Atmosphere",
    audio: "public/audio/nanshan.mp3",
    preview: "public/assets/preview/nanshan.jpg",
    detail: "public/assets/detail/nanshan.jpg",
    archive: "public/assets/archive/nanshan.png",
    intro: "A natural escape above the city, offering quiet mountain air and a softer urban edge.",
    about: "A mountain area known for its natural scenery, offering a peaceful contrast to the urban environment.",
    related: [
      ["Nanshan Botanical Garden", "Green spaces, slow walking paths, and natural sound layers above the city."],
      ["One Tree Viewing Deck", "A high viewpoint where distant city ambience blends with the mountain atmosphere."],
    ],
    mapPoint: [1078, 520],
    homeFocus: [1176, 750, 112, 48],
  },
  {
    slug: "grand-theater",
    title: "Grand Theater",
    homeLabel: "Grand Theater",
    category: "Culture",
    district: "Jiangbei",
    signature: "Performance Space",
    audio: "public/audio/grand-theatre.mp3",
    preview: "public/assets/preview/grand-theater.jpg",
    detail: "public/assets/detail/grand-theater.jpg",
    archive: "public/assets/archive/grand-theater.png",
    intro: "A stage for culture and creativity along the riverside, hosting performances, exhibitions, and events.",
    about: "A modern cultural venue that hosts performances, exhibitions, and public events along the riverside.",
    related: [
      ["Jiangbeizui", "Riverside plazas and public movement around Chongqing's contemporary skyline."],
      ["Qiansimen Bridge", "A crossing where vehicles, river wind, and pedestrian views layer together."],
    ],
    mapPoint: [618, 215],
    homeFocus: [952, 384, 128, 48],
  },
];

const categories = ["All", "Transportation", "Street Life", "Culture", "Nature"];
const archiveOrder = ["liziba", "jiefangbei", "nanshan", "eling", "grand-theater", "ranjiaba"];
const mapAllSubFilterOrder = ["liziba", "jiefangbei", "eling", "nanshan", "ranjiaba", "grand-theater"];
const basicInfoPhotos = {
  liziba: "public/assets/basic-info/liziba.png",
  jiefangbei: "public/assets/basic-info/jiefangbei.png",
  ranjiaba: "public/assets/basic-info/ranjiaba.png",
  eling: "public/assets/basic-info/eling.png",
  nanshan: "public/assets/basic-info/nanshan.png",
  "grand-theater": "public/assets/basic-info/grand-theater.png",
};
const mapViewport = {
  width: 770,
  height: 805,
  canvasWidth: 1250,
  canvasHeight: 805,
  minZoom: 1.04,
  maxZoom: 2,
};
const app = document.getElementById("app");
let subFilterTimer = null;

const state = {
  page: routes.home,
  selectedSlug: "liziba",
  expandedCategory: null,
  homeActiveSlug: null,
  archiveCategory: "All",
  archiveQuery: "",
  liked: {},
  saved: {},
  map: {
    zoom: 1.12,
    x: -136,
    y: -236,
  },
};

const audioState = {
  slug: null,
  duration: 0,
  elapsed: 0,
  playing: false,
  timer: null,
  media: null,
};

const archiveButtonAssets = {
  like: "public/assets/buttons/archive-like.png",
  likeActive: "public/assets/buttons/archive-like-active.png",
  collect: "public/assets/buttons/archive-collect.png",
  collectActive: "public/assets/buttons/archive-collect-active.png",
  play: "public/assets/buttons/archive-play.png",
  pause: "public/assets/buttons/archive-pause.png",
};

let assetsPreloaded = false;
const imageCache = new Map();
const audioCache = new Map();
const cursorTrailAssets = [
  { src: "public/assets/cursor-trail/pink-star.png", size: 50 },
  { src: "public/assets/cursor-trail/blue-square.png", size: 42 },
  { src: "public/assets/cursor-trail/yellow-star.png", size: 54 },
];
let cursorTrailLayer = null;
let cursorTrailBound = false;
let cursorTrailLastTime = 0;
let cursorTrailLastPoint = { x: 0, y: 0 };
let cursorTrailActive = 0;
let cursorTrailCursor = 0;

function warmImage(src) {
  if (imageCache.has(src)) return imageCache.get(src);
  const img = new Image();
  img.decoding = "async";
  img.loading = "eager";
  img.src = src;
  const ready = img.decode ? img.decode().catch(() => {}) : new Promise((resolve) => {
    img.onload = resolve;
    img.onerror = resolve;
  });
  const entry = { img, ready };
  imageCache.set(src, entry);
  return entry;
}

function warmAudio(slug) {
  if (audioCache.has(slug)) return audioCache.get(slug);
  const loc = locationBySlug(slug);
  const audio = new Audio(loc.audio);
  audio.preload = "auto";
  audio.load();
  audioCache.set(slug, audio);
  return audio;
}

function warmRouteAssets(route) {
  if (route === routes.map) {
    locations.forEach((loc) => {
      warmImage(loc.preview);
      warmAudio(loc.slug);
    });
    warmImage("public/assets/map/the-map-2.png");
  }
  if (route === routes.archive) {
    archiveOrder.forEach((slug) => warmImage(locationBySlug(slug).archive));
  }
  if (route === routes.detail) {
    const loc = locationBySlug(state.selectedSlug);
    warmImage(loc.detail);
    warmImage(basicInfoPhoto(loc));
    warmAudio(loc.slug);
  }
  if (route === routes.about) warmImage("public/assets/screens/about-clean-stars.png");
  if (route === routes.login) warmImage("public/assets/screens/login-clean-motion.png");
}

function preloadPublishedAssets() {
  if (assetsPreloaded) return;
  assetsPreloaded = true;

  const imagePaths = new Set([
    "public/assets/screens/home-clean-intro.png",
    "public/assets/screens/map.jpg",
    "public/assets/map/the-map-2.png",
    "public/assets/screens/detail.jpg",
    "public/assets/screens/archive.jpg",
    "public/assets/screens/archive-grid-clean.png",
    "public/assets/screens/about-clean-stars.png",
    "public/assets/screens/login-clean-motion.png",
    "public/assets/buttons/search-icon.png",
    ...Object.values(archiveButtonAssets),
    ...Object.values(basicInfoPhotos),
    ...locations.flatMap((loc) => [loc.preview, loc.detail, loc.archive]),
    "public/assets/about/star-original-sound.png",
    "public/assets/about/star-original-chongqing.png",
    "public/assets/about/star-original-process.png",
    "public/assets/login/star-login-yellow.png",
    "public/assets/login/star-login-blue.png",
    "public/assets/login/star-login-pink.png",
    "public/assets/login/shape-login-pink.png",
    "public/assets/login/shape-login-blue.png",
    ...cursorTrailAssets.map((asset) => asset.src),
  ]);

  imagePaths.forEach((src) => {
    warmImage(src);
  });

  locations.forEach((loc) => warmAudio(loc.slug));
}

function scheduleAssetPreload() {
  const run = () => preloadPublishedAssets();
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 400 });
  } else {
    window.setTimeout(run, 120);
  }
}

const homeHotspots = {
  liziba: [745, 610, 112, 48],
  jiefangbei: [1132, 547, 112, 48],
  ranjiaba: [693, 457, 112, 48],
  eling: [844, 702, 112, 48],
  nanshan: [1176, 750, 112, 48],
  "grand-theater": [952, 384, 128, 48],
};

function locationBySlug(slug) {
  return locations.find((item) => item.slug === slug) || locations[0];
}

function basicInfoPhoto(loc) {
  return basicInfoPhotos[loc.slug] || loc.archive;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setScale() {
  const scale = Math.min(window.innerWidth / 1440, window.innerHeight / 1024, 1);
  document.documentElement.style.setProperty("--scale", String(Math.max(scale, 0.72)));
}

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [page, slug] = raw.split("/");
  if (page && routes[page]) state.page = page;
  if (slug) state.selectedSlug = slug;
  if (state.page === routes.map) state.expandedCategory = null;
}

function navigate(page, slug = state.selectedSlug) {
  state.page = page;
  state.selectedSlug = slug || state.selectedSlug;
  if (page === routes.map) {
    state.expandedCategory = null;
    focusMap(state.selectedSlug, false);
  }
  window.location.hash = `/${page}${page === routes.detail ? `/${state.selectedSlug}` : ""}`;
  render();
}

function makeNav() {
  const isActive = (route) => state.page === route || (route === routes.map && state.page === routes.detail);
  const mapSlotReturnsHome = state.page === routes.map;
  const mapSlotTarget = mapSlotReturnsHome ? routes.home : routes.map;
  const mapSlotLabel = mapSlotReturnsHome ? "HOME" : "MAP";
  const mapSlotActive = mapSlotReturnsHome || isActive(routes.map);
  return `
    <button class="logo-hit" data-nav="home" aria-label="Home"></button>
    <button class="nav-hit nav-home ${isActive(routes.home) ? "active" : ""}" data-label="HOME" data-nav="home" aria-label="Home"></button>
    <button class="nav-hit nav-map ${mapSlotActive ? "active" : ""} ${mapSlotReturnsHome ? "map-return" : ""}" data-label="${mapSlotLabel}" data-nav="${mapSlotTarget}" aria-label="${mapSlotReturnsHome ? "Home" : "Map"}"></button>
    <button class="nav-hit nav-archive ${isActive(routes.archive) ? "active" : ""}" data-label="ARCHIVE" data-nav="archive" aria-label="Archive"></button>
    <button class="nav-hit nav-about ${isActive(routes.about) ? "active" : ""}" data-label="ABOUT" data-nav="about" aria-label="About"></button>
    <button class="nav-hit nav-login ${isActive(routes.login) ? "active" : ""}" data-label="LOG IN" data-nav="login" aria-label="Log in"></button>
  `;
}

function waveBars(extra = "", repeat = 1) {
  const baseHeights = [28, 42, 54, 36, 48, 24, 34, 44, 30, 58, 66, 36, 44, 30, 26, 40, 52, 34, 46, 28, 36, 50];
  const heights = Array.from({ length: repeat }, () => baseHeights).flat();
  const playing = audioState.playing ? "playing" : "";
  return `<div class="wave ${playing} ${extra}">${heights.map((h, i) => `<span style="--h:${h};--i:${i}"></span>`).join("")}</div>`;
}

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  const min = Math.floor(safe / 60);
  const sec = String(safe % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function timerText(total) {
  return `${formatTime(audioState.playing ? audioState.elapsed : 0)}/${formatTime(total)}`;
}

function pulseReactiveText(node) {
  node.classList.remove("is-tapped");
  void node.offsetWidth;
  node.classList.add("is-tapped");
  window.setTimeout(() => node.classList.remove("is-tapped"), 220);
}

function stopAudio(silent = false) {
  if (audioState.timer) clearInterval(audioState.timer);
  audioState.timer = null;

  if (audioState.media) {
    audioState.media.pause();
    try {
      audioState.media.currentTime = 0;
    } catch {}
  }
  audioState.media = null;

  audioState.slug = null;
  audioState.duration = 0;
  audioState.elapsed = 0;
  audioState.playing = false;
  if (!silent) refreshAudioUi();
}

function startLocationAudio(slug, duration) {
  if (audioState.playing && audioState.slug === slug && audioState.duration === duration) {
    refreshAudioUi();
    return;
  }

  stopAudio(true);
  const media = warmAudio(slug);
  media.pause();
  try {
    media.currentTime = 0;
  } catch {}

  audioState.slug = slug;
  audioState.duration = duration;
  audioState.elapsed = 0;
  audioState.playing = true;
  audioState.media = media;

  const onEnded = () => stopAudio();
  media.addEventListener("ended", onEnded, { once: true });
  media.play().catch(() => {
    if (audioState.media === media) stopAudio();
  });

  audioState.timer = setInterval(() => {
    audioState.elapsed = Math.min(duration, media.currentTime || (audioState.elapsed + 0.1));
    if (audioState.elapsed >= duration) {
      stopAudio();
      return;
    }
    refreshAudioUi();
  }, 100);

  refreshAudioUi();
}

function playLocation(slug, duration) {
  const isSame = audioState.playing && audioState.slug === slug && audioState.duration === duration;
  if (isSame) {
    stopAudio();
    return;
  }

  startLocationAudio(slug, duration);
}

function refreshAudioUi() {
  document.querySelectorAll("[data-timer]").forEach((node) => {
    const total = Number(node.getAttribute("data-timer"));
    node.textContent = timerText(total);
  });

  document.querySelectorAll("[data-play-slug]").forEach((node) => {
    const slug = node.getAttribute("data-play-slug");
    const active = audioState.playing && audioState.slug === slug;
    node.classList.toggle("is-playing", active);
    node.closest(".archive-card")?.classList.toggle("playing", active);
    if (node.classList.contains("archive-play")) {
      const icon = node.querySelector("img");
      if (icon) icon.src = active ? archiveButtonAssets.pause : archiveButtonAssets.play;
    }
  });

  document.querySelectorAll(".wave").forEach((node) => {
    node.classList.toggle("playing", audioState.playing);
  });

  const now = document.querySelector(".now-playing");
  if (now) {
    const loc = locationBySlug(audioState.slug || state.selectedSlug);
    now.textContent = audioState.playing ? `Now Playing ${loc.title}` : "";
    now.classList.toggle("active", audioState.playing);
  }
}

function renderHome() {
  const loc = locationBySlug(state.selectedSlug);
  const focus = homeHotspots[state.homeActiveSlug] || homeHotspots.liziba;
  const focusActive = Boolean(state.homeActiveSlug);
  const hotspots = Object.entries(homeHotspots).map(([slug, box]) => `
    <button
      class="hotspot"
      data-home-location="${slug}"
      aria-label="Play ${escapeHtml(locationBySlug(slug).title)}"
      style="left:${box[0]}px;top:${box[1]}px;width:${box[2]}px;height:${box[3]}px"
    ></button>
  `).join("");

  return `
    <section class="scene" data-page="home">
      <img class="screen-bg" src="public/assets/screens/home-clean-intro.png" alt="" />
      ${makeNav()}
      <div class="home-intro-copy" aria-hidden="true">
        <h1><span>Hear</span><span>Chongqing.</span></h1>
        <p>Discover Chongqing<br>through sound and<br>culture.</p>
      </div>
      <div class="home-title-hit" aria-hidden="true"></div>
      <div class="home-copy-hit" aria-hidden="true"></div>
      <button class="hotspot home-explore" data-nav="map" aria-label="Explore map" style="left:284px;top:591px;width:227px;height:78px"></button>
      ${hotspots}
      <div class="home-focus ${focusActive ? "active" : ""}" style="left:${focus[0]}px;top:${focus[1]}px;width:${focus[2]}px;height:${focus[3]}px"></div>
      <div class="home-wave-card abs">
        ${waveBars("")}
        <div class="now-playing ${audioState.playing ? "active" : ""}">${audioState.playing ? `Now Playing ${escapeHtml(loc.title)}` : ""}</div>
      </div>
    </section>
  `;
}

function selectHomeLocation(slug) {
  const focus = homeHotspots[slug] || homeHotspots.liziba;
  state.selectedSlug = slug;
  state.homeActiveSlug = slug;

  const focusNode = app.querySelector(".home-focus");
  if (focusNode) {
    focusNode.style.left = `${focus[0]}px`;
    focusNode.style.top = `${focus[1]}px`;
    focusNode.style.width = `${focus[2]}px`;
    focusNode.style.height = `${focus[3]}px`;
    focusNode.classList.add("active");
    focusNode.classList.remove("is-pulsing");
    void focusNode.offsetWidth;
    focusNode.classList.add("is-pulsing");
  }

  playLocation(slug, 15);
  refreshAudioUi();
}

function focusMap(slug, keepZoom = true) {
  const loc = locationBySlug(slug);
  const zoom = keepZoom ? Math.max(state.map.zoom, mapViewport.minZoom) : 1.12;
  const [px, py] = loc.mapPoint;
  const x = 385 - px * zoom;
  const y = 402 - py * zoom;
  state.map.zoom = zoom;
  state.map.x = clamp(x, mapViewport.width - mapViewport.canvasWidth * zoom, 0);
  state.map.y = clamp(y, mapViewport.height - mapViewport.canvasHeight * zoom, 0);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clearSubFilterTimer() {
  if (subFilterTimer) clearTimeout(subFilterTimer);
  subFilterTimer = null;
}

function scheduleSubFilterAutoClose() {
  clearSubFilterTimer();
  if (state.page !== routes.map || !state.expandedCategory) return;
  subFilterTimer = setTimeout(() => {
    closeMapSubFilter();
  }, 8000);
}

function closeMapSubFilter() {
  state.expandedCategory = null;
  app.querySelector(".sub-filter")?.remove();
  app.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.remove("active");
  });
  clearSubFilterTimer();
}

function refreshMapSubFilter() {
  app.querySelector(".sub-filter")?.remove();
  if (!state.expandedCategory) {
    clearSubFilterTimer();
    return;
  }

  app.querySelector(".filter-layer")?.insertAdjacentHTML("afterend", renderSubFilter());
  wireMapSubFilter();
  scheduleSubFilterAutoClose();
}

function applyMapTransform() {
  const mapCanvas = document.getElementById("mapCanvas");
  if (mapCanvas) {
    mapCanvas.style.transform = `translate(${state.map.x}px, ${state.map.y}px) scale(${state.map.zoom})`;
  }
}

function refreshMapPreview() {
  const loc = locationBySlug(state.selectedSlug);
  const card = app.querySelector(".preview-card");
  if (!card) return;

  const image = card.querySelector("img");
  if (image) {
    image.classList.add("is-swapping");
    image.src = loc.preview;
    image.alt = loc.title;
    const settle = () => image.classList.remove("is-swapping");
    if (image.complete) {
      settle();
    } else {
      image.addEventListener("load", settle, { once: true });
      image.addEventListener("error", settle, { once: true });
    }
  }

  const title = card.querySelector("h2");
  if (title) title.textContent = loc.title;

  const pill = card.querySelector(".pill");
  if (pill) pill.textContent = loc.category;

  const previewText = card.querySelector(".preview-text");
  if (previewText) previewText.textContent = loc.intro;

  const playButton = card.querySelector("[data-play-slug]");
  if (playButton) playButton.setAttribute("data-play-slug", loc.slug);

  const detailButton = card.querySelector("[data-detail]");
  if (detailButton) detailButton.setAttribute("data-detail", loc.slug);
}

function refreshMapSelection() {
  app.querySelectorAll("[data-map-location]").forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-map-location") === state.selectedSlug);
  });

  app.querySelectorAll("[data-sub-location]").forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-sub-location") === state.selectedSlug);
  });

  refreshMapPreview();
  refreshAudioUi();
}

function selectMapLocation(slug, options = {}) {
  const loc = locationBySlug(slug);
  warmImage(loc.preview);
  warmAudio(slug);
  state.selectedSlug = slug;
  if (options.closeSubFilter) closeMapSubFilter();
  focusMap(slug, options.keepZoom ?? true);
  applyMapTransform();
  refreshMapSelection();
  if (options.autoplay) startLocationAudio(slug, 30);
}

function wireMapSubFilter() {
  app.querySelectorAll("[data-sub-location]").forEach((button) => {
    button.addEventListener("pointerenter", () => {
      const slug = button.getAttribute("data-sub-location");
      const loc = locationBySlug(slug);
      warmImage(loc.preview);
      warmAudio(slug);
    });
    button.addEventListener("click", () => {
      const slug = button.getAttribute("data-sub-location");
      selectMapLocation(slug, { keepZoom: false, closeSubFilter: true, autoplay: true });
    });
  });
}

function renderPin(loc) {
  return `
    <button
      class="pin ${loc.slug === state.selectedSlug ? "active" : ""}"
      data-map-location="${loc.slug}"
      style="left:${loc.mapPoint[0]}px;top:${loc.mapPoint[1]}px"
      aria-label="Focus ${escapeHtml(loc.title)}"
    ></button>
  `;
}

function renderSubFilter() {
  if (!state.expandedCategory) return "";
  const list = state.expandedCategory === "All"
    ? mapAllSubFilterOrder.map((slug) => locationBySlug(slug))
    : locations.filter((loc) => loc.category === state.expandedCategory);
  const topIndex = categories.indexOf(state.expandedCategory);
  return `
    <div class="sub-filter sub-filter-count-${list.length}" style="--sub-index:${topIndex}" role="menu">
      ${list.map((loc) => `
        <button class="${loc.slug === state.selectedSlug ? "active" : ""}" data-sub-location="${loc.slug}">
          ${escapeHtml(loc.title)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderMapPage() {
  const loc = locationBySlug(state.selectedSlug);
  const transform = `translate(${state.map.x}px, ${state.map.y}px) scale(${state.map.zoom})`;

  return `
    <section class="scene" data-page="map">
      <img class="screen-bg" src="public/assets/screens/map.jpg" alt="" />
      ${makeNav()}
      <div class="map-side-left"><h2>FILTER</h2></div>
      <div class="map-side-right"><h2>LOCATION PREVIEW</h2></div>
      <div class="filter-layer">
        ${categories.map((category) => `
          <button class="filter-hit ${state.expandedCategory === category ? "active" : ""}" data-filter="${category}">
            ${escapeHtml(category)}
          </button>
        `).join("")}
      </div>
      ${renderSubFilter()}
      <div class="map-window" id="mapWindow" aria-label="Zoomable Chongqing map">
        <div class="map-canvas" id="mapCanvas" style="transform:${transform}">
          <img src="public/assets/map/the-map-2.png" alt="" draggable="false" />
          ${locations.map(renderPin).join("")}
        </div>
      </div>
      <aside class="preview-card">
        <img src="${loc.preview}" alt="${escapeHtml(loc.title)}" decoding="async" fetchpriority="high" />
        <h2>${escapeHtml(loc.title)}</h2>
        <div class="pill">${escapeHtml(loc.category)}</div>
        <div class="preview-text">${escapeHtml(loc.intro)}</div>
        <div class="audio-box small">
          <button class="play-btn ${audioState.playing && audioState.slug === loc.slug ? "is-playing" : ""}" data-play-slug="${loc.slug}" data-duration="30" aria-label="Play preview"></button>
          ${waveBars("muted")}
          <span class="timer" data-timer="30">${timerText(30)}</span>
        </div>
        <button class="learn-more" data-detail="${loc.slug}">Learn More</button>
      </aside>
    </section>
  `;
}

function renderDetailPage() {
  const loc = locationBySlug(state.selectedSlug);
  return `
    <section class="scene" data-page="detail">
      <img class="screen-bg" src="public/assets/screens/detail.jpg" alt="" />
      <div class="detail-top">
        <button class="back-btn" data-nav="map" aria-label="Back to map"></button>
        <button class="detail-category" data-nav="home" aria-label="Back to home">HOME</button>
        <img class="detail-photo" src="${loc.detail}" alt="${escapeHtml(loc.title)}" />
        <div class="audio-box detail-audio">
          <button class="play-btn ${audioState.playing && audioState.slug === loc.slug ? "is-playing" : ""}" data-play-slug="${loc.slug}" data-duration="60" aria-label="Play detail audio"></button>
          ${waveBars("muted detail-wave", 2)}
          <span class="timer" data-timer="60">${timerText(60)}</span>
        </div>
        <section class="about-box">
          <h2>ABOUT HERE</h2>
          <p class="detail-text-reactive" data-reactive-text tabindex="0" role="button">${escapeHtml(loc.about)}</p>
          <span class="decor-star" style="right:28px;bottom:28px">&#10022;</span>
        </section>
        <section class="basic-box">
          <h2>BASIC INFO</h2>
          <dl class="detail-text-reactive" data-reactive-text tabindex="0" role="button">
            <dt>Category</dt>
            <dd>${escapeHtml(loc.category)}</dd>
            <dt>District</dt>
            <dd>${escapeHtml(loc.district)}</dd>
            <dt>Signature</dt>
            <dd>${escapeHtml(loc.signature)}</dd>
          </dl>
          <img class="basic-icon" src="${basicInfoPhoto(loc)}" alt="" />
        </section>
        <section class="related-box ${loc.slug === "liziba" ? "related-box-liziba" : ""}">
          <h2>RELATED LOCATIONS</h2>
          ${loc.related.map((item) => `
            <button class="related-item" data-related>
              <span class="decor-star" style="position:static;font-size:44px;-webkit-text-stroke:1px var(--deep-blue);animation:none">&#10022;</span>
              <span><strong>${escapeHtml(item[0])}</strong><span>${escapeHtml(item[1])}</span></span>
            </button>
          `).join("")}
        </section>
      </div>
    </section>
  `;
}

function visibleArchiveLocations() {
  return archiveOrder.map((slug) => locationBySlug(slug)).filter(archiveLocationMatches);
}

function archiveLocationMatches(loc) {
  const query = normalizeArchiveQuery(state.archiveQuery);
  const inCategory = state.archiveCategory === "All" || loc.category === state.archiveCategory;
  const initialMatch = archiveInitialKeys(loc).some((key) => key.startsWith(query));
  const nameMatch = archiveNameKeys(loc).some((key) => (
    key.startsWith(query) || (query.length > 1 && key.includes(query))
  ));
  const matches = !query || initialMatch || nameMatch;
  return inCategory && matches;
}

function normalizeArchiveQuery(value) {
  return value.replace(/[^a-z]/gi, "").toLowerCase();
}

function formatArchiveQueryInput(value) {
  return value.replace(/[^A-Za-z\s]/g, "").replace(/\s{2,}/g, " ").toUpperCase();
}

function archiveSearchLabels(loc) {
  return [loc.title, loc.homeLabel, loc.slug.replace(/-/g, " ")];
}

function archiveNameKeys(loc) {
  return archiveSearchLabels(loc).map(normalizeArchiveQuery).filter(Boolean);
}

function archiveInitialKeys(loc) {
  const labels = archiveSearchLabels(loc);
  const keys = new Set();
  labels.forEach((label) => {
    const words = label
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(/[^A-Za-z0-9]+/)
      .filter(Boolean);
    if (!words.length) return;
    keys.add(words.map((word) => word[0]).join("").toLowerCase());
    keys.add(words[0][0].toLowerCase());
  });
  return [...keys];
}

function renderArchiveCard(loc) {
  const playing = audioState.playing && audioState.slug === loc.slug;
  return `
    <article class="archive-card ${playing ? "playing" : ""}">
      <img src="${loc.archive}" alt="${escapeHtml(loc.title)}" decoding="async" loading="eager" />
      <h3>${escapeHtml(loc.title)}</h3>
      <div class="archive-pill">${escapeHtml(loc.category)}</div>
      <div class="archive-actions">
        <button class="icon-toggle like-toggle ${state.liked[loc.slug] ? "active" : ""}" data-like="${loc.slug}" aria-label="Favourite ${escapeHtml(loc.title)}">
          <img src="${state.liked[loc.slug] ? archiveButtonAssets.likeActive : archiveButtonAssets.like}" alt="" />
        </button>
        <button class="icon-toggle collect-toggle ${state.saved[loc.slug] ? "active" : ""}" data-save="${loc.slug}" aria-label="Bookmark ${escapeHtml(loc.title)}">
          <img src="${state.saved[loc.slug] ? archiveButtonAssets.collectActive : archiveButtonAssets.collect}" alt="" />
        </button>
      </div>
      <button class="archive-play ${playing ? "is-playing" : ""}" data-play-slug="${loc.slug}" data-duration="30" aria-label="Play ${escapeHtml(loc.title)}">
        <img src="${playing ? archiveButtonAssets.pause : archiveButtonAssets.play}" alt="" />
      </button>
    </article>
  `;
}

function renderArchiveGridContent() {
  const matches = visibleArchiveLocations();
  if (!matches.length) return `<div class="archive-empty">NO SOUND FOUND</div>`;
  return matches.map(renderArchiveCard).join("");
}

function renderArchivePage() {
  return `
    <section class="scene" data-page="archive">
      <img class="screen-bg" src="public/assets/screens/archive.jpg" alt="" />
      ${makeNav()}
      <div class="archive-layer">
        <form class="archive-search" id="archiveSearch">
          <input value="${escapeHtml(state.archiveQuery)}" placeholder="SEARCH FOR SOUNDS" aria-label="Search for sounds" />
          <button type="submit" aria-label="Search">&#128269;</button>
        </form>
        <div class="category-tabs">
          ${categories.map((category) => `
            <button class="category-tab ${state.archiveCategory === category ? "active" : ""}" data-archive-category="${category}">
              ${escapeHtml(category)}
            </button>
          `).join("")}
        </div>
        <img class="archive-grid-clean" src="public/assets/screens/archive-grid-clean.png" alt="" />
        <div class="archive-grid" id="archiveGrid">
          ${renderArchiveGridContent()}
        </div>
      </div>
    </section>
  `;
}

function renderAboutPage() {
  return `
    <section class="scene" data-page="about">
      <img class="screen-bg" src="public/assets/screens/about-clean-stars.png" alt="" />
      ${makeNav()}
      <span class="about-text-cover" style="left:153px;top:310px;width:224px;height:48px;--cover-bg:#F4DC73;--delay:80ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:153px;top:374px;width:274px;height:286px;--cover-bg:#F4DC73;--delay:150ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:520px;top:310px;width:326px;height:48px;--cover-bg:#FFC9FC;--delay:150ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:528px;top:378px;width:284px;height:240px;--cover-bg:#FFC9FC;--delay:220ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:902px;top:310px;width:330px;height:48px;--cover-bg:#B2C5FF;--delay:220ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:907px;top:382px;width:120px;height:26px;--cover-bg:#FFC9FC;--delay:290ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:919px;top:482px;width:98px;height:26px;--cover-bg:#FFC9FC;--delay:350ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:926px;top:582px;width:88px;height:26px;--cover-bg:#FFC9FC;--delay:410ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:915px;top:682px;width:112px;height:26px;--cover-bg:#FFC9FC;--delay:470ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:1074px;top:374px;width:212px;height:42px;--cover-bg:#B2C5FF;--delay:320ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:1074px;top:474px;width:220px;height:52px;--cover-bg:#B2C5FF;--delay:380ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:1074px;top:568px;width:238px;height:54px;--cover-bg:#B2C5FF;--delay:440ms" aria-hidden="true"></span>
      <span class="about-text-cover" style="left:1074px;top:663px;width:150px;height:54px;--cover-bg:#B2C5FF;--delay:500ms" aria-hidden="true"></span>
      <img class="about-touch-star about-star-sound" src="public/assets/about/star-original-sound.png" alt="" />
      <img class="about-touch-star about-star-chongqing" src="public/assets/about/star-original-chongqing.png" alt="" />
      <img class="about-touch-star about-star-process" src="public/assets/about/star-original-process.png" alt="" />
      <div class="about-title-hit about-title-sound" aria-hidden="true"></div>
      <div class="about-title-hit about-title-chongqing" aria-hidden="true"></div>
      <div class="about-title-hit about-title-process" aria-hidden="true"></div>
      <span class="about-word-hit" style="left:153px;top:377px;width:172px;height:23px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:153px;top:424px;width:212px;height:23px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:153px;top:473px;width:236px;height:23px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:153px;top:521px;width:213px;height:23px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:153px;top:568px;width:189px;height:23px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:153px;top:617px;width:242px;height:23px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:528px;top:381px;width:211px;height:23px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:528px;top:428px;width:230px;height:23px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:528px;top:476px;width:238px;height:23px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:528px;top:523px;width:271px;height:23px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:528px;top:571px;width:248px;height:23px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:1074px;top:374px;width:210px;height:35px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:1074px;top:474px;width:214px;height:47px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:1074px;top:568px;width:235px;height:48px" aria-hidden="true"></span>
      <span class="about-word-hit" style="left:1074px;top:663px;width:142px;height:47px" aria-hidden="true"></span>
      <div class="about-rights" aria-hidden="true">©2026 All Rights Reserved</div>
    </section>
  `;
}

function renderLoginPage() {
  return `
    <section class="scene" data-page="login">
      <img class="screen-bg" src="public/assets/screens/login-clean-motion.png" alt="" />
      ${makeNav()}
      <div class="login-intro" aria-hidden="true">
        <span class="login-welcome">Welcome!</span>
        <span class="login-sign">Sign in</span>
        <span class="login-to">to</span>
        <span class="login-brand">HEAR CHONGQING</span>
        <span class="login-register">If you don't have an account,you can <b>register here!</b></span>
      </div>
      <form class="login-form" id="loginForm">
        <label class="sr-only" for="username">User Name</label>
        <input id="username" class="username" name="username" placeholder="Enter with your E-mail or phone number." autocomplete="username" />
        <label class="sr-only" for="password">Password</label>
        <input id="password" class="password" name="password" placeholder="Enter with your password." type="password" autocomplete="current-password" maxlength="15" pattern="[A-Za-z0-9]{0,15}" />
        <button class="login-submit" type="submit">Login</button>
        <div class="login-feedback" id="loginFeedback">Input received. Prototype login is ready.</div>
      </form>
      <img class="login-star login-star-yellow" src="public/assets/login/star-login-yellow.png" alt="" />
      <img class="login-star login-star-blue" src="public/assets/login/star-login-blue.png" alt="" />
      <img class="login-star login-star-pink" src="public/assets/login/star-login-pink.png" alt="" />
      <img class="login-shape login-shape-pink" src="public/assets/login/shape-login-pink.png" alt="" />
      <img class="login-shape login-shape-blue" src="public/assets/login/shape-login-blue.png" alt="" />
    </section>
  `;
}

function render() {
  clearSubFilterTimer();
  const templates = {
    home: renderHome,
    map: renderMapPage,
    detail: renderDetailPage,
    archive: renderArchivePage,
    about: renderAboutPage,
    login: renderLoginPage,
  };

  cursorTrailActive = 0;
  cursorTrailLayer = null;
  app.innerHTML = templates[state.page]();
  ensureCursorTrail();
  wireCommon();
  if (state.page === routes.map) wireMap();
  if (state.page === routes.archive) wireArchive();
  if (state.page === routes.login) wireLogin();
  refreshAudioUi();
}

function ensureCursorTrail() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  cursorTrailLayer = app.querySelector(".cursor-trail-layer");
  if (!cursorTrailLayer) {
    cursorTrailLayer = document.createElement("div");
    cursorTrailLayer.className = "cursor-trail-layer";
    cursorTrailLayer.setAttribute("aria-hidden", "true");
    app.appendChild(cursorTrailLayer);
  }
  if (cursorTrailBound) return;
  app.addEventListener("pointermove", handleCursorTrailMove, { passive: true });
  app.addEventListener("pointerleave", () => {
    cursorTrailLastTime = 0;
  }, { passive: true });
  cursorTrailBound = true;
}

function handleCursorTrailMove(event) {
  if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
  if (!cursorTrailLayer) return;
  const now = performance.now();
  const rect = app.getBoundingClientRect();
  const scaleX = rect.width / app.offsetWidth || 1;
  const scaleY = rect.height / app.offsetHeight || 1;
  const x = (event.clientX - rect.left) / scaleX;
  const y = (event.clientY - rect.top) / scaleY;
  if (x < 0 || y < 0 || x > 1440 || y > 1024) return;
  const moved = Math.hypot(x - cursorTrailLastPoint.x, y - cursorTrailLastPoint.y);
  if (now - cursorTrailLastTime < 90 || moved < 34) return;
  cursorTrailLastTime = now;
  cursorTrailLastPoint = { x, y };

  const count = cursorTrailActive < 3 ? 2 : 1;
  for (let index = 0; index < count && cursorTrailActive < 5; index += 1) {
    spawnCursorTrailPiece(x, y);
  }
}

function spawnCursorTrailPiece(x, y) {
  const asset = cursorTrailAssets[cursorTrailCursor % cursorTrailAssets.length];
  cursorTrailCursor += 1;
  const piece = document.createElement("img");
  piece.className = "cursor-trail-piece";
  piece.src = asset.src;
  piece.alt = "";
  piece.decoding = "async";
  piece.draggable = false;
  const size = asset.size * (0.82 + Math.random() * 0.28);
  const startX = x + (Math.random() - 0.5) * 44;
  const startY = y + (Math.random() - 0.5) * 24;
  piece.style.left = `${startX}px`;
  piece.style.top = `${startY}px`;
  piece.style.width = `${size}px`;
  piece.style.setProperty("--drift-x", `${Math.round((Math.random() - 0.5) * 76)}px`);
  piece.style.setProperty("--fall-y", `${Math.round(112 + Math.random() * 78)}px`);
  piece.style.setProperty("--rotate-start", `${Math.round((Math.random() - 0.5) * 34)}deg`);
  piece.style.setProperty("--rotate-end", `${Math.round((Math.random() - 0.5) * 150)}deg`);
  piece.style.setProperty("--scale-end", `${(0.72 + Math.random() * 0.18).toFixed(2)}`);
  piece.style.setProperty("--fall-duration", `${Math.round(1120 + Math.random() * 420)}ms`);
  cursorTrailLayer.appendChild(piece);
  cursorTrailActive += 1;
  piece.addEventListener("animationend", () => {
    piece.remove();
    cursorTrailActive = Math.max(0, cursorTrailActive - 1);
  }, { once: true });
}

function wireCommon() {
  app.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("pointerenter", () => {
      warmRouteAssets(button.getAttribute("data-nav"));
    });
    button.addEventListener("focus", () => {
      warmRouteAssets(button.getAttribute("data-nav"));
    });
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-nav");
      warmRouteAssets(target);
      if (button.classList.contains("back-btn")) {
        button.classList.add("is-pressed");
        window.setTimeout(() => navigate(target), 120);
        return;
      }
      if (button.classList.contains("home-explore") || button.classList.contains("detail-category")) {
        button.classList.add("is-pressed");
        window.setTimeout(() => navigate(target), 140);
        return;
      }
      navigate(target);
    });
  });

  app.querySelectorAll("[data-home-location]").forEach((button) => {
    button.addEventListener("pointerenter", () => {
      const slug = button.getAttribute("data-home-location");
      warmAudio(slug);
    });
    button.addEventListener("click", () => {
      const slug = button.getAttribute("data-home-location");
      selectHomeLocation(slug);
    });
  });

  app.querySelectorAll("[data-play-slug]").forEach((button) => {
    if (button.closest("#archiveGrid")) return;
    button.addEventListener("pointerenter", () => {
      warmAudio(button.getAttribute("data-play-slug"));
    });
    button.addEventListener("click", () => {
      const slug = button.getAttribute("data-play-slug");
      const duration = Number(button.getAttribute("data-duration") || 30);
      state.selectedSlug = slug;
      playLocation(slug, duration);
      refreshAudioUi();
    });
  });

  app.querySelectorAll("[data-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      const slug = button.getAttribute("data-detail");
      if (button.classList.contains("learn-more")) {
        button.classList.add("is-pressed");
        window.setTimeout(() => navigate(routes.detail, slug), 140);
        return;
      }
      navigate(routes.detail, slug);
    });
  });

  app.querySelectorAll("[data-reactive-text]").forEach((node) => {
    node.addEventListener("click", () => pulseReactiveText(node));
    node.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      pulseReactiveText(node);
    });
  });
}

function wireMap() {
  const mapWindow = document.getElementById("mapWindow");
  const mapCanvas = document.getElementById("mapCanvas");
  if (!mapWindow || !mapCanvas) return;
  const mapScene = app.querySelector('[data-page="map"]');

  function applyTransform() {
    mapCanvas.style.transform = `translate(${state.map.x}px, ${state.map.y}px) scale(${state.map.zoom})`;
  }

  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startMapX = 0;
  let startMapY = 0;

  mapWindow.addEventListener("wheel", (event) => {
    event.preventDefault();
    const rect = mapWindow.getBoundingClientRect();
    const localX = (event.clientX - rect.left) / Number(getComputedStyle(document.documentElement).getPropertyValue("--scale"));
    const localY = (event.clientY - rect.top) / Number(getComputedStyle(document.documentElement).getPropertyValue("--scale"));
    const previous = state.map.zoom;
    const next = clamp(previous + (event.deltaY < 0 ? 0.1 : -0.1), mapViewport.minZoom, mapViewport.maxZoom);
    const imageX = (localX - state.map.x) / previous;
    const imageY = (localY - state.map.y) / previous;
    state.map.zoom = next;
    state.map.x = clamp(localX - imageX * next, mapViewport.width - mapViewport.canvasWidth * next, 0);
    state.map.y = clamp(localY - imageY * next, mapViewport.height - mapViewport.canvasHeight * next, 0);
    applyTransform();
  }, { passive: false });

  mapWindow.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[data-map-location]")) return;
    dragging = true;
    mapWindow.setPointerCapture(event.pointerId);
    startX = event.clientX;
    startY = event.clientY;
    startMapX = state.map.x;
    startMapY = state.map.y;
  });

  mapWindow.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const scale = Number(getComputedStyle(document.documentElement).getPropertyValue("--scale"));
    state.map.x = clamp(startMapX + (event.clientX - startX) / scale, mapViewport.width - mapViewport.canvasWidth * state.map.zoom, 0);
    state.map.y = clamp(startMapY + (event.clientY - startY) / scale, mapViewport.height - mapViewport.canvasHeight * state.map.zoom, 0);
    applyTransform();
  });

  mapWindow.addEventListener("pointerup", () => {
    dragging = false;
  });

  mapScene?.addEventListener("pointerdown", (event) => {
    if (!state.expandedCategory) return;
    if (event.target.closest("[data-filter], [data-sub-location]")) return;
    scheduleSubFilterAutoClose();
  });

  app.querySelectorAll("[data-map-location]").forEach((button) => {
    button.addEventListener("pointerenter", () => {
      const slug = button.getAttribute("data-map-location");
      const loc = locationBySlug(slug);
      warmImage(loc.preview);
      warmAudio(slug);
    });
    button.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const slug = button.getAttribute("data-map-location");
      selectMapLocation(slug, { keepZoom: true, autoplay: true });
    });
  });

  mapCanvas.addEventListener("click", (event) => {
    const pin = event.target.closest("[data-map-location]");
    if (!pin) return;
    event.stopPropagation();
    selectMapLocation(pin.getAttribute("data-map-location"), { keepZoom: true, autoplay: true });
  });

  app.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-filter");
      state.expandedCategory = category;
      app.querySelectorAll("[data-filter]").forEach((filterButton) => {
        filterButton.classList.toggle("active", filterButton === button);
      });
      refreshMapSubFilter();
    });
  });

  wireMapSubFilter();

  scheduleSubFilterAutoClose();
}

function wireArchive() {
  const form = document.getElementById("archiveSearch");
  const input = form?.querySelector("input");

  function refreshArchiveResults() {
    app.querySelectorAll("[data-archive-category]").forEach((button) => {
      button.classList.toggle("active", button.getAttribute("data-archive-category") === state.archiveCategory);
    });
    const grid = document.getElementById("archiveGrid");
    if (grid) grid.innerHTML = renderArchiveGridContent();
    wireArchiveCards();
    refreshAudioUi();
  }

  if (input) {
    input.addEventListener("input", () => {
      const query = formatArchiveQueryInput(input.value);
      if (input.value !== query) input.value = query;
      state.archiveQuery = query;
      refreshArchiveResults();
    });
  }
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = formatArchiveQueryInput(input?.value || "");
    if (input) input.value = query;
    state.archiveQuery = query;
    refreshArchiveResults();
  });

  app.querySelectorAll("[data-archive-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.archiveCategory = button.getAttribute("data-archive-category");
      refreshArchiveResults();
    });
  });

  wireArchiveCards();
}

function wireArchiveCards() {
  app.querySelectorAll("#archiveGrid [data-play-slug]").forEach((button) => {
    button.addEventListener("pointerenter", () => {
      warmAudio(button.getAttribute("data-play-slug"));
    });
    button.addEventListener("click", () => {
      const slug = button.getAttribute("data-play-slug");
      const duration = Number(button.getAttribute("data-duration") || 30);
      state.selectedSlug = slug;
      playLocation(slug, duration);
      refreshAudioUi();
    });
  });

  app.querySelectorAll("[data-like]").forEach((button) => {
    button.addEventListener("click", () => {
      const slug = button.getAttribute("data-like");
      state.liked[slug] = !state.liked[slug];
      button.classList.toggle("active", state.liked[slug]);
      const icon = button.querySelector("img");
      if (icon) icon.src = state.liked[slug] ? archiveButtonAssets.likeActive : archiveButtonAssets.like;
    });
  });

  app.querySelectorAll("[data-save]").forEach((button) => {
    button.addEventListener("click", () => {
      const slug = button.getAttribute("data-save");
      state.saved[slug] = !state.saved[slug];
      button.classList.toggle("active", state.saved[slug]);
      const icon = button.querySelector("img");
      if (icon) icon.src = state.saved[slug] ? archiveButtonAssets.collectActive : archiveButtonAssets.collect;
    });
  });
}

function wireLogin() {
  const form = document.getElementById("loginForm");
  const feedback = document.getElementById("loginFeedback");
  const password = document.getElementById("password");
  password?.addEventListener("input", () => {
    password.value = password.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 15);
  });
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback?.classList.add("active");
  });
}

window.addEventListener("resize", setScale);
window.addEventListener("hashchange", () => {
  parseHash();
  render();
});

setScale();
parseHash();
render();
scheduleAssetPreload();
