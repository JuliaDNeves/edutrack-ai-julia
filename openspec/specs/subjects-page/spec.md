# subjects-page Specification

## Purpose
Provides a responsive management web interface for EduTrack AI users to view, create, update, and delete academic subjects with full metadata support.

## Requirements

### Requirement: Display user academic subjects
The system SHALL fetch and display the list of academic subjects belonging exclusively to the authenticated user, rendering all subject metadata fields.

#### Scenario: Authenticated user views subjects list
- **WHEN** an authenticated user opens `pages/subjects.html`
- **THEN** system sends GET `/subjects` with Authorization Bearer header and renders subject cards displaying name, teacher, workload hours, description, start date, and end date

### Requirement: Create new academic subject
The system SHALL allow an authenticated user to add a new academic subject by submitting a form with name, teacher, hours, description, start date, and end date.

#### Scenario: User successfully creates a new subject
- **WHEN** user fills in subject details (name, teacher, hours, description, start_date, end_date) in the create modal and clicks save
- **THEN** system sends POST `/subjects` request with Authorization Bearer header, closes the modal, updates the subjects list, and shows a success toast notification

### Requirement: Edit existing subject
The system SHALL allow an authenticated user to edit their existing subject details using a modal form populated with current field values.

#### Scenario: User updates an existing subject
- **WHEN** user opens edit modal for a subject, updates any fields (name, teacher, hours, description, start_date, end_date), and submits
- **THEN** system sends PATCH `/subjects/{subjects_id}` request with Authorization Bearer header, refreshes the subjects list, and displays a success notification

### Requirement: Delete subject with confirmation
The system SHALL prompt for user confirmation before removing a subject.

#### Scenario: User confirms deletion of a subject
- **WHEN** user clicks delete for a subject and confirms in the confirmation dialog
- **THEN** system sends DELETE `/subjects/{subjects_id}` request with Authorization Bearer header, removes subject from the list, and displays a success notification

### Requirement: Enforce user authentication
The system SHALL protect `pages/subjects.html` by checking for a valid authentication token before displaying content.

#### Scenario: Unauthenticated access attempt
- **WHEN** a user visits `pages/subjects.html` without a valid authentication token stored
- **THEN** system automatically redirects the user to the login page

### Requirement: Subject Filter Toggle Button
The system SHALL provide an interactive toggle button with a filter icon positioned immediately to the left of the search bar on `pages/subjects.html`, allowing authenticated users to show and hide the subject filters panel.

#### Scenario: User toggles the filter panel visibility
- **WHEN** an authenticated user clicks the filter toggle button while the filter panel is hidden
- **THEN** the system SHALL display the filter panel with a smooth visual transition and mark the toggle button as active

#### Scenario: User hides the open filter panel
- **WHEN** user clicks the filter toggle button while the filter panel is visible
- **THEN** the system SHALL hide the filter panel and return the toggle button to its default inactive state

### Requirement: Multi-Criteria Subject Filtering
The system SHALL provide filter controls within the collapsible filter panel on `pages/subjects.html` allowing authenticated users to filter their academic subjects by date range (start date and end date), teacher, and workload hours, combinable with each other and with the existing text search input.

#### Scenario: Default initial state
- **WHEN** an authenticated user opens or refreshes `pages/subjects.html`
- **THEN** the subject filters panel SHALL be hidden by default until explicitly opened by the toggle button

#### Scenario: User filters subjects by academic dates
- **WHEN** user specifies a start date, an end date, or both in the filter panel
- **THEN** the system SHALL display only subjects matching the specified date bounds (start date and/or end date), updating the displayed subject count and total workload hours

#### Scenario: User filters subjects by teacher
- **WHEN** user selects a teacher from the teacher dropdown populated from user's registered subjects
- **THEN** the system SHALL display only subjects matching the selected teacher

#### Scenario: User filters subjects by workload hours
- **WHEN** user inputs a workload hours value in the filter panel
- **THEN** the system SHALL display only subjects matching the specified hours quantity

#### Scenario: User combines multiple subject filters
- **WHEN** user simultaneously defines date constraints, teacher, workload hours, and a text search query
- **THEN** the system SHALL evaluate all criteria conjunctively (AND logic), displaying only subjects that satisfy all conditions

### Requirement: Clear Subject Filters
The system SHALL provide a clear filters control on `pages/subjects.html` that resets all active filter inputs and restores the complete subject list for the authenticated user.

#### Scenario: User clears applied subject filters
- **WHEN** user clicks the "Limpar Filtros" button
- **THEN** the system SHALL reset start date, end date, teacher selector, workload hours, and search inputs to empty defaults, immediately re-rendering all user subjects and updating total statistics

#### Scenario: No subjects match applied filters
- **WHEN** the combination of active filters and search query yields zero matching subjects
- **THEN** the system SHALL display a clear empty state message informing that no subjects match the selected filters, while keeping the filter controls interactive to allow adjustments or reset
