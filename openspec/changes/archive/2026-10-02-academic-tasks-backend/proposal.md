# Proposal

## Why

Students using EduTrack AI need a full-featured backend API for academic task management (`academic_tasks`) linked directly to their authenticated subjects. Providing a secure RESTful CRUD interface with subject ownership validation ensures data privacy, prevents unauthorized access, and prepares the backend for future time tracking and progress features.

## What Changes

- Update `academic_tasks` table schema definition in XanoScript to include required `estimated_time` (integer in minutes), optional `spent_time` (integer in minutes), `due_date` (date), `status` (enum with values: "pending", "completed"), `title` (text, required), `description` (text, optional), `subject_id` (FK to `subjects`), and `user_id` (FK to `user`).
- Create full RESTful API CRUD endpoints in `apis/academic_tasks/`:
  - `POST /academic_tasks` to create a task linked to an authenticated user's subject.
  - `GET /academic_tasks` to list tasks belonging to the authenticated user.
  - `PATCH /academic_tasks/{academic_tasks_id}` to update a task belonging to the authenticated user.
  - `DELETE /academic_tasks/{academic_tasks_id}` to delete a task belonging to the authenticated user.
- Implement security validation ensuring `user_id` is automatically injected from `$auth.id` and validating that `subject_id` belongs to the authenticated user before creating or updating a task.

## Capabilities

### New Capabilities

*(None)*

### Modified Capabilities

- `academic-tasks`: Define complete `academic_tasks` schema requirements (`estimated_time`, `spent_time`, `status` ) and CRUD API requirements with strict subject ownership validation.

## Impact

- Xano backend tables (`tables/academic_tasks.xs`)
- Xano backend APIs (`apis/academic_tasks/`)
- Interoperability with existing `subjects` table and `auth.id` authentication system.
