# Proposal

## Why
The academic subjects (`subjects`) module in EduTrack AI requires extended data storage capabilities—specifically subject description (`description`), start date (`start_date`), and end date (`end_date`)—to allow students to record complete course metadata. Updating the Xano database schema and corresponding REST APIs ensures backwards compatibility with existing records while enabling full data management.

## What Changes
- **Table Schema Update**: Modify `tables/subjects.xs` to include optional fields:
  - `description?` (text)
  - `start_date?` (date)
  - `end_date?` (date)
- **API Update (POST `/subjects`)**: Update `apis/subjects/post_subjects.xs` input declaration and `db.add` data block to accept and store `description`, `start_date`, and `end_date`.
- **API Update (PATCH `/subjects/{subjects_id}`)**: Update `apis/subjects/patch_subjects_id.xs` input declaration to accept optional `description`, `start_date`, and `end_date` fields.
- **API Validation (GET, DELETE, search `/subjects`)**: Ensure `get_subjects.xs`, `delete_subjects_id.xs`, and `get_subjects_search.xs` return and handle extended subject records without breaking existing endpoints or authorization constraints.

## Capabilities

### New Capabilities
- `subjects-schema`: Extended data model and REST API support for academic subjects.

### Modified Capabilities

## Impact
- `tables/subjects.xs`
- `apis/subjects/post_subjects.xs`
- `apis/subjects/patch_subjects_id.xs`
- Existing API endpoints (`GET`, `DELETE`, `PATCH`, `POST /subjects`) remain backwards compatible. No frontend code is modified in this change.
