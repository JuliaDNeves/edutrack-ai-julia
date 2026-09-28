# subjects Specification

## Purpose
Define database structure for subjects and search/filter capabilities in EduTrack AI.

## ADDED Requirements

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
