# Proposal

## Why

Currently, submitting a password reset request results in an "invalid reset token" error because the backend XanoScript API query in `apis/authentication/4074500_auth_reset_password_POST.xs` relied on `db.get user` with `field_name = "password_reset.token"` rather than querying the nested JSON object property via `db.query user { where = $db.user.password_reset.token == $input.token }`. Updating the XanoScript query and refining the URL token parameter pass-through between `forgot-password.html` and `reset-password.html` fixes the workflow and guarantees a smooth, secure password reset experience.

## What Changes

- Update `apis/authentication/4074500_auth_reset_password_POST.xs` to use `db.query user { where = $db.user.password_reset.token == $input.token return = {type: "single"} } as $user` for nested object lookup.
- Ensure `pages/auth/forgot-password.html` receives the token from `POST /auth/request_password_reset` and renders the "Continuar para redefinir senha" button linking to `reset-password.html?token=<token>` without rendering raw token text on screen.
- Ensure `pages/auth/reset-password.html` extracts the token parameter from the URL, validates matching passwords, and submits `{ token, new_password }` to `POST /auth/reset_password`.
- Present clear success feedback upon password update with a direct button to return to login.
- Provide proper UI error notifications for invalid, expired, missing, or already-used tokens.

## Capabilities

### New Capabilities

- `password-reset-workflow`: Specs for password reset token navigation, nested token lookup in XanoScript, token validation, and post-reset login navigation.

### Modified Capabilities

(None)

## Impact

- `apis/authentication/4074500_auth_reset_password_POST.xs`: Updated XanoScript query syntax.
- `js/app.js`: Enhanced token handling, URL parsing, and alert styling.
- `pages/auth/reset-password.html`: Updated reset page script bindings and success feedback.
- Database: No database schema modifications required.
