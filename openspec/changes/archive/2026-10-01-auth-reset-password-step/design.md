# Design

## Context

The recovery initiation step (`POST /auth/request_password_reset`) returns a reset token saved in the database under `user.password_reset`. To complete the recovery process, a dedicated reset password interface and XanoScript API must validate the token, check token expiration/usage, update the user password, and set the token as used.

See `proposal.md` for motivation and scope.

## Goals / Non-Goals

**Goals:**
- Create `pages/auth/reset-password.html` with fields "Nova senha" and "Confirmar senha" adhering to EduTrack design aesthetics.
- Update `pages/auth/forgot-password.html` to offer a "Continuar para redefinir senha" button linking to `reset-password.html?token=<token>` upon successful recovery request.
- Ensure reset token is handled strictly via URL query parameters and is never rendered as raw text in page content.
- Create `apis/authentication/4074500_auth_reset_password_POST.xs` (`query "auth/reset_password" verb=POST`) in XanoScript.
- Add `resetPassword(token, newPassword)` to `EduTrackAuth` in `js/auth.js`.
- Update `js/app.js` to handle reset form submission and redirect to `login.html` on success.

**Non-Goals:**
- Integrating real email servers or SMTP services.
- Altering existing `user` table database schema.
- Modifying `auth/login`, `auth/signup`, or `auth/me` endpoints.

## Decisions

### Decision 1: XanoScript API `auth/reset_password` (`verb=POST`)
Create `apis/authentication/4074500_auth_reset_password_POST.xs`:
- **Endpoint**: `query "auth/reset_password" verb=POST`
- **Group**: `"Authentication"`
- **Input**: `text token?` and `text new_password?`
- **Stack Operations**:
  1. `precondition ($input.token != null && $input.new_password != null)`
  2. Query user by token: `db.get user { field_name = "password_reset.token" field_value = $input.token } as $user`
  3. Validate user presence: `precondition ($user != null)` (error = "Token de redefinição inválido.")
  4. Check token usage: `precondition ($user.password_reset.used != true)` (error = "Este token de redefinição já foi utilizado.")
  5. Check token expiration: `precondition ($user.password_reset.expiration >= now)` (error = "Este token de redefinição expirou.")
  6. Update user password and mark token used:
     `db.edit user { field_name = "id" field_value = $user.id enforce_hidden_fields = false data = { password: $input.new_password, password_reset: { token: $user.password_reset.token, expiration: $user.password_reset.expiration, used: true } } }`
  7. Return success response `{ message: "Senha redefinida com sucesso!" }`.

### Decision 2: Frontend Token Navigation & Privacy
- In `js/app.js`, upon successful completion of `requestPasswordReset(email)` on `forgot-password.html`:
  - Dynamically render a button inside `#recovery-feedback`:
    `<a href="reset-password.html?token=${encodeURIComponent(result.token)}" class="auth-btn-primary full-width mt-3"><i class="fa-solid fa-key"></i> Continuar para redefinir senha</a>`
  - The token is passed strictly in the URL string (`?token=...`) and never shown as text in HTML headers or body text.

### Decision 3: Reset Password HTML & Interaction
- `pages/auth/reset-password.html`:
  - Form `#form-reset-password` containing `#reset-password` and `#reset-confirm-password`.
  - On load: parse `token` parameter from `window.location.search`. If missing, display warning alert.
  - On submit: validate password length/matching, call `EduTrackAuth.resetPassword(token, newPassword)`, display success message, and redirect to `login.html`.

## Risks / Trade-offs

- [Risk] User accesses `reset-password.html` directly without token in URL. → [Mitigation] Script checks `token` presence on load and displays an error alert guiding the user back to `forgot-password.html`.
