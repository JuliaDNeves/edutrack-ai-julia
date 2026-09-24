# Proposal: Refine Dashboard Layout and Page Structure

## Why

The current EduTrack AI frontend has the Dashboard embedded directly inside `index.html` and contains temporal references to weekly tracking ("Meta Semanal", "esta semana", "Estudo semanal total", "Dados Semanais") as well as temporary elements like notifications and streak tracking ("5 dias seguidos").

Refactoring the Dashboard into a dedicated `dashboard.html` file establishes a professional multi-page layout prepared for future `Disciplinas` and `Tarefas` pages. Additionally, enhancing responsive design for small screens (replacing the sidebar with a fixed bottom navigation bar on mobile) and refining header search, visual profile actions, and temporal phrasing provides a cleaner, mobile-friendly user experience while maintaining the existing dark mode aesthetic.

## What Changes

- **Page Structure Separation:**
  - Move Dashboard view from `index.html` into a dedicated `dashboard.html`.
  - Update `index.html` to redirect cleanly to `dashboard.html`.
  - Update sidebar navigation links to prepare paths for `dashboard.html`, `disciplinas.html`, and `tarefas.html`.

- **Responsive Mobile Navigation:**
  - Maintain left sidebar on desktop.
  - Convert sidebar on mobile/small screens into a fixed bottom navigation bar displaying icons only.
  - Keep active navigation state highlighted on the bottom bar.
  - Add appropriate bottom padding to content containers (`app-container` / `main-content`) to prevent UI elements from being obscured by the bottom navbar.
  - Adapt cards, chart, right panel, and layout grid elements for small screens.

- **Sidebar Profile & Visual Account Switcher:**
  - Maintain user profile at the bottom left of the desktop sidebar.
  - Transform it into a visual account/logout action.
  - Display a visual "Trocar conta" action on profile hover in desktop mode.
  - Adapt mobile profile interaction without relying on hover state.
  - Keep all account actions strictly visual (no real authentication or logout functionality).

- **Header Bar Refinement:**
  - Moderately increase the visual width of the header search bar (e.g., from 260px to ~360px).
  - Completely remove the notification button icon, badge, styling, and JS click handlers.

- **Right Panel Adjustment:**
  - Completely remove the streak tag ("5 dias seguidos") from the profile card without replacing it.

- **Temporal Phrasing Standardization:**
  - Remove all weekly temporal references ("Meta Semanal", "Dados Semanais", "Estudo semanal total", "para esta semana").
  - Replace with neutral phrasing ("Progresso Geral", "Visão por Disciplina", "Tempo estimado total", "Você concluiu 14 de 20 tarefas planejadas.").

- **Visual Design Preservation:**
  - Maintain dark mode palette (`#090d16`, cyan `#53dce3`, lilac `#b19bf1`), rounded cards, subtle glows, and Font Awesome icons.

## Capabilities

### New Capabilities
- `dashboard-frontend`: Refined multi-page navigation structure, fixed mobile bottom navigation bar, visual profile action switcher, neutral study metrics phrasing, and mobile-adapted academic dashboard layout.

### Modified Capabilities
- `dashboard-frontend`: Updated requirement specifications for sidebar/bottom navbar, header search/notifications, profile streak tag removal, and task progress temporal wording.

## Impact

- Frontend HTML files (`index.html`, `dashboard.html`).
- CSS stylesheet (`css/styles.css`).
- JavaScript behavior (`js/app.js`).
- OpenSpec specification deltas (`openspec/changes/refine-dashboard-layout/specs/dashboard-frontend/spec.md`).
- No backend, Xano, XanoScript, database tables, APIs, or authentication logic impacted.
