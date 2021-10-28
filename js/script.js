/* ============================================

                    DRY

============================================ */

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
    btns.innerHTML = `<a href="mailto:shawnkelley7@gmail.com" class="btns"><button>Contact Me</button></a>`;
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
    `<li class>${compositions[i].name}</li>`
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
  //readability
  const targetClass = e.target.className;
  //----------------------------------------
  //clear divs
  btns.innerHTML = ``;
  description.innerHTML = ``;
  //----------------------------------------
  //hide menus
  hide(devMenu);
  hide(musicMenu);
  //----------------------------------------
  //get object from library
  const o = getObject(e);
  //use o to write
  setBanner(o);
  setTitle(o);
  writeButtons(targetClass, o);
  writeDesc(o);
  writeMedia(o);
  //----------------------------------------
}

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
  <iframe src="${o.live}" height=600>
  `;
  } else if (o.video) {
    banner.innerHTML = o.video;
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
            >
      <a href="" class="btns"
        ><button>Listen</button></a
      >
    `;
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
    console.log(o.media.length);
    for (let i = 0; i < o.media.length; i++) {
      media.insertAdjacentHTML(
        "beforeend",
        `<img src="${o.media[i]}" class="media">`
      );
    }
  }
}
