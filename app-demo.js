const app = document.getElementById("appDemo");

const routes = {
  home: "home",
  map: "map",
  archive: "archive",
};

const locations = [
  {
    slug: "liziba",
    title: "Liziba Station",
    short: "Liziba",
    category: "Transportation",
    audio: "AUDIO REPLACEMENT/LIZIBA.mp3",
    preview: "public/assets/preview/liziba.jpg",
    mapIcon: "APP/2-MAP/PHOTO CARD/LIZIBA.png",
    archivePhotos: [
      "APP/3-ARCHIVE/LIZIBA1.jpg",
      "APP/3-ARCHIVE/LIZIBA2.jpg",
      "APP/3-ARCHIVE/LIZIBA3.jpg",
    ],
    about: "A landmark where monorail sounds pass through Chongqing's layered urban landscape.",
    mapPoint: [345, 256],
  },
  {
    slug: "jiefangbei",
    title: "JieFangBei",
    short: "JieFangBei",
    category: "Street Life",
    audio: "AUDIO REPLACEMENT/JIEFANGBEI.mp3",
    preview: "public/assets/preview/jiefangbei.jpg",
    mapIcon: "APP/2-MAP/PHOTO CARD/JIEFANGBEI.png",
    archivePhotos: [
      "APP/3-ARCHIVE/JIEFANGBEI1.jpg",
      "APP/3-ARCHIVE/JIEFANGBEI2.jpg",
      "APP/3-ARCHIVE/JIEFANGBEI3.jpg",
    ],
    about: "A lively city center filled with crowds, traffic, commerce, and street ambience.",
    mapPoint: [538, 260],
  },
  {
    slug: "ranjiaba",
    title: "RanJiaBa",
    short: "RanJiaBa",
    category: "Street Life",
    audio: "AUDIO REPLACEMENT/RANJIABA.MP3",
    preview: "public/assets/preview/ranjiaba.jpg",
    mapIcon: "APP/2-MAP/PHOTO CARD/RANJIABA.png",
    archivePhotos: [
      "APP/3-ARCHIVE/RANJIABA1.jpg",
      "APP/3-ARCHIVE/RANJIABA2.jpg",
      "APP/3-ARCHIVE/RANJIABA3.jpg",
    ],
    about: "A daily transit and street-life hub shaped by movement, commuters, and public noise.",
    mapPoint: [119, 111],
  },
  {
    slug: "eling",
    title: "ELing Park",
    short: "ELing",
    category: "Culture",
    audio: "AUDIO REPLACEMENT/ELING PARK.mp3",
    preview: "public/assets/preview/eling.jpg",
    mapIcon: "APP/2-MAP/PHOTO CARD/ELING PARK.png",
    archivePhotos: [
      "APP/3-ARCHIVE/ELING PARK1.jpg",
      "APP/3-ARCHIVE/ELING PARK2.jpg",
      "APP/3-ARCHIVE/ELING PARK3.jpg",
    ],
    about: "A cultural hilltop space where history, views, and quiet city sounds meet.",
    mapPoint: [323, 298],
  },
  {
    slug: "nanshan",
    title: "NanShan",
    short: "NanShan",
    category: "Nature",
    audio: "AUDIO REPLACEMENT/NANSHAN.mp3",
    preview: "public/assets/preview/nanshan.jpg",
    mapIcon: "APP/2-MAP/PHOTO CARD/NANSHAN.png",
    archivePhotos: [
      "APP/3-ARCHIVE/NANSHAN1.jpg",
      "APP/3-ARCHIVE/NANSHAN2.jpg",
      "APP/3-ARCHIVE/NANSHAN3.jpg",
    ],
    about: "A natural escape above the city, filled with wind, birds, and mountain atmosphere.",
    mapPoint: [701, 371],
  },
  {
    slug: "grand-theater",
    title: "Grand Theater",
    short: "Grand Theater",
    category: "Culture",
    audio: "AUDIO REPLACEMENT/GRAND THEATER.mp3",
    preview: "public/assets/preview/grand-theater.jpg",
    mapIcon: "APP/2-MAP/PHOTO CARD/GRAND THEATER.png",
    archivePhotos: [
      "APP/3-ARCHIVE/GRAND THEATER1.jpg",
      "APP/3-ARCHIVE/GRAND THEATER2.jpg",
      "APP/3-ARCHIVE/GRAND THEATER3.jpg",
    ],
    about: "A riverside cultural venue where performance sounds mix with public urban life.",
    mapPoint: [465, 144],
  },
];

const categories = {
  Transportation: ["liziba"],
  "Street Life": ["jiefangbei", "ranjiaba"],
  Culture: ["eling", "grand-theater"],
  Nature: ["nanshan"],
};

