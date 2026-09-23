# dashboard-frontend Specification

## Purpose
Define front-end user interface structure, navigation, overview metrics, and study tracking visual components for the EduTrack web application.

## Requirements

### Requirement: Fixed Left Sidebar Navigation
The system SHALL render a fixed left sidebar menu containing navigation links for Dashboard, Disciplinas, and Tarefas, with Dashboard visually set as active.

#### Scenario: Display sidebar navigation
- **WHEN** the user opens the application
- **THEN** the system displays a fixed left sidebar with Dashboard selected and visually highlighted

### Requirement: Header Section with Greeting and Search
The system SHALL render a top header section featuring a user greeting, a study organization motivation text, a visual search bar, and a notification icon.

#### Scenario: Display header elements
- **WHEN** the user views the header
- **THEN** the system displays the student greeting, study tip text, visual search bar, and notification badge icon

### Requirement: Tasks Progress Summary Card
The system SHALL render a summary card displaying completed tasks and pending tasks, along with a visual progress bar indicator.

#### Scenario: Render task progress card
- **WHEN** the user views the task progress card
- **THEN** the system shows total completed tasks, pending tasks, and visual progress percentage bar

### Requirement: Academic Overview Metrics
The system SHALL render metric cards displaying summarized information for total subjects, pending assignments, and total estimated study time.

#### Scenario: Render metric cards
- **WHEN** the user views the summary metrics section
- **THEN** the system displays cards for enrolled subjects count, pending tasks count, and total study hours

### Requirement: Study Time Vertical Bar Chart
The system SHALL render a vertical bar chart displaying study time broken down per subject using static dummy data.

#### Scenario: Render vertical bar chart
- **WHEN** the user views the study time chart section
- **THEN** the system displays vertical bars representing study hours for each subject

### Requirement: Right Side User Panel and Upcoming Tasks
The system SHALL render a right side panel containing basic student profile information and a "Próximas tarefas" list showing up to 4 tasks with deadline dates.

#### Scenario: Render right panel and upcoming tasks
- **WHEN** the user views the right side panel
- **THEN** the system displays student info and a list of up to 4 upcoming tasks ordered by nearest deadline

### Requirement: Dark Mode Theme and Iconography
The system SHALL apply dark mode styling with background near `#090d16`, cyan (`#53dce3`) and lilac (`#b19bf1`) accents, rounded card containers, subtle shadow glows, and Font Awesome iconography.

#### Scenario: Apply visual design tokens
- **WHEN** interface components render
- **THEN** the system uses dark mode colors, cyan/lilac accent highlights, rounded cards, and Font Awesome icons
