# Proposal

## Why

The task cards on `pages/tasks.html` currently occupy excessive vertical space and lack a direct checkbox mechanism to mark tasks as completed or pending. Additionally, the upcoming tasks panel on `pages/dashboard.html` has static checkbox icons that do not perform status updates in the backend or recalculate dashboard progress metrics when clicked. Adding real-time status toggle capabilities to both pages and streamlining the tasks layout will significantly improve usability, responsiveness, and productivity for students.

## What Changes

- **Tasks Page (`pages/tasks.html`) Layout & Sorting**:
  - Redesign task cards into compact, slim layouts while keeping all existing information (title, subject tag, due date, estimated/spent time, description) and action buttons (Editar, Excluir).
  - Add an interactive status checkbox to each task card reflecting its actual status (`checked` -> `completed`, unchecked -> `pending`).
  - Group and separate tasks into two distinct sections: **Concluídas** (displayed first) and **Pendentes** (displayed second), with subtle visual dividers and headers.
  - Apply an attenuated visual style (e.g. discreet opacity, line-through title) to completed tasks while preserving full legibility.
  - Bind checkbox toggle to `PATCH /academic_tasks/{id}` with instant, in-place UI updates without page reloads.

- **Dashboard Page (`pages/dashboard.html` & `js/app.js`) Checkbox Interaction**:
  - Fix task completion checkboxes in the "Próximas tarefas" right-side panel.
  - Bind checkbox clicks to `PATCH /academic_tasks/{id}` using the user's `authToken`.
  - Instantly update task visual states and trigger an immediate recalculation of all Dashboard progress bars, radial percentage charts, task counts, and study time metrics without page reload.

- **Constraints & Rules**:
  - Use existing Xano endpoints (`PATCH /academic_tasks/{id}`) exclusively.
  - Enforce user authentication and backend security (`user_id` matching authenticated user token).
  - Preserve EduTrack UI design system, Font Awesome icons, dark theme, and responsiveness.
  - Leave `pages/subjects.html` completely untouched.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `tasks-page`: Update layout with slim compact cards, top/side status checkboxes, grouping order (Concluídas followed by Pendentes), and in-place status toggle via existing PATCH API.
- `dashboard-frontend`: Implement interactive status checkboxes on upcoming tasks in the side panel that update task status in Xano and trigger immediate dashboard metric recalculations.

## Impact

- Affected files:
  - `pages/tasks.html`: Inline JS and CSS for task card layout, checkbox events, grouping logic, and PATCH API handler.
  - `js/app.js`: Interactive checkbox handler for upcoming tasks in `hydrateDashboardData()`.
  - `css/styles.css` (or inline page CSS): Styles for compact task cards, section headers, checkboxes, and completed task visual attenuation.
- No database schema or backend API changes required.
