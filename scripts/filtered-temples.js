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

// Temple data
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005-08-07",
    area: 11500,
    imageUrl:
    "images/aba-nigeria.webp"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888-05-21",
    area: 74792,
    imageUrl:
    "images/manti-utah.webp"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015-06-07",
    area: 96630,
    imageUrl:
    "images/payson-utah.webp"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020-05-02",
    area: 6861,
    imageUrl:
    "images/yigo-guam.webp"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974-11-19",
    area: 156558,
    imageUrl:
    "images/washington-dc.webp"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986-01-10",
    area: 9600,
    imageUrl:
    "images/lima-peru.webp"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983-12-02",
    area: 116642,
    imageUrl:
    "images/mexico-city-mexico.webp"
  },
  {
    templeName: "Bern Switzerland",
    location: "Bern, Switzerland",
    dedicated: "1955-09-15",
    area: 35546,
    imageUrl: "images/bern-switzerland.webp"
  },
  {
    templeName: "Kyiv Ukraine",
    location: "Kyiv, Ukraine",
    dedicated: "2010-08-29",
    area: 22184,
    imageUrl: "images/kyiv-ukraine.webp"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980-10-29",
    area: 53997 ,
    imageUrl: "images/tokyo-japan.webp"
  },

  
  ];
// Temple container
const templeContainer = document.getElementById("temples");

// Display temples
function displayTemples(list) {
  const fragment = document.createDocumentFragment();

  list.forEach(temple => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple`;
    img.loading = "lazy";
    img.width = 400;
    img.height = 250;

    const caption = document.createElement("figcaption");
    caption.innerHTML = `
      <strong>${temple.templeName}</strong><br>
      ${temple.location}<br>
      Dedicated: ${temple.dedicated}<br>
      Area: ${temple.area.toLocaleString()} sq ft
    `;

    figure.appendChild(img);
    figure.appendChild(caption);
    fragment.appendChild(figure);
  });

  templeContainer.innerHTML = '';
    templeContainer.appendChild(fragment);
  }

// Filter handlers with preventDefault
document.getElementById("home").addEventListener("click", e => {
  e.preventDefault();
  displayTemples(temples);
});

document.getElementById("old").addEventListener("click", e => {
  e.preventDefault();
  displayTemples(temples.filter(t => new Date(t.dedicated).getFullYear() < 1900));
});

document.getElementById("new").addEventListener("click", e => {
  e.preventDefault();
  displayTemples(temples.filter(t => new Date(t.dedicated).getFullYear() > 2000));
});

document.getElementById("large").addEventListener("click", e => {
  e.preventDefault();
  displayTemples(temples.filter(t => t.area > 90000));
});

document.getElementById("small").addEventListener("click", e => {
  e.preventDefault();
  displayTemples(temples.filter(t => t.area < 10000));
});

// Footer year and last modified
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;


// Initial display of all temples
displayTemples(temples);