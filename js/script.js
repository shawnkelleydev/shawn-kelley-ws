/*=============

  Declarations

=============*/

const projects = document.getElementById("projects");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const biobox = document.querySelector(".bio-box");
const blue = "rgb(0, 13, 131)";

/*======

  CB

======*/

function resetColors(ul, bgcolor, textcolor) {
  const items = ul.children;
  for (let i = 0; i < items.length; i++) {
    items[i].style.backgroundColor = bgcolor;
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

function switchTopCalc(element, newpx) {
  element.style.top = `calc(100vh - ${newpx})`;
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

const navUL = document.querySelector("nav").children[0];
const li = navUL.children;

//callback for nav listener conditionals
function writeProjectDisplay(navLI, projectsOb) {
  resetColors(navUL, blue, "white");
  toggleBtn(navLI);
  switchTopCalc(projects, "300px");
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
    footer.style.paddingBottom = "300px";
  } else if (e.target === li[1]) {
    writeProjectDisplay(li[1], music);
    footer.style.paddingBottom = "300px";
  } else if (e.target === li[2]) {
    resetColors(navUL, blue, "white");
    toggleBtn(li[2]);
    footer.style.paddingBottom = "200px";
    projects.innerHTML = ``;
    if (biobox.style.display === "none") {
      toggleDisplay(biobox);
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
      let height = items.length * 100;
      height = height + 100 + "px";
      switchTopCalc(ul, height);
      toggleBtn(showBtn);
    } else {
      for (let i = 1; i < items.length; i++) {
        items[i].style.display = "none";
      }
      switchTopCalc(ul, "300px");
      toggleBtn(showBtn);
    }
  });
}

//  PROJECT UL LISTENER / PAGE WRITER -- CB in navUL listener

function projectListener(ul) {
  ul.addEventListener("click", (e) => {
    const items = ul.children;

    if (items[0].innerText === "Projects") {
      if (e.target !== items[0] && biobox.style.display !== "none") {
        toggleDisplay(biobox);
      }
      if (e.target === items[1]) {
      }
    }
  });
}
