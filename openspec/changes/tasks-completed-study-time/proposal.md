# Proposal

## Why

Students managing their academic tasks on `pages/tasks.html` currently only see the total estimated time for their tasks ("Tempo estimado"). They lack direct visibility into the actual completed study time accumulated from finished tasks. Adding a dedicated "Tempo de estudo realizado" display gives learners clear, immediate feedback on their actual study progress while keeping the page layout clean and focused.

## What Changes

- **Tasks Page Display (`pages/tasks.html`)**:
  - Add a new stat line **"Tempo de estudo realizado"** positioned immediately below the existing "Tempo estimado" display in the stats bar.
  - Retain the current "Tempo estimado" calculation unchanged (summing `estimated_time` for all tasks).
  - Calculate "Tempo de estudo realizado" by summing the `spent_time` of completed tasks (`status === 'completed'`), ignoring tasks where `spent_time` is null, empty, or undefined.
  - Ensure pending tasks (`status !== 'completed'`) do not contribute to "Tempo de estudo realizado".
  - Update both metrics dynamically in real-time when task statuses are toggled, or when tasks are created, updated, or removed.

- **Constraints & Non-Goals**:
  - No changes to layout beyond inserting the new stat display line under "Tempo estimado".
  - No changes to Xano backend APIs or database schema.
  - No changes to `pages/dashboard.html`, `js/app.js`, `pages/subjects.html`, or any other pages.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `tasks-page`: Add requirement for calculating and displaying completed study time ("Tempo de estudo realizado") directly below "Tempo estimado" on `pages/tasks.html`.

## Impact

- Affected file:
  - `pages/tasks.html`: Add stat container element in HTML and update `renderTasks()` to compute and render `spent_time` for completed tasks.
- Zero breaking changes, backend migrations, or dependencies added.
