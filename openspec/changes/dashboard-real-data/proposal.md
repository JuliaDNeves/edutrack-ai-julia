# Proposal

## Why

Currently, `pages/dashboard.html` displays static mock data for overall task progress, enrolled subjects, pending tasks, estimated study time, study time per subject chart, and upcoming tasks. Integrating real user data from existing `academic_tasks` and `subjects` Xano APIs will provide authenticated users with accurate, live academic statistics and task tracking.

## What Changes

- **Task Progress Summary Card**: Dynamically compute task completion percentage `(completed / total) * 100` (or 0% if no tasks exist), updating the progress circle widget, progress fill bar, and text breakdown (completed vs. pending).
- **Metric Cards**:
  - "Disciplinas": Display real count of active user subjects fetched from `GET /subjects`.
  - "Tarefas Pendentes": Display real count of user tasks with `status === 'pending'`.
  - "Tempo Estimado": Sum `estimated_time` of `completed` tasks only, formatted in hours/minutes (e.g. `3h 30min` or `14,5h`). Pending tasks do NOT count toward this metric.
- **Study Time per Subject Chart**: Render vertical bars for each real user subject, summing `estimated_time` of `completed` tasks for that `subject_id`. Subjects without completed tasks display `0h`.
- **Upcoming Tasks Panel ("Próximas tarefas")**: Render up to 6 real `pending` tasks ordered by `due_date` ascending (nearest deadline first), displaying title, formatted date, and subject name tag.
- **No Backend/Xano Changes**: Use existing `GET /academic_tasks` and `GET /subjects` endpoints and existing `EduTrackAuth` token mechanism.

## Capabilities

### New Capabilities

### Modified Capabilities
- `dashboard-frontend`: Update dashboard specifications to mandate real data calculations for task progress, metric cards, study time per subject chart, and upcoming pending tasks list from `academic_tasks` and `subjects` APIs.

## Impact

- `pages/dashboard.html`: Update HTML structure and JavaScript controller logic to fetch real data from Xano APIs and hydrate all dashboard cards and charts dynamically.
- `js/app.js`: Ensure dashboard hydration functions interact cleanly with `EduTrackAuth` and `pages/dashboard.html`.
