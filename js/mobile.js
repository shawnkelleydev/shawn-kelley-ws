/*=============

  Declarations

=============*/

const projects = document.getElementById("projects");
const ipadProjects = document.getElementById("ipad-projects");
const header = document.querySelector("header");
const headspace = document.querySelector(".headspace");
const projectSelectorDiv = document.querySelector(
  ".project-selector-container"
);
const ipadProjectMenuDiv = document.querySelector("#ipad-projects-container");
const footer = document.querySelector("footer");
const bioBox = document.querySelector(".bio-box");
const profileBox = document.querySelector(".profile-box");
const projectBox = document.querySelector(".project-container");
const blue = "rgb(0, 10, 95)";

/*======

  CB

======*/

function resetColors(ul, textcolor) {
  const items = ul.children;
  for (let i = 0; i < items.length; i++) {
    items[i].style.backgroundColor = "";
    items[i].style.color = textcolor;
  }
}

function toggleBtn(li) {
  if (li.style.backgroundColor !== "white") {
    li.style.backgroundColor = "white";
    li.style.color = blue;
  } else {
    li.style.backgroundColor = "";
    li.style.color = "white";
  }
}

function hideElement(element) {
  element.style.display = "none";
}

function displayFlex(element) {
  element.style.display = "flex";
}

function displayBlock(element) {
  element.style.display = "block";
}

function hideChildren(parent, startingIndex) {
  for (let i = startingIndex; i < parent.children.length; i++) {
    parent.children[i].style.display = "none";
  }
}

function showChildren(parent, startingIndex) {
  for (let i = startingIndex; i < parent.children.length; i++) {
    parent.children[i].style.display = "block";
  }
}

/*======

  NAV

======*/

//hide / show menu with scroll
let startWindow = 0;

window.onscroll = () => {
  const current = window.pageYOffset;
  //>50 prevents problems at position 0
  if (current > startWindow && current > 50) {
    //down
    header.style.top = "-800px";
    startWindow = current;
  } else {
    header.style.top = "0";
    startWindow = current;
  }
};

//static declarations
const navUL = document.querySelector("nav").children[0];
const li = navUL.children;

//writes project menu lists / cb in writeProjectMenu()
function projectListWriter(ul, ob) {
  ul.innerHTML = `<li>Projects</li>`;
  ul.children[0].style.display = "flex";
  for (let i = 0; i < ob.length; i++) {
    ul.insertAdjacentHTML("beforeend", `<li>${ob[i].name}</li>`);
  }
  mobileProjectToggle(ul);
}

//show ipad menu

//callback for nav listener conditionals
function writeProjectMenu(navLI, projectsOb) {
  ipadProjects.innerHTML = ``;
  projects.innerHTML = ``;
  resetColors(navUL, "white");
  toggleBtn(navLI);
  if (window.innerWidth < 750) {
    projectListWriter(projects, projectsOb);
  } else {
    projectListWriter(ipadProjects, projectsOb);
    ipadProjectMenuDiv.style.display = "flex";
  }
}

toggleBtn(li[2]); //default = about

//display projects
function showProjectBox() {
  hideElement(bioBox);
  displayFlex(projectBox);
  if (window.innerWidth < 750) {
    hideElement(profileBox);
  } else {
    displayFlex(profileBox);
  }
}

//hide projects / display bio
function displayBio(aboutBtn) {
  resetColors(navUL, "white");
  toggleBtn(aboutBtn);
  hideElement(projectBox);
  projects.innerHTML = ``;
  if (bioBox.style.display === "none") {
    displayFlex(bioBox);
    displayFlex(profileBox);
  }
}

const famban = document.querySelector("#family-banner");
const altban = document.querySelector("#alt-banner");

//nav listener cb
function navigate(e) {
  const dev = li[0];
  const mus = li[1];
  const about = li[2];
  //dev
  if (e.target === dev) {
    writeProjectMenu(dev, tech);
    if (window.innerWidth > 750) {
      showProjectBox();
      hideChildren(projectBox, 1);
    }
    //music
  } else if (e.target === mus) {
    writeProjectMenu(mus, music);
    if (window.innerWidth > 750) {
      showProjectBox();
      hideChildren(projectBox, 1);
    }
    //about
  } else if (e.target === about) {
    displayBio(about);
  }
}

//nav listener
navUL.addEventListener("click", (e) => {
  navigate(e);
});

/*===============

  PROJECT MENU

===============*/

//  TOGGLE -- CB in navUL listener

function mobileProjectToggle(ul) {
  const items = ul.children;
  const showBtn = items[0];
  for (let i = 1; i < items.length; i++) {
    items[i].style.display = "none";
  }
  showBtn.addEventListener("click", (e) => {
    if (items[1].style.display === "none" || items[1].style.display === "") {
      for (let i = 0; i < items.length; i++) {
        items[i].style.display = "flex";
      }
    } else {
      for (let i = 1; i < items.length; i++) {
        items[i].style.display = "none";
      }
    }
  });
}

//  PROJECT UL LISTENER / PAGE WRITER -- CB in navUL listener

function projectsCB(e, ul) {
  let items = ul.children;
  //hides about boxes
  if (e.target !== items[0]) {
    hideElement(bioBox);
    if (window.innerWidth < 750) {
      hideElement(profileBox);
    }
    displayFlex(projectBox);
    showChildren(projectBox, 1);
    displayProject(e.target.innerText);
  }
  //hides project menu once project is selected on phones
  if (e.target !== items[0] && ul === projects) {
    for (let i = 0; i < items.length; i++) {
      items[i].style.display = "none";
    }
  } else if (e.target !== items[0]) {
    for (let i = 1; i < items.length; i++) {
      items[i].style.display = "none";
    }
  }
}

projects.addEventListener("click", (e) => projectsCB(e, projects));
ipadProjects.addEventListener("click", (e) => projectsCB(e, ipadProjects));

/* =========

  PROJECTS
  
========== */

function displayProject(text) {
  let arr = [];
  for (let i = 0; i < tech.length; i++) {
    if (tech[i].name === text) {
      arr.push(tech[i]);
    }
  }
  for (let i = 0; i < music.length; i++) {
    if (music[i].name === text) {
      arr.push(music[i]);
    }
  }
  let o = arr[0];
  //write content
  const title = projectBox.querySelectorAll("span")[0];
  const featurePicSpan = projectBox.querySelectorAll("span")[1];
  const a = projectBox.querySelectorAll("a");
  const liveA = a[0];
  const ghA = a[1];
  const pieceA = a[2];
  const desc = projectBox.querySelector("#desc");
  //title
  if (o.title_img) {
    title.innerHTML = `<img src="${o.title_img}" alt="${o.title_img_alt}" class="title_img">`;
  } else {
    title.innerHTML = `<h1>${o.name}</h1>`;
  }
  //image or video
  if (o.img) {
    featurePicSpan.innerHTML = `<img src="${o.img}">`;
  } else if (o.video) {
    featurePicSpan.innerHTML = o.video;
  } else {
    featurePicSpan.innerHTML = ``;
  }
  //live site / github buttons
  if (o.live) {
    liveA.setAttribute("href", o.live);
    ghA.setAttribute("href", o.github);
    liveA.style.display = "block";
    ghA.style.display = "block";
  } else {
    liveA.style.display = "none";
    ghA.style.display = "none";
  }
  //description
  if (o.description) {
    desc.innerHTML = o.description;
  } else {
    desc.innerHTML = "";
  }
  //buy link
  if (o.link) {
    pieceA.style.display = "block";
    pieceA.setAttribute("href", o.link);
  } else {
    pieceA.style.display = "none";
  }
}
