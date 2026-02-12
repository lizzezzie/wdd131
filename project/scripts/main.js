// SERVICES DATA
const services = [
  {
    name: "Wash & Fold",
    pricePerKg: 100,
    turnaround: "12 hours",
    notes: "Price depends on fabric type and stains."
  },
  {
    name: "Wash & Iron",
    pricePerKg: 150,
    turnaround: "12–24 hours",
    notes: "Heavily stained items may take longer."
  },
  {
    name: "Ironing Only",
    pricePerKg: 100,
    turnaround: "Same day",
    notes: "Large items charged separately."
  },
  {
    name: "Duvets & Bedding",
    pricePerKg: 0,
    turnaround: "2–3 days",
    notes: "Final price depends on size and material."
  }
];

// RENDER SERVICES LIST
function renderServices() {
  const container = document.querySelector("#services-list");
  if (!container) return;

  container.innerHTML = services.map(service => `
    <div class="service-card">
      <h3>${service.name}</h3>
      <p><strong>Price:</strong> ${service.pricePerKg > 0 ? `KSh ${service.pricePerKg} per kg` : "Varies"}</p>
      <p><strong>Turnaround:</strong> ${service.turnaround}</p>
      <p>${service.notes}</p>
    </div>
  `).join("");
}

// TURNAROUND & PRICE ESTIMATOR
function estimateTurnaround() {
  const select = document.querySelector("#service-select");
  const weightInput = document.querySelector("#weight");
  const output = document.querySelector("#estimate-output");

  if (!select || !output || !weightInput) return;

  const service = services.find(s => s.name === select.value);
  const weight = parseFloat(weightInput.value);

  if (!service) {
    output.textContent = "";
    return;
  }

  let priceText = "";
  if (service.pricePerKg > 0 && weight > 0) {
    const total = service.pricePerKg * weight;
    priceText = ` | Estimated Price: KSh ${total}`;
  }

  output.textContent = `Estimated turnaround time: ${service.turnaround}${priceText}`;
}

// CONTACT INFO STORAGE (Optional)
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
  const calculateBtn = document.querySelector("#calculate");

  if (serviceSelect) {
    serviceSelect.addEventListener("change", estimateTurnaround);
  }

  if (calculateBtn) {
    calculateBtn.addEventListener("click", estimateTurnaround);
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
