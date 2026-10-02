# Tasks

## 1. Authentication Helper Update

- [x] 1.1 Update `js/auth.js` to include `XANO_TASKS_URL` endpoint constant (`https://x8ki-letl-twmt.n7.xano.io/api:8PdLH3Ls`) and verify property export.

## 2. Tasks Page UI and Integrations

- [x] 2.1 Create `pages/tasks.html` with identical sidebar navigation, layout header, toast notification container, search input, stats summary bar, cards grid, and empty state container matching `pages/subjects.html`.
- [x] 2.2 Add task modal form in `pages/tasks.html` containing inputs for Title (required), Description, Due Date, Status select ("Pendente"/"Concluída"), Estimated Time in minutes (required), Spent Time in minutes (optional), and Subject select (populated via `GET /subjects`).
- [x] 2.3 Add deletion confirmation modal in `pages/tasks.html` matching the subjects page deletion modal styling.
- [x] 2.4 Implement JavaScript controller in `pages/tasks.html` for checking auth (`EduTrackAuth.isAuthenticated()`), loading user profile in sidebar, fetching subjects list (`GET /subjects`), rendering subjects into the dropdown selector, and handling search input filtering.
- [x] 2.5 Implement task CRUD functions in `pages/tasks.html`: list fetching (`GET /academic_tasks`), creation (`POST /academic_tasks`), update (`PATCH /academic_tasks/{id}`), and deletion (`DELETE /academic_tasks/{id}`) with feedback toast messages and modal state management.
