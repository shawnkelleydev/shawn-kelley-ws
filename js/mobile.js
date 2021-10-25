/*=============

  Declarations

=============*/

const projects = document.getElementById("projects");
const header = document.querySelector("header");
const headspace = document.querySelector(".headspace");
const projectSelectorDiv = document.querySelector(
  ".project-selector-container"
);
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

function toggleDisplay(element) {
  if (element.style.display !== "none") {
    element.style.display = "none";
  } else {
    element.style.display = "";
  }
}

/*======

  NAV

======*/

//hide / show mobile menu with scroll
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

//callback for nav listener conditionals
function writeProjectDisplay(navLI, projectsOb) {
  resetColors(navUL, "white");
  toggleBtn(navLI);
  projects.innerHTML = `<li>Projects</li>`;
  projects.children[0].style.display = "flex";
  for (let i = 0; i < projectsOb.length; i++) {
    projects.insertAdjacentHTML("beforeend", `<li>${projectsOb[i].name}</li>`);
  }
  mobileProjectToggle(projects);
}

toggleBtn(li[2]); //default = about

//nav listener cb
function navigate(e) {
  if (e.target === li[0]) {
    writeProjectDisplay(li[0], tech);
    if (
      projectBox.style.display === "none" ||
      projectBox.style.display === ""
    ) {
      toggleDisplay(projectBox);
    }
  } else if (e.target === li[1]) {
    writeProjectDisplay(li[1], music);
  } else if (e.target === li[2]) {
    resetColors(navUL, "white");
    toggleBtn(li[2]);
    projectBox.style.display = "none";
    projects.innerHTML = ``;
    if (bioBox.style.display === "none") {
      toggleDisplay(bioBox);
      toggleDisplay(profileBox);
    }
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
  showBtn.addEventListener("click", (e) => {
    if (items[1].style.display === "none" || items[1].style.display === "") {
      for (let i = 0; i < items.length; i++) {
        items[i].style.display = "flex";
      }
      toggleBtn(showBtn);
    } else {
      for (let i = 1; i < items.length; i++) {
        items[i].style.display = "none";
      }
      toggleBtn(showBtn);
    }
  });
}

//  PROJECT UL LISTENER / PAGE WRITER -- CB in navUL listener

projects.addEventListener("click", (e) => {
  const items = projects.children;
  //checks for project click
  if (items[0].innerText === "Projects") {
    //hides about boxes
    if (e.target !== items[0]) {
      bioBox.style.display = "none";
      profileBox.style.display = "none";
      projectBox.style.display = "block";
      displayProject(e.target.innerText);
    }
    //hides project menu once project is selected
    if (e.target !== items[0]) {
      for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
      }
    }
  }
});

/* ========

  Projects
  
======== */

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
  const title = projectBox.querySelector("h1");
  const featurePicSpan = projectBox.querySelector("span");
  const a = projectBox.querySelectorAll("a");
  const liveA = a[0];
  const ghA = a[1];
  const desc = projectBox.querySelector("p");

  title.innerText = o.name;
  featurePicSpan.innerHTML = `<img src="${o.img}">`;
  liveA.setAttribute("href", `${o.live}`);
  ghA.setAttribute("href", `${o.github}`);
  desc.innerText = o.description;
}
