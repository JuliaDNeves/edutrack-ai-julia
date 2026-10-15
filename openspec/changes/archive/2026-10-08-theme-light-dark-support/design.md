# Design

## Context

EduTrack AI's visual design relies on CSS custom properties (variables) defined in `css/styles.css`. Currently, these variables encode dark theme colors directly onto `:root` and `body`. To support both Light Mode and Dark Mode without duplicating HTML or breaking current Dark Mode layouts, we will introduce a centralized CSS theme attribute system (`[data-theme="light"]` and `[data-theme="dark"]`) managed by a lightweight theme utility script in JavaScript.

See `proposal.md` for motivation and background context.

## Goals / Non-Goals

**Goals:**
- Centralize all theme definitions using CSS custom properties (variables) on `:root` and `[data-theme="dark"]` / `[data-theme="light"]`.
- Set Light Mode as the default fallback when no preference is saved in `localStorage`.
- Ensure zero regression or aesthetic change for Dark Mode.
- Prevent FOUC (Flash of Unstyled Content) by executing theme detection early in document load.
- Implement accessible theme controls (Light / Dark) in top bars and sidebars across all system pages (`index.html`, `dashboard.html`, `pages/subjects.html`, `pages/tasks.html`, `pages/auth/*.html`).
- Refine `index.html` hero section to present an asymmetrical layout featuring an academic knowledge core with orbiting concept icons.

**Non-Goals:**
- Redesigning backend APIs, database schemas, or Xano functions.
- Modifying authentication logic or page routes.
- Creating separate HTML templates for light vs dark mode.
- Changing font families or Font Awesome icon sets.

## Decisions

### 1. Data-Attribute Theme Switching Architecture
- **Choice**: Use `data-theme="light"` and `data-theme="dark"` on `document.documentElement` (`<html>` element).
- **Rationale**: Attribute selectors on `<html>` allow CSS variables to react instantly across all elements on the page without re-rendering or component recalculations.
- **Alternatives Considered**:
  - Class-based (`.light-mode`): Works well, but `data-theme` offers cleaner semantic scoping and easier future extension (e.g. system theme detection if requested later).
  - Separate stylesheets (`light.css` / `dark.css`): Requires dynamically changing `<link>` tags, causing render delays and theme flashing.

### 2. Light Mode Token Design & Ambient Backgrounds
- **Choice**: Define light theme color variables with subtle cyan (`#53dce3` / `#0ea5e9`), blue (`#3b82f6`), and lilac (`#b19bf1` / `#8b5cf6`) ambient radial gradients on `--bg-main` (`#f4f7fb` to `#eef2f6`). Translucent cards use `rgba(255, 255, 255, 0.85)` with a backdrop blur and soft borders (`rgba(148, 163, 184, 0.2)`).
- **Rationale**: Avoids stark flat white backgrounds and preserves EduTrack AI's high-tech academic identity.
- **Alternatives Considered**:
  - Plain white `#ffffff` background: Rejected per requirements, as it lacks visual depth and brand personality.

### 3. Early Theme Initialization Script (Preventing FOUC)
- **Choice**: Implement `initTheme()` inside `js/app.js` and call it immediately upon script script execution in `<head>` or body start.
- **Logic**:
  ```javascript
  const savedTheme = localStorage.getItem('edutrack_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  ```
- **Rationale**: Ensures the document receives the correct data attribute before rendering DOM elements, avoiding white/black flashes on load.

### 4. Interactive Theme Control Component
- **Choice**: Add an accessible toggle element with `Modo claro` and `Modo escuro` button controls / toggle switch in page navigation bars and sidebars.
- **Rationale**: Direct user access across all pages without hiding settings deep inside user profiles.

### 5. Hero Visual Academic Knowledge Core (`index.html`)
- **Choice**: Update `index.html` hero right-column visual to feature a central glowing brain/knowledge core with dual orbiting rings. The rings display icons for Disciplinas, Tarefas, Prazos, Anotações, Progresso, and Tempo de Estudo with soft cyan and lilac glow effects.
- **Rationale**: Fulfills the academic learning theme requirement while avoiding space/astronomy motifs.

## Risks / Trade-offs

- **[Risk]**: Input fields, dropdowns, or modal backgrounds hardcoded with explicit hex values might remain dark in Light Mode.
  - **Mitigation**: Audit and update all CSS selectors in `css/styles.css` to use CSS variables (`var(--bg-card)`, `var(--text-main)`, `var(--border-color)`).
- **[Risk]**: Flash of unstyled theme during initial page load.
  - **Mitigation**: Place theme initialization logic at the top of script execution to execute prior to DOM render.
