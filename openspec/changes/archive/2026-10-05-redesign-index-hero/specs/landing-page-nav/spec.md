# Spec Delta

## MODIFIED Requirements

### Requirement: Clean top header navigation
The system SHALL display only the EduTrack brand logo and title in a discrete top position on index.html without creating a traditional navbar header container or navigation menu links.

#### Scenario: Viewing top navigation header
- **WHEN** user accesses index.html
- **THEN** system SHALL render EduTrack brand icon and title in a discrete top header position
- **THEN** system SHALL NOT render a navigation bar container or navigation menu links

### Requirement: Hero action buttons layout
The system SHALL display main authentication action buttons in the hero section of index.html with direct links to login and register pages.

#### Scenario: Viewing hero call to action buttons
- **WHEN** user views hero section on index.html
- **THEN** system SHALL render "Entrar" action button pointing to pages/auth/login.html
- **THEN** system SHALL render "Criar conta" action button pointing to pages/auth/register.html

## ADDED Requirements

### Requirement: Asymmetrical hero two column layout
The system SHALL organize the index.html hero section into an asymmetrical two-column layout on desktop viewports, featuring text and actions on the left and an integrated abstract learning visualization on the right.

#### Scenario: Viewing hero on desktop viewport
- **WHEN** user views index.html hero section on desktop viewport
- **THEN** system SHALL render headline, subtitle, badge, and CTA buttons in the left column
- **THEN** system SHALL render an abstract knowledge visualization representing study concepts in the right column

#### Scenario: Viewing hero on mobile viewport
- **WHEN** user views index.html hero section on mobile viewport
- **THEN** system SHALL display centered text content with discrete brand logo at top
- **THEN** system SHALL arrange action buttons vertically
- **THEN** system SHALL position the abstract visual element below the text content
