# Design

## Context

See `proposal.md` for motivation. EduTrack AI uses XanoScript (`.xs`) to declare database tables and API endpoints. The `subjects` table currently stores basic metadata (`name`, `teacher`, `hours`, `user_id`). This design outlines the schema expansion and API field updates needed to support extended subject fields (`description`, `start_date`, `end_date`).

## Goals / Non-Goals

**Goals:**
- Update `tables/subjects.xs` to include optional fields: `description` (text), `start_date` (date), `end_date` (date).
- Update `apis/subjects/post_subjects.xs` to accept and save the 3 new fields.
- Update `apis/subjects/patch_subjects_id.xs` to allow editing the 3 new fields.
- Maintain exact endpoint paths, user ownership checks (`$auth.id`), and backward compatibility for existing records.

**Non-Goals:**
- Modifying frontend HTML/JS files in this phase.
- Altering DELETE or GET endpoint routes.
- Changing authentication mechanisms or user table relationships.

## Decisions

1. **Schema Extension in `tables/subjects.xs`**
   - Add optional field syntax:
     - `text description?`
     - `date start_date?`
     - `date end_date?`
   - Making all new fields optional (`?`) ensures existing database rows and queries remain completely valid without requiring default values.

2. **POST API Update (`apis/subjects/post_subjects.xs`)**
   - Declare optional inputs in the `input` block:
     - `text description?`
     - `date start_date?`
     - `date end_date?`
   - Map input fields into the `db.add subjects` data payload object:
     - `description : $input.description`
     - `start_date  : $input.start_date`
     - `end_date    : $input.end_date`

3. **PATCH API Update (`apis/subjects/patch_subjects_id.xs`)**
   - Declare optional inputs in the `input` block:
     - `text description?`
     - `date start_date?`
     - `date end_date?`
   - The existing `$input|pick:($raw_input|keys)` logic automatically handles partial updates for any declared input fields.

4. **GET, DELETE, and Search Verification**
   - `get_subjects.xs` returns all table columns automatically via `db.query subjects`, so adding columns to the table schema automatically exposes them in `GET /subjects`.
   - `delete_subjects_id.xs` deletes by `id` and requires no logic changes.
   - `get_subjects_search.xs` queries the table and pushes matching records to response array; no structural changes required.

## Risks / Trade-offs

- **[Risk] Date Format Incompatibility**:
  - *Mitigation*: Use Xano standard `date` type in `.xs` definitions to accept standard ISO date strings (`YYYY-MM-DD`).
