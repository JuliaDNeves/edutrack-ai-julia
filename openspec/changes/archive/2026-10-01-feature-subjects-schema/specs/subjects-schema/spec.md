# subjects-schema Specification

## Purpose
Defines the database schema extensions and REST API endpoint updates for managing academic subjects with description and date range metadata in EduTrack AI.

## ADDED Requirements

### Requirement: Store extended subject fields in database
The system SHALL support storing optional `description` (text), `start_date` (date), and `end_date` (date) fields in the `subjects` table schema without requiring default values or breaking existing records.

#### Scenario: Database schema accepts extended fields
- **WHEN** a subject record is created or updated with or without `description`, `start_date`, or `end_date`
- **THEN** system stores the fields as optional attributes while preserving existing subject data and foreign key constraints

### Requirement: Create subject with extended fields
The system SHALL accept `description`, `start_date`, and `end_date` input parameters in `POST /subjects` and persist them for the authenticated user.

#### Scenario: User creates a subject with description and dates
- **WHEN** an authenticated user sends a `POST /subjects` request with `name`, `teacher`, `hours`, `description`, `start_date`, and `end_date`
- **THEN** system creates the new subject record in the database with all provided fields associated with `$auth.id`

### Requirement: Update subject with extended fields
The system SHALL accept optional `description`, `start_date`, and `end_date` parameters in `PATCH /subjects/{subjects_id}` and update the target subject record.

#### Scenario: User updates description or date range of a subject
- **WHEN** an authorized user sends a `PATCH /subjects/{subjects_id}` request containing new `description`, `start_date`, or `end_date` values
- **THEN** system verifies subject ownership, updates the requested fields, and returns the modified subject record

### Requirement: Return extended fields in list queries
The system SHALL include `description`, `start_date`, and `end_date` attributes in responses for `GET /subjects`.

#### Scenario: User fetches subject list
- **WHEN** an authenticated user sends a `GET /subjects` request
- **THEN** system returns all subject records belonging to the user including the new optional fields
