# Tasks

## 1. Backend Xano API Endpoint

- [x] 1.1 Create `apis/authentication/4074500_auth_reset_password_POST.xs` to validate reset token, check expiration/unused status, update user password, mark token as used (`used: true`), and return success response.

## 2. Frontend Interface and Auth Service Integration

- [x] 2.1 Add `resetPassword(token, newPassword)` method to `EduTrackAuth` in `js/auth.js`.
- [x] 2.2 Create `pages/auth/reset-password.html` containing "Nova senha" and "Confirmar senha" fields with "Redefinir senha" submit button.
- [x] 2.3 Update `#form-recovery` success feedback handler in `js/app.js` to render a "Continuar para redefinir senha" button linking to `reset-password.html?token=<token>` without outputting the raw token text.
- [x] 2.4 Add `#form-reset-password` submit handler in `js/app.js` to extract URL token parameter, validate input passwords, call `EduTrackAuth.resetPassword`, and redirect to `login.html` upon success.
