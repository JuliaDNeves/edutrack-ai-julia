# password-reset-workflow Specification

## Purpose

Defines the complete end-to-end password recovery and reset workflow, including token generation, URL navigation, nested token database lookup, and password updates.

## ADDED Requirements

### Requirement: Nested Reset Token Lookup
The XanoScript `POST /auth/reset_password` endpoint SHALL query user records using `db.query user { where = $db.user.password_reset.token == $input.token return = {type: "single"} }` to properly match nested token values.

#### Scenario: Valid Nested Token Query
- **WHEN** client submits a POST request to `/auth/reset_password` with a valid reset token
- **THEN** system successfully locates the user by `password_reset.token` and processes the password update

### Requirement: End-to-End Recovery Navigation
The system SHALL navigate from `pages/auth/forgot-password.html` to `pages/auth/reset-password.html?token=<token>` upon receiving a generated recovery token without rendering the raw token text in the UI body.

#### Scenario: User Clicks Recovery Continue Link
- **WHEN** user requests password recovery and clicks "Continuar para redefinir senha"
- **THEN** browser opens `reset-password.html?token=<token>` and loads the reset form with the extracted URL token
