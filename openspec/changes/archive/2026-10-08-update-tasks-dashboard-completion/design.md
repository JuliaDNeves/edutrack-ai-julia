# Technical Design

## Context

See `proposal.md` for motivation and overview. The frontend communicates with Xano APIs (`PATCH /academic_tasks/{id}`) using `EduTrackAuth.getAuthHeaders()` which attaches the stored JWT (`edutrack_token`).

Currently:
- `pages/tasks.html` renders task cards using standard layout with large vertical padding and no direct checkbox toggle control for task status.
- `pages/dashboard.html` displays upcoming tasks in a side panel (`upcoming-tasks-container`). The checkboxes on those items are static and do not trigger Xano PATCH updates or dashboard metrics refresh when clicked.

## Goals / Non-Goals

**Goals:**
- Redesign task cards in `pages/tasks.html` to be compact and slim while preserving all metadata (title, subject tag, due date, estimated/spent time, description) and action buttons (Editar, Excluir).
- Group tasks into "Concluídas" (first section) and "Pendentes" (second section) with subtle headers and visual dividers on `pages/tasks.html`.
- Add interactive status checkboxes to task cards in `pages/tasks.html` bound to `PATCH /academic_tasks/{id}` with immediate in-place UI updates without page reloads.
- Fix dashboard upcoming task checkboxes in `js/app.js` to send `PATCH /academic_tasks/{id}` requests and trigger `hydrateDashboardData()` for real-time recalculations.

**Non-Goals:**
- Creating or modifying backend Xano APIs.
- Modifying `pages/subjects.html`.
- Altering the user authentication flow or token storage mechanism.

## Decisions

1. **In-place Status Mutation and Rendering on `pages/tasks.html`**:
   - *Choice*: Keep local array `tasksList` in sync when checkbox is toggled. On click, optimistically update `t.status`, trigger `PATCH /academic_tasks/{id}`, and call `renderTasks()`.
   - *Rationale*: Avoids a full page reload and gives instant visual feedback. If the PATCH request fails, revert status and display an alert toast.

2. **Compact Card Layout & Attenuated Completed Tasks Styling**:
   - *Choice*: Use horizontal flex layout for headers (`checkbox` + `title` + `status badge` / `subject tag`). Reduce inner padding from `20px` to `12px 16px`.
   - *Completed State*: Set `opacity: 0.75` for completed cards, line-through on title, and discreet border highlight.

3. **Dashboard Event Delegation for Upcoming Tasks**:
   - *Choice*: Attach a delegated click listener to `#upcoming-tasks-container` or directly bind click handlers during HTML generation in `hydrateDashboardData()`.
   - *Rationale*: Ensures dynamically rendered upcoming tasks accurately trigger `PATCH /academic_tasks/{id}` and invoke `hydrateDashboardData()` upon success.

## Risks / Trade-offs

- **[Risk] Network failure during PATCH request**:
  - *Mitigation*: Revert local task status and display an error alert banner if the Xano PATCH request returns an error.
- **[Risk] Rapid double-clicking on checkboxes**:
  - *Mitigation*: Temporarily disable the checkbox input/icon while the HTTP request is pending.
