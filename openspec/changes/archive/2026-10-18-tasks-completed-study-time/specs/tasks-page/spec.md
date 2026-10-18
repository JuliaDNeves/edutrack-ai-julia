# tasks-page Specification

## ADDED Requirements

### Requirement: Display Completed Study Time Metric
The system SHALL calculate and display a "Tempo de estudo realizado" metric directly below the existing "Tempo estimado" display on `pages/tasks.html`. The metric SHALL compute the total sum of `spent_time` strictly from completed tasks (`status === 'completed'`) having a non-null, valid numeric `spent_time`. Pending tasks (`status === 'pending'`) SHALL NOT contribute to the completed study time calculation.

#### Scenario: User views study time metrics with completed and pending tasks
- **WHEN** an authenticated user opens `pages/tasks.html` with academic tasks loaded
- **THEN** the system SHALL display the total estimated time summing `estimated_time` of all tasks, and immediately below it, display "Tempo de estudo realizado" summing `spent_time` only from completed tasks with filled values.

#### Scenario: User toggles task status between pending and completed
- **WHEN** user marks a pending task with a defined `spent_time` as completed, or unchecks a completed task to pending
- **THEN** the system SHALL dynamically recalculate "Tempo de estudo realizado" and update the display in-place.

#### Scenario: Completed task has empty or null spent time
- **WHEN** a completed task has null, empty, or undefined `spent_time`
- **THEN** the system SHALL treat its spent time contribution as zero without producing `NaN` or display errors.
