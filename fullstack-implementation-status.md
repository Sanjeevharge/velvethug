# Velvet Hug Full-Stack Implementation Status

**Date:** 16 September 2026  
**Scope:** Browser storefront, backend, PostgreSQL/PGlite persistence, and admin panel. Shopify theme work remains a later phase as requested.

## Completed

The browser storefront now hydrates its catalog, promotions, quiz questions, customer session, and cart from the backend API. Guest carts use a stable backend session identifier, while authenticated customers use the server-issued customer session cookie. Add, remove, quantity updates, and checkout are now routed through the backend with a local fallback only for temporary offline rendering.

Checkout now calls customer login/registration and the backend ACID checkout transaction. The backend validates product and inventory rows, reserves stock, writes the order and line items, clears the persistent cart, and appends an audit event. The browser no longer creates a synthetic admin order in localStorage after checkout.

Customer return requests now write to `users.returns_rmas`, and completed sleep quizzes are persisted to `users.quiz_diagnoses` while the recommendation UI remains immediate.

The embedded database was isolated under `data/pglite_store` so it does not collide with older native PostgreSQL data directories. The backend now loads the `pg` module only when `DATABASE_URL` is configured, which makes local PGlite startup independent of platform-specific optional dependency problems.

Admin API access now uses server-issued, expiring bearer tokens. Company and destructive system endpoints reject requests without a valid server token. The admin login flow exchanges the local credential/2FA step with `/api/company/auth/login`, stores the server token for the session, attaches it to company API requests, and clears it on logout or unauthorized response.

The package manifest now includes `npm run server` and `npm test`. A repeatable API integration suite was added at `tests/api.test.mjs`.

## Verification completed

| Verification | Result |
|---|---|
| `node --check` for server, database, storefront, and admin modules | Passed |
| Clean Linux Vite production build | Passed |
| Backend health endpoint | Passed |
| Database catalog endpoint | Passed |
| Persistent guest cart add/read | Passed |
| ACID checkout and stock reservation path | Passed |
| Admin request without token rejected | Passed |
| Admin login token issuance | Passed |
| Authenticated admin inventory read | Passed |
| Full integration suite | **5 passed, 0 failed** |

The integration suite output was:

```text
✔ health reports an operational database
✔ catalog returns products from the database
✔ guest cart persists and can be checked out atomically
✔ admin inventory rejects requests without a server token
✔ admin login returns a usable server token
ℹ tests 5
ℹ pass 5
ℹ fail 0
```

## Run locally

Install dependencies on the machine that will run the project, then start the backend and frontend:

```bash
npm install
npm run server
```

The backend serves the application at `http://localhost:8080`. The health endpoint is `http://localhost:8080/api/health`, and the admin panel is served at `http://localhost:8080/admin/`.

For frontend-only development, use a second terminal:

```bash
npm run dev
```

Run automated backend verification with:

```bash
npm test
```

The current checkout includes a mounted Windows dependency directory that was not a valid Linux execution environment during sandbox testing. A clean `npm install` is required on the Windows development machine before running the scripts there; the source build itself passed with a clean Linux dependency installation.

## Follow-up fixes completed

The Vite development server now proxies `/api`, `/admin`, and `/backend-inspector` to the backend on port 8080. This fixes the previous admin login failure where the frontend received Vite HTML and then attempted to parse it as JSON. API and admin login errors now show a clear backend-unavailable message instead of `Unexpected end of JSON input`.

All storefront references to `/public/images/...` were corrected to `/images/...`, which is the root URL convention for Vite public assets. The admin page now exposes **Backend Diagnostics** both before login and inside the authenticated sidebar. Safe health, schema, product, and inventory diagnostics are available without admin authentication; destructive reset and sensitive admin routes remain protected.

The development routing verification passed through the same Vite origin used by the browser:

```text
/api/health          200
/backend-inspector   200
/admin/              200
admin-login          success: true, server token issued
```

## Customer authentication correction

The storefront phone OTP and Google-style sign-in flows now call `/api/user/auth/login-or-register` instead of creating a customer only in browser storage. Successful authentication inserts or updates `users.customers`, creates a `users.sessions` row, stores the session token in the `vh_sess_tok` cookie, and loads orders through the backend. Stale local customer profiles are no longer treated as authenticated when there is no valid backend session.

The focused verification confirmed `customers_count` increased from `0` to `1` and the newly issued session was accepted by `/api/user/session`.

## Latest storefront and tracker corrections

Instant Buy Now no longer closes the product detail state before reading the selected product. It now waits for the selected item to be persisted in the backend cart, closes the cart drawer, and only then opens checkout, preventing a zero-value checkout. Customer authentication is resilient if the optional initial order refresh is unavailable; the account page retries order loading from the authenticated customer session, and checkout refreshes the order list before returning to the account view. The backend order endpoint can resolve the customer from the bearer session and returns normalized order data for the storefront.

The backend tracker now refreshes metrics and schema row counts every 15 seconds. Its light theme overrides hardcoded dark table, heading, console, and partition colors so table data remains readable in light mode.

The expanded integration suite now covers customer registration, session validation, checkout, and authenticated order retrieval: **6 tests passed, 0 failed**.

## Deliberate scope boundary

The Shopify theme was not rebuilt in this phase because the requested priority was to make the browser storefront, backend, and admin panel operate as one actual website first. Shopify-specific Liquid product rendering, native Shopify cart/checkout, Shopify product/variant IDs, and webhook synchronization remain the next deployment phase.
