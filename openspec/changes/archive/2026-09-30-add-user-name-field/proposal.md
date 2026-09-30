# Proposal

## Why

Currently, the EduTrack AI signup form only requests email and password, omitting the user's name during registration. Adding a mandatory "Nome" field ensures that new user accounts capture the user's identity upfront, saving it directly to the `name` column in the Xano `user` table and establishing a personalized user experience immediately upon registration.

## What Changes

- Add a mandatory "Nome" (Name) input field to the user registration form (`pages/auth/register.html`).
- Validate that the "Nome" field is non-empty prior to form submission.
- Update frontend registration handler (`js/app.js`) to capture the name input value and pass it to `EduTrackAuth.signup()`.
- Include the `name` property in the request payload sent to the Xano `POST /auth/signup` endpoint.
- Preserve all existing visual styles, HTML structure patterns, and authentication workflow steps.

## Capabilities

### Modified Capabilities

- `auth-frontend-integration`: Update signup requirement to mandate the "Nome" field in form inputs and API payload.

## Impact

- `pages/auth/register.html`: HTML form updated with the mandatory Name input group.
- `js/app.js`: Registration form submission logic updated to read and forward the Name field.
- Backend/Xano: Utilizes existing `name` field in `user` table and `auth/signup` endpoint; no backend database or schema alterations required.
