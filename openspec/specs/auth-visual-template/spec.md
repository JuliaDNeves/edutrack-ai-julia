# auth-visual-template Specification

## Purpose
Defines the visual user interface template, visual layout, and client-side view switching for EduTrack AI authentication pages and initial landing screen.

## Requirements

### Requirement: Landing Page Visual Presentation
The system SHALL render an initial landing presentation on `index.html` introducing EduTrack AI with call-to-action buttons for Login and Sign Up.

#### Scenario: User visits landing page
- **WHEN** user visits `index.html`
- **THEN** system displays the EduTrack AI landing presentation banner and visible navigation buttons for Login and Criar Conta

### Requirement: Login Visual Form Screen
The system SHALL render a Login visual form view displaying Email, Password, submit button (Entrar), Forgot Password link, Create Account link, and Back to Home button.

#### Scenario: User views login visual screen
- **WHEN** user accesses the login view
- **THEN** system displays input fields for email and password, an Entrar button, links for password recovery and account creation, and a button to return to home

### Requirement: Sign Up Visual Form Screen
The system SHALL render a Sign Up (Cadastro) visual form view displaying Email, Password, Password Confirmation, Create Account submit button, and Back to Login link.

#### Scenario: User views sign up visual screen
- **WHEN** user accesses the registration view
- **THEN** system displays input fields for email, password, and password confirmation, a Criar Conta button, and a link to return to login

### Requirement: Password Recovery Visual Form Screen
The system SHALL render a Password Recovery visual form view displaying Email input, Request Recovery submit button, visual orientation guidance, and Back to Login link.

#### Scenario: User views password recovery visual screen
- **WHEN** user accesses the password recovery view
- **THEN** system displays email input field, a Solicitar recuperação button, visual orientation text, and a link to return to login

### Requirement: Dashboard Visual Identity and Responsiveness
The system SHALL style all authentication views using dark mode `#090d16`, cyan `#53dce3`, lilac `#b19bf1`, subtle glow highlights, rounded card containers, Font Awesome iconography, matching typography, and responsive layouts across desktop, tablet, and mobile without overflow.

#### Scenario: User views visual authentication views across device sizes
- **WHEN** user views authentication views on mobile, tablet, or desktop viewports
- **THEN** system applies dark mode styling with cyan/lilac glow accents and formats form cards cleanly without scrollbar clipping or text overflow
