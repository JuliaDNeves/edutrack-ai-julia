# Design: Multi-Page Auth Structure

## Context
EduTrack AI is transitioning from a single-page view container toggle structure on `index.html` to a modular multi-page HTML architecture. See `proposal.md` for motivation. This design details file paths, link relationships, asset linking strategies, and the local dev server environment.

## Goals / Non-Goals

**Goals:**
- Separate views into dedicated HTML files:
  - Root: `index.html` (Landing Page)
  - Auth directory (`pages/auth/`): `login.html`, `register.html`, `forgot-password.html`
  - Pages directory (`pages/`): `dashboard.html`
- Wire native HTML hyper-links (`<a href="...">` and `<form action="...">`) between pages for seamless browser routing.
- Maintain CSS design system tokens (`--bg-main: #090d16`, `--accent-cyan: #53dce3`, `--accent-lilac: #b19bf1`) by resolving correct relative asset paths (`../../css/styles.css` for `pages/auth/`, `../css/styles.css` for `pages/`).
- Launch a background local dev server on port `3000` to enable immediate localhost navigation testing.

**Non-Goals:**
- No Xano API integrations, authentication endpoints, or server-side routing logic.
- No changes to Dashboard widgets, metrics, or charts.

## Decisions

### Decision 1: Folder Hierarchy & Path Mapping
- **Choice**:
  ```text
  / (root)
  ├── index.html                    (Landing / Initial View)
  ├── css/styles.css
  ├── js/app.js
  └── pages/
      ├── dashboard.html             (Moved from root)
      └── auth/
          ├── login.html             (Standalone Login)
          ├── register.html          (Standalone Register)
          └── forgot-password.html   (Standalone Password Recovery)
  ```
- **Rationale**: Clean separation of concerns. `pages/auth/` isolates authentication screens, while `pages/` isolates application views.
- **Relative Link Matrix**:
  - `index.html` → `pages/auth/login.html`, `pages/auth/register.html`, `pages/dashboard.html`
  - `login.html` → `register.html`, `forgot-password.html`, `../../index.html`, `../dashboard.html`
  - `register.html` → `login.html`, `../../index.html`
  - `forgot-password.html` → `login.html`, `../../index.html`
  - `dashboard.html` → `../index.html`, `auth/login.html`

### Decision 2: Local Server Execution
- **Choice**: Launch local static server (`npx -y serve . -p 3000` or `npx -y http-server -p 3000`) as a background daemon process.
- **Rationale**: Eliminates CORS file protocol restrictions and provides clean `http://localhost:3000` testing in the user's browser.

## Risks / Trade-offs

- **[Risk] Broken relative asset paths when moving HTML files to subfolders**:
  - *Mitigation*: Strictly calculate relative levels (`../../` for depth 2, `../` for depth 1) for stylesheet imports, JS imports, and Font Awesome links.