const state = {
  page: routes.home,
  selectedSlug: "liziba",
  filterOpen: false,
  archiveFilterOpen: false,
  archivePhotoIndex: 0,
  liked: false,
  map: {
    zoom: 0.86,
    x: -242,
    y: 177,
  },
};

const audioState = {
  slug: null,
  media: null,
  playing: false,
  elapsed: 0,
  duration: 30,
  timer: null,
};

function loc(slug = state.selectedSlug) {
  return locations.find((item) => item.slug === slug) || locations[0];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setScale() {
  const pad = 18;
  const scale = Math.min((window.innerWidth - pad) / 393, (window.innerHeight - pad) / 852, 1);
  document.documentElement.style.setProperty("--scale", String(Math.max(scale, 0.32)));
}

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [page, slug] = raw.split("/");
  if (routes[page]) state.page = page;
  if (slug && locations.some((item) => item.slug === slug)) state.selectedSlug = slug;
}

function navigate(page, slug = state.selectedSlug) {
  state.page = page;
  state.selectedSlug = slug;
  state.filterOpen = false;
  state.archiveFilterOpen = false;
  state.archivePhotoIndex = 0;
  if (page === routes.map) focusMap(slug);
  window.location.hash = `/${page}/${slug}`;
  render();
}

function categoryTarget(category) {
  const list = categories[category] || ["liziba"];
  const current = list.includes(state.selectedSlug) ? state.selectedSlug : list[0];
  return current;
}

function searchLocation(value) {
  const query = value.replace(/[^a-z]/gi, "").toLowerCase();
  if (!query) return loc();
  return locations.find((item) => {
    const words = [item.title, item.short, item.slug.replace(/-/g, " ")];
    return words.some((word) => {
      const compact = word.replace(/[^a-z]/gi, "").toLowerCase();
      const initials = word.split(/[^a-z0-9]+/i).filter(Boolean).map((part) => part[0]).join("").toLowerCase();
      return compact.startsWith(query) || initials.startsWith(query);
    });
  }) || loc();
}

function nav() {
  return `
    <button class="hit nav-home" data-nav="home" aria-label="Home"></button>
    <button class="hit nav-map" data-nav="map" aria-label="Map"></button>
    <button class="hit nav-archive" data-nav="archive" aria-label="Archive"></button>
    <button class="hit nav-me" data-touch-only aria-label="Me"></button>
    <span class="nav-active-label ${state.page}">${state.page === routes.archive ? "ARCHIVE" : state.page.toUpperCase()}</span>
  `;
}

function wave() {
  const heights = [17, 28, 38, 25, 31, 20, 24, 33, 22, 42, 34, 20, 29, 24, 36, 19, 30, 41, 24, 30, 21];
  const playing = audioState.playing ? "playing" : "";
  return `<div class="wave ${playing}">${heights.map((h, i) => `<span style="--h:${h};--i:${i}"></span>`).join("")}</div>`;
}

function timeText() {
  const sec = Math.min(30, Math.floor(audioState.elapsed));
  return `0:${String(sec).padStart(2, "0")}`;
}

function stopAudio() {
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
  audioState.playing = false;
  audioState.elapsed = 0;
  refreshPlayingUi();
}

function playLocation(slug) {
  if (audioState.playing && audioState.slug === slug) {
    stopAudio();
    return;
  }
  stopAudio();
  const selected = loc(slug);
  const media = new Audio(selected.audio);
  media.preload = "auto";
  audioState.slug = slug;
  audioState.media = media;
  audioState.playing = true;
  audioState.elapsed = 0;
  media.play().catch(() => {});
  audioState.timer = setInterval(() => {
    audioState.elapsed = Math.min(30, media.currentTime || audioState.elapsed + 0.1);
    if (audioState.elapsed >= 30) stopAudio();
    refreshPlayingUi();
  }, 100);
  refreshPlayingUi();
}

function refreshPlayingUi() {
  document.querySelectorAll(".wave").forEach((node) => node.classList.toggle("playing", audioState.playing));
  document.querySelectorAll("[data-play]").forEach((button) => {
    button.classList.toggle("is-playing", audioState.playing && button.getAttribute("data-play") === audioState.slug);
  });
  document.querySelectorAll("[data-current-time]").forEach((node) => {
    node.textContent = timeText();
  });
}

