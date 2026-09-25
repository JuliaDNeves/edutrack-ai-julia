# Design

## Context

See `proposal.md` for motivation and background. EduTrack AI uses Xano (via XanoScript) for backend functionality.

## Goals / Non-Goals

**Goals:**
- Design a XanoScript table `activity_grades` to persist grade entries for student activities.
- Design a POST API endpoint (`/activity_grades`) in XanoScript to allow launching grades, associated with the authenticated user (`user_id`).

**Non-Goals:**
- Querying, listing, or updating existing grades (out of scope for this initial request).
- Frontend FlutterFlow UI integration (handled separately).

## Decisions

- **Table Schema (`activity_grades`)**:
  - `id` (int, auto-increment)
  - `user_id` (int, references users table for security filtering)
  - `academic_task_id` (int, references the activity)
  - `student_id` (int, references student)
  - `grade` (decimal/numeric, the launched grade)
  - `created_at` (timestamp, default now)

- **API Endpoint (`POST /activity_grades`)**:
  - Requires user authentication (`auth = true`).
  - Inputs: `academic_task_id`, `student_id`, `grade`.
  - Automatically sets `user_id` from authenticated context `auth.id`.

## Risks / Trade-offs

- [Risk] Grade without validation → Mitigation: Validate that grade is within valid numeric range before inserting into database.
