(() => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const searchForm = document.getElementById("propertySearch");
  const toast = document.getElementById("toast");
  const year = document.getElementById("year");
  let toastTimer;

  if (year) year.textContent = String(new Date().getFullYear());

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("open") ?? false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
      mainNav.querySelectorAll("a").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4200);
  }

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(searchForm);
    const params = new URLSearchParams();
    const propertyType = String(formData.get("propertyType") || "Any");
    const location = String(formData.get("location") || "Any Location");
    const budget = String(formData.get("budget") || "Any Budget");
    if (propertyType !== "Any") params.set("type", propertyType);
    if (location !== "Any Location") params.set("location", location);
    if (budget !== "Any Budget") params.set("budget", budget);
    window.location.href = `properties.html${params.toString() ? "?" + params.toString() : ""}#search`;
  });

  document.getElementById("featuredCard")?.addEventListener("click", () => {
    window.location.href = "properties.html#search";
  });
})();