# OfficialRecordsXpress (ORX) — prototype

Clickable prototype of the ORX back-office for Utah County Clerk & Auditor, built on the ApostilleXpress design system.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Redirects to the login page |
| `shell.html` | Persistent app shell: sidebar mounts once; pages load in the content frame (`shell.html#page.dc.html`) |
| `signature-administration.html` | Placeholder ("Design in progress"); redirects into `shell.html` when opened alone |
| `e-register-verify.html` | Placeholder ("Design in progress"); redirects into `shell.html` when opened alone |
| `login.dc.html` | Log in, forgot password, code check, new password, success |
| `dashboard.dc.html` | Dashboard with date-range picker and live stat cards |
| `certificate-orders.dc.html` | Certificate Orders with per-column checkbox filters and sorting. Click a row for the order detail view (order and customer details, collapsible certificate / spouses / witnesses / officiant sections, mailing information or digital recipients, activity timeline), a certificate preview modal and a revoke flow |
| `apostille-queue.dc.html` | Apostille Queue: affirm signature, select, process, snooze (menu follows the default in Platform Settings). Tabs for Order Queue and Processed Batches, each with search and per-column filters. Click an order to open it, or a batch to open its overview |
| `batch-order.dc.html` | Order Overview for a processed batch: batch details and a paginated sub-orders table (format and status match Certificate Details). Opens from a batch in Processed Batches (`batch-order.dc.html#<batch id>`); not in the sidebar |
| `reports-reconciliation.dc.html` | Reports & Reconciliation with per-column filters and CSV export |
| `audit-log.dc.html` | Audit Log with expandable rows and CSV export |
| `settings.dc.html` | Platform Settings (queue defaults, notifications) |
| `profile.dc.html` | My Profile (personal details, security, sessions) |

## Running locally

All paths are relative and there is no build step. Serve the folder with any static server and open `index.html` (sign in → `shell.html`). The pages must be served over HTTP; opening them from `file://` will not work:

```sh
npx serve .
```

## GitHub Pages

The `.nojekyll` file is included. In the repository settings choose **Pages → Deploy from a branch → main / (root)**. The site opens at `/index.html`.

## Folders

- `ds/` — ApostilleXpress design system bundle, tokens and styles (loaded by every page)
- `assets/` — ORX logo files
- `sidebar-pre.js` — pre-paints the sidebar when a page is opened standalone (hidden inside `shell.html`)
- `ax-map.js` — map/chart helpers used by the dashboard
- `flags.js` — prototype flags for login error states (bump `?v=` in `login.dc.html` when edited)
- `support.js` — runtime for the `.dc.html` pages

## Repository notes

- `uploads/` and `_ds/` are working folders and are git-ignored. `ds/` is the copy the pages load and must be committed.
- `LICENSE` is a proprietary "all rights reserved" notice; replace it if you want to open-source the project.
- To publish: `git init && git add . && git commit -m "Initial commit"`, then add your remote and push.

## Notes

- Order numbers are shared across Dashboard, Apostille Queue, Reports and Certificate Orders; clicking an order row anywhere opens it at `certificate-orders.dc.html#order=<number>` (inside `shell.html` this is handled by a message to the shell).
- Below 900px wide the sidebar collapses to the icon rail automatically.
- When the sidebar is collapsed, hovering or keyboard-focusing an icon shows its name as a tooltip.
- All data is sample data; nothing is sent to a server.
- Bootstrap Icons load from the jsDelivr CDN, so an internet connection is needed for icons.
- Settings, profile changes and processed batches are kept in the browser's local storage (`orx-settings2`, `orx-batches`).
- Sub-order rows on the batch overview page are generated sample data derived from the seven sample orders.
