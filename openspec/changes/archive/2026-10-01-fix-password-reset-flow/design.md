# Design

## Context

During the inspection of `apis/authentication/4074500_auth_reset_password_POST.xs`, we identified that `db.get user` was executed with `field_name = "password_reset.token"`. In XanoScript, `db.get` only queries primary or top-level indexed column names. To query nested object properties (such as `password_reset.token`), the required XanoScript statement is `db.query user` with `where = $db.user.password_reset.token == $input.token`.

See `proposal.md` for background and problem statement.

## Goals / Non-Goals

**Goals:**
- Replace `db.get user` in `apis/authentication/4074500_auth_reset_password_POST.xs` with `db.query user { where = $db.user.password_reset.token == $input.token return = {type: "single"} } as $user`.
- Ensure `pages/auth/forgot-password.html` receives the token from `POST /auth/request_password_reset` and renders the button "Continuar para redefinir senha" linking to `reset-password.html?token=<token>`.
- Ensure `pages/auth/reset-password.html` extracts `token` from `URLSearchParams` and submits `{ token, new_password }` to `POST /auth/reset_password`.
- Render success notification upon password reset with a button to return to login.
- Properly display error messages for missing, invalid, expired, or used tokens.

**Non-Goals:**
- Creating new backend API endpoints.
- Modifying the existing `password_reset` database table schema.
- Implementing real SMTP email sending in this academic step.
- Altering login, signup, or `auth/me` endpoints.

## Decisions

### Decision 1: XanoScript Query Fix
Update `apis/authentication/4074500_auth_reset_password_POST.xs`:
```xanoscript
    db.query user {
      where = $db.user.password_reset.token == $input.token
      return = {type: "single"}
    } as $user
```
- **Rationale**: `db.query` allows filtering on nested object properties in XanoScript, successfully retrieving the user record by matching `password_reset.token`.

### Decision 2: Private Token Navigation
In `js/app.js` handler for `#form-recovery`:
- Parse response `{ message, token }`.
- Render button `<a href="reset-password.html?token=${encodeURIComponent(result.token)}"...>Continuar para redefinir senha</a>`.
- Do NOT output the raw token string in page headers, body text, or alerts.

### Decision 3: Reset Page Feedback and Navigation
In `js/app.js` handler for `#form-reset-password`:
- Read `token` from URL via `new URLSearchParams(window.location.search).get('token')`.
- Validate matching passwords.
- On success: render success feedback with a button `<a href="login.html"...>Ir para o Login</a>`.

## Risks / Trade-offs

- [Risk] Direct page access without URL token parameter. → [Mitigation] Page scripts check `resetToken` presence on load and display an error alert urging the user to start recovery from `forgot-password.html`.
