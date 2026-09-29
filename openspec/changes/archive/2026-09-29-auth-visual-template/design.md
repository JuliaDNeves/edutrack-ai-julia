# Design: Auth Visual Template

## Context
EduTrack AI is a web application with a dark mode visual theme defined in `css/styles.css` and implemented in `dashboard.html`. See `proposal.md` for motivation. This design specifies the front-end architecture and visual layout for the landing presentation and authentication template views on `index.html`.

## Goals / Non-Goals

**Goals:**
- Implement `index.html` as a structured landing page presenting EduTrack AI with call-to-action triggers.
- Provide clean visual views for Login, Sign Up (Cadastro), and Password Recovery (Recuperação de senha).
- Reuse design system tokens (`--bg-main: #090d16`, `--accent-cyan: #53dce3`, `--accent-lilac: #b19bf1`, `--bg-card: #141c2e`, rounded corners, glow effects) from `css/styles.css`.
- Enable seamless client-side view switching in JavaScript without full page reloads.
- Ensure responsive layouts across mobile, tablet, and desktop viewports.

**Non-Goals:**
- No backend implementation (Xano APIs, authentication logic, user table mutations).
- No session handling, token generation, or real form submission handling.
- No changes to `dashboard.html` or existing dashboard metrics/charts.

## Decisions

### Decision 1: View State Architecture on `index.html`
- **Choice**: Use section container views (`#view-landing`, `#view-login`, `#view-register`, `#view-recovery`) in `index.html` controlled via CSS state classes (`.auth-view`, `.auth-view-active`) and JavaScript visual handlers.
- **Rationale**: Provides instant visual transitions between screens, zero page flash, and smooth component presentation without requiring server routing.
- **Alternatives Considered**: Creating multiple independent HTML files (`login.html`, `cadastro.html`, etc.). Dismissed to avoid code duplication across head tags and stylesheet links for simple visual forms.

### Decision 2: Modular CSS Auth Components in `css/styles.css`
- **Choice**: Extend `css/styles.css` with dedicated `.auth-card`, `.auth-input-group`, `.auth-btn-primary`, `.auth-btn-secondary`, and `.auth-link` style definitions utilizing existing CSS variables.
- **Rationale**: Ensures exact visual harmony with the Dashboard cards, typography (`Plus Jakarta Sans`), and glow effects while maintaining a centralized design system.

### Decision 3: Pure Visual Form Interactions
- **Choice**: Forms submit handlers call `e.preventDefault()` and trigger visual transitions or mock feedback states (e.g. returning to login or showing a visual success tip) without network calls.
- **Rationale**: Strictly respects the task boundary of visual template only.

## Risks / Trade-offs

- **[Risk] Form overflow or truncation on landscape mobile devices**: 
  - *Mitigation*: Set dynamic centered flex layout with `min-height: 100vh`, `padding: 24px 16px`, and `overflow-y: auto` on container wrappers so forms remain fully accessible on any viewport height.
