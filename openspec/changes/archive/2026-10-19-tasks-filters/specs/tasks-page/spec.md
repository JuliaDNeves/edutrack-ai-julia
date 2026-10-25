# tasks-page Specification

## ADDED Requirements

### Requirement: Multi-Criteria Task Filtering
The system SHALL provide interactive filter controls on `pages/tasks.html` allowing authenticated users to filter their academic tasks by due date period (start date and end date), status ("Pendente", "Concluída", or all), and registered subject, combinable with each other and with the existing text search filter.

#### Scenario: User filters tasks by due date period
- **WHEN** an authenticated user selects a start date, an end date, or both in the date range filter inputs
- **THEN** the system SHALL display only tasks whose scheduled date (`due_date`) falls within the specified date interval (inclusive), updating task counters and time totals dynamically.

#### Scenario: User filters tasks by status
- **WHEN** user selects a specific status ("Pendente" or "Concluída") from the status filter control
- **THEN** the system SHALL display only tasks matching the selected status ("pending" or "completed") and update the displayed task counts accordingly.

#### Scenario: User filters tasks by registered subject
- **WHEN** user selects an active subject from the subject filter dropdown populated from their registered subjects
- **THEN** the system SHALL display only tasks whose `subject_id` matches the selected subject ID.

#### Scenario: User combines multiple filter criteria
- **WHEN** user simultaneously selects a date range, a status, a subject, and enters a text search query
- **THEN** the system SHALL filter task records conjunctively (AND logic), displaying only tasks that satisfy all active filter criteria simultaneously.

### Requirement: Clear Task Filters
The system SHALL provide an accessible clear filters control on `pages/tasks.html` that resets all active filter inputs and restores the full task list for the authenticated user.

#### Scenario: User resets all applied filters
- **WHEN** user triggers the "Limpar Filtros" button
- **THEN** the system SHALL reset the start date, end date, status selector (to "Todos"), subject selector (to "Todas"), and search input (to empty), immediately re-rendering all tasks of the authenticated user and updating the metric totals.

#### Scenario: No tasks match the applied filters
- **WHEN** the combination of applied filters and search query yields zero matching task records
- **THEN** the system SHALL display a clear empty state message informing that no tasks match the selected filters, while keeping filter controls fully interactive to allow adjustments or reset.
