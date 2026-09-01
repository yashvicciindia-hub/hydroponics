# Hydroponics India

A responsive multi-page website for Hydroponics India, an integrated agri-tech ecosystem connecting farmers, equipment, technology, finance, knowledge and buyers.

## Run locally

Install dependencies, then use the project's normal development or preview workflow.

## Build

The production build is created with the existing Vite build script.

## Pages

- `/` Home
- `/about` About
- `/ecosystem` Ecosystem
- `/solutions` Solutions
- `/ai-intelligence` AI Intelligence
- `/marketplace` Marketplace
- `/impact` Impact
- `/join` Join the Ecosystem
- `/contact` Contact

## Google Forms

The pre-filled Google Form URLs and exact entry mappings are centralized near the top of `src/App.tsx` in the `googleForms` configuration. `buildPrefilledGoogleFormUrl` uses `URLSearchParams`, preserving multilingual text and appending repeated values for checkbox fields.

Registration is intentionally a two-step flow: visitors complete the website form first, review their details, and then continue to Google Forms for final submission.

## Images and content

The two supplied images are in `public/images`. Additional greenhouse imagery uses direct Pexels image URLs in `src/App.tsx`. Replace the image constants near the top of that file to update photography. Page content and section copy live alongside each page component.

## Deployment

Deploy the project as a standard Vite website. Configure the host to serve `index.html` for the listed routes so browser navigation works on refresh.
