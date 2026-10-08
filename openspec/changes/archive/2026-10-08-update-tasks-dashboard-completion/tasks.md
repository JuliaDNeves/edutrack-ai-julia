# Tasks

## 1. Tasks Page Layout and In-Place Status Updates (`pages/tasks.html`)

- [x] 1.1 Redesign task cards to be compact and slim in `pages/tasks.html`, preserving all metadata (title, subject tag, due date, estimated/spent time, description) and action buttons (Editar, Excluir).
- [x] 1.2 Add an interactive status checkbox to each task card representing real task status (`checked` -> `completed`, unchecked -> `pending`).
- [x] 1.3 Implement in-place status toggle event handler calling `PATCH /academic_tasks/{id}` with `{ "status": "completed" }` or `{ "status": "pending" }` and updating UI without reloading the page.
- [x] 1.4 Organize task listing display into two sections in order: 1) **Concluídas**, 2) **Pendentes**, separated by visual dividers and section titles, applying attenuated styling for completed tasks while retaining full legibility.

## 2. Dashboard Task Completion & Metric Updates (`pages/dashboard.html` & `js/app.js`)

- [x] 2.1 Update task status checkbox event handling for upcoming tasks in `js/app.js` to call existing `PATCH /academic_tasks/{id}` endpoint upon toggle.
- [x] 2.2 Immediately update upcoming task visual state and invoke `hydrateDashboardData()` to recalculate overall progress, task count stats, and study time metrics upon status change without reloading the page.
