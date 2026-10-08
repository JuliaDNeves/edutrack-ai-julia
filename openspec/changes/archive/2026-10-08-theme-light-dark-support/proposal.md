# Proposal

## Why

EduTrack AI currently operates exclusively with a dark theme background. To improve user accessibility, visual flexibility, and comfort across diverse environmental lighting conditions, EduTrack AI requires dual-theme support (Light Mode and Dark Mode). Light Mode will serve as the default experience for new users while preserving the exact existing Dark Mode aesthetic and functionality without regression.

## What Changes

- **Theme Toggle Control**: Add an accessible interface control to switch between `Modo claro` (Light mode) and `Modo escuro` (Dark mode) without reloading the page or altering navigation.
- **Light Theme Default & Persistence**: Set Light Mode as default when no preference is saved, store chosen preference in `localStorage`, and automatically apply the user's saved theme upon page load across all pages.
- **Preserve Dark Mode**: Retain the current Dark Mode color scheme, card styles, and visual assets without any changes.
- **Light Mode Visual Identity**: Implement a clean, modern, technological, and academic light design system featuring soft cyan, blue, and lilac background radial glows, light translucent card backgrounds, soft borders, subtle shadows, and cyan/lilac accent highlights.
- **Landing Page (`index.html`) Refinement**: Enhance the home page layout with an asymmetrical hero section—left side with platform badge, main title, subtitle, CTA buttons (`Entrar` / `Criar conta`); right side with an abstract academic knowledge visualization core featuring orbiting concept icons (subjects, tasks, deadlines, notes, progress, study time) and cyan/lilac glows; and 3 bottom benefit cards styled for light/dark themes.
- **System-Wide Page Adaptation**: Adapt all app pages (`dashboard.html`, `pages/subjects.html`, `pages/tasks.html`, `pages/auth/login.html`, `pages/auth/register.html`, `pages/auth/forgot-password.html`, `pages/auth/reset-password.html`) using a centralized CSS/theme variable structure without modifying page structures, APIs, or auth workflows.

## Capabilities

### New Capabilities
- `theme-system`: Manages light and dark theme switching, persistence, design tokens, responsive background visual glows, accessible UI toggle controls, and consistent styling across all pages.

### Modified Capabilities
<!-- None -->

## Impact

- **CSS (`css/styles.css`)**: Expanded design tokens using CSS custom properties attached to root/data-theme attributes, supporting seamless light and dark mode styling for containers, cards, text, inputs, buttons, and visual decorations.
- **JavaScript (`js/app.js`)**: Theme manager script handling preference initialization, `localStorage` read/write, document element theme attributes, and theme toggle event handlers.
- **HTML Pages**: Header and sidebar integration of theme toggle controls across `index.html`, `dashboard.html`, `pages/subjects.html`, `pages/tasks.html`, and `pages/auth/*.html`.
