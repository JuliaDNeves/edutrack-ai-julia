# Tasks

## 1. Schema & Table Updates

- [x] 1.1 Update `tables/subjects.xs` schema to add optional fields `description` (text), `start_date` (date), and `end_date` (date), preserving existing fields and indexes
- [x] 1.2 Review `tables/subjects.xs` syntax against `@/docs/table_guideline.md` to ensure valid field declarations

## 2. API Query Updates

- [x] 2.1 Update `apis/subjects/post_subjects.xs` to declare input parameters for `description`, `start_date`, and `end_date`, and pass them to `db.add subjects`
- [x] 2.2 Update `apis/subjects/patch_subjects_id.xs` to declare input parameters for `description`, `start_date`, and `end_date`
- [x] 2.3 Verify `apis/subjects/get_subjects.xs`, `delete_subjects_id.xs`, and `get_subjects_search.xs` compatibility with the updated schema and fields
