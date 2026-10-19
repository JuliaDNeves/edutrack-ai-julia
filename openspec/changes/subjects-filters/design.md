# Technical Design

## Context

See `proposal.md` for background and motivation.

On `pages/subjects.html`, subjects belonging to the authenticated user are retrieved from Xano via `GET /subjects` and stored in the local array `subjectsList`. Each subject record contains: `id`, `name`, `teacher`, `hours`, `start_date`, `end_date`, and `description`.
Currently, filtering is limited to a single textual query input (`#header-search`) executed client-side inside `renderSubjects()`. Reusing the filter architecture developed for `pages/tasks.html`, a collapsible multi-criteria filter panel with an icon toggle button and a clear action will be introduced to `pages/subjects.html`.

## Goals / Non-Goals

**Goals:**
- Insert an icon button (`#btn-filter-toggle`) with Font Awesome (`fa-solid fa-filter`) to the left of the search box (`.search-box`).
- Insert a collapsible filter bar (`#subjects-filters-bar`) styled with design tokens, starting hidden by default (`style="display: none;"`).
- Toggle filter panel visibility (`display: flex` / `display: none`) and button active state on click.
- Provide filter controls for:
  - **Datas (Início e Término):** `#filter-start-date` e `#filter-end-date` para comparar com `s.start_date` e `s.end_date`.
  - **Professor:** `#filter-teacher` populado dinamicamente com os professores distintos cadastrados pelo usuário.
  - **Carga Horária:** `#filter-hours` (input numérico) para filtrar pela quantidade de horas da disciplina.
  - **Limpar Filtros:** `#btn-clear-filters` para resetar todos os filtros e a busca textual.
- Evaluate all filter criteria conjunctively (`AND`) in `renderSubjects()`.
- Dynamically update `#subjects-count-label` and `#total-hours-label` reflecting the filtered subset.
- Support both Light and Dark themes (`[data-theme="light"]` / `[data-theme="dark"]`) and mobile responsiveness (`@media (max-width: 768px)`).

**Non-Goals:**
- Creating or modifying backend Xano APIs or database tables.
- Modifying `pages/tasks.html`, `pages/dashboard.html`, or other pages.
- Modifying subject CRUD logic (creation, editing, or deletion modals).

## Decisions

### 1. UI Placement and Toggle Pattern
- **Toggle Button**: Positioned in `.header-actions` directly before `.search-box`. Reuses the 42x42px button style with subtle hover and active states (`.active` with accent cyan border/background).
- **Filter Bar Container**: Positioned directly below `#alert-feedback` and above the stats bar. Begins with `style="display: none;"` and uses `animation: fadeIn 0.2s ease-out;` when displayed.

### 2. Teacher Dropdown Population
- In `fetchSubjects()` (and updated when `subjectsList` changes), extract unique, trimmed, non-empty teacher names from `subjectsList` and sort them alphabetically.
- Default option: `<option value="">Todos os professores</option>`.
- Preserves the currently selected teacher if still valid after data reload.

### 3. Conjunctive Filter Evaluation in `renderSubjects()`
- **Text Search**: `matchName || matchTeacher` with query text.
- **Dates**:
  - Normalization: `startDate = s.start_date ? String(s.start_date).split('T')[0] : ''` and `endDate = s.end_date ? String(s.end_date).split('T')[0] : ''`.
  - Condition: `(!filterStart || (startDate && startDate >= filterStart)) && (!filterEnd || (endDate && endDate <= filterEnd))`.
- **Teacher**:
  - Condition: `!filterTeacher || (s.teacher && s.teacher.trim() === filterTeacher)`.
- **Hours**:
  - Condition: `!filterHours || (s.hours !== null && s.hours !== undefined && Number(s.hours) === Number(filterHours))`.
- All conditions are joined with `&&`.

### 4. Clear Filters Behavior
- Clicking `#btn-clear-filters` (or the clear shortcut in the empty-state feedback):
  - Sets `#filter-start-date`, `#filter-end-date`, `#filter-teacher`, `#filter-hours`, and `#header-search` to empty.
  - Re-executes `renderSubjects()` to restore the full list and recalculate total workload hours.

## Risks / Trade-offs

- **[Risk] Null or undefined date / hours fields in existing subject records**:
  - *Mitigation*: Ensure filtering guards explicitly check for existence (`startDate && startDate >= filterStart`, `s.hours !== null && Number(s.hours) === Number(...)`). Subjects with missing metadata will simply not match specific date/hour filters without throwing runtime errors.
- **[Risk] Mobile viewport wrapping**:
  - *Mitigation*: Add responsive media queries (`@media (max-width: 768px)`) converting the filter bar to stacked full-width controls and allowing `.header-actions` to wrap comfortably.
