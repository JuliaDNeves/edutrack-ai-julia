# Design

## Context

The Xano database `user` table (`tables/771204_user.xs`) already contains a `password_reset?` object schema with `token?`, `expiration?`, and `used?` attributes. The frontend contains a password recovery form in `pages/auth/forgot-password.html`, but currently only shows a static visual alert without making a backend request.

See `proposal.md` for background and motivation.

## Goals / Non-Goals

**Goals:**
- Create the XanoScript API query `auth/request_password_reset` (`verb=POST`) in `apis/authentication/auth_request_password_reset_POST.xs`.
- Find user by email in the `user` table and return a clear error if not found.
- Generate a UUID token using `security.create_uuid`.
- Construct and save `{ token, expiration: now + 3600s, used: false }` into the user's `password_reset` column.
- Add `requestPasswordReset(email)` helper function to `EduTrackAuth` in `js/auth.js`.
- Update `#form-recovery` submission logic in `js/app.js` to trigger the backend API call and display success/error alerts.

**Non-Goals:**
- Sending real emails (out of scope per user requirements for academic test environment).
- Implementing token verification or password reset completion endpoints (reserved for future step).
- Modifying `user` table schema, or modifying existing `auth/login`, `auth/signup`, or `auth/me` endpoints.

## Decisions

### Decision 1: XanoScript API Structure
Create `apis/authentication/auth_request_password_reset_POST.xs` matching existing XanoScript patterns in `apis/authentication/`:
- **API Group**: `"Authentication"`
- **Endpoint**: `query "auth/request_password_reset" verb=POST`
- **Input**: `email email? filters=lower|trim`
- **Stack Operations**:
  1. Validate email input presence with `precondition`.
  2. Retrieve user record using `db.get user` by `email`.
  3. Enforce user existence with `precondition ($user != null)` (error_type = `"notfound"`).
  4. Generate token with `security.create_uuid as $token`.
  5. Build `$password_reset` object with `token`, `expiration` (set to `now + 3600`), and `used: false`.
  6. Update user record using `db.edit user` with `{ password_reset: $password_reset }`.
- **Response**: `{ message: "Instruções de recuperação geradas com sucesso.", token: $token }`.

### Decision 2: Frontend Service Integration
Add `requestPasswordReset(email)` to `EduTrackAuth` in `js/auth.js`:
- Sends `POST` request to `${XANO_BASE_URL}/auth/request_password_reset` with `{ email }`.
- Parses response using `parseResponse()`.

### Decision 3: Form Handler Wiring in `js/app.js`
Update `#form-recovery` submit handler in `js/app.js`:
- Intercept submit event with `e.preventDefault()`.
- Call `await EduTrackAuth.requestPasswordReset(emailInput.value.trim())`.
- Display feedback in `#recovery-feedback` container.

## Risks / Trade-offs

- [Risk] Simulated emails will not receive real inbox messages. → [Mitigation] Return token in response payload and display a success message on the frontend for academic demonstration.
