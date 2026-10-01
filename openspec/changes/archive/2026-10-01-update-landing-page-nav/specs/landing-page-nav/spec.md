# landing-page-nav Specification

## Purpose

Define a estrutura simplificada de botões e ações de navegação da página inicial (index.html) do EduTrack.

## ADDED Requirements

### Requirement: Clean top header navigation
The system SHALL display only the application brand in the top navigation header of index.html without action buttons.

#### Scenario: Viewing top navigation header
- **WHEN** user accesses index.html
- **THEN** system SHALL render brand icon and title in top navigation header
- **THEN** system SHALL NOT render "Entrar" or "Criar conta" buttons in top navigation header

### Requirement: Hero action buttons layout
The system SHALL display authentication action buttons in the hero section of index.html and remove deprecated dashboard demo link.

#### Scenario: Viewing hero call to action buttons
- **WHEN** user views hero section on index.html
- **THEN** system SHALL render "Acessar minha conta" button pointing to login page
- **THEN** system SHALL render "Criar conta gratuita" button pointing to register page
- **THEN** system SHALL NOT render "Ver Demo do Dashboard" button
