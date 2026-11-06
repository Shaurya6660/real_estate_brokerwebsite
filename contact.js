(function () {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const form = document.getElementById('enquiryForm');
  const success = document.getElementById('formSuccess');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      const open = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const propertyType = document.getElementById('propertyType').value;
      const purpose = document.getElementById('purpose').value;
      const location = document.getElementById('location').value.trim();
      const budget = document.getElementById('budget').value.trim();
      const message = document.getElementById('message').value.trim();

      const text = [
        'Hello Sunrise Homes, I have a property enquiry.',
        '',
        'Name: ' + name,
        'Phone: ' + phone,
        'Property Type: ' + propertyType,
        'Purpose: ' + purpose,
        'Location: ' + location,
        'Budget: ' + (budget || 'Not specified'),
        'Message: ' + (message || 'Not specified')
      ].join('\n');

      const whatsappUrl = 'https://wa.me/919876543210?text=' + encodeURIComponent(text);
      window.open(whatsappUrl, '_blank', 'noopener');

      if (success) {
        success.textContent = 'Your enquiry is ready. WhatsApp has been opened with the enquiry details.';
      }
    });
  }
})();
