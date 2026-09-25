# Proposal

## Why

Teachers need a mechanism to assign grades to student activities in EduTrack AI to track academic performance.

## What Changes

- Create database structure to store activity grades (`activity_grades`).
- Create an API endpoint (`POST /activity_grades`) for teachers to launch grades for specific student activities.

## Capabilities

### New Capabilities
- `activity-grades`: Allow launching grades for student activities.

### Modified Capabilities
<!-- None -->

## Impact

- **Backend (XanoScript)**: New table `activity_grades` in `tables/activity_grades.xs` and new POST endpoint in `apis/activity_grades/post.xs`.
- **Database**: New table for activity grades storing student, activity, grade value, and user association.
