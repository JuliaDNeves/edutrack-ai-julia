# tasks-page Specification

## Purpose

Defines the user interface and frontend behavioral contract for managing academic tasks in EduTrack AI via pages/tasks.html.

## ADDED Requirements

### Requirement: Task Listing and Filtering
The system SHALL display all academic tasks belonging to the authenticated user on the tasks page (`pages/tasks.html`), allowing search filtering by task title or description.

#### Scenario: User views their task list
- **WHEN** an authenticated user opens `pages/tasks.html`
- **THEN** the system SHALL fetch task records from `GET /academic_tasks` using `Authorization: Bearer <token>` and render them as cards displaying title, subject name, due date, status badge, estimated time, and spent time.

#### Scenario: User searches tasks
- **WHEN** user enters a query string into the search input field
- **THEN** the list of displayed task cards SHALL filter dynamically matching the title or description text.

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
