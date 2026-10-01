# auth-reset-password Specification

## Purpose
Defines the backend API and frontend interface requirements for completing password resets using valid reset tokens and updating user credentials.

## Requirements

### Requirement: Password Reset Completion Endpoint
The system SHALL provide a POST `/auth/reset_password` endpoint that accepts a reset token and a new password, validates that the token exists in `password_reset.token`, verifies the token is not expired and not previously used (`used == false`), updates the user's password, and sets `password_reset.used = true`.

#### Scenario: Successful Password Reset
- **WHEN** client submits a POST request to `/auth/reset_password` with a valid active token and new password
- **THEN** system updates the user record password, invalidates the token by setting `password_reset.used = true`, and returns a success response

#### Scenario: Invalid or Expired Token Reset
- **WHEN** client submits a POST request with an invalid, expired, or previously used token
- **THEN** system rejects the request with an error response and leaves the user password unchanged

### Requirement: Reset Password Page Interface
The system SHALL provide a dedicated `pages/auth/reset-password.html` page containing "Nova senha" and "Confirmar senha" fields, validate password matching, extract the reset token from URL parameters without rendering it in visible page text, and execute the reset operation.

#### Scenario: User Submits Valid Reset Form
- **WHEN** user inputs matching passwords on `reset-password.html` with a valid URL token and submits the form
- **THEN** system calls `EduTrackAuth.resetPassword(token, newPassword)`, updates credentials via Xano, displays a success alert, and redirects to `pages/auth/login.html`

#### Scenario: Recovery Navigation with Internal Token
- **WHEN** user completes a recovery request on `pages/auth/forgot-password.html`
- **THEN** system renders a "Continuar para redefinir senha" button linking to `reset-password.html?token=<token>` without rendering the raw token string in visible text
