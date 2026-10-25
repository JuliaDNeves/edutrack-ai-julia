# Technical Design

## Context

See `proposal.md` for user intent and background.

Currently:
- `pages/dashboard.html` and `js/app.js` (`hydrateDashboardData()`) calculate the 3rd metric card (`#metric-estimated-time`) by summing `estimated_time` for all `completed` tasks. The card is titled "Tempo Estimado".
- `pages/dashboard.html` renders a single bar per subject in `#study-chart-container`, showing only estimated hours of completed tasks. The bars alternate between cyan and lilac per discipline index.
- `pages/tasks.html` now computes "Tempo de estudo realizado" by summing `spent_time` strictly for completed tasks with non-empty values.

## Goals / Non-Goals

**Goals:**
- Update the metric card title in `pages/dashboard.html` to **`Tempo de estudo`**.
- Align the calculation of the dashboard's "Tempo de estudo" card with `pages/tasks.html`, summing `spent_time` for completed tasks where filled.
- Redesign the "Tempo de Estudo por Disciplina" chart to display two comparative series per subject:
  1. **Horas estimadas:** sum of `estimated_time` for completed tasks of that subject.
  2. **Tempo de estudo:** sum of `spent_time` when filled; otherwise use `estimated_time`, for completed tasks of that subject.
- Visually differentiate the two series with EduTrack's palette:
  - **Lilac (`#b19bf1`)**: Horas estimadas
  - **Cyan (`#53dce3`)**: Tempo de estudo
- Add an explanatory legend to the chart header.
- Provide a rich interactive hover tooltip on each discipline group displaying the subject name and comparing both series with color dots and formatted times in hours and minutes.
- Support both light and dark themes with fluid responsiveness.

**Non-Goals:**
- Changing backend endpoints, payloads, or database schema.
- Changing `pages/tasks.html` or other pages.
- Altering other dashboard metrics (e.g. progress bar, counts of pending/completed tasks, subjects count).

## Decisions

1. **Card Calculation Alignment**:
   - In `hydrateDashboardData()`, compute:
     ```javascript
     const totalSpentMinutes = completedTasks
         .filter(t => t.spent_time !== null && t.spent_time !== undefined && t.spent_time !== '')
         .reduce((sum, t) => sum + (Number(t.spent_time) || 0), 0);
     ```
   - Update `#metric-estimated-time` (or alias `#metric-study-time`) with `formatHoursMinutes(totalSpentMinutes)`.

2. **Dual-Series Bar Chart Structure**:
   - For each subject:
     - `estimatedMins`: sum of `Number(t.estimated_time) || 0` for completed tasks of that subject.
     - `studyMins`: for each completed task, if `t.spent_time !== null && t.spent_time !== undefined && t.spent_time !== '' && !isNaN(Number(t.spent_time))`, use `Number(t.spent_time)`, otherwise fall back to `Number(t.estimated_time) || 0`.
   - Render two adjacent slim bars (`.bar-fill.lilac` for estimated, `.bar-fill.cyan` for study time) inside a `.dual-bars-wrapper`.
   - Scale both bars against `maxMins = Math.max(...allValues, 60)` to maintain consistent proportions.

3. **Comparative Tooltip**:
   - Instead of single-line text, structure `.chart-comparative-tooltip` with:
     - Header: Subject name.
     - Row 1: Lilac indicator dot + "Horas estimadas: Xh Ymin".
     - Row 2: Cyan indicator dot + "Tempo de estudo: Zh Wmin".
   - Styled with backdrop blur, subtle card border, high z-index, and smooth hover transition.

## Risks / Trade-offs

- **[Risk] Disciplines with zero completed tasks**:
  - *Mitigation*: Both bars render with 0% height (or a subtle baseline indicator) and the tooltip displays `0h` for both metrics.
- **[Risk] Long discipline names overflowing tooltip or bar label**:
  - *Mitigation*: Truncate label on the horizontal axis with `text-overflow: ellipsis` and `max-width`, while showing the full name inside the tooltip.
