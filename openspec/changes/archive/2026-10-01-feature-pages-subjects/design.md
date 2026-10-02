# Design

## Context

See `proposal.md` for motivation. EduTrack AI uses a vanilla HTML/CSS/JS architecture on the frontend and Xano backend APIs. User authentication is managed via `js/auth.js` (`EduTrackAuth`), which stores standard JWT bearer tokens in `localStorage`.

The backend `subjects` schema and APIs support full metadata:
- `name` (text, required)
- `teacher` (text, optional)
- `hours` (integer, optional)
- `description` (text, optional)
- `start_date` (date, optional)
- `end_date` (date, optional)

This design outlines the user interface structure for `pages/subjects.html` and its integration with Xano REST APIs.

## Goals / Non-Goals

**Goals:**
- Provide a clean, modern, responsive management UI in `pages/subjects.html` matching EduTrack AI visual design.
- Support full CRUD (Create, Read, Update, Delete) against existing Xano APIs (`/subjects`) with all metadata fields.
- Provide modal dialogs for adding/editing subjects (with inputs for name, teacher, hours, description, start_date, end_date) and confirming deletions.
- Handle authentication token verification and automatic login redirection.
- Display clear success/error feedback alerts on user actions.

**Non-Goals:**
- Creating new Xano APIs or altering existing `.xs` backend files.
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
   - Modal form inputs:
     - `name` (text input, required)
     - `teacher` (text input, optional)
     - `hours` (number input, optional)
     - `description` (textarea input, optional)
     - `start_date` (date input `YYYY-MM-DD`, optional)
     - `end_date` (date input `YYYY-MM-DD`, optional)

4. **Deletion Confirmation**
   - Implement a confirmation modal (`#delete-confirm-modal`) before triggering `DELETE /subjects/{id}`.

5. **Client-side Search & Compatibility**
   - Perform real-time filtering on the loaded subjects list in memory using the header search box, avoiding unnecessary backend search API roundtrips while rendering responsive results.

## Risks / Trade-offs

- **[Risk] Date Formatting across Browsers**:
  - *Mitigation*: Use standard HTML5 `<input type="date">` inputs formatted as `YYYY-MM-DD` to align with Xano's `date` type.
