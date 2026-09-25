# academic-tasks Specification

## Purpose
Define database structure for academic tasks and link them to subjects and authenticated users in EduTrack AI.

## ADDED Requirements

### Requirement: Academic Tasks Table Schema
The system SHALL maintain an `academic_tasks` database table in Xano to store student academic obligations linked to subjects and users.

#### Scenario: Define academic_tasks table schema
- **WHEN** the `academic_tasks` table is defined in the database
- **THEN** the system SHALL create fields: `id` (auto-increment primary key), `title` (text), `description` (text, optional), `due_date` (date), `status` (text, default "pending"), `subject_id` (table reference to subjects), `user_id` (table reference to users), and `created_at` (timestamp).

### Requirement: User Isolation for Academic Tasks
The system MUST associate every academic task record with the authenticated user's ID (`user_id`).

#### Scenario: Store academic task record with user association
- **WHEN** an academic task is created or updated
- **THEN** the system SHALL enforce binding to the authenticated `user_id`.
