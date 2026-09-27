# Design

## Context

See `proposal.md` for motivation.
The `subjects` database table (`tables/subjects.xs`) is already defined with fields `id`, `name`, `teacher`, `hours`, and `user_id` referencing the `user` table. To enable frontend CRUD interactions, XanoScript API query endpoints will be created under `apis/subjects/`.

## Goals / Non-Goals

**Goals:**
- Define 4 XanoScript REST API endpoint files in `apis/subjects/`:
  - POST `/subjects` for creating subjects
  - GET `/subjects` for listing authenticated user's subjects
  - PATCH `/subjects/{id}` for updating an owned subject
  - DELETE `/subjects/{id}` for deleting an owned subject
- Enforce `auth = "user"` security binding and filter all operations by `user_id = auth.id`.

**Non-Goals:**
- Creating auxiliary UI pages or frontend components (out of scope for backend API proposal).
- Performing automated push or deployment to Xano backend (strictly prohibited by EduTrack AI `AGENTS.md` Rule #2).

## Decisions

### Decision 1: API Directory & Group Structure
Organize subject CRUD endpoints inside `apis/subjects/` containing `api_group.xs` to declare the endpoint namespace.

### Decision 2: Security & User Isolation Logic
- **Authentication**: Require `auth = "user"` header on all endpoints.
- **POST `/subjects`**: Set `user_id` automatically from `auth.id` so records cannot be forged under another user's ID.
- **GET `/subjects`**: Apply `where = { user_id: auth.id }` filter to return only the user's subjects.
- **PATCH `/subjects/{id}`**: Filter target record by `id == input.id` and `user_id == auth.id`. If no matching record is found, return error response.
- **DELETE `/subjects/{id}`**: Filter target record by `id == input.id` and `user_id == auth.id` prior to deletion.

### Decision 3: XanoScript API Endpoint File Placement
- `apis/subjects/api_group.xs`
- `apis/subjects/post_subjects.xs`
- `apis/subjects/get_subjects.xs`
- `apis/subjects/patch_subjects_id.xs`
- `apis/subjects/delete_subjects_id.xs`

## Risks / Trade-offs

- **Unauthorized Access Attempts**: A user might try to update/delete another user's subject by guessing its `id`.
  - *Mitigation*: All queries combine `id` and `user_id == auth.id` checks so unauthorized requests fail with record not found / access denied.
