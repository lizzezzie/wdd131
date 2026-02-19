// =====================
// SERVICES DATA 
// =====================
const services = [
  {
    name: "Wash & Fold",
    pricingModel: "perKgRange",
    minPerKg: 90,
    maxPerKg: 130,
    turnaround: "12 hours",
    notes: "Price varies by fabric and stains. Range shown is typical.",
    image: "wash-fold.webp"
  },
  {
    name: "Wash & Iron",
    pricingModel: "perKg",
    pricePerKg: 150,
    turnaround: "12–24 hours",
    notes: "Standard wash, dry and ironing service.",
    image: "wash-iron.webp"
  },
  {
    name: "Ironing Only",
    pricingModel: "perItem",
    pricePerItem: 100,
    turnaround: "Same day",
    notes: "Per-item pricing. Large items charged separately.",
    image: "ironing-only.webp"
  },
  {
    name: "Duvets & Bedding",
    pricingModel: "sizeBased",
    sizePricing: {
      single: 400,
      double: 650,
      king: 1000
    },
    turnaround: "1–3 days",
    notes: "Price depends on size and material; quoted prices are typical.",
    image: "duvets-bedding.webp"
  }
];

// =====================
// RENDER SERVICES LIST
// =====================
function renderServices() {
  const container = document.querySelector("#services-list");
  if (!container) return;

  container.innerHTML = services.map(s => {
    const priceText = s.pricingModel === "perKgRange"
      ? `KSh ${s.minPerKg}–${s.maxPerKg} per kg`
      : s.pricingModel === "perKg"
        ? `KSh ${s.pricePerKg} per kg`
        : s.pricingModel === "perItem"
          ? `KSh ${s.pricePerItem} per item`
          : s.pricingModel === "sizeBased"
            ? `From KSh ${Math.min(...Object.values(s.sizePricing))}`
            : "Varies";

    return `
      <article class="service-card">
      <img src="images/${s.image}" alt="${s.name}" loading="lazy">
        <h3>${s.name}</h3>
        <p><strong>Price:</strong> ${priceText}</p>
        <p><strong>Turnaround:</strong> ${s.turnaround}</p>
        <p>${s.notes}</p>
      </article>
    `;
  }).join("");
}

// =====================
// ESTIMATOR UI: show/hide inputs depending on selected service
// =====================
function updateEstimatorUI() {
  const select = document.querySelector("#service-select");
  const weightRow = document.querySelector(".est-weight");
  const sizeRow = document.querySelector(".est-size");
  const qtyRow = document.querySelector(".est-qty");
  const note = document.querySelector("#estimator-note");

  if (!select) return;

  const service = services.find(s => s.name === select.value);

  // hide all first
  if (weightRow) weightRow.style.display = "none";
  if (sizeRow) sizeRow.style.display = "none";
  if (qtyRow) qtyRow.style.display = "none";
  if (note) note.textContent = "";

  if (!service) {
    // nothing selected
    return;
  }

  switch (service.pricingModel) {
    case "perKgRange":
    case "perKg":
      if (weightRow) weightRow.style.display = "block";
      break;
    case "perItem":
      if (qtyRow) qtyRow.style.display = "block";
      break;
    case "sizeBased":
      if (sizeRow) sizeRow.style.display = "block";
      break;
  }

  // show a helpful note
  if (note) note.textContent = `${service.notes}`;
}

