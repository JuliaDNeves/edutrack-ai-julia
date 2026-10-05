# Proposal - Redesign index.html Hero Layout

## Why

The current `index.html` uses a standard navigation header and vertical hero structure that does not fully convey a modern, sophisticated digital product aesthetic. Redesigning `index.html` with an asymmetrical two-column layout and discrete brand positioning will provide an impactful tech landing page experience while preserving EduTrack AI's visual identity and existing messaging.

## What Changes

- **Navigation Header Removal**: Remove the full top navbar structure while preserving a discrete EduTrack brand logo placed appropriately at the top.
- **Asymmetrical Two-Column Hero**: Restructure the hero area into a two-column desktop layout:
  - **Left Column**: Main EduTrack headline, value proposition subtitle, badge, and streamlined call-to-action buttons.
  - **Right Column**: Integrated abstract visual element representing learning/study concepts (such as glowing knowledge nodes, orbiting study cards, or digital notebook connections).
- **Streamlined Action Buttons**: Update CTA button labels and links in the hero to:
  - `Entrar` pointing to `pages/auth/login.html`
  - `Criar conta` pointing to `pages/auth/register.html`
- **Responsive Layout**: Maintain 2-column structure on desktop and adapt smoothly on mobile (centered content, visual below text, stacked buttons, logo at top).
- **Preserved Identity & Copy**: Keep the exact text content, color palette (cyan/lilac dark theme), and CSS design system.

## Capabilities

### Modified Capabilities

- `landing-page-nav`: Update navigation header and hero layout requirements to support the asymmetrical 2-column hero structure and discrete brand positioning.

## Impact

- `index.html`: Update HTML structure to remove header navbar, organize hero into left text and right visual sections, and update CTA buttons.
- `css/styles.css`: Add styles for asymmetrical hero, abstract visual element, negative space spacing, and responsive layout rules.
