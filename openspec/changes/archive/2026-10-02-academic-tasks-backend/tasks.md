# Tasks

## 1. Database Schema

- [x] 1.1 Update `tables/academic_tasks.xs` schema to include `estimated_time` (int, required), `spent_time` (int, optional), `due_date` (date, required), `status` (enum `pending`,`completed`, required), `title` (text, required), `description` (text, optional), `subject_id` (FK to subjects), `user_id` (FK to user), and indexes. Verify file syntax.

## 2. API Endpoints

- [x] 2.1 Create `apis/academic_tasks/api_group.xs` for Academic Tasks API group and verify file structure.
- [x] 2.2 Create `apis/academic_tasks/post_academic_tasks.xs` (`POST /academic_tasks`) with `$auth.id` binding, subject ownership validation (`$subject.user_id == $auth.id`), and status constraint validation (`pending` or `completed`).
- [x] 2.3 Create `apis/academic_tasks/get_academic_tasks.xs` (`GET /academic_tasks`) returning tasks belonging to `$auth.id`.
- [x] 2.4 Create `apis/academic_tasks/patch_academic_tasks_id.xs` (`PATCH /academic_tasks/{academic_tasks_id}`) verifying task and subject ownership and status.
- [x] 2.5 Create `apis/academic_tasks/delete_academic_tasks_id.xs` (`DELETE /academic_tasks/{academic_tasks_id}`) verifying task ownership.

## 3. Schema & Validation

- [x] 3.1 Validate all generated XanoScript files (`.xs`) for syntax compliance and verify task, subject, and user authorization rules.
