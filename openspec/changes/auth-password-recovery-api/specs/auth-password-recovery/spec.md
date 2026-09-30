# auth-password-recovery Specification

## Purpose

Defines the backend API endpoint and frontend integration requirements for requesting user password recovery via email and generating reset tokens.

## ADDED Requirements

### Requirement: Password Recovery Request Endpoint
The system SHALL provide a POST `/auth/request_password_reset` endpoint that accepts a user email, locates the corresponding user record in the `user` table, generates a unique UUID reset token with an expiration timestamp set to 1 hour from creation, stores this object in the user's `password_reset` column, and returns a success response.

#### Scenario: Valid Email Recovery Request
- **WHEN** client submits a POST request to `/auth/request_password_reset` with a registered user email
- **THEN** system generates a UUID token, updates the user's `password_reset` column with `{ token, expiration, used: false }`, and returns a success response containing the token and confirmation message

#### Scenario: Nonexistent Email Recovery Request
- **WHEN** client submits a POST request to `/auth/request_password_reset` with an email that is not registered
- **THEN** system returns a `notfound` error response indicating no user account exists for that email

### Requirement: Frontend Password Recovery Integration
The system SHALL integrate the password recovery form (`pages/auth/forgot-password.html`) with the `EduTrackAuth` service to send recovery requests to `POST /auth/request_password_reset` and present clear success or error feedback to the user.

#### Scenario: User Submits Password Recovery Form
- **WHEN** user enters a registered email into the recovery form and clicks submit
- **THEN** system invokes `EduTrackAuth.requestPasswordReset(email)`, sends the POST request to Xano, and displays a success confirmation message on the interface