// =====================
// CALCULATE ESTIMATE 
// =====================
function calculateEstimate() {
  const select = document.querySelector("#service-select");
  const weightInput = document.querySelector("#weight");
  const qtyInput = document.querySelector("#quantity");
  const sizeSelect = document.querySelector("#size-select");
  const output = document.querySelector("#estimate-output");

  if (!select || !output) return;

  const service = services.find(s => s.name === select.value);
  if (!service) {
    output.textContent = "";
    return;
  }

  // Build the output purely with template literals
  if (service.pricingModel === "perKgRange") {
    const weight = parseFloat(weightInput.value);
    if (!weight || weight <= 0) {
      output.textContent = `Turnaround: ${service.turnaround} | Enter weight to get a price range.`;
      return;
    }
    const minTotal = service.minPerKg * weight;
    const maxTotal = service.maxPerKg * weight;
    output.textContent = `Estimated turnaround: ${service.turnaround} | Estimated price: KSh ${minTotal} – ${maxTotal} (for ${weight} kg)`;
    return;
  }

  if (service.pricingModel === "perKg") {
    const weight = parseFloat(weightInput.value);
    if (!weight || weight <= 0) {
      output.textContent = `Turnaround: ${service.turnaround} | Enter weight to calculate price.`;
      return;
    }
    const total = service.pricePerKg * weight;
    output.textContent = `Estimated turnaround: ${service.turnaround} | Estimated price: KSh ${total} (${weight} kg × KSh ${service.pricePerKg}/kg)`;
    return;
  }

  if (service.pricingModel === "perItem") {
    const qty = parseInt(qtyInput.value, 10) || 0;
    if (!qty || qty <= 0) {
      output.textContent = `Turnaround: ${service.turnaround} | Enter quantity to calculate price.`;
      return;
    }
    const total = service.pricePerItem * qty;
    output.textContent = `Estimated turnaround: ${service.turnaround} | Estimated price: KSh ${total} (${qty} items × KSh ${service.pricePerItem}/item)`;
    return;
  }

  if (service.pricingModel === "sizeBased") {
    const size = sizeSelect.value;
    if (!size) {
      output.textContent = `Turnaround: ${service.turnaround} | Select a size to get a quote.`;
      return;
    }
    const price = service.sizePricing[size];
    if (!price) {
      output.textContent = `Turnaround: ${service.turnaround} | Please contact us for a custom quote.`;
      return;
    }
    output.textContent = `Estimated turnaround: ${service.turnaround} | Estimated price for ${size}: KSh ${price}`;
    return;
  }

  // fallback
  output.textContent = `Turnaround: ${service.turnaround} | Please contact us for a quote.`;
}

// =====================
// CONTACT FORM STORAGE 
// =====================
function saveContactInfo(name, email) {
  localStorage.setItem("urbanSpinName", name);
  localStorage.setItem("urbanSpinEmail", email);
}

function loadContactInfo() {
  const nameField = document.querySelector("#name");
  const emailField = document.querySelector("#email");

  if (nameField && emailField) {

  nameField.value = localStorage.getItem("urbanSpinName") || "";
  emailField.value = localStorage.getItem("urbanSpinEmail") || "";
  }
}
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    saveContactInfo(name, email);
    const feedback = document.querySelector("#form-feedback");
    feedback.textContent = `Thank you ${name}. We will get back to you within 24 hours.`;
    feedback.className = "success-msg";
  });
}



// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // render services if the list container exists
  renderServices();
  // load contact info on contact page
  loadContactInfo();

  // estimator UI wiring 
  const serviceSelect = document.querySelector("#service-select");
  const weightInput = document.querySelector("#weight");
  const qtyInput = document.querySelector("#quantity");
  const sizeSelect = document.querySelector("#size-select");
  const calculateBtn = document.querySelector("#calculate");
  
  if (serviceSelect) {
    serviceSelect.addEventListener("change", () => {
      updateEstimatorUI();
      calculateEstimate(); // update immediately when service changes
    });
  }

 
  if (calculateBtn) {
    calculateBtn.addEventListener("click", calculateEstimate);
  }

  // contact form submit
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const phone = document.querySelector("#phone").value.trim();
      const message = document.querySelector("#message").value.trim();
      const feedback = document.querySelector("#form-feedback");

      feedback.textContent = ""; // clear previous feedback
      feedback.style.color = "red"; // error color

      if (!name || !email || !phone || !message) {
        feedback.textContent = "Please complete all fields.";
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        feedback.textContent = "Please enter a valid email address.";
        return;
      }
      const phonePattern = /^\+?\d{7,15}$/;
      if (!phonePattern.test(phone)) {
        feedback.textContent = "Please enter a valid phone number (7-15 digits, optional +).";
        return;
      }

      saveContactInfo(name, email);

      feedback.style.color = "green";
      feedback.textContent = `Thank you ${name}. We will get back to you within 24 hours.`;
      contactForm.reset();
    });
  }
  const toggleBtn = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav");

  if (toggleBtn && nav) {
   toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
   });
}


document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  renderServices();
  loadContactInfo();

const serviceSelect = document.querySelector("#service-select");
if (serviceSelect) {
  serviceSelect.addEventListener("change", () => {
  updateEstimatorUI();
  calculateEstimate();
  });
}
});
