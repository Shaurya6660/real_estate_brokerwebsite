(() => {
  const $ = (selector) => document.querySelector(selector);
  const grid = $("#propertyGrid");
  const filterForm = $("#filterForm");
  const keywordInput = $("#keyword");
  const locationFilter = $("#locationFilter");
  const typeFilter = $("#typeFilter");
  const budgetFilter = $("#budgetFilter");
  const count = $("#resultsCount");
  const empty = $("#emptyState");
  const toast = $("#toast");
  const propertyDialog = $("#propertyDialog");
  const enquiryDialog = $("#enquiryDialog");
  let toastTimer;

  const properties = [
    {id:1,name:"Golden Ridge Residences",type:"Apartment",location:"Chennai",area:"1,200",beds:2,baths:2,price:35,priceLabel:"₹35 Lakh",tag:"Popular",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A contemporary apartment community with landscaped surroundings and convenient everyday access."},
    {id:2,name:"Skyline Garden Villa",type:"Villa",location:"Bangalore",area:"2,100",beds:4,baths:3,price:125,priceLabel:"₹1.25 Cr",tag:"Luxury",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A modern villa with a generous front garden, clean architectural lines and bright living spaces."},
    {id:3,name:"Sivasakthi Nivas",type:"Independent House",location:"Chennai",area:"1,850",beds:3,baths:3,price:62,priceLabel:"₹62 Lakh",tag:"New listing",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A welcoming independent home with a traditional roofline and a private entrance."},
    {id:4,name:"Maple Row Homes",type:"Row House",location:"Hyderabad",area:"1,600",beds:3,baths:3,price:58,priceLabel:"₹58 Lakh",tag:"Family choice",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A row-house home with a practical layout, private frontage and a landscaped approach."},
    {id:5,name:"Emerald Court Bungalow",type:"Villa",location:"Bangalore",area:"2,400",beds:4,baths:4,price:145,priceLabel:"₹1.45 Cr",tag:"Premium",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A contemporary bungalow featuring a broad front elevation, large windows and a garden."},
    {id:6,name:"Palm Vista Community",type:"Gated Community",location:"Chennai",area:"1,300",beds:2,baths:2,price:48,priceLabel:"₹48 Lakh",tag:"Community living",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A residential community with landscaped common areas and an attractive gated entrance."},
    {id:7,name:"Bluebell Apartments",type:"Apartment",location:"Hyderabad",area:"1,450",beds:3,baths:2,price:52,priceLabel:"₹52 Lakh",tag:"Value pick",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A modern apartment building with balconies, bright exteriors and landscaped frontage."},
    {id:8,name:"Oakstone Modern Villa",type:"Villa",location:"Bangalore",area:"2,000",beds:4,baths:3,price:98,priceLabel:"₹98 Lakh",tag:"Featured",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A contemporary two-storey villa with stone accents and a private front garden."},
    {id:9,name:"Cedar Lane Residences",type:"Row House",location:"Chennai",area:"1,700",beds:3,baths:3,price:72,priceLabel:"₹72 Lakh",tag:"Ready to view",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A connected-home community with balanced proportions, balconies and green frontage."},
    {id:10,name:"Garden Court House",type:"Independent House",location:"Hyderabad",area:"1,900",beds:3,baths:3,price:84,priceLabel:"₹84 Lakh",tag:"Garden home",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A low-rise modern house with a sheltered entry, broad windows and landscaped grounds."},
    {id:11,name:"Sunrise Heights",type:"Apartment",location:"Bangalore",area:"1,250",beds:2,baths:2,price:45,priceLabel:"₹45 Lakh",tag:"Smart choice",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A multi-storey apartment residence with balconies and a green residential setting."},
    {id:12,name:"Willow Crest Villa",type:"Villa",location:"Chennai",area:"2,200",beds:4,baths:3,price:115,priceLabel:"₹1.15 Cr",tag:"Luxury",image:"https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg",description:"A premium contemporary villa with a crisp exterior, private frontage and landscaped garden."}
  ];

  const budgetMatches = (price, budget) => {
    if (budget === "under50") return price < 50;
    if (budget === "50to80") return price >= 50 && price <= 80;
    if (budget === "80to100") return price > 80 && price <= 100;
    if (budget === "over100") return price > 100;
    return true;
  };

  const safe = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[char]));

  function render(list) {
    grid.innerHTML = list.map((p) => `
      <article class="property-card" data-id="${p.id}">
        <div class="image-wrap">
          <img src="${p.image}" alt="Front view of ${safe(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.pexels.com/photos/31737861/pexels-photo-31737861.jpeg?cs=srgb&dl=pexels-dropshado-31737861.jpg&fm=jpg'">
          <span class="property-tag">${safe(p.tag)}</span>
          <button class="favourite" type="button" aria-label="Add ${safe(p.name)} to favourites" aria-pressed="false" data-favourite="${p.id}">♡</button>
        </div>
        <div class="property-info">
          <div class="property-heading"><div><h3>${safe(p.name)}</h3><p class="property-location">⌖ ${safe(p.location)}, India</p></div><strong class="property-price">${safe(p.priceLabel)}</strong></div>
          <div class="feature-row"><span>▱ ${p.beds} Bedroom${p.beds>1?"s":""}</span><span>♧ ${p.baths} Bathroom${p.baths>1?"s":""}</span><span>◇ ${safe(p.area)} sq ft</span></div>
          <div class="card-actions"><button class="button button-soft" type="button" data-details="${p.id}">View Details</button><button class="button button-gradient" type="button" data-enquire="${p.id}">Enquire Now</button></div>
        </div>
      </article>`).join("");
    count.textContent = `${list.length} ${list.length === 1 ? "property" : "properties"} found`;
    empty.hidden = list.length !== 0;
    grid.hidden = list.length === 0;
  }

  function applyFilters() {
    const keyword = keywordInput.value.trim().toLowerCase();
    const location = locationFilter.value;
    const type = typeFilter.value;
    const budget = budgetFilter.value;
    const filtered = properties.filter((p) =>
      (!keyword || `${p.name} ${p.location} ${p.type} ${p.description}`.toLowerCase().includes(keyword)) &&
      (!location || p.location === location) &&
      (!type || p.type === type) &&
      budgetMatches(p.price, budget)
    );
    render(filtered);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3500);
  }

  function openDetails(id) {
    const p = properties.find((item) => item.id === Number(id));
    if (!p) return;
    $("#dialogImage").src = p.image;
    $("#dialogImage").alt = `Front view of ${p.name}`;
    $("#dialogType").textContent = p.type;
    $("#dialogTitle").textContent = p.name;
    $("#dialogLocation").textContent = `${p.location}, India`;
    $("#dialogPrice").textContent = p.priceLabel;
    $("#dialogDescription").textContent = p.description;
    $("#dialogFeatures").textContent = `${p.beds} bedrooms  •  ${p.baths} bathrooms  •  ${p.area} sq ft`;
    $("#dialogEnquire").onclick = (event) => { event.preventDefault(); propertyDialog.close(); openEnquiry(p.id); };
    propertyDialog.showModal();
  }

  function openEnquiry(id) {
    const p = properties.find((item) => item.id === Number(id));
    if (!p) return;
    $("#enquiryPropertyName").textContent = `Enquiry about: ${p.name} — ${p.priceLabel}, ${p.location}`;
    $("#enquiryForm").dataset.propertyName = p.name;
    enquiryDialog.showModal();
  }

  filterForm.addEventListener("submit", (event) => { event.preventDefault(); applyFilters(); });
  [keywordInput, locationFilter, typeFilter, budgetFilter].forEach((el) => {
    el.addEventListener(el.tagName === "INPUT" ? "input" : "change", applyFilters);
  });
  filterForm.addEventListener("reset", () => window.setTimeout(applyFilters, 0));
  $("#clearFilters").addEventListener("click", () => {
    filterForm.reset();
    applyFilters();
    keywordInput.focus();
  });

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.details) openDetails(button.dataset.details);
    if (button.dataset.enquire) openEnquiry(button.dataset.enquire);
    if (button.dataset.favourite) {
      const active = button.classList.toggle("is-favourite");
      button.textContent = active ? "♥" : "♡";
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("aria-label", `${active ? "Remove" : "Add"} property to favourites`);
      showToast(active ? "Added to your favourites for this session." : "Removed from your favourites.");
    }
  });

  $("#dialogClose").addEventListener("click", () => propertyDialog.close());
  $("#enquiryClose").addEventListener("click", () => enquiryDialog.close());
  $("#enquiryForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const propertyName = form.dataset.propertyName || "a property";
    const message = `Hello Sunrise Homes, my name is ${data.get("name")}. Phone: ${data.get("phone")}. I am interested in ${propertyName}. ${data.get("message") || ""}`;
    // Replace this sample number with the real WhatsApp business number before launch.
    const whatsappNumber = "919876543210";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    enquiryDialog.close();
    showToast("Opening WhatsApp to continue your enquiry.");
  });

  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  $("#year").textContent = String(new Date().getFullYear());
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get("type");
  const locationParam = params.get("location");
  const budgetParam = params.get("budget");
  if (typeParam && [...typeFilter.options].some((o) => o.value.toLowerCase() === typeParam.toLowerCase() || o.text.toLowerCase() === typeParam.toLowerCase())) {
    typeFilter.value = [...typeFilter.options].find((o) => o.value.toLowerCase() === typeParam.toLowerCase() || o.text.toLowerCase() === typeParam.toLowerCase()).value;
  }
  if (locationParam && [...locationFilter.options].some((o) => o.value.toLowerCase() === locationParam.toLowerCase() || o.text.toLowerCase() === locationParam.toLowerCase())) {
    locationFilter.value = [...locationFilter.options].find((o) => o.value.toLowerCase() === locationParam.toLowerCase() || o.text.toLowerCase() === locationParam.toLowerCase()).value;
  }
  if (budgetParam) {
    const budgetMap = {
      "Under ₹50 lakh":"under50", "₹50 lakh–₹1 crore":"50to80", "₹1–2 crore":"over100", "₹2 crore+":"over100",
      "under50":"under50", "50to80":"50to80", "80to100":"80to100", "over100":"over100"
    };
    budgetFilter.value = budgetMap[budgetParam] || "";
  }
  render(properties);
  applyFilters();

  if (window.location.hash === "#search") {
    window.setTimeout(() => $("#search").scrollIntoView({behavior:"smooth", block:"start"}), 150);
  }
})();