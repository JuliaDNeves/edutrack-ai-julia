# subjects Specification

## Purpose
Define database structure for subjects and enforce user data separation in EduTrack AI.

## Requirements

### Requirement: Subjects Table Schema
The system SHALL maintain a `subjects` database table in Xano containing fields for subject management linked to authenticated users.

#### Scenario: Define subjects table schema
- **WHEN** the `subjects` table is defined in the database
- **THEN** the system SHALL create fields: `id` (auto-increment primary key), `name` (text), `teacher` (text), `hours` (integer), and `user_id` (table reference to the user authentication table)

### Requirement: User Isolation Security Rule
The system MUST associate every subject record with the authenticated user's ID (`user_id`).

#### Scenario: Store subject record with authenticated user reference
- **WHEN** a subject record is created or updated
- **THEN** the system SHALL enforce binding to the authenticated `user_id`

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

### Requirement: Search Subjects Endpoint
The system SHALL provide a GET `/subjects/search` REST API endpoint allowing authenticated users to filter their subjects by name OR by presence of overdue tasks using integrated Python logic.

#### Scenario: User searches subjects by name query
- **WHEN** an authenticated user sends a GET request to `/subjects/search` with a `query` parameter matching part of a subject name
- **THEN** the system SHALL return all subjects belonging to the authenticated user whose name matches the query string case-insensitively

#### Scenario: User filters subjects by overdue tasks using Python logic
- **WHEN** an authenticated user sends a GET request to `/subjects/search` with `has_overdue=true`
- **THEN** the system SHALL compute task status using integrated Python logic and return only subjects that have at least one task with `due_date` prior to the current date and status `pending`

#### Scenario: User isolation on search endpoint
- **WHEN** an authenticated user executes a search request on `/subjects/search`
- **THEN** the system MUST isolate results and return only subjects associated with the authenticated user's `user_id`
