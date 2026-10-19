# tasks-page Specification

## Purpose
Defines the user interface and frontend behavioral contract for managing academic tasks in EduTrack AI via pages/tasks.html.

## Requirements

### Requirement: Task Listing and Filtering
The system SHALL display all academic tasks belonging to the authenticated user on the tasks page (`pages/tasks.html`) using compact and slim task cards, allowing search filtering by task title or description.

#### Scenario: User views their task list
- **WHEN** an authenticated user opens `pages/tasks.html`
- **THEN** the system SHALL fetch task records from `GET /academic_tasks` using `Authorization: Bearer <token>` and render them as compact, slim cards displaying a status checkbox, title, subject tag, due date, status badge, estimated time, spent time, optional description, and action buttons (Editar, Excluir).

#### Scenario: User searches tasks
- **WHEN** user enters a query string into the search input field
- **THEN** the list of displayed task cards SHALL filter dynamically matching the title, subject, or description text.

### Requirement: Task Creation
The system SHALL allow authenticated users to create a new task record via a modal form, enforcing field validation and storing time parameters in minutes.

#### Scenario: User creates a task with valid inputs
- **WHEN** user submits the creation form with a title, estimated time in minutes, status ("Pendente" or "Concluída"), due date, optional description, optional spent time, and selected subject ID
- **THEN** the system SHALL send a `POST /academic_tasks` request with the JSON payload and Authorization header, display a success toast banner upon 200/201 response, close the modal, and refresh the tasks list.

#### Scenario: User attempts creation with missing mandatory fields
- **WHEN** user submits the modal form without entering a title or estimated time
- **THEN** the system SHALL prevent submission, flag the required inputs, and show an error notification message without sending an API request.

### Requirement: Task Modification
The system SHALL allow authenticated users to edit an existing task record via the modal form pre-filled with existing task data.

#### Scenario: User updates an existing task
- **WHEN** user clicks "Editar" on a task card, modifies values, and submits the form
- **THEN** the system SHALL send a `PATCH /academic_tasks/{id}` request with the updated fields, display a success toast notification, and update the task card in the list.

### Requirement: Task Deletion
The system SHALL request user confirmation before permanently deleting a task record.

#### Scenario: User confirms task deletion
- **WHEN** user clicks "Excluir" on a task card and confirms the action in the deletion confirmation modal
- **THEN** the system SHALL send a `DELETE /academic_tasks/{id}` request, remove the card from the UI upon success, and show a deletion success feedback banner.

### Requirement: Subject Dropdown Population
The system SHALL populate the subject selector in the task form with only the active subjects owned by the authenticated user.

#### Scenario: Loading subjects into task modal form
- **WHEN** the task form modal opens or the page initializes
- **THEN** the system SHALL call `GET /subjects` using the user's authorization token and populate the subject dropdown `<select>` options with subject IDs and names.

### Requirement: Task Status Checkbox Toggle
The system SHALL display an interactive checkbox on each task card reflecting its current status (`checked` for `completed`, unchecked for `pending`). Toggling the checkbox SHALL send a `PATCH /academic_tasks/{id}` request with the updated status and update the UI in-place without page reload.

#### Scenario: User marks pending task as completed
- **WHEN** user checks the checkbox on a pending task card
- **THEN** the system SHALL send a `PATCH /academic_tasks/{id}` request with body `{"status": "completed"}`, visually mark the task as completed in-place, apply an attenuated styling with strike-through title, and update the task counts.

#### Scenario: User marks completed task as pending
- **WHEN** user unchecks the checkbox on a completed task card
- **THEN** the system SHALL send a `PATCH /academic_tasks/{id}` request with body `{"status": "pending"}`, visually mark the task as pending in-place, remove attenuated styling, and update the task counts.

### Requirement: Task Grouping and Visual Separation
The system SHALL display tasks on `pages/tasks.html` organized into two distinct visual groups: **Concluídas** (completed tasks) displayed first, followed by **Pendentes** (pending tasks) displayed second. Both groups SHALL be separated by a subtle visual divider and group titles.

#### Scenario: Rendering grouped task list
- **WHEN** tasks are loaded or status changes
- **THEN** the system SHALL render completed tasks in the top section under "Concluídas" header with attenuated legibility-focused styles, and pending tasks in the section below under "Pendentes" header.

### Requirement: Display Completed Study Time Metric
The system SHALL calculate and display a "Tempo de estudo realizado" metric directly below the existing "Tempo estimado" display on `pages/tasks.html`. The metric SHALL compute the total sum of `spent_time` strictly from completed tasks (`status === 'completed'`) having a non-null, valid numeric `spent_time`. Pending tasks (`status === 'pending'`) SHALL NOT contribute to the completed study time calculation.

#### Scenario: User views study time metrics with completed and pending tasks
- **WHEN** an authenticated user opens `pages/tasks.html` with academic tasks loaded
- **THEN** the system SHALL display the total estimated time summing `estimated_time` of all tasks, and immediately below it, display "Tempo de estudo realizado" summing `spent_time` only from completed tasks with filled values.

#### Scenario: User toggles task status between pending and completed
- **WHEN** user marks a pending task with a defined `spent_time` as completed, or unchecks a completed task to pending
- **THEN** the system SHALL dynamically recalculate "Tempo de estudo realizado" and update the display in-place.

#### Scenario: Completed task has empty or null spent time
- **WHEN** a completed task has null, empty, or undefined `spent_time`
- **THEN** the system SHALL treat its spent time contribution as zero without producing `NaN` or display errors.

### Requirement: Multi-Criteria Task Filtering
The system SHALL provide interactive filter controls on `pages/tasks.html` allowing authenticated users to filter their academic tasks by due date period (start date and end date), status ("Pendente", "Concluída", or all), and registered subject, combinable with each other and with the existing text search filter.

#### Scenario: User filters tasks by due date period
- **WHEN** an authenticated user selects a start date, an end date, or both in the date range filter inputs
- **THEN** the system SHALL display only tasks whose scheduled date (`due_date`) falls within the specified date interval (inclusive), updating task counters and time totals dynamically.

#### Scenario: User filters tasks by status
- **WHEN** user selects a specific status ("Pendente" or "Concluída") from the status filter control
- **THEN** the system SHALL display only tasks matching the selected status ("pending" or "completed") and update the displayed task counts accordingly.

#### Scenario: User filters tasks by registered subject
- **WHEN** user selects an active subject from the subject filter dropdown populated from their registered subjects
- **THEN** the system SHALL display only tasks whose `subject_id` matches the selected subject ID.

#### Scenario: User combines multiple filter criteria
- **WHEN** user simultaneously selects a date range, a status, a subject, and enters a text search query
- **THEN** the system SHALL filter task records conjunctively (AND logic), displaying only tasks that satisfy all active filter criteria simultaneously.

### Requirement: Clear Task Filters
The system SHALL provide an accessible clear filters control on `pages/tasks.html` that resets all active filter inputs and restores the full task list for the authenticated user.

#### Scenario: User resets all applied filters
- **WHEN** user triggers the "Limpar Filtros" button
- **THEN** the system SHALL reset the start date, end date, status selector (to "Todos"), subject selector (to "Todas"), and search input (to empty), immediately re-rendering all tasks of the authenticated user and updating the metric totals.

#### Scenario: No tasks match the applied filters
- **WHEN** the combination of applied filters and search query yields zero matching task records
- **THEN** the system SHALL display a clear empty state message informing that no tasks match the selected filters, while keeping filter controls fully interactive to allow adjustments or reset.
