# Technical Design

## Context

See `proposal.md` for background and motivation.

On `pages/tasks.html`, academic tasks belonging to the authenticated user are retrieved from Xano via `GET /academic_tasks` and stored in the local array `tasksList`. Academic subjects owned by the user are retrieved via `GET /subjects` and mapped in `subjectsMap` (`id -> name`).
Currently, filtering is limited to a single textual query input (`#header-search`) executed client-side inside `renderTasks()`. To provide robust task management without backend changes, a multi-criteria filter bar (date range, status, subject, and clear action) will be introduced in `pages/tasks.html` and evaluated in memory.

## Goals / Non-Goals

**Goals:**
- Implement a responsive filter bar (`.tasks-filter-bar`) in `pages/tasks.html` with inputs for:
  - Período de data prevista: Data inicial (`#filter-date-from`) e Data final (`#filter-date-to`).
  - Status: Dropdown (`#filter-status`) com opções "Todos os status" (padrão), "Pendente" e "Concluída".
  - Disciplina: Dropdown (`#filter-subject`) populado dinamicamente com as disciplinas do usuário.
  - Ação de limpar: Botão (`#btn-clear-filters`) para resetar todos os filtros e a busca para o estado padrão.
- Execute conjunctive (AND) filtering across date range, status, subject, and text search in `renderTasks()`.
- Dynamically update the summary metrics (`#tasks-count-label`, `#total-time-label`, `#spent-time-label`) and empty state according to filtered results.
- Ensure seamless visual integration with the design system in both Light and Dark themes (`data-theme="light"` / `data-theme="dark"`).
- Maintain responsive behavior on desktop, tablet, and mobile devices.

**Non-Goals:**
- Creating or modifying backend Xano APIs or database tables.
- Modifying other application pages (`pages/dashboard.html`, `pages/subjects.html`, `pages/settings.html`, etc.).
- Modifying task CRUD logic (modal form creation, patch updates, deletion, or in-place status toggle).

## Decisions

### 1. Filter Bar Architecture and Placement in HTML
- **Placement**: Insert the filter container between the header bar (`header.header-bar`) and the statistics bar (`.stats-bar` / stats flex container) inside `<main class="main-content">`.
- **Layout**: Structure the filter bar as a CSS Grid/Flexbox container with responsive wrap:
  - Date period group (Data Início e Data Fim)
  - Status dropdown (`<select id="filter-status">`)
  - Disciplina dropdown (`<select id="filter-subject">`)
  - Clear button (`<button id="btn-clear-filters">`)
- **Theme Support**: Use existing design tokens (`var(--bg-card)`, `var(--border-color)`, `var(--text-main)`, `var(--text-muted)`, `var(--accent-cyan)`, `var(--radius-sm)`) ensuring native dark and light theme fidelity.

### 2. Synchronization of Registered Subjects
- In `fetchSubjects()`, populate both `#task-subject` (modal creation/edit select) and `#filter-subject` (filter select).
- Default option for `#filter-subject` will be `<option value="">Todas as disciplinas</option>`.

### 3. Conjunctive Filter Evaluation in `renderTasks()`
- Normalization of task due date:
  ```javascript
  const taskDate = t.due_date ? String(t.due_date).split('T')[0] : '';
  ```
- Filtering logic:
  - **Date From**: `!dateFrom || (taskDate && taskDate >= dateFrom)`
  - **Date To**: `!dateTo || (taskDate && taskDate <= dateTo)`
  - **Status**: `!statusFilter || t.status === statusFilter`
  - **Subject**: `!subjectFilter || String(t.subject_id) === String(subjectFilter)`
  - **Text Query**: matches title, description, or subject name.
- Only tasks matching ALL active conditions are included in `filtered`.

### 4. Clear Filters Behavior
- Clicking `#btn-clear-filters`:
  - Sets `#filter-date-from` and `#filter-date-to` to `""`.
  - Sets `#filter-status` to `""`.
  - Sets `#filter-subject` to `""`.
  - Sets `#header-search` to `""`.
  - Invokes `renderTasks()` to immediately restore the full list view.

## Risks / Trade-offs

- **[Risk] Date format mismatch across browser locales or timestamps**:
  - *Mitigation*: HTML5 `input[type="date"]` consistently uses ISO format `YYYY-MM-DD`. Stripping ISO timestamps (`.split('T')[0]`) ensures consistent lexicographical string comparison.
- **[Risk] Small mobile screen wrapping**:
  - *Mitigation*: Implement CSS media queries at `<= 768px` to switch from multi-column grid to responsive stacked layout, ensuring controls remain touch-friendly and readable.
- **[Risk] State mutation during CRUD actions**:
  - *Mitigation*: When tasks are created, edited, deleted, or toggled, `renderTasks()` is re-invoked using current filter input values, ensuring view state stays consistent.
