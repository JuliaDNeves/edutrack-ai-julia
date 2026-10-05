# Design

## Context

`pages/dashboard.html` currently uses static HTML markup for metrics, chart bars, and upcoming tasks.
We need to hydrate these components dynamically via JavaScript using data fetched from:
1. `GET /subjects` (`XANO_SUBJECTS_URL/subjects`)
2. `GET /academic_tasks` (`XANO_TASKS_URL/academic_tasks`)

## Goals / Non-Goals

**Goals:**
- Hydrate overall task progress card: calculate `(completed / total) * 100`, update radial SVG circle stroke/text and fill bar width, set completed/pending counts. If total is 0, display 0%.
- Hydrate "Disciplinas" card: total length of subjects list.
- Hydrate "Tarefas Pendentes" card: total count of tasks with `status === 'pending'`.
- Hydrate "Tempo Estimado" card: sum `estimated_time` of `completed` tasks only (in minutes) and format in readable hours/minutes (e.g. `3h30` or `14,5h`).
- Hydrate "Tempo de Estudo por Disciplina" vertical bar chart: render a bar for each subject in `subjects` list. For each subject, compute total `estimated_time` of its `completed` tasks. Scale bar height relative to max hours (or 100%), and display formatted hours tooltip/label.
- Hydrate "Próximas tarefas" side panel: list up to 6 pending tasks sorted by `due_date` ascending, displaying title, due date, and subject name tag.

**Non-Goals:**
- Creating or modifying backend APIs or Xano schemas.
- Modifying `pages/subjects.html` or `pages/tasks.html`.
- Changing layout structure, CSS styling, or Font Awesome icons.

## Decisions

1. **Hydration Execution in `js/app.js`**:
   - Rationale: `js/app.js` already contains section 5 ("Dashboard Guard & User Profile Hydration"). Adding dashboard metrics and chart hydration directly into `js/app.js` keeps all dashboard fetching centralized and executed after user session validation.

2. **SVG Circle Stroke-Dashoffset calculation for Radial Progress**:
   - Rationale: Circumference for `r=38` is `2 * PI * 38 ≈ 238.76`.
   - `strokeDashoffset = 238.76 - (238.76 * percentage / 100)`.

3. **Time Formatting for Completed Tasks**:
   - Rationale: Convert total minutes into hours/minutes (e.g., `3h30` or `14h 30min`) using `Math.floor(mins / 60)` and `mins % 60`.

## Risks / Trade-offs

- **[Risk] User has 0 tasks or 0 subjects** → Mitigation: Handle empty arrays gracefully without division by zero errors (show 0%, 0 subjects, 0 pending, 0h estimated time, and empty chart/upcoming tasks notice).
