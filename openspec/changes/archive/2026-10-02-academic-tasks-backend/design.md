# Design

## Context

EduTrack AI manages student subjects and academic obligations in Xano. While the `subjects` table and API endpoints exist (`GET /subjects`, `POST /subjects`, etc.), the `academic_tasks` database table and backend REST APIs require structural enhancements and strict ownership rules. Tasks must always be bound to an authenticated user (`user_id`) and associated with a subject owned by that same user (`subject_id`).

See `proposal.md` for background and context.

## Goals / Non-Goals

**Goals:**
- Update `tables/academic_tasks.xs` in XanoScript syntax with required `estimated_time`, optional `spent_time`, status restrictions, foreign keys (`subject_id`, `user_id`), and indexes.
- Create REST APIs under `apis/academic_tasks/` (`POST`, `GET`, `PATCH`, `DELETE`).
- In `POST` and `PATCH`, validate that `subject_id` belongs to `$auth.id`.
- Automatically populate `user_id` from `$auth.id` without client parameter intervention.
- Enforce strict `status` validation (`pending` or `completed`).

**Non-Goals:**
- Building or modifying frontend UI files in this task (frontend select component will use existing `GET /subjects` and new `GET /academic_tasks`).
- Modifying existing `subjects` APIs or tables.

## Decisions

1. **Table Schema update (`tables/academic_tasks.xs`)**:
   - `id`: `int` (Primary key)
   - `created_at`: `timestamp?=now` (`visibility = "private"`)
   - `title`: `text` (Required)
   - `description`: `text?` (Optional)
   - `due_date`: `date` (Required)
   - `status`: `enum={"pending","completed"}` (Required)
   - `estimated_time`: `int` (Required, integer in minutes)
   - `spent_time`: `int?` (Optional, integer in minutes)
   - `subject_id`: `int` (FK to `subjects`)
   - `user_id`: `int` (FK to `user`)
   - Indexes on `id` (primary), `user_id` (btree), `subject_id` (btree).

2. **API Endpoint Architecture (`apis/academic_tasks/`)**:
   - **`api_group.xs`**: Group name `"Academic Tasks"`.
   - **`POST /academic_tasks`**: Receives task fields. Queries `subjects` to verify `$subject.user_id == $auth.id`. Rejects with `accessdenied` if subject is invalid or owned by another user. Validates `status` is `"pending"` or `"completed"`. Inserts into `academic_tasks` with `user_id = $auth.id`.
   - **`GET /academic_tasks`**: Fetches all tasks filtering `where = $db.academic_tasks.user_id == $auth.id`.
   - **`PATCH /academic_tasks/{academic_tasks_id}`**: Retrieves task by `id`. Verifies `$existing_task.user_id == $auth.id`. If `subject_id` is updated, verifies new subject belongs to `$auth.id`. If `status` is updated, verifies value is valid. Performs `db.patch`.
   - **`DELETE /academic_tasks/{academic_tasks_id}`**: Retrieves task by `id`. Verifies ownership `$existing_task.user_id == $auth.id`. Performs `db.del`.

3. **Status Validation**:
   - Status values: `"pending"` or `"completed"`.

## Risks / Trade-offs

- [Risk] Request attempting to link a task to a non-existent or foreign user's subject → [Mitigation] API queries explicitly check `db.get subjects` with `$subject.user_id == $auth.id` and trigger an `accessdenied` precondition error.
- [Risk] Manual or invalid `user_id` passed in request payload → [Mitigation] APIs do not accept `user_id` in `input {}`; `$auth.id` is enforced internally in Xano stack.

## Migration Plan

1. Verify XanoScript file syntax for `tables/academic_tasks.xs` and `apis/academic_tasks/*`.
2. Developer manually reviews and performs push to Xano (per EduTrack AI guidelines, AI agent does not invoke push commands).
