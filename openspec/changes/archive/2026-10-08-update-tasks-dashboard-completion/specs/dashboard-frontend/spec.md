# dashboard-frontend Specification

## ADDED Requirements

### Requirement: Interactive Task Completion in Side Panel
The system SHALL provide interactive status checkboxes for upcoming tasks displayed in the right side panel of `pages/dashboard.html`. Toggling a task checkbox SHALL update its real status in Xano and trigger an immediate recalculation of all Dashboard metrics without reloading the page.

#### Scenario: User toggles upcoming task checkbox on Dashboard
- **WHEN** user clicks the checkbox icon on an upcoming task in the Dashboard side panel
- **THEN** the system SHALL send a `PATCH /academic_tasks/{id}` request with the updated status (`completed` or `pending`), update the task item appearance immediately, and refresh all Dashboard summary metrics (progress fill bar width, radial progress circle percentage, completed/pending task counts, total estimated time, and study chart bars) in-place without page reload.

## MODIFIED Requirements

### Requirement: Tasks Progress Summary Card
The system SHALL calculate and display the authenticated user's real task progress metrics dynamically based on tasks retrieved from `GET /academic_tasks`. When any task status is modified via the side panel checkboxes, the system SHALL update completion percentage `(completed_tasks / total_tasks) * 100`, radial progress circle text, progress fill bar width, and counts of completed and pending tasks in real-time.

#### Scenario: Render task progress card with neutral text
- **WHEN** the user views the task progress summary card
- **THEN** the system calculates real counts of completed and pending tasks from `GET /academic_tasks`, updates the progress percentage circle and progress fill bar, and renders the exact completed and pending task counts.
