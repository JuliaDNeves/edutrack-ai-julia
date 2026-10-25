# Proposal

## Why

The dashboard's overview metrics currently display "Tempo Estimado", creating a discrepancy with the Tasks page, which now prominently displays "Tempo de estudo realizado". Aligning the dashboard card ensures consistent time metrics across the application. Furthermore, the study time chart by subject currently only plots a single value; upgrading it to a comparative two-series chart (estimated hours vs. study time) allows students to directly contrast planned study time with actual completed study effort per subject.

## What Changes

- **Study Time Metric Card (`pages/dashboard.html` & `js/app.js`)**:
  - Rename the metric card title from `Tempo Estimado` to **`Tempo de estudo`**.
  - Calculate and display the exact completed study time implemented on `pages/tasks.html` (summing `spent_time` of tasks where `status === 'completed'` and `spent_time` is filled).

- **Subject Study Time Chart (`pages/dashboard.html`, `js/app.js` & `css/styles.css`)**:
  - Keep the section title **`Tempo de Estudo por Disciplina`**.
  - Transform the chart into a comparative two-series bar chart for each subject:
    1. **Horas estimadas:** sum of `estimated_time` for completed tasks of each subject.
    2. **Tempo de estudo:** sum of `spent_time` when filled; if empty/null, fall back to `estimated_time`, strictly for completed tasks of each subject.
  - Visually differentiate the two series using EduTrack's primary palette (cyan `#53dce3` and lilac `#b19bf1`) and include a clear visual legend.
  - Display an interactive tooltip on hover for each discipline group comparing both metrics with distinct color dots and formatted times in hours and minutes.

- **Non-Goals & Constraints**:
  - Keep internal calculations in minutes and format the display in human-readable hours and minutes (`Xh Ymin` or `Xh` / `Ymin`).
  - Use real authenticated user data from `GET /subjects` and `GET /academic_tasks`.
  - Zero modifications to backend APIs, database, `pages/tasks.html`, or other pages.
  - Maintain compatibility with light and dark themes.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `dashboard-frontend`: Update overview metric card to "Tempo de estudo" using completed study time, and enhance "Tempo de Estudo por Disciplina" chart to render comparative two-series bars (horas estimadas vs. tempo de estudo) with EduTrack color differentiation and comparative tooltips.

## Impact

- Affected files:
  - `pages/dashboard.html`: Update metric card heading and chart section header with legend.
  - `js/app.js`: Update `hydrateDashboardData()` to compute completed study time for the card and calculate the two series with comparative tooltips for the chart.
  - `css/styles.css`: Add styles for dual-bar layout, series coloring (cyan vs lilac), chart legend, and comparative tooltip formatting.
- No database migrations or API contract changes.
