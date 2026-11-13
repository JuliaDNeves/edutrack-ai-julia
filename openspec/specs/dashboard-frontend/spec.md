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
The system SHALL render a top header section featuring a user greeting and a study motivation tip, omitting the visual search bar and notification buttons.

#### Scenario: Display header elements
- **WHEN** the user views the header bar
- **THEN** the system SHALL display the user greeting and motivation subtext, while omitting the search bar, notification icons, and badges

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
The system SHALL render a right side panel containing student profile info, followed immediately by the "Relatório PDF" action button, and positioned above the list of up to 6 upcoming real pending tasks retrieved from `GET /academic_tasks`. Pending tasks SHALL be ordered by `due_date` ascending (earliest due date first), displaying the task title, formatted due date/deadline, and associated subject name.

#### Scenario: Render right panel profile without streak metric
- **WHEN** the user views the right side panel
- **THEN** the system SHALL display student profile details without "5 dias seguidos" or flame streak badges, display the "Relatório PDF" action button positioned directly below the profile card and above the upcoming tasks list, and render up to 6 real pending tasks sorted by due date, showing title, due date, and subject tag

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

### Requirement: Intelligent Insights Dashboard Section and On-Demand Trigger
The system SHALL provide a dedicated "Insights Inteligentes" section within the main content area of the Dashboard (`pages/dashboard.html`), featuring an on-demand trigger button ("Gerar insights") that initiates analysis strictly upon explicit user interaction, without executing automatically on initial page load.

#### Scenario: Initial dashboard load without automatic insights execution
- **WHEN** an authenticated user opens or reloads the Dashboard
- **THEN** the system SHALL render the "Insights Inteligentes" section displaying an invitation state and the "Gerar insights" button, without sending background requests to the insights endpoint or external AI services

#### Scenario: User triggers insights generation on demand
- **WHEN** the user clicks the "Gerar insights" button
- **THEN** the system SHALL initiate an asynchronous request to the insights endpoint, update the button to a loading state with spinner, and prepare the interface for the incoming results

### Requirement: Structured Insights Results Presentation Cards
The system SHALL render the received academic analysis in four organized visual cards matching the EduTrack visual identity:
1. "Resumo Geral": a card presenting a contextualized qualitative synthesis of the student's overall academic situation.
2. "Diagnósticos por Disciplina": a list or grid of cards displaying per-subject progress, completed vs. pending tasks, and visual temporal variance badges ("dentro do esperado", "subestimado", "superestimado" or "sem tempo registrado").
3. "Recomendações Práticas": a card presenting an actionable list of prioritized study recommendations.
4. "Pontos Fortes": a card highlighting achievements, high pacing efficiency, or consistent engagement.

#### Scenario: Successful insights display with structured cards
- **WHEN** the insights endpoint returns HTTP 200 with the analysis payload
- **THEN** the system SHALL render the "Resumo Geral", "Diagnósticos por Disciplina", "Recomendações Práticas", and "Pontos Fortes" cards populated with data from the response

#### Scenario: Per-subject diagnostic with temporal variance tag
- **WHEN** displaying the diagnostic card for a subject that has evaluated study time
- **THEN** the system SHALL show the percentage completion, task count, and an appropriately styled status tag indicating whether study time was within expectations, underestimated, or overestimated

#### Scenario: Per-subject diagnostic without recorded study time
- **WHEN** displaying a subject that has no completed tasks with recorded spent time
- **THEN** the system SHALL render an informative badge indicating that study time was not registered, without fabricating hours or percentage variance

### Requirement: Visual Loading and Error States
The system SHALL provide distinct visual states for processing and error handling during the insights lifecycle.

#### Scenario: Active analysis loading feedback
- **WHEN** an insights request is in progress
- **THEN** the system SHALL disable the "Gerar insights" button, display an animated spinner with loading label ("Gerando insights com IA..."), and preserve the current layout without flickering

#### Scenario: Request failure error handling
- **WHEN** the insights request fails due to network or server unavailability
- **THEN** the system SHALL restore the action button and display a clear, user-friendly error card with a retry option, without corrupting other Dashboard components

### Requirement: Engine Origin and Fallback Badge Indicator
The system SHALL render a visual badge in the "Insights Inteligentes" section header indicating whether the presented recommendations were generated by the AI language model (Google Gemini) or by the deterministic contingency engine (fallback).

#### Scenario: Insights generated by AI model
- **WHEN** the API response contains `ai_engine.status === "success"`
- **THEN** the system SHALL display a badge with an AI icon and label indicating generation via artificial intelligence ("Gerado com IA")

#### Scenario: Insights generated via deterministic fallback
- **WHEN** the API response contains `ai_engine.status === "fallback_used"`
- **THEN** the system SHALL display an informative contingency badge indicating heuristic generation ("Regras Heurísticas / Modo Offline") with an explanatory tooltip
