# Proposal

## Why
EduTrack AI users need a dedicated standalone page (`pages/subjects.html`) to manage academic subjects (disciplinas), including viewing, creating, editing, and deleting subjects linked to their authenticated user account using the existing Xano REST APIs.

## What Changes
- Create `pages/subjects.html` as an independent page following EduTrack AI's design system (dark theme, cyan `#53dce3` / lilac `#a855f7` accents, rounded cards, responsive grid, Font Awesome icons).
- Implement interactive CRUD operations for subjects:
  - View list of user subjects (`GET /subjects`)
  - Create new subject (`POST /subjects`)
  - Edit existing subject (`PATCH /subjects/{subjects_id}`)
  - Delete subject with confirmation modal (`DELETE /subjects/{subjects_id}`)
- Reuse existing authentication mechanisms (`EduTrackAuth` service, `localStorage` bearer token, redirect to login if unauthenticated).
- **Field Availability & Conflict Note**: Inspection of `tables/subjects.xs` and backend APIs (`apis/subjects/*`) confirmed available fields: `name` (Nome), `teacher` (Professor), and `hours` (Carga horária). The fields `Descrição`, `Data de início`, and `Data de fim` requested in the user prompt do not exist in the backend schema or APIs. Per instructions, Xano backend is NOT modified, and only existing fields (`name`, `teacher`, `hours`) are implemented in the UI.

## Capabilities

### New Capabilities
- `subjects-page`: Web interface for managing academic subjects in EduTrack AI.

### Modified Capabilities

## Impact
- New file: `pages/subjects.html`
- External dependencies: Existing Xano REST API endpoints (`GET /subjects`, `POST /subjects`, `PATCH /subjects/{id}`, `DELETE /subjects/{id}`).
- Reused assets: `css/styles.css`, `js/auth.js`, `js/app.js`.