function renderHome() {
  return `
    <section class="screen home-screen">
      <img class="screen-bg" src="APP/APP-HOME.png" alt="" />
      <span class="home-copy-pulse" aria-hidden="true"></span>
      <form class="home-search" data-search="archive">
        <input class="search-input" name="q" autocomplete="off" placeholder="Search" />
        <button class="search-submit" type="submit" aria-label="Search archive"></button>
      </form>
      <button class="hit" style="left:25px;top:407px;width:76px;height:96px" data-category="Transportation"></button>
      <button class="hit" style="left:111px;top:407px;width:76px;height:96px" data-category="Street Life"></button>
      <button class="hit" style="left:197px;top:407px;width:76px;height:96px" data-category="Culture"></button>
      <button class="hit" style="left:283px;top:407px;width:76px;height:96px" data-category="Nature"></button>
      <div class="home-carousel" aria-label="Popular locations">
        ${locations.map((item) => `
          <button class="home-card" data-home-location="${item.slug}">
            <img src="${item.preview}" alt="" />
            <span>${escapeHtml(item.short)}</span>
          </button>
        `).join("")}
      </div>
      ${nav()}
    </section>
  `;
}

function mapPin(item) {
  const active = item.slug === state.selectedSlug ? "active" : "";
  return `
    <button class="map-pin ${active}" data-map-location="${item.slug}" style="left:${item.mapPoint[0]}px;top:${item.mapPoint[1]}px">
      <span>${escapeHtml(item.short)}</span>
    </button>
  `;
}

