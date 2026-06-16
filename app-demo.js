const BASE_W = 393;
const BASE_H = 852;

const HOME = "APP/APP-HOME.png";
const MAP = "APP/APP-MAP.png";

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

const archiveFrames = Object.fromEntries(
  locationOrder.map((slug) => [
    slug,
    [0, 1, 2].map((index) => `APP/demo-frames/archive-${slug}-${index}.jpg`),
  ]),
);

const state = {
  view: "home",
  slug: "liziba",
  photo: 0,
};

const app = document.getElementById("appDemo");
const phone = document.createElement("section");
const screen = document.createElement("img");

phone.className = "phone";
phone.setAttribute("aria-label", "HEAR CHONGQING app demo");
screen.className = "screen-image";
screen.loading = "eager";
screen.decoding = "sync";
screen.draggable = false;
phone.append(screen);
app.replaceChildren(phone);

function archiveSrc(slug = state.slug, photo = state.photo) {
  return archiveFrames[slug]?.[photo] || archiveFrames.liziba[0];
}

function currentSrc() {
  if (state.view === "home") return HOME;
  if (state.view === "map") return MAP;
  return archiveSrc();
}

function preloadFrames() {
  const sources = [
    HOME,
    MAP,
    ...Object.values(archiveFrames).flat(),
  ];

  sources.forEach((src) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  });
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

function render() {
  clampState();
  const src = currentSrc();
  if (!screen.getAttribute("src")?.endsWith(src)) {
    screen.src = src;
  }
  screen.alt = `HEAR CHONGQING ${state.view} ${labels[state.slug] || ""}`.trim();
  updateUrl();
}

function go(view, slug = state.slug, photo = 0) {
  state.view = view;
  state.slug = archiveFrames[slug] ? slug : state.slug;
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
  const rect = screen.getBoundingClientRect();
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

screen.addEventListener("click", handleScreenClick);
preloadFrames();
syncFromHash();
