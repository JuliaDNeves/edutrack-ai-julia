# Tasks

## 1. Dashboard DOM IDs & HTML Preparation

- [x] 1.1 Add unique IDs to dynamic elements in `pages/dashboard.html` (progress text, fill bar, circle text, circle svg fill, metric values, chart container, upcoming tasks container) while preserving existing styling and structure.

## 2. Real Data Integration & Hydration Controller

- [x] 2.1 Update `js/app.js` to fetch authenticated user data from `GET /subjects` and `GET /academic_tasks` using `EduTrackAuth.getAuthHeaders()`.
- [x] 2.2 Implement overall task progress calculation: compute completed vs. pending tasks count and completion percentage `(completed / total) * 100` (or 0% if total === 0), updating the radial circle widget, bar fill width, and summary text labels.
- [x] 2.3 Implement metrics cards hydration in `js/app.js`: update "Disciplinas" count with subjects list length, "Tarefas Pendentes" with pending tasks count, and "Tempo Estimado" with the sum of `estimated_time` for `completed` tasks only (formatted in hours/minutes).
- [x] 2.4 Implement "Tempo de Estudo por Disciplina" vertical bar chart rendering: generate dynamic chart bars for each real user subject displaying the sum of `estimated_time` of its `completed` tasks (displaying 0h for subjects without completed tasks).
- [x] 2.5 Implement "Próximas tarefas" side panel rendering: render up to 6 real `pending` tasks ordered by `due_date` ascending, showing title, formatted due date, and subject name tag.
