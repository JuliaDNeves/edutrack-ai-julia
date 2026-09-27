# subjects Specification

## Purpose
Define API endpoints for CRUD operations on academic subjects with strict user data isolation in EduTrack AI.

## ADDED Requirements

### Requirement: Create Subject Endpoint
The system SHALL provide a POST `/subjects` REST API endpoint to create a new subject record linked to the authenticated user.

#### Scenario: Authenticated user creates a new subject
- **WHEN** an authenticated user sends a valid POST request to `/subjects` with subject data (`name`, `teacher`, `hours`)
- **THEN** the system SHALL store the subject record associated with the authenticated user's `user_id`

### Requirement: List Subjects Endpoint
The system SHALL provide a GET `/subjects` REST API endpoint to list all subject records belonging to the authenticated user.

#### Scenario: Authenticated user lists their subjects
- **WHEN** an authenticated user sends a GET request to `/subjects`
- **THEN** the system SHALL return only the subject records where `user_id` matches the authenticated user's ID

### Requirement: Update Subject Endpoint
The system SHALL provide a PATCH `/subjects/{id}` REST API endpoint to update an existing subject record owned by the authenticated user.

#### Scenario: Authenticated user updates an owned subject
- **WHEN** an authenticated user sends a PATCH request to `/subjects/{id}` with updated fields
- **THEN** the system SHALL update the subject record if it belongs to the authenticated user's `user_id`

#### Scenario: User attempts to update another user's subject
- **WHEN** an authenticated user sends a PATCH request to `/subjects/{id}` belonging to another user
- **THEN** the system SHALL reject the request and return an authorization error

### Requirement: Delete Subject Endpoint
The system SHALL provide a DELETE `/subjects/{id}` REST API endpoint to delete a subject record owned by the authenticated user.

#### Scenario: Authenticated user deletes an owned subject
- **WHEN** an authenticated user sends a DELETE request to `/subjects/{id}`
- **THEN** the system SHALL delete the subject record if it belongs to the authenticated user's `user_id`

#### Scenario: User attempts to delete another user's subject
- **WHEN** an authenticated user sends a DELETE request to `/subjects/{id}` belonging to another user
- **THEN** the system SHALL reject the request and return an authorization error
