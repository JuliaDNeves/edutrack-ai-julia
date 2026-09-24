# Design Document: Dashboard Layout & Structure Refinement

## Context
The EduTrack AI dashboard is a static front-end interface built with HTML, CSS, and vanilla JS. It requires visual refinements to separate page routing into separate HTML files, convert mobile navigation into a bottom fixed navbar, increase header search width, remove notification and streak elements, and strip out weekly temporal wording.

## Architectural Changes

### 1. Page & Route Structure
- **`index.html`**: Converted into an entry/redirect page pointing to `dashboard.html`.
- **`dashboard.html`**: Contains the full Dashboard layout (`sidebar`, `main-content`, `right-panel`).
- **Navigation Links**:
  - Dashboard: `dashboard.html`
  - Disciplinas: `disciplinas.html`
  - Tarefas: `tarefas.html`

### 2. Mobile Responsive Layout Strategy
- **Media Queries (`@media (max-width: 768px)`)**:
  - Hide desktop sidebar (`.sidebar`) or refactor `.sidebar` into a fixed bottom navbar (`position: fixed; bottom: 0; left: 0; right: 0; height: 60px; flex-direction: row;`).
  - Render nav items with icons only (`.nav-item span { display: none; }`).
  - Add `padding-bottom: 80px` to `.app-container` and `.main-content` to prevent fixed bottom navbar from overlapping content.
  - Stack metric cards, progress banner, chart bars, and right panel cleanly on smaller screens.

### 3. Header & Profile Components
- **Header Search Bar**: Increase width from 260px to `360px` (desktop) and `max-width: 100%` (mobile).
- **Notification Icon**: Removed completely from HTML header, CSS `.icon-btn` / `.notification-badge`, and JS event handlers.
- **Desktop Sidebar Profile Action**: Wrap `.sidebar-footer` / `.user-quick-info` in a container with a hover overlay showing "Trocar conta" with an account switch / logout icon.
- **Mobile Profile Behavior**: Display profile modal or compact account pill without hover dependency.
- **Streak Removal**: Remove `.streak-tag` ("5 dias seguidos") from `.profile-card`.

### 4. Text & Phrasing Cleanup
- Task progress banner badge: `<i class="fa-solid fa-trophy"></i> Progresso Geral` (was "Meta Semanal").
- Task progress text: `Você concluiu 14 de 20 tarefas planejadas.` (removed "para esta semana").
- Metric subtext: `Tempo estimado total` (was "Estudo semanal total").
- Chart badge: `<i class="fa-solid fa-chart-simple"></i> Visão por Disciplina` (was "Dados Semanais").

## UI / Theme Tokens
- Background: `#090d16`
- Secondary Container: `#0f1523`
- Card: `#141c2e`
- Cyan Accent: `#53dce3`
- Lilac Accent: `#b19bf1`
- Font: Plus Jakarta Sans & Font Awesome 6.5.1
