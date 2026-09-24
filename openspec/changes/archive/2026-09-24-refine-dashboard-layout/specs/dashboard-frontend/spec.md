# dashboard-frontend Specification

## Purpose
Refine dashboard visual layout, separate page structure into dedicated HTML files, introduce mobile bottom navigation bar, remove notification icon and streak metrics, and standardize study metric phrasing to neutral non-weekly terms.

## MODIFIED Requirements

### Requirement: Navigation Bar and Page Structure
The system SHALL provide navigation linking `dashboard.html`, `disciplinas.html`, and `tarefas.html`. On desktop viewports, navigation SHALL render as a fixed left sidebar. On mobile viewports, navigation SHALL render as a fixed bottom navigation bar showing only icons with active item highlighting.

#### Scenario: Desktop sidebar navigation
- **WHEN** the user views the application on desktop screens
- **THEN** the system displays a fixed left sidebar with Dashboard selected and links prepared for `disciplinas.html` and `tarefas.html`

#### Scenario: Mobile bottom navbar navigation
- **WHEN** the user views the application on small/mobile screens
- **THEN** the sidebar transitions into a fixed bottom navigation bar displaying icons only with active state highlight and adequate page bottom padding

### Requirement: Header Section with Greeting and Search Bar
The system SHALL render a top header section featuring a user greeting, a study motivation tip, and an expanded visual search bar, without any notification button.

#### Scenario: Display header elements
- **WHEN** the user views the header bar
- **THEN** the system displays the user greeting, motivation subtext, and a widened search bar, while omitting notification icons and badges

### Requirement: Tasks Progress Summary Card
The system SHALL render a task progress summary card using neutral non-temporal text displaying completed vs. pending tasks and a visual progress indicator.

#### Scenario: Render task progress card with neutral text
- **WHEN** the user views the task progress summary card
- **THEN** the system displays neutral progress header phrasing and text ("Você concluiu 14 de 20 tarefas planejadas.") without weekly temporal references

### Requirement: Academic Overview Metrics
The system SHALL render summary cards displaying count of enrolled subjects, pending tasks, and total estimated study time using neutral metric labels.

#### Scenario: Render metric cards
- **WHEN** the user views the academic metrics section
- **THEN** the system displays "Tempo estimado total" instead of weekly study time references

### Requirement: Study Time Vertical Bar Chart
The system SHALL render a vertical bar chart displaying study time per subject with neutral header badge text.

#### Scenario: Render vertical bar chart
- **WHEN** the user views the study time chart section
- **THEN** the system displays study hours per subject with a neutral badge ("Visão por Disciplina") without weekly data references

### Requirement: Right Side User Panel and Upcoming Tasks
The system SHALL render a right side panel containing student profile info without streak tags, along with a list of up to 4 upcoming tasks.

#### Scenario: Render right panel profile without streak metric
- **WHEN** the user views the right side panel
- **THEN** the system displays student profile details without "5 dias seguidos" or flame streak badges

## ADDED Requirements

### Requirement: Visual Account Switcher Action
The system SHALL display a visual account/logout action on desktop profile hover and an adapted mobile profile trigger without requiring authentication backend logic.

#### Scenario: Hover account switcher on desktop sidebar profile
- **WHEN** the user hovers over the profile section in the desktop sidebar
- **THEN** the system displays a visual "Trocar conta" overlay/action button

#### Scenario: Mobile visual account trigger
- **WHEN** the user interacts with the profile element on mobile screens
- **THEN** the system presents the account action cleanly without requiring hover states
