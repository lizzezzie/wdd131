const temperature = 9;
const windSpeed = 10;

function calculateWindChill(temp, speed) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(speed, 0.16) +
    0.3965 * temp * Math.pow(speed, 0.16)
  ).toFixed(1);
}

const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;

const windChillElement = document.getElementById("windChill");

if (temperature <= 10 && windSpeed > 4.8) {
  windChillElement.textContent =
    calculateWindChill(temperature, windSpeed) + " °C";
} else {
  windChillElement.textContent = "N/A";
}
