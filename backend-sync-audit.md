# Velvet Hug Backend and Surface Synchronization Audit

**Audit date:** 16 September 2026  
**Scope:** Browser storefront, admin panel, Node/Express/PostgreSQL backend, and Shopify Online Store 2.0 theme  
**Conclusion:** **Not production-solid; the surfaces are not in complete synchronization.**

## Executive verdict

The repository contains a meaningful backend and relational schema, but the live browser storefront does not use that backend for its core business flows. The storefront catalog, cart, checkout, customer account, returns, reviews, stories, and founding-partner state are primarily implemented with static JavaScript data and `localStorage`. The admin panel only partially reads from PostgreSQL and continues to persist many operational changes locally. The Shopify theme is a separate implementation with incompatible runtime imports, placeholder/demo state, and incomplete Shopify-native product/cart rendering.

As a result, there is currently no single canonical source of truth shared by all surfaces. The backend's ACID checkout and inventory logic cannot protect orders created by the browser storefront because that storefront does not call the checkout API.

## Surface-by-surface findings

| Surface | Current state | Verdict |
|---|---|---|
| Browser storefront | Large SPA with static `src/data/products.js`, local cart/account/checkout state, and extensive `localStorage` usage. `src/api.js` exists but is not imported by `src/main.js`. | **Not backend-synced** |
| Admin panel | `src/admin.js` partially fetches live inventory, orders, quiz, and founding data, but login, audit logs, coupons, reviews, stories, returns, and several inventory actions still use local data. | **Partially synced; inconsistent** |
| Node/Express backend | Broad route surface and dual-schema SQL design exist. Checkout has a transaction path and stock reservation logic. Runtime startup did not reach `listen()` during bounded tests, so the API could not be exercised end to end. | **Architecturally substantial, operationally unverified/not healthy** |
| Shopify theme | Theme files and JSON configuration exist, but `assets/main.js` imports modules that are not present under `shopify-theme/assets`; collection/cart templates are placeholders rather than complete Shopify product/cart templates. | **Not deploy-ready** |

The repository does **not** contain three independent, synchronized storefronts. It contains one browser SPA, one separate Shopify theme implementation, one admin panel, and one backend service.

## Evidence of the synchronization break

### 1. Browser storefront bypasses the backend

`src/main.js` imports catalog and state helpers directly from `src/data/products.js` and `src/data/adminStore.js`. It defines local cart persistence through `loadStoredCart()` and `saveStoredCart()` and contains numerous `localStorage` reads/writes.

The storefront cart flow in `src/main.js` adds products to `state.cart` and calls `saveStoredCart()`; it does not call `/api/user/cart`. The checkout flow creates a local order object, saves it into the browser user object, then manually writes a synthetic admin order into `localStorage` under `vh_admin_store_v1`. It does not call `/api/user/checkout`.

The return flow similarly writes to `getStoredReturns()` / `saveStoredReturns()` instead of `/api/user/returns`. Reviews and customer stories are written directly into the local admin store. This means the backend's transaction and inventory guarantees do not cover actual browser purchases.

### 2. Admin panel is only partially connected

The admin panel does call backend endpoints for selected reads and mutations, including live inventory loading, live order loading, SKU creation/deletion, some stock patches, quiz reads/writes, and founding-partner reads. However:

- Admin authentication in `src/admin.js` validates credentials from `src/data/adminStore.js` in the browser rather than using `/api/company/auth/login`.
- Coupons are created, deleted, and toggled in local admin state only.
- Dashboard revenue, audit display, and several operational modules read local state.
- Returns are stored locally by the customer flow and only locally displayed by the admin flow.
- Customer stories and reviews are local-only.
- The browser order flow writes a local synthetic order instead of creating a row in `users.orders`.

The admin UI can therefore show a different order, inventory, coupon, return, review, or audit state from PostgreSQL depending on which module is open and which browser profile is being used.

### 3. Backend authorization is not solid

The backend has a staff-login route, but the returned admin token is not persisted as a server-side session and the admin routes do not enforce a staff authorization middleware. The login route accepts the plaintext fallback password `VelvetAdmin@2026!` and fallback 2FA code `8942`, matching the plaintext demo credentials in `src/data/adminStore.js`.

The following high-impact endpoints are exposed without an evident authorization guard in `server/server.js`:

- `/api/company/inventory` read/create/update/delete
- `/api/company/orders` read/update
- `/api/company/returns` read/update
- `/api/company/quiz` create/delete
- `/api/system/reset-users`
- `/api/system/reset-company`
- `/api/system/full-reset`
- `/api/shopify/export-catalog`

The reset endpoints are especially unsafe if the service is ever reachable outside a trusted local environment.

### 4. Shopify theme is not the same application

`shopify-theme/layout/theme.liquid` loads `assets/main.js` as a module. That file imports:

- `./data/products.js`
- `./data/quizQuestions.js`
- `./components/Visualizer3D.js`

Those paths do not exist under `shopify-theme/assets`. The corresponding source files exist only under the separate browser source tree. The theme therefore cannot run its main module as packaged.

Additional theme gaps:

- `templates/collection.json` renders only `mattress-filters`; the section creates an empty product grid for JavaScript to populate and does not render a Shopify `{% for product in collection.products %}` loop.
- `templates/cart.json` assigns `categories-rail` as its cart section, not a Shopify cart item form or cart line-item renderer.
- `templates/page.quiz.json` also assigns `categories-rail`, so it is not a quiz page implementation.
- `sections/categories-rail.liquid` contains empty containers with comments that they should render dynamically; it does not render Shopify collections.
- The theme JavaScript initializes a demo cart containing `PRODUCTS[0]` and prefilled demo checkout information, including `Sanjeev Kumar`, rather than loading Shopify cart/customer state.

