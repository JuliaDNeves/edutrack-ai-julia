# Proposal

## Why

Following the password recovery request phase, users need a dedicated password reset interface and backend API endpoint to complete the reset workflow. This change introduces the password reset page (`pages/auth/reset-password.html`), connects the recovery flow using the generated token in internal URL query parameters without exposing it as raw text, and creates the `POST /auth/reset_password` Xano API endpoint to validate tokens and update user passwords.

## What Changes

- Create password reset page `pages/auth/reset-password.html` containing input fields for "Nova senha", "Confirmar senha", and a submit button "Redefinir senha".
- Update `pages/auth/forgot-password.html` feedback to present a visual button "Continuar para redefinir senha" upon successful request, navigating to `reset-password.html?token=...` using the token returned from Xano.
- Ensure the reset token remains strictly within URL parameters and is never rendered as raw text on the UI.
- Create new XanoScript API query `auth/reset_password` (`verb=POST`) in `apis/authentication/4074500_auth_reset_password_POST.xs`.
- Validate token in `password_reset` column object (`token` equality, `expiration` timestamp check, `used == false`).
- Update user password and set `password_reset.used = true` upon successful validation.
- Add `resetPassword(token, newPassword)` helper function to `EduTrackAuth` in `js/auth.js`.
- Update `js/app.js` to handle reset form submission and redirect to `login.html` upon success.
- Preserve existing `auth/login`, `auth/signup`, and `auth/me` endpoints.

## Capabilities

### New Capabilities

- `auth-reset-password`: Defines specifications for password reset completion page, token validation, password update API, and post-reset login navigation.

### Modified Capabilities

(None)

## Impact

- `pages/auth/reset-password.html`: New HTML page created.
- `apis/authentication/4074500_auth_reset_password_POST.xs`: New XanoScript endpoint file created.
- `js/auth.js`: Added `resetPassword(token, newPassword)` method.
- `js/app.js`: Updated `#form-recovery` success handler and added `#form-reset-password` submit handler.
- Database: Uses existing `password_reset` object structure in `user` table without database schema modifications.
