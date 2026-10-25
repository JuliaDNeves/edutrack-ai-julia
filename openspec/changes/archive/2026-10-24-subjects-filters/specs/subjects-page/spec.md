# subjects-page Specification

## ADDED Requirements

### Requirement: Subject Filter Toggle Button
The system SHALL provide an interactive toggle button with a filter icon positioned immediately to the left of the search bar on `pages/subjects.html`, allowing authenticated users to show and hide the subject filters panel.

#### Scenario: User toggles the filter panel visibility
- **WHEN** an authenticated user clicks the filter toggle button while the filter panel is hidden
- **THEN** the system SHALL display the filter panel with a smooth visual transition and mark the toggle button as active

#### Scenario: User hides the open filter panel
- **WHEN** user clicks the filter toggle button while the filter panel is visible
- **THEN** the system SHALL hide the filter panel and return the toggle button to its default inactive state

### Requirement: Multi-Criteria Subject Filtering
The system SHALL provide filter controls within the collapsible filter panel on `pages/subjects.html` allowing authenticated users to filter their academic subjects by date range (start date and end date), teacher, and workload hours, combinable with each other and with the existing text search input.

#### Scenario: Default initial state
- **WHEN** an authenticated user opens or refreshes `pages/subjects.html`
- **THEN** the subject filters panel SHALL be hidden by default until explicitly opened by the toggle button

#### Scenario: User filters subjects by academic dates
- **WHEN** user specifies a start date, an end date, or both in the filter panel
- **THEN** the system SHALL display only subjects matching the specified date bounds (start date and/or end date), updating the displayed subject count and total workload hours

#### Scenario: User filters subjects by teacher
- **WHEN** user selects a teacher from the teacher dropdown populated from user's registered subjects
- **THEN** the system SHALL display only subjects matching the selected teacher

#### Scenario: User filters subjects by workload hours
- **WHEN** user inputs a workload hours value in the filter panel
- **THEN** the system SHALL display only subjects matching the specified hours quantity

#### Scenario: User combines multiple subject filters
- **WHEN** user simultaneously defines date constraints, teacher, workload hours, and a text search query
- **THEN** the system SHALL evaluate all criteria conjunctively (AND logic), displaying only subjects that satisfy all conditions

### Requirement: Clear Subject Filters
The system SHALL provide a clear filters control on `pages/subjects.html` that resets all active filter inputs and restores the complete subject list for the authenticated user.

#### Scenario: User clears applied subject filters
- **WHEN** user clicks the "Limpar Filtros" button
- **THEN** the system SHALL reset start date, end date, teacher selector, workload hours, and search inputs to empty defaults, immediately re-rendering all user subjects and updating total statistics

#### Scenario: No subjects match applied filters
- **WHEN** the combination of active filters and search query yields zero matching subjects
- **THEN** the system SHALL display a clear empty state message informing that no subjects match the selected filters, while keeping the filter controls interactive to allow adjustments or reset
