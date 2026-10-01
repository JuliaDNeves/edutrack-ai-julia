# subjects-page Specification

## Purpose
Provides a responsive management web interface for EduTrack AI users to view, create, update, and delete academic subjects.

## ADDED Requirements

### Requirement: Display user academic subjects
The system SHALL fetch and display the list of academic subjects belonging exclusively to the authenticated user.

#### Scenario: Authenticated user views subjects list
- **WHEN** an authenticated user opens `pages/subjects.html`
- **THEN** system sends GET `/subjects` with Authorization Bearer header and renders subject cards displaying subject name, teacher, and workload hours

### Requirement: Create new academic subject
The system SHALL allow an authenticated user to add a new academic subject by submitting a form with name, teacher, and hours.

#### Scenario: User successfully creates a new subject
- **WHEN** user fills in valid subject details (name, teacher, hours) in the create modal and clicks save
- **THEN** system sends POST `/subjects` request with Authorization Bearer header, closes the modal, updates the subjects list, and shows a success toast notification

### Requirement: Edit existing subject
The system SHALL allow an authenticated user to edit their existing subject details using a modal form.

#### Scenario: User updates an existing subject
- **WHEN** user opens edit modal for a subject, updates fields (name, teacher, hours), and submits
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
