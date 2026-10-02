# Proposal

## Why

EduTrack AI currently lacks a dedicated frontend page for managing academic tasks (`pages/tasks.html`), although the backend REST APIs for `academic_tasks` are already implemented in Xano. Users need a complete UI interface matching the design system of `pages/subjects.html` to view, create, edit, and delete their academic tasks with authentication, subject selection, status management, and time tracking.

## What Changes

- Create a new independent page `pages/tasks.html` following the exact visual style, layout structure, sidebar, navigation, and modal design of `pages/subjects.html`.
- Integrate `pages/tasks.html` with existing Xano REST APIs (`GET`, `POST`, `PATCH`, `DELETE` `/academic_tasks`) and `GET /subjects`.
- Implement task form modal supporting fields: Title (text, required), Description (textarea, optional), Due Date (date, optional), Status (select: "pending" | "completed"), Estimated Time (number in minutes, required), Spent Time (number in minutes, optional), and Subject (select populated with authenticated user's subjects).
- Re-use `EduTrackAuth` service (`js/auth.js`) for session validation, token handling (`Authorization: Bearer <token>`), user details in sidebar, and redirection if unauthenticated.
- Implement clear task card grid, empty state, search filtering, delete confirmation modal, and feedback toast banners.

## Capabilities

### New Capabilities
- `tasks-page`: Frontend page for managing academic tasks (`pages/tasks.html`) with CRUD operations, subject association, status filtering, and authentication matching the subjects page design system.

### Modified Capabilities

## Impact

- `pages/tasks.html`: New HTML page created.
- `js/auth.js`: Ensure `XANO_TASKS_URL` constant is available for `Academic Tasks` API base URL (`https://x8ki-letl-twmt.n7.xano.io/api:8PdLH3Ls`).
- Navigation: Users will be able to navigate to `pages/tasks.html` from sidebar.
