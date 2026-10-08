# settings-page Specification

## Purpose
Defines the Settings page (`pages/settings.html`), user profile display, appearance preferences, navigation menu updates, and centralized theme control.

## Requirements

### Requirement: Settings page creation and layout
The system SHALL provide a dedicated Settings page (`pages/settings.html`) adhering to EduTrack AI's visual identity, sidebar structure, and responsive layout.

#### Scenario: User visits settings page
- **WHEN** user navigates to `pages/settings.html`
- **THEN** system renders the Settings layout with Perfil and Aparência sections

### Requirement: Authenticated user profile display
The system SHALL retrieve real authenticated user data (`name`, `email`, and `avatar` photo if present) using `EduTrackAuth.getMe()` and display it in a read-only Perfil section, rendering a default initials avatar when no photo exists.

#### Scenario: Displaying user profile details
- **WHEN** authenticated user opens the Settings page
- **THEN** system fetches user details from `EduTrackAuth.getMe()` and populates the name, email, and avatar in the Perfil section

### Requirement: Appearance theme selection in Settings
The system SHALL provide theme selection controls (`Modo claro` and `Modo escuro`) in the Aparência section of the Settings page and visually highlight the active theme option.

#### Scenario: User selects a theme in Settings
- **WHEN** user clicks `Modo claro` or `Modo escuro` on the Settings page
- **THEN** system immediately applies the selected theme and updates the active highlight indicator

### Requirement: Navigation menu integration
The system SHALL include a `Configurações` item with Font Awesome icon (`fa-gear`) in the left sidebar navigation menu across all application pages (`dashboard.html`, `pages/subjects.html`, `pages/tasks.html`, `pages/settings.html`).

#### Scenario: Navigating via sidebar
- **WHEN** user clicks `Configurações` in the sidebar menu
- **THEN** system navigates to `pages/settings.html` and marks `Configurações` as the active nav item

### Requirement: Consolidated theme control location
The system SHALL restrict theme selection controls to the Settings page (`pages/settings.html`), removing duplicate theme buttons from the sidebar footer and page headers.

#### Scenario: Viewing sidebar and headers
- **WHEN** user views any application page
- **THEN** system displays no theme toggle buttons in the sidebar footer or page header bars

### Requirement: Persistent theme preference and synchronization
The system SHALL store the chosen theme preference in `localStorage` (`edutrack_theme`), default to Light Mode when no preference is saved, and apply the saved theme automatically upon page load across all pages.

#### Scenario: Navigating across system pages
- **WHEN** user navigates between pages or opens a new session
- **THEN** system reads the stored preference from `localStorage` and applies the active theme without visual flicker
