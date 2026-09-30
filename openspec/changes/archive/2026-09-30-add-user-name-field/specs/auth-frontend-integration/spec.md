# auth-frontend-integration Spec Delta

## MODIFIED Requirements

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
