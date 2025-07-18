// Toggle hamburger menu visibility
const menuButton = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('hide');

  // Toggle between ☰ and ✖ symbol
  if (menuButton.textContent === '☰') {
    menuButton.textContent = '✖';
  } else {
    menuButton.textContent = '☰';
  }
});

// Footer dynamic year
const yearSpan = document.getElementById('currentyear');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// Footer last modified
const lastModifiedSpan = document.getElementById('lastModified');
lastModifiedSpan.textContent = document.lastModified;
