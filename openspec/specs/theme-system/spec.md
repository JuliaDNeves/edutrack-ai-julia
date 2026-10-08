# theme-system Specification

## Purpose
Defines dual-theme capabilities (Light Mode and Dark Mode), visual design identity, theme persistence, and consistent interface rendering across all EduTrack AI pages.

## Requirements

### Requirement: Theme mode selection
The system SHALL provide accessible interface controls allowing users to select between Light Mode (`Modo claro`) and Dark Mode (`Modo escuro`).

#### Scenario: User toggles theme mode
- **WHEN** user selects a theme option in the theme toggle control
- **THEN** system immediately switches the visual theme of the interface

### Requirement: Instant theme transition
The system SHALL apply theme visual changes dynamically without triggering a full page reload or interrupting the user's active session.

#### Scenario: Switching themes dynamically
- **WHEN** user clicks to switch from Light Mode to Dark Mode or vice-versa
- **THEN** system updates root CSS custom properties and DOM theme attributes instantly on the current page

### Requirement: Persistent theme preference
The system SHALL store the user's selected theme preference in local storage (`localStorage`) and automatically restore it across page navigation and new visits.

#### Scenario: User reopens application
- **WHEN** user opens any page of EduTrack AI
- **THEN** system reads the stored preference from local storage and applies the saved theme before visual rendering completes

### Requirement: Light Mode default fallback
The system SHALL apply Light Mode as the default theme when no theme preference is saved in local storage.

#### Scenario: First time user visit
- **WHEN** new user visits EduTrack AI without a stored theme preference
- **THEN** system defaults to and renders Light Mode

### Requirement: Dark Mode preservation
The system SHALL preserve the existing Dark Mode visual design, color palette, translucent card styles, and visual highlights without modifications when Dark Mode is active.

#### Scenario: Dark Mode activated
- **WHEN** Dark Mode is selected or restored
- **THEN** system displays the original dark background (`#090d16`), dark card containers (`#141c2e`), and original dark theme visual tokens

### Requirement: Light Mode visual identity
The system SHALL render Light Mode with a light academic theme featuring soft cyan, blue, and lilac background radial glows, translucent light cards, soft borders, subtle shadows, and cyan/lilac accent highlights.

#### Scenario: Light Mode visual rendering
- **WHEN** Light Mode is active
- **THEN** system displays light background surfaces with ambient soft cyan/lilac glows, light cards with subtle borders, readable dark text, and cyan (`#53dce3`) / lilac (`#b19bf1`) accent highlights

### Requirement: Asymmetrical landing page hero visual
The system SHALL display an asymmetrical hero section on `index.html` with left-aligned branding/CTAs and a right-aligned abstract academic knowledge core visualization featuring orbiting concept icons (subjects, tasks, deadlines, notes, progress, study time) with cyan/lilac glows.

#### Scenario: Viewing landing page in Light Mode
- **WHEN** user views `index.html` in Light Mode
- **THEN** system renders the asymmetrical hero section with left column copy/CTAs and right column academic knowledge core visualization with soft glows and light theme styling

### Requirement: System-wide consistent theme styling
The system SHALL maintain theme consistency across all pages, including Dashboard, Disciplinas, Tarefas, Login, Cadastro, Recuperação de senha, and Redefinição de senha.

#### Scenario: Navigating between pages
- **WHEN** user navigates from one page to another
- **THEN** system maintains the active theme without visual flicker or resetting to another theme