function filterMenu(kind = "map") {
  return `
    <div class="filter-menu ${kind === "archive" ? "archive-filter-menu" : ""}" role="menu">
      ${locations.map((item) => `
        <button class="${item.slug === state.selectedSlug ? "active" : ""}" data-filter-location="${item.slug}">
          ${escapeHtml(item.title)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderMapCard() {
  const selected = loc();
  return `
    <section class="map-card">
      <img class="map-card-icon" src="${selected.mapIcon}" alt="" />
      <h2 class="map-card-title">${escapeHtml(selected.title)}</h2>
      <div class="map-card-category">${escapeHtml(selected.category)}</div>
      ${wave()}
      <button class="play-toggle" data-play="${selected.slug}" aria-label="Play ${escapeHtml(selected.title)}"></button>
    </section>
  `;
}

function renderMap() {
  const transform = `translate(${state.map.x}px, ${state.map.y}px) scale(${state.map.zoom})`;
  return `
    <section class="screen map-screen">
      <img class="screen-bg" src="APP/APP-MAP.png" alt="" />
      <div class="map-window" id="mapWindow">
        <div class="map-canvas" id="mapCanvas" style="transform:${transform}">
          <img src="public/assets/map/the-map-2.png" alt="" draggable="false" />
          ${locations.map(mapPin).join("")}
        </div>
      </div>
      <h1 class="map-title">MAP</h1>
      <form class="map-search" data-search="map">
        <input class="search-input" name="q" autocomplete="off" placeholder="Search" />
        <button class="search-menu-toggle" type="button" aria-label="Open location filter"></button>
      </form>
      ${state.filterOpen ? filterMenu("map") : ""}
      ${renderMapCard()}
      ${nav()}
    </section>
  `;
}

function renderArchive() {
  const selected = loc();
  const photo = selected.archivePhotos[state.archivePhotoIndex % selected.archivePhotos.length];
  const filterClass = state.archiveFilterOpen ? "filter-screen" : "";
  return `
    <section class="screen archive-screen ${filterClass}">
      <img class="screen-bg" src="${state.archiveFilterOpen ? "APP/3-ARCHIVE/APP-ARCHIVE -FILTER.png" : "APP/APP-ARCHIVE.png"}" alt="" />
      <button class="archive-photo" data-next-photo aria-label="Next photo">
        <img src="${photo}" alt="${escapeHtml(selected.title)}" />
      </button>
      <div class="slide-dots" aria-hidden="true">
        ${[0, 1, 2].map((i) => `<span class="${i === state.archivePhotoIndex ? "active" : ""}"></span>`).join("")}
      </div>
      <h1 class="archive-title">${escapeHtml(selected.title)}</h1>
      <div class="archive-category">${escapeHtml(selected.category)}</div>
      <button class="heart-toggle ${state.liked ? "active" : ""}" data-like aria-label="Like"></button>
      <section class="archive-audio">
        <button class="play-toggle" data-play="${selected.slug}" aria-label="Play ${escapeHtml(selected.title)}"></button>
        ${wave()}
        <span class="timer-start" data-current-time>${timeText()}</span>
        <span class="timer-end">0:30</span>
      </section>
      <section class="about-card reveal">
        <h2>ABOUT HERE</h2>
        <p>${escapeHtml(selected.about)}</p>
      </section>
      <button class="hit filter-toggle-hit" data-archive-filter aria-label="Open archive filter"></button>
      ${state.archiveFilterOpen ? filterMenu("archive") : ""}
      ${nav()}
    </section>
  `;
}

function render() {
  const templates = {
    home: renderHome,
    map: renderMap,
    archive: renderArchive,
  };
  app.innerHTML = templates[state.page]();
  wire();
  refreshPlayingUi();
}

function focusMap(slug) {
  const selected = loc(slug);
  const zoom = Math.max(state.map.zoom, 0.86);
  state.map.zoom = zoom;
  state.map.x = Math.min(0, Math.max(393 - 965 * zoom, 196 - selected.mapPoint[0] * zoom));
  state.map.y = Math.min(250, Math.max(0, 390 - selected.mapPoint[1] * zoom));
}

function applyMapTransform() {
  const canvas = document.getElementById("mapCanvas");
  if (canvas) canvas.style.transform = `translate(${state.map.x}px, ${state.map.y}px) scale(${state.map.zoom})`;
}

function wire() {
  app.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-nav");
      if (target === routes.map) navigate(routes.map, state.selectedSlug);
      else if (target === routes.archive) navigate(routes.archive, state.selectedSlug);
      else navigate(routes.home, state.selectedSlug);
    });
  });

  app.querySelectorAll("[data-touch-only]").forEach((button) => {
    button.addEventListener("click", () => {
      button.animate([{ transform: "scale(0.96)" }, { transform: "scale(1)" }], { duration: 180, easing: "ease" });
    });
  });

  app.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      navigate(routes.map, categoryTarget(button.getAttribute("data-category")));
    });
  });

  app.querySelectorAll("[data-home-location]").forEach((button) => {
    button.addEventListener("click", () => navigate(routes.map, button.getAttribute("data-home-location")));
  });

  app.querySelectorAll("[data-search]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const target = form.getAttribute("data-search");
      const match = searchLocation(new FormData(form).get("q") || "");
      state.selectedSlug = match.slug;
      state.archivePhotoIndex = 0;
      if (target === "archive") navigate(routes.archive, match.slug);
      else {
        focusMap(match.slug);
        state.filterOpen = false;
        render();
      }
    });
  });

  app.querySelector(".search-menu-toggle")?.addEventListener("click", () => {
    state.filterOpen = !state.filterOpen;
    render();
  });

  app.querySelectorAll("[data-filter-location]").forEach((button) => {
    button.addEventListener("click", () => {
      const slug = button.getAttribute("data-filter-location");
      state.selectedSlug = slug;
      state.archivePhotoIndex = 0;
      state.filterOpen = false;
      state.archiveFilterOpen = false;
      if (state.page === routes.archive) navigate(routes.archive, slug);
      else {
        focusMap(slug);
        playLocation(slug);
        render();
      }
    });
  });

  app.querySelectorAll("[data-map-location]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const slug = button.getAttribute("data-map-location");
      state.selectedSlug = slug;
      focusMap(slug);
      playLocation(slug);
      render();
    });
  });

  app.querySelectorAll("[data-play]").forEach((button) => {
    button.addEventListener("click", () => playLocation(button.getAttribute("data-play")));
  });

  app.querySelector("[data-next-photo]")?.addEventListener("click", () => {
    state.archivePhotoIndex = (state.archivePhotoIndex + 1) % 3;
    render();
  });

  app.querySelector("[data-like]")?.addEventListener("click", () => {
    state.liked = !state.liked;
    render();
  });

  app.querySelector("[data-archive-filter]")?.addEventListener("click", () => {
    state.archiveFilterOpen = !state.archiveFilterOpen;
    render();
  });

  wireMapDrag();
}

function wireMapDrag() {
  const win = document.getElementById("mapWindow");
  if (!win) return;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let mapX = 0;
  let mapY = 0;

  win.addEventListener("wheel", (event) => {
    event.preventDefault();
    const next = Math.min(1.7, Math.max(0.72, state.map.zoom + (event.deltaY < 0 ? 0.08 : -0.08)));
    state.map.zoom = next;
    state.map.x = Math.min(0, Math.max(393 - 965 * next, state.map.x));
    state.map.y = Math.min(250, Math.max(0, state.map.y));
    applyMapTransform();
  }, { passive: false });

  win.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[data-map-location]")) return;
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    mapX = state.map.x;
    mapY = state.map.y;
    win.setPointerCapture(event.pointerId);
  });

  win.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const scale = Number(getComputedStyle(document.documentElement).getPropertyValue("--scale")) || 1;
    const nextX = mapX + (event.clientX - startX) / scale;
    const nextY = mapY + (event.clientY - startY) / scale;
    state.map.x = Math.min(0, Math.max(393 - 965 * state.map.zoom, nextX));
    state.map.y = Math.min(250, Math.max(0, nextY));
    applyMapTransform();
  });

  win.addEventListener("pointerup", () => {
    dragging = false;
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
