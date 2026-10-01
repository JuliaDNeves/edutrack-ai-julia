# Tasks

## 1. Subjects Page Structure & Layout

- [ ] 1.1 Create `pages/subjects.html` using the EduTrack design system (sidebar navigation, header bar with search box and user profile, page title, and "Nova Disciplina" action button), verifying structure and responsive layout
- [ ] 1.2 Implement subjects list grid container, card layout (displaying name, teacher, and workload hours with action buttons for edit/delete), empty state, create/edit modal dialog, and deletion confirmation modal in `pages/subjects.html`

## 2. Authentication & CRUD API Integration

- [ ] 2.1 Implement authentication guard using `EduTrackAuth` to redirect unauthenticated users to `auth/login.html` and attach `Authorization: Bearer <token>` header to API requests
- [ ] 2.2 Implement GET `/subjects` request on page load to fetch authenticated user's subjects and render the subjects grid
- [ ] 2.3 Implement POST `/subjects` submission in the modal form with validation (name, teacher, hours), success/error feedback alerts, and list refresh
- [ ] 2.4 Implement PATCH `/subjects/{subjects_id}` submission in the edit modal to update existing subject details with feedback alerts and list refresh
- [ ] 2.5 Implement DELETE `/subjects/{subjects_id}` handler triggered after confirmation modal, displaying feedback notifications and updating the UI list
