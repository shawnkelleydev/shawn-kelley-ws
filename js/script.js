/* ============================================

                    DRY

============================================ */

const body = document.querySelector("body");
const modal = document.querySelector("#modal");
//divs
const banner = document.querySelector("#banner");
const about = document.querySelector("#about");
const title = document.querySelector("#title");
const btns = document.querySelector("#btns");
const description = document.querySelector("#description");
const media = document.querySelector("#media");

//cb
function hide(element) {
  element.style.display = "none";
}

function show(element, displaytype) {
  element.style.display = displaytype;
}

function toggleDisplay(element, displaytype) {
  if (element.style.display !== displaytype) {
    element.style.display = displaytype;
  } else {
    element.style.display = "none";
  }
}

/* ============================================
  
                  MENU

============================================ */

//==================
//  SELECT MENUS
//==================

//main menu
const menu = document.querySelector("#menu");

//sub menus
const devMenu = document.querySelector("#dev-menu");
const musicMenu = document.querySelector("#music-menu");

//=======================
//  LISTEN TO THE MENUS
//=======================

function menuListenerCB(e) {
  //human readability
  const devBtn = menu.children[0];
  const musicBtn = menu.children[1];
  //sections

  //actions for each button
  if (e.target === devBtn) {
    //DEV
    //hide music menu
    hide(musicMenu);
    //toggle dev menu
    toggleDisplay(devMenu, "flex");
  } else if (e.target === musicBtn) {
    //MUSIC
    //hide dev menu
    hide(devMenu);
    //toggle music menu
    toggleDisplay(musicMenu, "flex");
  } else {
    //ABOUT
    //hide stuff
    hide(devMenu);
    hide(musicMenu);
    //clear media
    media.innerHTML = ``;
    banner.innerHTML = `
      <img
        class="banner"
        src="img/pics/family_medium.jpg"
        alt="Kelley family on a log over a stream in a meadow"
      />`;
    title.innerHTML = ``;
    //write bio
    btns.innerHTML = aboutBtn;
    description.innerHTML = bio; //in bio.js
  }
}

menu.addEventListener("click", (e) => menuListenerCB(e));

//======================
//  POPULATE THE MENUS
//======================

//  loops take data from projects.js and populate accordingly

//tech loop
for (let i = 0; i < tech.length; i++) {
  devMenu.insertAdjacentHTML(
    "beforeend",
    `<li class="tech">${tech[i].name}</li>`
  );
}

//music loop
for (let i = 0; i < compositions.length; i++) {
  musicMenu.insertAdjacentHTML(
    "beforeend",
    `<li class="music">${compositions[i].name}</li>`
  );
}

/* ============================================
  
                    CONTENT

============================================ */

//======================
//  LISTEN TO MENUS
//======================

//dev
devMenu.addEventListener("click", (e) => contentCB(e));
//music
musicMenu.addEventListener("click", (e) => contentCB(e));

//CB
function contentCB(e) {
  if (
    (e.target !== devMenu &&
      e.target !== musicMenu &&
      e.target.className === "tech") ||
    e.target.className === "music"
  ) {
    //readability
    const targetClass = e.target.className;
    //clear divs
    btns.innerHTML = ``;
    description.innerHTML = ``;
    //hide menus
    hide(devMenu);
    hide(musicMenu);
    //get object from library
    const o = getObject(e);
    //use o to write
    setBanner(o);
    setTitle(o);
    writeButtons(targetClass, o);
    writeDesc(o);
    writeMedia(o);
  }
}

body.addEventListener("click", (e) => {
  if (
    e.target.className !== "tech" &&
    e.target.className !== "music" &&
    e.target.parentElement.getAttribute("id") !== "menu"
  ) {
    hide(devMenu);
    hide(musicMenu);
  }
  if (e.target.tagName !== "IMG") {
    restoreContainer();
    modal.innerHTML = ``;
  }
});

//gets object from library
function getObject(e) {
  let o;
  for (let i = 0; i < tech.length; i++) {
    if (e.target.innerText === tech[i].name) {
      o = tech[i];
    }
  }
  //check compositions
  for (let i = 0; i < compositions.length; i++) {
    if (e.target.innerText === compositions[i].name) {
      o = compositions[i];
    }
  }
  return o;
}

//set Banner
function setBanner(o) {
  if (o.live) {
    banner.innerHTML = `
    <iframe src="${o.live}" height=600></iframe>
    <span id="live"><p>LIVE</p></span>
    `;
  } else if (o.video) {
    banner.innerHTML =
      o.video + `<span id="live"><p style="width: 100px">YouTube</p></span>`;
  } else {
    banner.innerHTML = `<img src="${o.img}" alt="${o.alt}" class="banner">`;
  }
}

//set title
function setTitle(o) {
  if (o.title_img) {
    title.innerHTML = `
    <img src="${o.title_img}" alt="${o.title_img_alt}" class="title-script">
    `;
  } else {
    title.innerHTML = `<h1>${o.name}</h1>`;
  }
}

//writes buttons
function writeButtons(targetClass, o) {
  if (targetClass === "tech") {
    //dev
    btns.innerHTML = `
      <a href="${o.live}" class="btns"
              ><button>Live Site</button></a
            >
      <a href="${o.github}" class="btns"
        ><button>Git Hub</button></a
      >
    `;
  } else {
    //music - listen empty / awaiting configuration
    btns.innerHTML = `
      <a href="${o.link}" class="btns"
              ><button>Buy Piece</button></a
            >`;
    if (o.listen) {
      btns.insertAdjacentHTML(
        "beforeend",
        `<a href="" class="btns"
        ><button>Listen</button></a
      >`
      );
    }
  }
}

//writes description
function writeDesc(o) {
  description.innerHTML = o.description;
}

function writeMedia(o) {
  const media = document.querySelector("#media");
  //clear previous content
  media.innerHTML = ``;
  if (o.media) {
    for (let i = 0; i < o.media.length; i++) {
      media.insertAdjacentHTML(
        "beforeend",
        `<img src="${o.media[i]}" class="media">`
      );
    }

    mediaListen(media);
  }
}

/* ============================================
  
                    MODALS

============================================ */

//callback in writeMedia
function mediaListen(parent) {
  media.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      const src = e.target.getAttribute("src");

      modal.innerHTML = ``;
      modal.innerHTML = `
      <span><p>X</p></span>
      <img src=${src}>
      `;
      blurContainer();
      const x = modal.querySelector("p");
      x.addEventListener("click", () => {
        modal.innerHTML = ``;
        restoreContainer();
      });
    }
  });
}

const container = document.querySelector("#container");
function blurContainer() {
  container.style.opacity = "20%";
}

function restoreContainer() {
  container.style.opacity = "100%";
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    restoreContainer();
    modal.innerHTML = ``;
    hide(devMenu);
    hide(musicMenu);
  }
});
