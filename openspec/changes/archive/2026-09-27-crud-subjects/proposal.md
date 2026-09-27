# Proposal

## Why

The `subjects` table structure exists, but there are no REST API endpoints for users to manage their academic subjects. Creating authenticated CRUD endpoints (POST, GET, PATCH, DELETE) for `subjects` allows users to create, list, update, and delete their subjects while enforcing strict data isolation so users can only access their own records.

## What Changes

- Create POST `/subjects` endpoint to add a new subject for the authenticated user.
- Create GET `/subjects` endpoint to retrieve all subjects belonging to the authenticated user.
- Create PATCH `/subjects/{id}` endpoint to update a subject belonging to the authenticated user.
- Create DELETE `/subjects/{id}` endpoint to remove a subject belonging to the authenticated user.
- Enforce authentication and automatic `user_id` binding/filtering across all subject endpoints.

## Capabilities

### New Capabilities

### Modified Capabilities

- `subjects`: Add CRUD API endpoints (POST, GET, PATCH, DELETE) with mandatory `user_id` isolation for authenticated users.

## Impact

- **APIs**: Add REST API endpoint files under `apis/subjects/` (`create_subject.xs`, `list_subjects.xs`, `update_subject.xs`, `delete_subject.xs`).
- **Security**: Ensures all subject CRUD operations validate user authentication and scope data to `user_id`.
