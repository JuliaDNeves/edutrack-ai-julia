# Design - Redesign index.html Hero Layout

## Context

See `proposal.md` for motivation.

The current `index.html` relies on a centered full-width hero layout combined with a top navigation bar header (`.landing-header`). The proposal requires transforming this landing page into a modern, high-tech asymmetric composition with a two-column hero: text & action buttons on the left, and an abstract digital learning visualization on the right.

## Goals / Non-Goals

**Goals:**
- Replace the top header navbar with a discrete top brand positioning bar.
- Structure `index.html` with an asymmetrical 2-column desktop hero layout (`.hero-asymmetric-container`).
- Create an integrated abstract visualization of academic study concepts (glowing nodes, floating study cards, knowledge network lines) for the right column using pure CSS and Font Awesome icons.
- Update hero action buttons to `Entrar` (`pages/auth/login.html`) and `Criar conta` (`pages/auth/register.html`).
- Ensure full mobile responsiveness: centered text, stacked layout, visual element below text, vertical action buttons.
- Retain all existing EduTrack copy, feature highlights, and color tokens (`--accent-cyan`, `--accent-lilac`, `--bg-main`, `--bg-card`).

**Non-Goals:**
- No creation of navigation bars or extra header links.
- No space, planet, or literal spatial visuals.
- No changes to authentication logic, login/register pages, or dashboard.
- No external heavy JavaScript libraries.

## Decisions

### Decision 1: Asymmetrical 2-Column Grid for Hero
The hero container will use a CSS Grid layout with a `1.1fr 0.9fr` column split on desktop (`@media (min-width: 992px)`):
- Left column (`.hero-left-content`): Badge, main title, subtitle, CTA button group.
- Right column (`.hero-right-visual`): Abstract knowledge core graphic with glowing orbital rings and study cards.

*Rationale*: Grid provides precise control over column ratios and negative space while allowing simple stacking for mobile responsive viewports (`grid-template-columns: 1fr`).

### Decision 2: Abstract Academic Knowledge Core (Right Visual)
Instead of a static external image or spatial artwork, the right column visual element will be built as an integrated, animated visual block:
- **Central Core**: A glowing gradient orb (`.knowledge-core`) surrounded by subtle pulsed rings (`.orbit-ring`).
- **Orbiting Cards & Nodes**: Floating glassmorphism cards representing study tasks, subject metrics, and knowledge connections with Font Awesome icons (`fa-book-bookmark`, `fa-sparkles`, `fa-list-check`).
- **Glow Effects**: Radial background glows using HSL cyan (`#53dce3`) and lilac (`#b19bf1`) to match the EduTrack design system.

*Rationale*: A pure CSS/HTML integrated graphic maintains crisp vector rendering at all screen resolutions, adheres to dark theme glows, and avoids off-theme spatial imagery.

### Decision 3: Discrete Top Brand Bar
The top navigation bar (`<header class="landing-header">`) will be removed. In its place, a minimal `.top-brand-bar` will sit at the top of the page with minimal vertical padding, presenting only the EduTrack icon and title without navigation links or header action buttons.

## Risks / Trade-offs

- [Risk] Asymmetrical right graphic causing horizontal scroll or clipping on mobile → **Mitigation**: Use `overflow: hidden` on visual wrapper and adjust scale via CSS transform and stacked flow on mobile (`@media (max-width: 991px)`).
- [Risk] Visual elements distracting from main call to actions → **Mitigation**: Apply subtle background blurs and keep high contrast primary colors for the `Entrar` and `Criar conta` action buttons.
