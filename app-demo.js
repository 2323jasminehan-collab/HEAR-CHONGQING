const BASE_W = 393;
const BASE_H = 852;

const screens = {
  home: "APP/APP-HOME.png",
  map: "APP/APP-MAP.png",
  archive: "APP/APP-ARCHIVE.png",
  archiveFilter: "APP/3-ARCHIVE/APP-ARCHIVE -FILTER.png",
};

const locations = {
  liziba: {
    name: "Liziba Station",
    category: "Transportation",
    about: "A landmark where monorail sounds pass through Chongqing's layered urban landscape.",
    photos: [
      "APP/3-ARCHIVE/LIZIBA1.jpg",
      "APP/3-ARCHIVE/LIZIBA2.jpg",
      "APP/3-ARCHIVE/LIZIBA3.jpg",
    ],
  },
  "eling-park": {
    name: "ELing Park",
    category: "Nature",
    about: "Wind, footsteps, and hillside views gather above the river at one of Chongqing's quiet overlooks.",
    photos: [
      "APP/3-ARCHIVE/ELING PARK1.jpg",
      "APP/3-ARCHIVE/ELING PARK2.jpg",
      "APP/3-ARCHIVE/ELING PARK3.jpg",
    ],
  },
  "grand-theater": {
    name: "Grand Theater",
    category: "Culture",
    about: "A riverside cultural landmark where open plazas, performances, and traffic hum meet.",
    photos: [
      "APP/3-ARCHIVE/GRAND THEATER1.jpg",
      "APP/3-ARCHIVE/GRAND THEATER2.jpg",
      "APP/3-ARCHIVE/GRAND THEATER3.jpg",
    ],
  },
  jiefangbei: {
    name: "JieFangBei",
    category: "Life",
    about: "Crowds, crossings, shops, and street voices create the city's busy downtown rhythm.",
    photos: [
      "APP/3-ARCHIVE/JIEFANGBEI1.jpg",
      "APP/3-ARCHIVE/JIEFANGBEI2.jpg",
      "APP/3-ARCHIVE/JIEFANGBEI3.jpg",
    ],
  },
  nanshan: {
    name: "NanShan",
    category: "Nature",
    about: "A mountain viewpoint where distant city noise softens into leaves, wind, and open air.",
    photos: [
      "APP/3-ARCHIVE/NANSHAN1.jpg",
      "APP/3-ARCHIVE/NANSHAN2.jpg",
      "APP/3-ARCHIVE/NANSHAN3.jpg",
    ],
  },
  ranjiaba: {
    name: "RanJiaBa",
    category: "Life",
    about: "Everyday neighborhood movement, transit, and small street sounds form a local sound layer.",
    photos: [
      "APP/3-ARCHIVE/RANJIABA1.jpg",
      "APP/3-ARCHIVE/RANJIABA2.jpg",
      "APP/3-ARCHIVE/RANJIABA3.jpg",
    ],
  },
};

const state = {
  page: "home",
  selected: "liziba",
  photoIndex: 0,
  filterOpen: false,
};

const app = document.getElementById("appDemo");

function px(value, base) {
  return `${(value / base) * 100}%`;
}

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === "className") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key === "style") Object.assign(node.style, value);
    else node.setAttribute(key, value);
  });
  children.forEach((child) => node.append(child));
  return node;
}

function hotspot(label, rect, onClick) {
  const node = el("button", {
    type: "button",
    className: "hotspot",
    "aria-label": label,
  });
  const [x, y, width, height] = rect;
  Object.assign(node.style, {
    left: px(x, BASE_W),
    top: px(y, BASE_H),
    width: px(width, BASE_W),
    height: px(height, BASE_H),
  });
  node.addEventListener("click", onClick);
  return node;
}

function background(src) {
  return el("img", {
    className: "screen-bg",
    src,
    alt: "",
    draggable: "false",
  });
}

function navigate(page, selected = state.selected) {
  state.page = page;
  state.selected = locations[selected] ? selected : "liziba";
  state.photoIndex = 0;
  state.filterOpen = false;
  const nextHash = `#/${state.page}/${state.selected}`;
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
  } else {
    render();
  }
}

function addNav(layer) {
  layer.append(
    hotspot("Home", [24, 750, 76, 96], () => navigate("home")),
    hotspot("Map", [116, 750, 78, 96], () => navigate("map")),
    hotspot("Archive", [204, 750, 82, 96], () => navigate("archive")),
    hotspot("Me", [295, 750, 74, 96], () => navigate("home")),
  );
}

