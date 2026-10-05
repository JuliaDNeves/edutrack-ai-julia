# Design

## Context

EduTrack AI has a modular static HTML frontend architecture (`pages/subjects.html`, `pages/dashboard.html`) integrated with Xano backend REST APIs via `js/auth.js`.
The backend endpoint canonical for `academic_tasks` is `8PdLH3Ls` (`https://x8ki-letl-twmt.n7.xano.io/api:8PdLH3Ls`), providing full REST CRUD (`GET /academic_tasks`, `POST /academic_tasks`, `PATCH /academic_tasks/{id}`, `DELETE /academic_tasks/{id}`).
The `subjects` endpoint is `asoARar9` (`https://x8ki-letl-twmt.n7.xano.io/api:asoARar9`).

## Goals / Non-Goals

**Goals:**
- Build a standalone frontend page `pages/tasks.html` following `pages/subjects.html` design system, CSS variables (`styles.css`), Font Awesome icons, and responsive layout.
- Use `EduTrackAuth` for authentication checking, user sidebar initialization, and header authorization (`Authorization: Bearer <token>`).
- Implement dynamic loading of user's subjects from `GET /subjects` to populate the Subject `<select>` in the task modal.
- Implement task CRUD operations (list with search, create modal, edit modal, delete modal with confirmation).
- Map task statuses: "pending" -> "Pendente", "completed" -> "Concluída".
- Format estimated time and spent time display in minutes/hours.

**Non-Goals:**
- Creating or modifying backend Xano APIs or table schemas.
- Modifying `pages/subjects.html` or existing dashboard functionality.

## Decisions

1. **Single-file page script structure (matching `pages/subjects.html`)**:
   - Rationale: `pages/subjects.html` encapsulates its UI components, modal state, DOM event listeners, and API calls within an embedded `<script>` block that imports `../js/auth.js`. Following this exact pattern ensures code consistency across EduTrack pages without introducing unnecessary build tool complexity.
   - Alternatives considered: External `js/tasks.js` file. However, matching the established pattern in `subjects.html` maintains exact parity.

2. **API Endpoint Base URL Handling**:
   - Rationale: `EduTrackAuth` in `js/auth.js` provides `XANO_SUBJECTS_URL` and `XANO_BASE_URL`. We can add `XANO_TASKS_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:8PdLH3Ls'` in `js/auth.js` and use it as fallback in `pages/tasks.html`.

3. **Status Field Enum mapping**:
   - Rationale: The Xano API expects `status` values `"pending"` or `"completed"`. The modal `<select>` will display "Pendente" (value: `"pending"`) and "Concluída" (value: `"completed"`).

4. **Time Handling**:
   - Rationale: Xano stores `estimated_time` and `spent_time` in integer minutes. Form inputs will take minutes as positive integers, and cards will display formatted time (e.g. `45 min` or `1h 30min`).

## Risks / Trade-offs

- **[Risk] User has no subjects created yet** → Mitigation: Display a clear notice in the subject dropdown if no subjects exist, prompting the user to register a subject first in `pages/subjects.html`.
