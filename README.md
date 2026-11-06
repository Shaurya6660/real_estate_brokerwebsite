# Sunrise Homes — Real Estate Broker Demo

A ready-to-show real estate broker website built with **HTML, CSS and vanilla JavaScript only**.

## No TypeScript
This project intentionally contains **no TypeScript** and requires no npm, Node.js or build step.

## Pages
- `index.html` — Galaxy-style homepage, property search, featured properties, WhatsApp CTA.
- `properties.html` — Property listing page with working search, location/type/budget filters, property detail modal and WhatsApp enquiry flow.
- `about Us.html` — Broker/company About page.

## Folder structure

```text
real-estate-broker-demo/
├── index.html
├── properties.html
├── about Us.html
├── styles.css
├── properties.css
├── script.js
├── properties.js
├── galaxy-background-clean.png
├── assets/
│   └── properties/
│       ├── property-01.svg
│       ├── ...
│       └── property-12.svg
└── README.md
```

## Run locally

Just open `index.html` in a browser, or use VS Code Live Server.

## What is already functional

- Responsive navigation
- Homepage property search -> Properties page
- Property listing cards
- Search by keyword
- Location filter
- Property type filter
- Budget filter
- Reset/clear filters
- Property detail popup
- Enquiry popup
- WhatsApp enquiry generation
- Mobile responsive layout
- Local property artwork, so the property page does not depend on missing image files
- No TypeScript

## Before selling to a broker

Replace:
- `Sunrise Homes`
- broker logo/name
- phone number `+91 98765 43210`
- WhatsApp number `919876543210`
- sample property names/prices/locations
- sample property images
- About Us content

The listings in this repository are demo data only.

## Important technical note

This is a frontend website. The enquiry flow currently opens WhatsApp; it does not create a private database of leads. A secure admin dashboard, login system, persistent lead database, online property management and analytics can be added later with a backend or managed service.

## GitHub

Upload the entire `real-estate-broker-demo` folder to a GitHub repository. Do not upload passwords, API keys or private customer information.
