# Design: EduTrack Dashboard Visual Frontend

## Context

See `proposal.md` for motivation and high-level requirements.
EduTrack is designed as a web application. This change implements the visual frontend layout of the main Dashboard and navigation structure using HTML, CSS, and JavaScript.

## Goals / Non-Goals

**Goals:**
- Build a modular HTML structure featuring a fixed left sidebar, main content dashboard area, and right-side user panel.
- Establish CSS custom properties (variables) for the dark mode theme: background (`#090d16`), cyan (`#53dce3`), and lilac (`#b19bf1`) accents, rounded corners, and subtle glowing shadows.
- Render visual components: Header (greeting, tip message, search bar, notifications), Tasks progress card (completed vs pending with progress bar), summary metric cards, vertical bar chart for study time per subject, and right panel with profile & "Próximas tarefas" list.
- Load Font Awesome icons via CDN for interface elements.

**Non-Goals:**
- No Xano backend integration, API endpoints, or database tables.
- No user authentication, session management, or CRUD workflows.
- No real-time data calculations or backend persistence (uses static dummy data only).

## Decisions

- **Tech Stack Choice**: Plain HTML5, CSS3, and modern JavaScript without framework overhead or Tailwind CSS, adhering strictly to vanilla CSS guidelines.
- **Color & Styling Tokens**: Define `--bg-dark: #090d16`, `--accent-cyan: #53dce3`, `--accent-lilac: #b19bf1` in CSS `:root` with glowing box-shadow rules (`0 4px 15px rgba(83, 220, 227, 0.4)` and `0 0 10px rgba(177, 155, 241, 0.3)`).
- **Bar Chart Visualization**: Implement the vertical bar chart using semantic HTML/CSS containers styled with flexbox/grid layout and percentage heights for dummy subject study hours.
- **Iconography**: Include Font Awesome 6 CDN link for standard menu, search, notification, and metric icons.

## Risks / Trade-offs

- [Risk] Mobile responsive layout wrapping for 3-column layout → Mitigation: Apply CSS media queries to adjust sidebar and collapse right panel on narrow screens.
- [Risk] Static dummy content format → Mitigation: Use clean HTML structure and CSS classes to facilitate future dynamic data binding.
