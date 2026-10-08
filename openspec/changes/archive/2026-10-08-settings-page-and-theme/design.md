# Design

## Context

EduTrack AI needs a dedicated Settings page (`pages/settings.html`) to showcase user profile information (read-only) and manage theme appearance (Light Mode / Dark Mode). Consolidated theme management requires adding a `Configurações` item to the sidebar navigation and removing duplicate theme toggle buttons from sidebars and headers.

See `proposal.md` for motivation and project background.

## Goals / Non-Goals

**Goals:**
- Create `pages/settings.html` featuring Perfil and Aparência sections.
- Populate user name, email, and avatar (or initials avatar) using `EduTrackAuth.getMe()`.
- Add `Configurações` (`fa-gear`) to left sidebar navigation across all application pages.
- Consolidate theme controls in Settings (Aparência section) with interactive selection cards and active highlights.
- Remove theme toggle controls from sidebar footers and page headers.
- Ensure 100% theme synchronization across all pages using early inline head scripts and `localStorage`.

**Non-Goals:**
- Implementing profile editing or photo upload forms (backend write support deferred).
- Altering existing authentication mechanisms, Xano endpoints, or user schemas.
- Changing Dark Mode colors or Light Mode branding.

## Decisions

### 1. Settings Page Component Structure
- **Choice**: Use standard `.app-container` and `.main-content` layout with two main settings cards:
  - `.settings-section`: Header title and description.
  - `.profile-card`: Large avatar (image or initial circle), display name, email badge, read-only status label.
  - `.appearance-card`: Grid of theme selection options (`Modo claro` with sun icon, `Modo escuro` with moon icon) featuring active borders and checkmark indicators.

### 2. User Data Integration Strategy
- **Choice**: Execute `EduTrackAuth.getMe()` during `DOMContentLoaded` on `pages/settings.html`.
- **Rationale**: Reuses established auth flow. If user possesses an `avatar` URL, render `<img>`; otherwise render initials using `EduTrackAuth.getInitials()`.

### 3. Navigation Sidebar Update
- **Choice**: Append `<li class="nav-item" id="nav-settings">` with `<i class="fa-solid fa-gear"></i>` to `.nav-menu` in all app pages. Remove `.theme-toggle-container` from `.sidebar-footer`.

### 4. Theme System & Synchronization
- **Choice**: Maintain `document.documentElement.setAttribute('data-theme', theme)` attribute and early head inline script for instant rendering across all pages.
- **Rationale**: Guarantees zero FOUC (Flash of Unstyled Content) and persistent theme application.

## Risks / Trade-offs

- **[Risk]**: User visits settings page without valid auth session.
  - **Mitigation**: `EduTrackAuth.getMe()` catch block redirects to login page automatically.
