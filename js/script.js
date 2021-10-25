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
const blue = "rgb(0, 13, 131)";

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

/*============

  MOBILE NAV

============*/

const navheight = "300px";

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
  projectListener(projects);
}

toggleBtn(li[2]); //default = about

//nav listener cb
function navigate(e) {
  if (e.target === li[0]) {
    writeProjectDisplay(li[0], tech);
  } else if (e.target === li[1]) {
    writeProjectDisplay(li[1], music);
  } else if (e.target === li[2]) {
    resetColors(navUL, "white");
    toggleBtn(li[2]);
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

/*============

  PROJECTS

============*/

//  MOBILE PROJECT MENU TOGGLE -- CB in navUL listener

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

function projectListener(ul) {
  ul.addEventListener("click", (e) => {
    const items = ul.children;
    //checks for project click
    if (items[0].innerText === "Projects") {
      //hides about boxes
      if (e.target !== items[0] && bioBox.style.display !== "none") {
        toggleDisplay(bioBox);
        toggleDisplay(profileBox);
      }
      //hides project menu once project is selected
      if (e.target !== items[0]) {
        for (let i = 0; i < items.length; i++) {
          items[i].style.display = "none";
        }
      }
    }
  });
}

//hide / show mobile menu with scroll

let startWindow = 0;

window.onscroll = () => {
  const current = window.pageYOffset;
  if (current > startWindow && current > 80) {
    //down
    header.style.top = "-800px";
    startWindow = current;
  } else {
    header.style.top = "0";
    startWindow = current;
  }
};
