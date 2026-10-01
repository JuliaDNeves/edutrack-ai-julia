# auth-frontend-integration Specification

## Purpose
Defines the frontend integration specifications for connecting EduTrack AI authentication pages with Xano REST APIs, local token storage, and session guard.

## Requirements

### Requirement: Login Endpoint Integration
The system SHALL submit user credentials (email and password) from the login form to the Xano `POST auth/login` API, store the returned `authToken` in `localStorage`, redirect to the Dashboard upon success, and display clear error messages when authentication fails.

#### Scenario: Successful Login
- **WHEN** user submits valid credentials in the login form
- **THEN** system receives the `authToken`, stores it in `localStorage`, and redirects to `pages/dashboard.html`

#### Scenario: Failed Login
- **WHEN** user submits invalid credentials or the API returns an error response
- **THEN** system displays the error message on the login form without navigating away from the page

### Requirement: Signup Endpoint Integration
The system SHALL validate registration form inputs requiring 3 mandatory fields (Nome, Email, and Senha), submit user details including the user's name to the Xano `POST auth/signup` API, store the returned `authToken` in `localStorage`, redirect to the Dashboard on success, and display backend error messages on failure.

#### Scenario: Successful Signup
- **WHEN** user submits valid signup information with non-empty name, valid email, and matching passwords
- **THEN** system sends `name`, `email`, and `password` in the `POST auth/signup` request body, receives the `authToken`, stores it in `localStorage`, and redirects to `pages/dashboard.html`

#### Scenario: Missing Name Validation
- **WHEN** user attempts to submit the signup form without filling the mandatory Name field
- **THEN** system prevents form submission and indicates the field is required

#### Scenario: Password Mismatch Validation
- **WHEN** user submits the signup form with non-matching password and confirm-password fields
- **THEN** system prevents API submission and displays a validation error message to the user

#### Scenario: Duplicate Email Signup Failure
- **WHEN** user submits a signup request with an email that is already registered
- **THEN** system displays the API error response on the signup form

### Requirement: Token Management and Storage
The system SHALL centralize authentication token operations in a reusable JavaScript module, using `localStorage` for cross-page persistence, exposing token helper functions (`getToken`, `setToken`, `removeToken`), and securing token values from direct display in the UI.

#### Scenario: Token Retrieval for API Requests
- **WHEN** frontend executes authenticated HTTP requests to Xano APIs
- **THEN** system attaches the token in the request header as `Authorization: Bearer <authToken>`

#### Scenario: User Logout Action
- **WHEN** user clicks the logout control in the sidebar or menu
- **THEN** system removes the token from `localStorage` and redirects the browser to `pages/auth/login.html`

### Requirement: Auth Me Profile Verification and Navigation Guard
The system SHALL request user profile data from Xano `GET auth/me` using the stored token on protected pages, dynamically update the user interface with profile data (such as name and initials), and redirect unauthenticated users away from protected areas.

#### Scenario: Protected Page Access with Valid Session
- **WHEN** user accesses a protected page with a valid token
- **THEN** system fetches `GET auth/me` and updates profile name and initials on the UI

#### Scenario: Protected Page Access without Valid Token
- **WHEN** user accesses a protected page with no token or an invalid/expired token
- **THEN** system clears any invalid local token and redirects the browser to `pages/auth/login.html`
