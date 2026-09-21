# subjects Specification

## Purpose
Define database structure for subjects and enforce user data separation in EduTrack AI.

## ADDED Requirements

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
