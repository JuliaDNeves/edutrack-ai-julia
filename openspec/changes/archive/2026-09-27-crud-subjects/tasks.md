# Tasks

## 1. Subjects CRUD API Endpoints

- [x] 1.1 Create `apis/subjects/api_group.xs` declaring the `/subjects` API group
- [x] 1.2 Create POST `/subjects` endpoint file (`apis/subjects/post_subjects.xs`) requiring authentication and automatically binding `user_id` to `auth.id`
- [x] 1.3 Create GET `/subjects` endpoint file (`apis/subjects/get_subjects.xs`) requiring authentication and filtering query results by `user_id = auth.id`
- [x] 1.4 Create PATCH `/subjects/{id}` endpoint file (`apis/subjects/patch_subjects_id.xs`) requiring authentication and enforcing `id` and `user_id = auth.id` validation before updating
- [x] 1.5 Create DELETE `/subjects/{id}` endpoint file (`apis/subjects/delete_subjects_id.xs`) requiring authentication and enforcing `id` and `user_id = auth.id` validation before deleting
