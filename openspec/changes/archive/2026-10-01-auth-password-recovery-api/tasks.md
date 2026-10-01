# Tasks

## 1. Backend Xano API Endpoint

- [x] 1.1 Create `apis/authentication/auth_request_password_reset_POST.xs` to query user by email, generate a UUID token, update the user's `password_reset` field with token, expiration, and used flag, and return a success response.

## 2. Frontend Integration

- [x] 2.1 Add `requestPasswordReset(email)` method to `EduTrackAuth` in `js/auth.js` and connect `#form-recovery` submit handler in `js/app.js` to trigger password recovery requests.
