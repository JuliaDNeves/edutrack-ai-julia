# Proposal

## Why

EduTrack AI currently lacks a backend API endpoint to handle user password recovery requests. Implementing a password recovery initiation API (`POST /auth/request_password_reset`) leverages the existing `password_reset` structure within the Xano `user` table to generate and persist a time-bound reset token, establishing the groundwork for future password resets while keeping the authentication flow secure and standardized.

## What Changes

- Create a new XanoScript API query `auth/request_password_reset` (`verb=POST`) in `apis/authentication/auth_request_password_reset_POST.xs`.
- Query user record by email in the `user` table.
- Generate a UUID token (`security.create_uuid`) and persist `{ token, expiration, used: false }` inside the user's `password_reset` column object.
- Add `requestPasswordReset(email)` helper function to `EduTrackAuth` service in `js/auth.js`.
- Connect the recovery form submit handler in `js/app.js` to call the new recovery API and display appropriate feedback on `pages/auth/forgot-password.html`.
- Preserve existing `auth/login`, `auth/signup`, `auth/me` APIs, and existing database table structures.

## Capabilities

### New Capabilities

- `auth-password-recovery`: Defines specifications for requesting password recovery via email, generating/storing reset tokens in Xano, and integrating frontend recovery submission.

### Modified Capabilities

(None)

## Impact

- `apis/authentication/auth_request_password_reset_POST.xs`: New XanoScript endpoint file in the Authentication API group.
- `js/auth.js`: New `requestPasswordReset(email)` method in `EduTrackAuth`.
- `js/app.js`: Updated submission handler for `#form-recovery`.
- Database: Uses pre-existing `password_reset` object schema in Xano `user` table without modifying database schema.
