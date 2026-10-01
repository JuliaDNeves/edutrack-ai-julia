# Proposal: Auth Visual Template

## Why
EduTrack AI currently lacks an authentication visual interface and landing page. Users need a professional, responsive visual template for entry into the application, supporting landing presentation, login, account creation, and password recovery, styled consistently with the existing Dashboard visual identity.

## What Changes
- Create a visual home/landing page on `index.html` presenting EduTrack with call-to-action buttons for Login and Sign Up.
- Implement Login visual template screen with Email, Password, Login button, Forgot Password link, Create Account link, and Back to Home button.
- Implement Sign Up (Cadastro) visual template screen with Email, Password, Password Confirmation, Create Account button, and Back to Login link.
- Implement Password Recovery (Recuperação de senha) visual template screen with Email, Request Recovery button, visual guidance info, and Back to Login link.
- Maintain full visual identity matching `dashboard.html` (dark mode `#090d16`, cyan `#53dce3`, lilac `#b19bf1`, subtle glow, rounded card containers, Font Awesome icons, matching typography).
- Ensure responsive layout across desktop, tablet, and mobile devices without text overflow or clipping.
- **SCOPE RESTRICTION**: Strictly visual template only. No Xano backend integration, authentication logic, database models, session handling, email dispatch, or real validation will be implemented.

## Capabilities

### New Capabilities
- `auth-visual-template`: Visual template layout, screens, and CSS/JS visual navigation for EduTrack authentication and home landing page.

### Modified Capabilities
*(None)*

## Impact
- `index.html`: Replaced redirect shell with full home presentation page and visual authentication views/modals.
- `css/styles.css`: Added reusable layout styles, card forms, and responsive rules for authentication components while sharing design tokens.
- `js/app.js`: Added client-side visual view toggling between initial view, login, sign up, and password recovery views without backend calls.
- `dashboard.html`: Remains as a separate dashboard page accessible after visual entry.
