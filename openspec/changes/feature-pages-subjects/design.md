# Design

## Context

See `proposal.md` for motivation. EduTrack AI uses a vanilla HTML/CSS/JS architecture on the frontend and Xano backend APIs. User authentication is managed via `js/auth.js` (`EduTrackAuth`), which stores standard JWT bearer tokens in `localStorage`.

Inspection of `tables/subjects.xs` and `apis/subjects/` revealed that the backend schema supports:
- `name` (text, required)
- `teacher` (text, optional)
- `hours` (integer, optional)

Fields `Descrição`, `Data de início`, and `Data de fim` requested in the user prompt do not exist in Xano. Following project rules, no Xano schema changes will be made, and UI components will bind exclusively to `name`, `teacher`, and `hours`.

## Goals / Non-Goals

**Goals:**
- Provide a clean, modern, responsive management UI in `pages/subjects.html` matching EduTrack AI visual design.
- Support full CRUD (Create, Read, Update, Delete) against existing Xano APIs (`/subjects`).
- Provide modal dialogs for adding/editing subjects and confirming deletions.
- Handle authentication token verification and automatic login redirection.
- Display clear success/error feedback alerts on actions.

**Non-Goals:**
- Creating new Xano APIs or altering existing `.xs` files.
- Adding database columns for missing prompt fields (`description`, `start_date`, `end_date`).
- Implementing subjects filtering by academic task relationships outside scope.

## Decisions

1. **Page Structure & Layout**
   - Create `pages/subjects.html` sharing the established sidebar, header bar, user quick info, and responsive main grid layout seen in `pages/dashboard.html`.
   - Include `css/styles.css`, Font Awesome CDN, `js/auth.js`, and embedded script or modular handler for subjects page logic.

2. **API Integration via `EduTrackAuth`**
   - Use `EduTrackAuth.getAuthHeaders()` to ensure `Authorization: Bearer <token>` is sent for all API calls.
   - Redirect to `auth/login.html` if `EduTrackAuth.isAuthenticated()` returns `false` or if GET `/subjects` returns 401.

3. **Modal Form & State Management**
   - Create a single reusable modal overlay (`#subject-modal`) for both creation and editing.
   - A hidden input `#subject-id` determines whether submitting the modal performs `POST /subjects` (create) or `PATCH /subjects/{id}` (edit).
   - Modal fields:
     - `name` (text input, required)
     - `teacher` (text input, optional)
     - `hours` (number input, optional)

4. **Deletion Confirmation**
   - Implement a confirmation modal (`#delete-confirm-modal`) before triggering `DELETE /subjects/{id}`.

5. **Client-side Search**
   - Perform real-time filtering on the loaded subjects list in memory using the header search box, avoiding unnecessary backend search API roundtrips while rendering responsive results.

## Risks / Trade-offs

- **[Risk] Missing requested fields (`description`, `start_date`, `end_date`)**:
  - *Mitigation*: The UI will gracefully display the supported fields (`name`, `teacher`, `hours`). The field conflict is documented in planning artifacts and communicated to the user.
