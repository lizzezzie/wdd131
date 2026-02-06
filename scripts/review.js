let count = Number(localStorage.getItem("reviewCount")) || 0;
count++;
localStorage.setItem("reviewCount", count);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#review-count").textContent = count;
});