The theme JSON files are syntactically valid JSON, but JSON validity alone does not make the theme functionally deployable.

## Divergent canonical data

| Business datum | Browser/admin behavior | Backend behavior | Shopify behavior | Result |
|---|---|---|---|---|
| Product catalog | Static `src/data/products.js` | Seeds PostgreSQL from the same JS module and serves API data | Separate missing asset data module; intended Shopify product data is not rendered by Liquid | No stable canonical catalog at runtime |
| Cart | Browser `localStorage` | `users.cart_items` API exists | Demo cart in theme JS / native Shopify cart not implemented | Carts diverge by surface |
| Orders | Local browser order object and local admin mirror | ACID `users.orders` route exists | Shopify checkout/order pipeline not wired | Admin/backend can disagree on orders |
| Inventory | Partially fetched by admin; storefront does not use it | `company.inventory` with stock decrement | Shopify inventory export exists but no live sync/webhook implementation | Availability is not authoritative across surfaces |
| Coupons | Local admin state and local checkout matching | Backend promo table used only by backend checkout | Theme settings use `FESTIVE40` | Coupon state diverges |
| Promo default | Browser HTML includes `DIWALI30`; admin defaults include `DIWALI30` | Backend seeds multiple codes including `DIWALI30` | Shopify settings use `FESTIVE40` | Inconsistent campaign behavior |
| Founding-partner counter | Browser local default comes from `INITIAL_PARTNER_COUNT`; admin dashboard falls back to `348` | Counts real `users.customers` rows | Shopify settings set `847` | Visible counts can differ substantially |
| Returns | Local `vh_returns_data` | `users.returns_rmas` route/schema exists | No Shopify return synchronization | RMA records are not shared |
| Reviews/stories | Local `vh_admin_store_v1` | No complete corresponding backend write path | Metaobject schema is only a definition | Content is not synchronized |

## Test results

| Check | Result | Notes |
|---|---|---|
| JavaScript syntax checks | **Passed** | `node --check` passed for `server/server.js`, `server/database/db.js`, `src/main.js`, and `src/admin.js` before the runtime test. |
| Declared `npm test` | **Failed** | `package.json` has no `test` script; npm reports `Missing script: "test"`. |
| Declared `npm run build` in mounted checkout | **Failed** | The checked-in/mounted dependency tree has a non-executable `vite` shim and missing Linux Rollup optional binary. |
| Clean Linux dependency Vite build | **Passed** | With a clean dependency install outside the repository, the browser app built successfully in about 17 seconds. This validates the source build, not the checked-in dependency environment. |
| Backend startup | **Failed / blocked** | Bounded runs of `node server/server.js` did not emit the expected startup log or reach port 8080; curl checks to health/catalog/admin/inspector endpoints failed to connect. Database initialization therefore could not be verified end to end. |
| Shopify JSON parsing | **Passed** | Theme configuration, templates, and metafield schema files parsed as JSON. |
| Shopify runtime integrity | **Failed** | Theme `assets/main.js` imports missing modules under `shopify-theme/assets`; collection/cart/quiz templates are incomplete placeholders. |
| API contract coverage | **Failed** | Backend routes exist, but the main storefront does not consume `src/api.js` or the backend checkout/cart/session APIs. |

## Priority remediation plan

### P0 — Required before any production or Shopify launch

1. Select one canonical commerce backend. For this repository, that should be PostgreSQL for custom operational data plus Shopify for commerce/order/payment primitives after the Shopify cutover decision is made. Do not keep browser `localStorage` as a source of truth for orders, inventory, customers, returns, or pricing.
2. Wire `src/main.js` to `src/api.js` for catalog, session, cart, checkout, orders, quiz submission, and returns. Remove local order creation and the local admin-order mirror.
3. Make backend startup deterministic. Separate PGlite data storage from any native PostgreSQL data directory, remove stale lock/PID state, and add an explicit server start command. Verify `/api/health` before allowing the service to be considered ready.
4. Add real server-side admin authentication and authorization middleware. Hash passwords, remove hardcoded bypass credentials, persist/expire admin sessions, protect every `/api/company/*` and `/api/system/*` mutation, and add CSRF/origin protections appropriate to deployment.
5. Add automated tests and a test script covering startup, catalog, cart, stock reservation, checkout rollback, customer session, admin auth, authorization rejection, returns, and reset safety.
6. Rebuild the Shopify theme around Shopify-native data: Liquid collection/product/cart rendering, Shopify product/variant IDs, native cart endpoints, customer/session behavior, and Shopify webhooks or an approved integration service for order/inventory synchronization.

### P1 — Required for reliable operations

1. Replace admin local mutations for coupons, returns, audit logs, reviews, stories, and quiz content with backend APIs and database rows.
2. Define and enforce one product schema. Generate Shopify metafield values and backend records from the same source or implement a controlled export/import pipeline with IDs, variants, prices, images, and inventory reconciliation.
3. Remove demo customer/cart values and all synthetic hardcoded order, founding-count, and campaign defaults from runtime code.
4. Add an explicit synchronization status page that compares database product/variant counts, Shopify IDs, inventory quantities, promo versions, and last webhook timestamps.
5. Add build/deployment hygiene: platform-specific dependency installation, `npm run build`, `npm test`, environment validation, and a CI check for missing Shopify asset imports.

## Final answer to the requested question

**No.** The backend is not currently solid enough to call production-ready, and the storefront, admin panel, backend, and Shopify theme are not in complete sync. The backend should be treated as an unfinished integration layer until the P0 items are implemented and verified with end-to-end tests against one canonical data flow.

This audit was read-only; no application source files were changed during the audit.
