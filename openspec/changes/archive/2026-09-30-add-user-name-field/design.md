# Design

## Context

The current registration form in `pages/auth/register.html` captures email and password. The Xano backend table `user` (`tables/771204_user.xs`) already contains a `name` column (`text name filters=trim`), and the signup API endpoint (`apis/authentication/4074494_auth_signup_POST.xs`) already supports `name` in its input schema and database insertion step.

See `proposal.md` for detailed motivation and requirements.

## Goals / Non-Goals

**Goals:**
- Add a mandatory "Nome" input field into the HTML form (`pages/auth/register.html`) following existing visual styling (`auth-input-group`, `input-wrapper`, `input-icon`).
- Update frontend JavaScript (`js/app.js`) to extract the name input and forward it to `EduTrackAuth.signup()`.
- Preserve existing UI aesthetics, responsive layout, token management, and navigation workflow.

**Non-Goals:**
- Modifying the Xano database table structure (since the `name` column already exists).
- Modifying other authentication pages (login, password recovery) or unrelated components.
- Adding unrequested user profile editing or extra fields.

## Decisions

### Decision 1: UI Placement and Input Configuration
Place the "Nome" input block as the first field inside `#form-register`, ahead of E-mail and Password.
- **HTML structure**: `<div class="auth-input-group"><label for="register-name">Nome</label><div class="input-wrapper"><i class="fa-solid fa-user input-icon"></i><input type="text" id="register-name" name="name" placeholder="Seu nome completo" required></div></div>`
- **Icon**: `fa-solid fa-user input-icon` for visual harmony with existing FontAwesome icons.

### Decision 2: JavaScript Data Binding
Update the submit handler in `js/app.js` to read `#register-name`:
- Extract `nameInput.value.trim()`.
- Call `EduTrackAuth.signup(emailInput.value.trim(), passwordInput.value, nameInput.value.trim())`.
- `EduTrackAuth.signup` in `js/auth.js` sends `{ email, password, name }` in the POST payload to `/auth/signup`.

### Decision 3: Backend Schema Compatibility
Inspection verified that `auth/signup` (`apis/authentication/4074494_auth_signup_POST.xs`) already handles `name` in input and database insertion. Therefore, no backend changes or database modifications are required.

## Risks / Trade-offs

- [Risk] Legacy user records without a `name` set. → [Mitigation] Frontend user profile hydration (`js/app.js`) already includes fallback logic (`user.name || user.email.split('@')[0]`) to display fallback names gracefully.
