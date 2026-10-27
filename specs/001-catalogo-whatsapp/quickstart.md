# Quickstart: Validación de la tienda

## Prerequisites

- Node.js LTS and npm.
- A Supabase project with database, storage bucket and one administrator account.
- A Vercel project connected to the GitHub repository.
- Environment variables configured locally and in Vercel; never commit their values.

## Local validation

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Open the local URL from a desktop browser and a mobile viewport.
4. Run unit tests with `npm test`.
5. Run end-to-end tests with `npm run test:e2e`.

## Acceptance walkthrough

1. As a visitor, verify the catalog, product details, responsive layout and empty state.
2. Select `Pedir por WhatsApp` and verify number `994431924` and the product name in the
   prepared message.
3. Log in as the administrator and add a valid product with a JPG, PNG or WebP image up to 5 MB.
4. Open the public catalog from a second device and verify the product appears.
5. Try invalid fields, an oversized image and a disallowed image type; verify clear rejection.
6. Delete the product after confirming its name; verify it disappears on the second device.
7. Attempt a write without login and after session expiry; verify no catalog change and a clear
   error.
8. Simulate a storage failure; verify no false success and a manual retry path.

## GitHub and publication

- Work in a feature branch and open a pull request for review.
- Require passing unit and end-to-end checks before merging to the deployment branch.
- Vercel deploys the reviewed branch; configure secrets in Vercel settings, not in GitHub files.
- After deployment, repeat the acceptance walkthrough against the public URL.
