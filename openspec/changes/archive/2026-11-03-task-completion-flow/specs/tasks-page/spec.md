# tasks-page Specification

## MODIFIED Requirements

### Requirement: Task Creation
The system SHALL allow authenticated users to create a new task record via a modal form, enforcing field validation, dynamically controlling the "Tempo Gasto (minutos)" field based on status, and storing time parameters in minutes. When status is "pending", the spent time field SHALL be hidden and disabled. When status is "completed", the spent time field SHALL be visible and optional. Status changes in the form SHALL update the field dynamically without reloading the page.

#### Scenario: User creates a pending task
- **WHEN** user opens the task creation modal with default status "pending"
- **THEN** the system SHALL hide and disable the "Tempo Gasto (minutos)" input field.

#### Scenario: User creates a completed task
- **WHEN** user selects status "completed" during task creation
- **THEN** the system SHALL display and enable the "Tempo Gasto (minutos)" input field, allowing optional input.

#### Scenario: User dynamically changes status during creation
- **WHEN** user toggles between "pending" and "completed" in the status dropdown
- **THEN** the system SHALL immediately toggle the visibility and disabled state of the "Tempo Gasto (minutos)" field without reloading the page.

#### Scenario: User creates a task with valid inputs
- **WHEN** user submits the creation form with a title, estimated time in minutes, status ("Pendente" or "Concluída"), due date, optional description, optional spent time (if completed), and selected subject ID
- **THEN** the system SHALL send a `POST /academic_tasks` request with the JSON payload and Authorization header, display a success toast banner upon 200/201 response, close the modal, and refresh the tasks list.

#### Scenario: User attempts creation with missing mandatory fields
- **WHEN** user submits the modal form without entering a title or estimated time
- **THEN** the system SHALL prevent submission, flag the required inputs, and show an error notification message without sending an API request.

### Requirement: Task Modification
The system SHALL allow authenticated users to edit an existing task record via the modal form pre-filled with existing task data, respecting the saved status and preserving any previously recorded spent time.

#### Scenario: User edits a task
- **WHEN** user clicks "Editar" on a task card
- **THEN** the system SHALL populate the form with existing task data, apply the status-dependent visibility and enablement to "Tempo Gasto (minutos)", and preserve previously recorded spent time.

#### Scenario: User dynamically changes status during edit
- **WHEN** user changes the status dropdown while editing an existing task
- **THEN** the system SHALL immediately update the visibility and enablement of the "Tempo Gasto (minutos)" input field according to the selected status without page reload.

#### Scenario: User updates an existing task
- **WHEN** user modifies values and submits the form
- **THEN** the system SHALL send a `PATCH /academic_tasks/{id}` request with the updated fields, display a success toast notification, and update the task card in the list.

### Requirement: Task Status Checkbox Toggle
The system SHALL display an interactive checkbox on each task card reflecting its current status (`checked` for `completed`, unchecked for `pending`). When a user marks the checkbox of a pending task, the system SHALL NOT complete the task immediately, but SHALL open the edit form with status set to `completed`, display the spent time field, and require spent time to be provided before confirming completion. Only upon confirmation and valid input SHALL the system persist the completion via `PATCH /academic_tasks/{id}`. If cancelled, the task SHALL remain pending.

#### Scenario: User marks pending task as completed
- **WHEN** user checks the checkbox on a pending task card
- **THEN** the system SHALL NOT complete the task immediately and SHALL NOT send an automatic PATCH request, but SHALL open the task modal with status pre-selected as "completed", show the "Tempo Gasto (minutos)" input, and require the user to inform spent time before confirming completion.

#### Scenario: User marks completed task as pending
- **WHEN** user unchecks the checkbox on a completed task card
- **THEN** the system SHALL send a `PATCH /academic_tasks/{id}` request with body `{"status": "pending"}`, visually mark the task as pending in-place, remove attenuated styling, and update the task counts.

#### Scenario: User confirms completion with spent time provided
- **WHEN** user enters a valid numeric spent time in the modal opened via checkbox and clicks "Salvar"
- **THEN** the system SHALL send a `PATCH /academic_tasks/{id}` request with status "completed" and the provided spent_time, update the UI in-place, and display a success notification.

#### Scenario: User attempts to confirm completion without spent time
- **WHEN** user tries to submit the completion form without entering spent time
- **THEN** the system SHALL prevent submission, flag the spent time field as required, and display an error alert without updating task status.

#### Scenario: User cancels completion modal
- **WHEN** user clicks "Cancelar" or closes the modal opened by clicking the checkbox
- **THEN** the system SHALL dismiss the modal, keep the task status as "pending", keep the checkbox unchecked, and make no changes to the backend.
