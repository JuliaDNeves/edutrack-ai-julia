# Proposal

## Why

To support academic subject management in EduTrack AI, we need a database table to store course/subject information associated with authenticated users.

## What Changes

- Create `subjects` database table schema in Xano with fields:
  - `id`: Auto-incrementing primary key (integer)
  - `name`: Text field for subject name
  - `teacher`: Text field for teacher/instructor name
  - `hours`: Integer field for subject workload hours
  - `user_id`: Foreign key referencing the Xano authentication `user` / `users` table

## Capabilities

### New Capabilities
- `subjects`: Defines the database structure and rules for academic subjects.

### Modified Capabilities

## Impact

- Database schema: Adds `tables/subjects.xs` file defining the XanoScript schema for `subjects`.
- User data association: Connects subject records to authenticated users via `user_id`.
