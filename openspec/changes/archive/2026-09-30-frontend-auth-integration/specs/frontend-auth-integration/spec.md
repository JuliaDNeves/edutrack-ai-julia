# frontend-auth-integration Specification

## Purpose

Defines the frontend authentication integration specifications for EduTrack AI, connecting user login, signup, and profile views with existing Xano REST endpoints.

## ADDED Requirements

### Requirement: Frontend Login Integration
The system SHALL submit user credentials (email and password) from the login view to the Xano `POST auth/login` API, store the returned `authToken` in `localStorage`, redirect to the Dashboard on success, and display backend error messages on failure.

#### Scenario: Successful User Login
- **WHEN** user submits valid credentials in the login form
- **THEN** system receives the `authToken`, stores it in `localStorage`, and navigates to the Dashboard page

#### Scenario: Unsuccessful User Login
- **WHEN** user submits invalid credentials or the API returns an error response
- **THEN** system displays the error message on the login form without navigating away from the page

### Requirement: Frontend Signup Integration
The system SHALL validate registration form inputs, submit email and password details to the Xano `POST auth/signup` API, store the returned `authToken` in `localStorage`, redirect to the Dashboard on success, and display backend error messages on failure.

#### Scenario: Successful User Registration
- **WHEN** user submits valid signup information with matching passwords
- **THEN** system receives the `authToken`, stores it in `localStorage`, and navigates to the Dashboard page

#### Scenario: Registration Password Mismatch
- **WHEN** user submits the signup form with non-matching password confirmation fields
- **THEN** system prevents API submission and displays a validation error message to the user

#### Scenario: Duplicate Email Registration Failure
- **WHEN** user submits a signup request with an email that is already registered
- **THEN** system displays the API error response on the signup form

### Requirement: Local Token Management and Persistence
The system SHALL centralize authentication token operations in a reusable JavaScript module using `localStorage` for cross-page persistence, exposing token helper functions (`getToken`, `setToken`, `removeToken`, `isAuthenticated`), and securing token values from direct UI display.

#### Scenario: Attaching Token to Authenticated Requests
- **WHEN** frontend executes authenticated HTTP requests to Xano APIs
- **THEN** system attaches the token in the request header as `Authorization: Bearer <authToken>`

#### Scenario: Executing User Logout
- **WHEN** user clicks the logout control in the sidebar or menu
- **THEN** system removes the token from `localStorage` and redirects the browser to the login page

### Requirement: Auth Me Profile Verification and Protected Route Guard
The system SHALL request user profile data from Xano `GET auth/me` using the stored token on protected pages, dynamically update user interface elements (name and initials), and redirect unauthenticated users away from protected areas.

#### Scenario: Accessing Protected Page with Valid Token
- **WHEN** user accesses a protected page with a valid token
- **THEN** system fetches `GET auth/me` and updates profile name and initials on the UI

#### Scenario: Accessing Protected Page Without Valid Token
- **WHEN** user accesses a protected page with no token or an invalid token
- **THEN** system clears local token state and redirects the browser to the login page