function renderHome(layer) {
  layer.append(background(screens.home));

  layer.append(
    hotspot("Search opens archive", [25, 311, 334, 52], () => navigate("archive")),
    hotspot("Transport category", [25, 407, 75, 75], () => navigate("map", "liziba")),
    hotspot("Life category", [110, 407, 75, 75], () => navigate("map", "jiefangbei")),
    hotspot("Culture category", [198, 407, 75, 75], () => navigate("map", "grand-theater")),
    hotspot("Nature category", [283, 407, 75, 75], () => navigate("map", "nanshan")),
    hotspot("Liziba Station", [25, 543, 102, 164], () => navigate("archive", "liziba")),
    hotspot("JieFangBei", [141, 543, 102, 164], () => navigate("archive", "jiefangbei")),
    hotspot("NanShan", [257, 543, 102, 164], () => navigate("archive", "nanshan")),
  );

  addNav(layer);
}

function renderMap(layer) {
  layer.append(background(screens.map));

  layer.append(
    hotspot("Search opens selected archive", [29, 110, 332, 50], () => navigate("archive")),
    hotspot("Grand Theater", [165, 211, 104, 92], () => navigate("archive", "grand-theater")),
    hotspot("JieFangBei", [201, 388, 146, 63], () => navigate("archive", "jiefangbei")),
    hotspot("Liziba Station sound card", [30, 560, 333, 146], () => navigate("archive", "liziba")),
  );

  addNav(layer);
}

function renderArchiveInfo(layer) {
  const item = locations[state.selected] || locations.liziba;
  const showPhotoSwap = state.selected !== "liziba" || state.photoIndex > 0;

  if (showPhotoSwap) {
    layer.append(
      el("div", {
        className: "archive-photo",
        style: { backgroundImage: `url("${item.photos[state.photoIndex]}")` },
      }),
    );

    const dots = el("div", { className: "archive-dots", "aria-hidden": "true" });
    item.photos.forEach((_, index) => {
      dots.append(el("span", { className: `archive-dot${index === state.photoIndex ? " is-active" : ""}` }));
    });
    layer.append(dots);
  }

  if (state.selected !== "liziba") {
    layer.append(
      el("h1", { className: "archive-title", text: item.name }),
      el("div", { className: "archive-category", text: item.category }),
      el("section", { className: "archive-about" }, [
        el("h2", { text: "ABOUT HERE" }),
        el("p", { text: item.about }),
      ]),
    );
  }
}

function renderArchive(layer) {
  layer.append(background(state.filterOpen ? screens.archiveFilter : screens.archive));

  if (state.filterOpen) {
    const filterItems = [
      ["liziba", [228, 88, 99, 24]],
      ["eling-park", [228, 112, 99, 24]],
      ["grand-theater", [228, 136, 99, 24]],
      ["jiefangbei", [228, 160, 99, 24]],
      ["nanshan", [228, 184, 99, 24]],
      ["ranjiaba", [228, 208, 99, 24]],
    ];

    filterItems.forEach(([slug, rect]) => {
      layer.append(
        hotspot(locations[slug].name, rect, () => {
          state.selected = slug;
          state.photoIndex = 0;
          state.filterOpen = false;
          render();
        }),
      );
    });
    layer.append(hotspot("Close filter", [330, 82, 33, 28], () => {
      state.filterOpen = false;
      render();
    }));
  } else {
    renderArchiveInfo(layer);
    layer.append(hotspot("Open archive filter", [330, 82, 33, 28], () => {
      state.filterOpen = true;
      render();
    }));
    layer.append(hotspot("Next archive photo", [30, 111, 333, 238], () => {
      const item = locations[state.selected] || locations.liziba;
      state.photoIndex = (state.photoIndex + 1) % item.photos.length;
      render();
    }));
  }

  addNav(layer);
}

function render() {
  const phone = el("section", {
    className: "phone",
    "aria-label": "HEAR CHONGQING app demo",
  });
  const layer = el("div", { className: "screen" });

  if (state.page === "map") renderMap(layer);
  else if (state.page === "archive") renderArchive(layer);
  else renderHome(layer);

  phone.append(layer);
  app.replaceChildren(phone);
}

function syncFromHash() {
  const [, pageFromHash, selectedFromHash] = window.location.hash.split("/");
  state.page = ["home", "map", "archive"].includes(pageFromHash) ? pageFromHash : "home";
  state.selected = locations[selectedFromHash] ? selectedFromHash : "liziba";
  state.photoIndex = 0;
  state.filterOpen = false;
  render();
}

window.addEventListener("hashchange", syncFromHash);

if (!window.location.hash) {
  window.location.hash = "#/home/liziba";
  syncFromHash();
} else {
  syncFromHash();
}
