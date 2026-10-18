# dashboard-frontend Specification

## Purpose
Define front-end user interface structure, navigation, overview metrics, and study tracking visual components for the EduTrack web application.

## Requirements

### Requirement: Navigation Bar and Page Structure
The system SHALL provide navigation linking `dashboard.html`, `disciplinas.html`, and `tarefas.html`. On desktop viewports, navigation SHALL render as a fixed left sidebar. On mobile viewports, navigation SHALL render as a fixed bottom navigation bar showing only icons with active item highlighting.

#### Scenario: Desktop sidebar navigation
- **WHEN** the user views the application on desktop screens
- **THEN** the system displays a fixed left sidebar with Dashboard selected and links prepared for `disciplinas.html` and `tarefas.html`

#### Scenario: Mobile bottom navbar navigation
- **WHEN** the user views the application on small/mobile screens
- **THEN** the sidebar transitions into a fixed bottom navigation bar displaying icons only with active state highlight and adequate page bottom padding

### Requirement: Header Section with Greeting and Search Bar
The system SHALL render a top header section featuring a user greeting, a study motivation tip, and an expanded visual search bar, without any notification button.

#### Scenario: Display header elements
- **WHEN** the user views the header bar
- **THEN** the system displays the user greeting, motivation subtext, and a widened search bar, while omitting notification icons and badges

### Requirement: Tasks Progress Summary Card
The system SHALL calculate and display the authenticated user's real task progress metrics dynamically based on tasks retrieved from `GET /academic_tasks`. When any task status is modified via the side panel checkboxes, the system SHALL update completion percentage `(completed_tasks / total_tasks) * 100`, radial progress circle text, progress fill bar width, and counts of completed and pending tasks in real-time.

#### Scenario: Render task progress card with neutral text
- **WHEN** the user views the task progress summary card
- **THEN** the system calculates real counts of completed and pending tasks from `GET /academic_tasks`, updates the progress percentage circle and progress fill bar, and renders the exact completed and pending task counts.

### Requirement: Academic Overview Metrics
The system SHALL render summary metric cards with real data for the authenticated user:
1. "Disciplinas": total number of active subjects retrieved from `GET /subjects`.
2. "Tarefas Pendentes": total number of user tasks with `status === 'pending'`.
3. "Tempo de estudo": total sum of `spent_time` in minutes of `completed` tasks only, considering only filled values and formatted in human-readable hours and minutes (tasks with empty `spent_time` and pending tasks SHALL NOT contribute to this total).

#### Scenario: Render metric cards
- **WHEN** the user views the academic metrics section
- **THEN** the system displays the actual count of enrolled subjects, actual count of pending tasks, and total completed study time ("Tempo de estudo") calculated by summing `spent_time` of completed tasks with filled values and formatted in hours/minutes.

### Requirement: Study Time Vertical Bar Chart
The system SHALL render a vertical bar chart titled "Tempo de Estudo por Disciplina" comparing two data series for each subject belonging to the authenticated user:
1. "Horas estimadas": sum of `estimated_time` in minutes for completed tasks (`status === 'completed'`) of that subject.
2. "Tempo de estudo": sum of `spent_time` when filled, or `estimated_time` when `spent_time` is null, empty, or unassigned, strictly for completed tasks (`status === 'completed'`) of that subject.

Both series SHALL be visually differentiated using distinct colors from the EduTrack identity palette (cyan `#53dce3` and lilac `#b19bf1`), accompanied by an explanatory legend. On hovering over a subject's bar group, the system SHALL display a tooltip presenting both series side by side with clear color identification and formatted times in hours and minutes.

#### Scenario: Render vertical bar chart
- **WHEN** the user views the study time chart section
- **THEN** the system renders a comparative bar chart for each subject belonging to the authenticated user showing "Horas estimadas" and "Tempo de estudo" using cyan and lilac colors, displaying 0h for subjects without completed tasks.

#### Scenario: User views comparative study time chart
- **WHEN** the user views the "Tempo de Estudo por Disciplina" chart section with subjects and completed tasks
- **THEN** the system SHALL display dual comparative vertical bars for each subject showing "Horas estimadas" and "Tempo de estudo", using cyan and lilac colors and an informative legend.

#### Scenario: User hovers over subject bars
- **WHEN** the user hovers over a subject's chart entry
- **THEN** the system SHALL display an interactive tooltip comparing the subject's estimated hours and actual study time with color indicators and formatted time values.

#### Scenario: Completed task without spent time in subject chart
- **WHEN** a completed task for a subject has empty or null `spent_time`
- **THEN** the "Tempo de estudo" series for that subject SHALL fall back to using the task's `estimated_time`.

### Requirement: Right Side User Panel and Upcoming Tasks
The system SHALL render a right side panel containing student profile info without streak tags, along with a list of up to 6 upcoming real pending tasks retrieved from `GET /academic_tasks`. Pending tasks SHALL be ordered by `due_date` ascending (earliest due date first), displaying the task title, formatted due date/deadline, and associated subject name.

#### Scenario: Render right panel profile without streak metric
- **WHEN** the user views the right side panel
- **THEN** the system displays student profile details without "5 dias seguidos" or flame streak badges, and renders up to 6 real pending tasks sorted by due date, showing title, due date, and subject tag.

### Requirement: Visual Account Switcher Action
The system SHALL display a visual account/logout action on desktop profile hover and an adapted mobile profile trigger without requiring authentication backend logic.

#### Scenario: Hover account switcher on desktop sidebar profile
- **WHEN** the user hovers over the profile section in the desktop sidebar
- **THEN** the system displays a visual "Trocar conta" overlay/action button

#### Scenario: Mobile visual account trigger
- **WHEN** the user interacts with the profile element on mobile screens
- **THEN** the system presents the account action cleanly without requiring hover states

### Requirement: Dark Mode Theme and Iconography
The system SHALL apply dark mode styling with background near `#090d16`, cyan (`#53dce3`) and lilac (`#b19bf1`) accents, rounded card containers, subtle shadow glows, and Font Awesome iconography.

#### Scenario: Apply visual design tokens
- **WHEN** interface components render
- **THEN** the system uses dark mode colors, cyan/lilac accent highlights, rounded cards, and Font Awesome icons

### Requirement: Interactive Task Completion in Side Panel
The system SHALL provide interactive status checkboxes for upcoming tasks displayed in the right side panel of `pages/dashboard.html`. Toggling a task checkbox SHALL update its real status in Xano and trigger an immediate recalculation of all Dashboard metrics without reloading the page.

#### Scenario: User toggles upcoming task checkbox on Dashboard
- **WHEN** user clicks the checkbox icon on an upcoming task in the Dashboard side panel
- **THEN** the system SHALL send a `PATCH /academic_tasks/{id}` request with the updated status (`completed` or `pending`), update the task item appearance immediately, and refresh all Dashboard summary metrics (progress fill bar width, radial progress circle percentage, completed/pending task counts, total estimated time, and study chart bars) in-place without page reload.
