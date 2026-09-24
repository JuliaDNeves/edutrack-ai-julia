# Tasks: Refine Dashboard Layout and Page Structure

## Phase 1: File Structure & Routing Separation
- [x] Create `dashboard.html` containing the complete Dashboard UI markup extracted from `index.html`.
- [x] Update `index.html` to serve as entry page redirecting to `dashboard.html`.
- [x] Update navigation links across sidebar/navbar (`dashboard.html`, `disciplinas.html`, `tarefas.html`).

## Phase 2: Header & Profile Component Refinements
- [x] Moderately increase header search bar width in `css/styles.css` (e.g. 360px).
- [x] Remove notification button icon (`#notifications-btn`) and badge from `dashboard.html`, `css/styles.css`, and JS handler in `js/app.js`.
- [x] Implement desktop sidebar profile visual hover overlay for "Trocar conta" action.
- [x] Adapt profile account interaction for mobile without relying on CSS hover.
- [x] Remove streak tag ("5 dias seguidos") from `.profile-card` in `dashboard.html`.

## Phase 3: Temporal Phrasing Standardization
- [x] Update task progress banner badge text from "Meta Semanal" to "Progresso Geral".
- [x] Update task progress description to "Você concluiu 14 de 20 tarefas planejadas." (removing "para esta semana").
- [x] Update study time metric card subtext from "Estudo semanal total" to "Tempo estimado total".
- [x] Update study chart badge text from "Dados Semanais" to "Visão por Disciplina".

## Phase 4: Mobile Responsiveness & Bottom Navbar Implementation
- [x] Add mobile media query styles in `css/styles.css` to transform sidebar into a fixed bottom navbar for screens <= 768px.
- [x] Ensure mobile bottom navbar displays navigation icons only and highlights active state.
- [x] Add bottom padding to `.app-container` and `.main-content` so content is not obscured by the bottom navbar.
- [x] Adapt metric grid, task progress banner, chart, and right panel layouts for fluid responsive stacking on small screens.
