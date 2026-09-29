# Proposal: Multi-Page Auth Structure

## Why
EduTrack AI requires a modular multi-page file structure where every authentication view (Login, Registration, Password Recovery) and Dashboard reside in independent HTML files rather than single-page display toggles. This establishes a clean, professional project structure and native browser URL navigation.

## What Changes
- Restructure project HTML files into dedicated pages:
  - `index.html`: Initial landing/welcome presentation page.
  - `pages/auth/login.html`: Dedicated Login page.
  - `pages/auth/register.html`: Dedicated Sign Up (Cadastro) page.
  - `pages/auth/forgot-password.html`: Dedicated Password Recovery page.
  - `pages/dashboard.html`: Dedicated Dashboard page (moved from root `dashboard.html`).
- Update all cross-page navigation links (`href`) to link natively between files:
  - Landing (`index.html`) → Login (`pages/auth/login.html`) and Sign Up (`pages/auth/register.html`).
  - Login → Sign Up, Password Recovery, Landing, and Dashboard (visual demo entry point).
  - Sign Up → Login and Landing.
  - Password Recovery → Login and Landing.
  - Dashboard → Logout/Switch account back to Landing or Login, and internal page navigation.
- Maintain 100% visual identity (dark mode `#090d16`, cyan `#53dce3`, lilac `#b19bf1`, rounded glow cards, Font Awesome icons, responsive design).
- Configure a local development server running on `http://localhost:3000` (or dynamic free local port) to allow live browser testing of all page navigation transitions.
- **SCOPE RESTRICTION**: Purely visual template navigation and file structure. No Xano backend integration, authentication logic, database models, session state, or email dispatch.

## Capabilities

### New Capabilities
- `multi-page-auth-structure`: Multi-page standalone HTML file structure, relative links navigation, and local dev server setup for EduTrack AI.

### Modified Capabilities
*(None)*

## Impact
- File organization: Created `pages/auth/` directory holding `login.html`, `register.html`, `forgot-password.html`, and `pages/` holding `dashboard.html`.
- `index.html`: Updated to contain only landing presentation with links to `pages/auth/login.html` and `pages/auth/register.html`.
- `css/styles.css` & `js/app.js`: Updated relative resource references (`../../css/styles.css` in `pages/auth/`, `../css/styles.css` in `pages/`) and simplified JS logic for native multi-page navigation.
- Local server: Background dev server process running on local port.
