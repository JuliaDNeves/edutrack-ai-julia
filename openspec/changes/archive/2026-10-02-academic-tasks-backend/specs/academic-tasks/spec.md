# academic-tasks Specification

## MODIFIED Requirements

### Requirement: Academic Tasks Table Schema
The system SHALL maintain an `academic_tasks` database table in Xano containing `id` (auto integer primary key), `title` (text, required), `description` (text, optional), `due_date` (date, required), `status` (text, required, allowed values: "pending" or "completed"), `estimated_time` (integer, required, stored in minutes), `spent_time` (integer, optional, stored in minutes), `subject_id` (table reference to `subjects`, required), `user_id` (table reference to `user`, required), and `created_at` (timestamp).

#### Scenario: Define academic_tasks table schema
- **WHEN** the `academic_tasks` table is defined in Xano
- **THEN** system SHALL store tasks with required estimated_time in minutes and status restricted to pending or completed.

## ADDED Requirements

### Requirement: Subject Ownership Validation
The system SHALL validate that the specified `subject_id` belongs to the authenticated user (`auth.id`) before allowing creation or update of an academic task, returning an access denied error if it belongs to another user or does not exist.

#### Scenario: Task creation with valid subject ownership
- **WHEN** authenticated user creates a task referencing a subject created by that user
- **THEN** system SHALL create the task record associated with subject_id and user_id.

#### Scenario: Task creation with invalid subject ownership
- **WHEN** authenticated user attempts to create a task referencing a subject owned by another user or non-existent
- **THEN** system SHALL reject the request with an authorization error.

### Requirement: Academic Tasks REST CRUD APIs
The system SHALL expose RESTful API endpoints for `academic_tasks` under the `Academic Tasks` API group with user-level isolation:
- `POST /academic_tasks`: Creates a task for the authenticated user.
- `GET /academic_tasks`: Retrieves all tasks for the authenticated user.
- `PATCH /academic_tasks/{academic_tasks_id}`: Updates a task owned by the authenticated user.
- `DELETE /academic_tasks/{academic_tasks_id}`: Deletes a task owned by the authenticated user.

#### Scenario: Retrieve tasks for authenticated user
- **WHEN** authenticated user calls `GET /academic_tasks`
- **THEN** system SHALL return only task records matching `auth.id`.

#### Scenario: Create task for authenticated user
- **WHEN** authenticated user submits valid task details to `POST /academic_tasks`
- **THEN** system SHALL automatically assign `user_id` from `$auth.id` and persist the task.

#### Scenario: Update task for authenticated user
- **WHEN** authenticated user sends `PATCH /academic_tasks/{academic_tasks_id}`
- **THEN** system SHALL update the task fields after confirming task and subject ownership.

#### Scenario: Delete task for authenticated user
- **WHEN** authenticated user sends `DELETE /academic_tasks/{academic_tasks_id}`
- **THEN** system SHALL remove the task record after confirming task ownership.
