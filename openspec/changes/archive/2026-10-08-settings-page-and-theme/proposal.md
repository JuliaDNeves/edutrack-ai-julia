# Proposal

## Why

EduTrack AI requires a dedicated Settings page (`pages/settings.html`) to display authenticated user profile information (name, avatar, email) and centralize theme appearance controls (Light Mode and Dark Mode). Relocating theme switching exclusively to the Settings page simplifies the sidebar navigation, removes redundant buttons across page headers, and ensures robust, unified theme synchronization across the entire system.

## What Changes

- **Create Settings Page (`pages/settings.html`)**:
  - **Perfil Section**: Read-only display of authenticated user profile data (name, email, and avatar photo or default initials avatar) fetched via `EduTrackAuth.getMe()`.
  - **Aparência Section**: Theme selection buttons (`Modo claro` and `Modo escuro`) with a distinct visual highlight on the active theme.
- **Navigation Update**:
  - Add `Configurações` to the left sidebar menu (`fa-gear` icon) in `dashboard.html`, `pages/subjects.html`, `pages/tasks.html`, and `pages/settings.html`.
  - Remove theme switcher buttons from the sidebar footer and header bars across all system pages, keeping theme toggling consolidated within Settings.
- **Theme Synchronization & Persistence**:
  - Ensure theme selection applies instantly across all system pages (`index.html`, `pages/auth/*.html`, `dashboard.html`, `pages/subjects.html`, `pages/tasks.html`, `pages/settings.html`).
  - Persist theme selection in `localStorage` (`edutrack_theme`), defaulting to Light Mode for new sessions or users without saved preferences.
- **Visual Preservation**:
  - Preserve the existing Dark Mode design system without color or style modifications.
  - Retain EduTrack AI's cyan/lilac branding identity in Light Mode.

## Capabilities

### New Capabilities
- `settings-page`: Covers the dedicated Settings page interface, user profile display, appearance preferences, navigation menu integration, and centralized theme synchronization.

### Modified Capabilities
<!-- None -->

## Impact

- **Frontend Pages**: New `pages/settings.html` page; navigation menu updates in `dashboard.html`, `pages/subjects.html`, `pages/tasks.html`, and `pages/settings.html`.
- **CSS (`css/styles.css`)**: Layout and card styling for settings sections (Profile card, Appearance cards, theme selection cards, active state highlights).
- **JavaScript (`js/app.js`)**: Settings page logic fetching user profile details (`EduTrackAuth.getMe()`), theme selection handlers, and early head theme application.
