# multi-page-auth-structure Specification

## Purpose
Defines the multi-page file architecture, independent URL routing, and local server setup for EduTrack AI authentication views and dashboard.

## ADDED Requirements

### Requirement: Standalone HTML Page File Structure
The system SHALL structure each view as an independent HTML file located at `index.html` (Landing), `pages/auth/login.html` (Login), `pages/auth/register.html` (Cadastro), `pages/auth/forgot-password.html` (Recuperação de senha), and `pages/dashboard.html` (Dashboard).

#### Scenario: User navigates file structure
- **WHEN** user opens any page URL
- **THEN** system loads the standalone HTML document for that page without relying on single-page CSS display toggles

### Requirement: Cross-Page Navigation Routing
The system SHALL provide native relative HTML links (`href`) connecting all pages according to the navigation matrix: Landing → Login/Cadastro, Login → Cadastro/Forgot-Password/Landing/Dashboard, Cadastro → Login/Landing, Forgot-Password → Login/Landing, and Dashboard → Landing/Login.

#### Scenario: User clicks navigation link
- **WHEN** user clicks a navigation link or action button on any page
- **THEN** system navigates the browser directly to the corresponding standalone page URL

### Requirement: Visual Identity Consistency Across Pages
The system SHALL apply dark mode `#090d16`, cyan `#53dce3`, lilac `#b19bf1`, rounded cards, subtle glows, Font Awesome icons, and responsive layouts across all standalone HTML pages.

#### Scenario: User views standalone pages
- **WHEN** user renders any page
- **THEN** system uses matching styling tokens and responsive rules from shared `css/styles.css`

### Requirement: Local Server Environment
The system SHALL support local HTTP development server execution allowing full cross-page link testing via localhost.

#### Scenario: Developer launches local server
- **WHEN** local server command is executed
- **THEN** system serves the application root over HTTP on a local port
