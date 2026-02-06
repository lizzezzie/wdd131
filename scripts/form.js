
  document.addEventListener("DOMContentLoaded", () => {

  // Footer year
  const year = document.getElementById("currentyear");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Footer last modified
  const modified = document.getElementById("lastModified");
  if (modified) {
    modified.textContent = "Last modified: " + document.lastModified;
  }

});
