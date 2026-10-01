# Tasks

## 1. Frontend Interface Update

- [x] 1.1 Add mandatory "Nome" input field to `pages/auth/register.html` form with required attribute and `fa-user` icon, verifying visual consistency with existing form fields.

## 2. Frontend Registration Integration

- [x] 2.1 Update `js/app.js` registration form submit handler to read `#register-name` input value and pass it to `EduTrackAuth.signup()`, verifying that the `name` field is sent in the `POST /auth/signup` API request payload.
