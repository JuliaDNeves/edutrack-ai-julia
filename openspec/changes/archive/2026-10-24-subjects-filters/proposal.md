# Proposal

## Why

Students managing academic subjects on `pages/subjects.html` currently only have a basic text search for subject names and teacher names. To efficiently organize subjects across academic terms, teachers, and differing course workloads, users need structured filtering by start and end dates, teacher, and workload hours. Reusing the proven collapsible filter pattern established on the Tasks page (`pages/tasks.html`), this change adds an intuitive filter bar with toggle controls, conjunctive evaluation, and instant reset while preserving all existing backend endpoints and CRUD actions.

## What Changes

- **Filter Toggle Button (`pages/subjects.html`)**:
  - Add an accessible button `#btn-filter-toggle` with a Font Awesome filter icon (`fa-solid fa-filter`) positioned immediately to the left of the search bar (`#header-search`).
  - Toggle the visibility of the filters panel between visible (`display: flex`) and hidden (`display: none`) upon clicking, maintaining an active visual state (`.active` and `aria-expanded`) when open.
- **Collapsible Filter Panel (`pages/subjects.html`)**:
  - Add `#subjects-filters-bar` between header feedback and the stats bar, hidden by default (`style="display: none;"`).
  - Contains filter inputs:
    - **Data de Início (`#filter-start-date`) e Data de Término (`#filter-end-date`):** Filtrar disciplinas pelo período letivo.
    - **Professor (`#filter-teacher`):** Selecionar ou pesquisar entre os professores cadastrados nas disciplinas do usuário.
    - **Carga Horária (`#filter-hours`):** Filtrar pela quantidade de horas da disciplina.
    - **Limpar Filtros (`#btn-clear-filters`):** Botão para resetar simultaneamente todos os filtros e a barra de pesquisa.
- **Combined Filtering Logic (`renderSubjects()` in `pages/subjects.html`)**:
  - Apply all filter criteria conjunctively (`AND`) along with the existing search input (`#header-search`).
  - Dynamically recalculate counters (`#subjects-count-label`) and total workload hours (`#total-hours-label`) according to filtered results.
  - Display dedicated empty-state feedback when no subjects match the active filters, with a shortcut button to clear filters.
- **Scope & Preservation**:
  - Maintain the existing CRUD operations (create, edit, delete with confirmation), Xano API integration (`GET/POST/PATCH/DELETE /subjects`), light/dark themes (`[data-theme="light"]` / `[data-theme="dark"]`), and mobile responsiveness.
  - Do not modify `pages/tasks.html`, backend APIs, or database schemas.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `subjects-page`: Add multi-criteria filtering requirements (start date, end date, teacher, workload hours) with collapsible toggle button, clear action, and dynamic metric updates.

## Impact

- **Affected Files**:
  - `pages/subjects.html`: Add filter toggle button, collapsible filter bar markup, CSS styling in `<style>`, and combined filtering/reset logic in `<script>`.
- **APIs & Database**:
  - Zero changes to backend APIs or Xano database schemas.
- **Dependencies**:
  - Zero new libraries or dependencies added.
