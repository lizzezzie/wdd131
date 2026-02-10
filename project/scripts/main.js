// SERVICES DATA
const services = [
  {
    name: "Wash & Fold",
    price: "KSh 150–200 per kg",
    turnaround: "24 hours",
    notes: "Price depends on fabric type and stains."
  },
  {
    name: "Wash, Dry & Iron",
    price: "KSh 200–300 per kg",
    turnaround: "24–48 hours",
    notes: "Heavily stained items may take longer."
  },
  {
    name: "Ironing Only",
    price: "KSh 100–150 per kg",
    turnaround: "Same day",
    notes: "Large items charged separately."
  },
  {
    name: "Duvets & Bedding",
    price: "From KSh 800",
    turnaround: "2–3 days",
    notes: "Final price depends on size and material."
  }
];

// RENDER SERVICES
function renderServices() {
  const container = document.querySelector("#services-list");

  if (!container) return;

  container.innerHTML = services.map(service => `
    <div>
      <h3>${service.name}</h3>
      <p><strong>Price:</strong> ${service.price}</p>
      <p><strong>Turnaround:</strong> ${service.turnaround}</p>
      <p>${service.notes}</p>
    </div>
  `).join("");
}

// TURNAROUND ESTIMATOR
function estimateTurnaround() {
  const select = document.querySelector("#service-select");
  const output = document.querySelector("#estimate-output");

  if (!select || !output) return;

  const selectedService = services.find(service => service.name === select.value);

  if (selectedService) {
    output.textContent = `Estimated turnaround time: ${selectedService.turnaround}`;
  } else {
    output.textContent = "";
  }
}

// CONTACT FORM STORAGE
function saveContactInfo(name, email) {
  localStorage.setItem("urbanSpinName", name);
  localStorage.setItem("urbanSpinEmail", email);
}

function loadContactInfo() {
  const nameField = document.querySelector("#name");
  const emailField = document.querySelector("#email");

  if (!nameField || !emailField) return;

  nameField.value = localStorage.getItem("urbanSpinName") || "";
  emailField.value = localStorage.getItem("urbanSpinEmail") || "";
}

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  loadContactInfo();

  const serviceSelect = document.querySelector("#service-select");
  if (serviceSelect) {
    serviceSelect.addEventListener("change", estimateTurnaround);
  }

  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;

      saveContactInfo(name, email);
      alert("Thank you for contacting Urban Spin. We will get back to you soon.");
      contactForm.reset();
    });
  }
});
