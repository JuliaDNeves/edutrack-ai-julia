# tasks-page Specification

## MODIFIED Requirements

### Requirement: Task Listing and Filtering
The system SHALL display all academic tasks belonging to the authenticated user on the tasks page (`pages/tasks.html`) using compact and slim task cards, allowing search filtering by task title or description.

#### Scenario: User views their task list
- **WHEN** an authenticated user opens `pages/tasks.html`
- **THEN** the system SHALL fetch task records from `GET /academic_tasks` using `Authorization: Bearer <token>` and render them as compact, slim cards displaying a status checkbox, title, subject tag, due date, status badge, estimated time, spent time, optional description, and action buttons (Editar, Excluir).

#### Scenario: User searches tasks
- **WHEN** user enters a query string into the search input field
- **THEN** the list of displayed task cards SHALL filter dynamically matching the title, subject, or description text.

## ADDED Requirements

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
