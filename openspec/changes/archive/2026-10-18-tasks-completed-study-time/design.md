# Technical Design

## Context

See `proposal.md` for background and motivation.

In `pages/tasks.html`, task records are fetched via `GET /academic_tasks` and stored in the local array `tasksList`. The page includes a stats bar with `#tasks-count-label` on the left and `#total-time-label` on the right displaying `Total: <strong>0 min</strong> de tempo estimado`. The `renderTasks()` function dynamically recalculates this value whenever tasks are loaded, filtered, or mutated in-place via `window.toggleTaskStatus()`.

## Goals / Non-Goals

**Goals:**
- Add a new display element for "Tempo de estudo realizado" positioned immediately below the existing "Tempo estimado" line.
- Preserve the exact current calculation of "Tempo estimado", summing `estimated_time` across all tasks in `tasksList`.
- Calculate "Tempo de estudo realizado" by summing `spent_time` strictly from completed tasks (`status === 'completed'`) where `spent_time` is present and valid.
- Ensure pending tasks (`status !== 'completed'`) do not contribute to the completed study time.
- Format the result consistently using the existing `formatTimeMinutes()` utility function.
- Update both metric labels dynamically in real-time when any task status is toggled or when tasks are created, edited, or deleted.

**Non-Goals:**
- Modifying backend APIs, database tables, or Xano functions.
- Modifying `pages/dashboard.html` or `js/app.js`.
- Modifying overall page layout or styles beyond the stats display container.

## Decisions

1. **Stats Bar Layout Alignment**:
   - *Choice*: Wrap the time metrics on the right side of the stats bar in a flex container aligned to the right (`display: flex; flex-direction: column; align-items: flex-end; gap: 2px; text-align: right;`).
   - *First line*: Keep existing `#total-time-label` showing `Total: <strong>...</strong> de tempo estimado`.
   - *Second line*: Add `#spent-time-label` directly below, showing `Tempo de estudo realizado: <strong>...</strong>`.
   - *Rationale*: Preserves clean layout without disrupting responsiveness on mobile screens.

2. **Completed Study Time Computation Logic**:
   - *Choice*: In `renderTasks()`, compute:
     ```javascript
     const totalSpentMinutes = tasksList
         .filter(t => t.status === 'completed' && t.spent_time !== null && t.spent_time !== undefined && t.spent_time !== '')
         .reduce((acc, curr) => acc + (Number(curr.spent_time) || 0), 0);
     ```
   - *Empty state*: When `tasksList.length === 0`, update `#spent-time-label` with `Tempo de estudo realizado: <strong>0 min</strong>`.
   - *Rationale*: Guarantees that empty, null, or undefined values do not produce `NaN`, and strictly ignores pending tasks.

## Risks / Trade-offs

- **[Risk] Null, empty, or string `spent_time` values**:
  - *Mitigation*: Strictly check for non-null/non-empty values and use `Number(curr.spent_time) || 0` with validation before summing.
- **[Risk] Asynchronous or in-place status toggle out of sync**:
  - *Mitigation*: `window.toggleTaskStatus` already updates `task.status` locally and immediately invokes `renderTasks()`, ensuring instant UI recalculation.
