const OPEN_CLASSNAME = "open";

const navLinks = document.getElementById("nav-links");

function toggleMenu() {
  if (navLinks.classList.contains(OPEN_CLASSNAME)) {
    navLinks.classList.remove(OPEN_CLASSNAME);
    navLinks.style.display = "none";
  } else {
    navLinks.classList.add(OPEN_CLASSNAME);
    navLinks.style.display = "flex";
    navLinks.style.justifyContent = "space-between";
    navLinks.style.paddingLeft = '5%';
  }
}

window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
    navLinks.style.justifyContent = "space-between";
    navLinks.style.paddingLeft = '5%';
  }
});