# Proposal

## Why
EduTrack AI users need a dedicated standalone page (`pages/subjects.html`) to manage academic subjects (disciplinas), including viewing, creating, editing, and deleting subjects linked to their authenticated user account using the existing Xano REST APIs.

## What Changes
- Create `pages/subjects.html` as an independent page following EduTrack AI's design system (dark theme, cyan `#53dce3` / lilac `#a855f7` accents, rounded cards, responsive grid, Font Awesome icons).
- Implement interactive CRUD operations for subjects incorporating all supported fields:
  - Subject Name (`name`)
  - Professor / Teacher (`teacher`)
  - Workload Hours (`hours`)
  - Description (`description`)
  - Start Date (`start_date`)
  - End Date (`end_date`)
- Connect frontend page with Xano REST API endpoints:
  - `GET /subjects` (list subjects with all fields)
  - `POST /subjects` (create subject with all fields)
  - `PATCH /subjects/{subjects_id}` (edit subject with all fields)
  - `DELETE /subjects/{subjects_id}` (delete subject)
  - `subjects_search` (maintain compatibility for search filtering if utilized)
- Reuse existing authentication mechanisms (`EduTrackAuth` service, `localStorage` bearer token, redirect to login if unauthenticated).

## Capabilities

### New Capabilities
- `subjects-page`: Web interface for managing academic subjects in EduTrack AI.

### Modified Capabilities

## Impact
- New file: `pages/subjects.html`
- External dependencies: Existing Xano REST API endpoints (`GET /subjects`, `POST /subjects`, `PATCH /subjects/{id}`, `DELETE /subjects/{id}`).
- Reused assets: `css/styles.css`, `js/auth.js`, `js/app.js`.
