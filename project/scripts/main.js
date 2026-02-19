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
  // 1. Render services (Only runs if #services-list exists)
  renderServices();
  
  // 2. Load contact info (Only runs if fields exist)
  loadContactInfo();

  // 3. NAVIGATION TOGGLE 
  const navBtn = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("nav");
  if (navBtn && navMenu) {
    navBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      // Changes the hamburger ☰ to an ✕ when open
      navBtn.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
    });
  }

  // 4. ESTIMATOR WIRING (Only runs if estimator exists)
  const serviceSelect = document.querySelector("#service-select");
  const calculateBtn = document.querySelector("#calculate");
  if (serviceSelect) {
    serviceSelect.addEventListener("change", () => {
      updateEstimatorUI();
      calculateEstimate(); 
    });
  }
  if (calculateBtn) {
    calculateBtn.addEventListener("click", calculateEstimate);
  }

  // 5. CONTACT FORM 
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.querySelector("#name");
      const emailInput = document.querySelector("#email");
      const feedback = document.querySelector("#form-feedback");

      if (nameInput && emailInput) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (name && email) {
          // Save to LocalStorage
          saveContactInfo(name, email);
          
          // DOM Modification
          feedback.textContent = `Thank you, ${name}. We've saved your details and will reply within 24 hours!`;
          feedback.style.color = "green";
          contactForm.reset();
        } else {
          feedback.textContent = "Please fill in all required fields.";
          feedback.style.color = "red";
        }
      }
    });
  }
});

