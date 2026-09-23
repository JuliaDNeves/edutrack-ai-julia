# Proposal: Add Dashboard Frontend

## Why

EduTrack requires a visual frontend layout for students to monitor study progress, track pending assignments, and view study time distribution. Implementing the visual structure of the Dashboard and left navigation sidebar establishes the UI design system and visual layout prior to backend integration.

## What Changes

- Add basic web application structure (HTML, CSS, JavaScript).
- Implement fixed left navigation sidebar with items: Dashboard (selected), Disciplinas, Tarefas.
- Implement header section with student greeting, study organization message, visual search bar, and notification icon.
- Create student summary cards including completed vs. pending tasks with visual progress indicator.
- Create metric cards for subjects summary, pending tasks, and estimated study time.
- Create a vertical bar chart visual component for study time per subject using static dummy data.
- Create right-side panel with user profile details and "Próximas tarefas" section displaying up to 4 upcoming tasks.
- Establish modern dark mode design system (background `#090d16`, cyan `#53dce3`, lilac `#b19bf1` accents) and Font Awesome icons.

## Capabilities

### New Capabilities
- `dashboard-frontend`: Visual components, sidebar navigation, dashboard overview metrics, study time vertical bar chart, and upcoming tasks panel for EduTrack frontend.

### Modified Capabilities

*(None)*

## Impact

- Frontend static assets (`index.html`, `css/styles.css`, `js/app.js`).
- Font Awesome CDN link added in header for icons.
- No backend, database, Xano, API, auth, or data logic impacted.
