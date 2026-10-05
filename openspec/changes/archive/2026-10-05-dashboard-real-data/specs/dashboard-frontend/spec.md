# Spec Delta

## MODIFIED Requirements

### Requirement: Tasks Progress Summary Card
The system SHALL calculate and display the authenticated user's real task progress metrics dynamically based on tasks retrieved from `GET /academic_tasks`. The system SHALL compute completion percentage `(completed_tasks / total_tasks) * 100` (rendering 0% if total tasks equals 0), updating the radial progress circle percentage text, progress fill bar width, and counts of completed and pending tasks.

#### Scenario: Render task progress card with neutral text
- **WHEN** the user views the task progress summary card
- **THEN** the system calculates real counts of completed and pending tasks from `GET /academic_tasks`, updates the progress percentage circle and progress fill bar, and renders the exact completed and pending task counts.

### Requirement: Academic Overview Metrics
The system SHALL render summary metric cards with real data for the authenticated user:
1. "Disciplinas": total number of active subjects retrieved from `GET /subjects`.
2. "Tarefas Pendentes": total number of user tasks with `status === 'pending'`.
3. "Tempo Estimado": total sum of `estimated_time` in minutes of `completed` tasks only, formatted in human-readable hours and minutes (pending tasks SHALL NOT be included in this calculation).

#### Scenario: Render metric cards
- **WHEN** the user views the academic metrics section
- **THEN** the system displays the actual count of enrolled subjects, actual count of pending tasks, and total estimated time of completed tasks formatted in hours/minutes.

### Requirement: Study Time Vertical Bar Chart
The system SHALL render a vertical bar chart displaying total completed study time per subject for all subjects retrieved from `GET /subjects`. For each subject, the system SHALL sum `estimated_time` of `completed` tasks associated with that `subject_id`. Subjects with zero completed tasks SHALL display 0h in the chart.

#### Scenario: Render vertical bar chart
- **WHEN** the user views the study time chart section
- **THEN** the system renders a bar for each subject belonging to the authenticated user showing the sum of estimated time for completed tasks, displaying 0h for subjects without completed tasks.

### Requirement: Right Side User Panel and Upcoming Tasks
The system SHALL render a right side panel containing student profile info without streak tags, along with a list of up to 6 upcoming real pending tasks retrieved from `GET /academic_tasks`. Pending tasks SHALL be ordered by `due_date` ascending (earliest due date first), displaying the task title, formatted due date/deadline, and associated subject name.

#### Scenario: Render right panel profile without streak metric
- **WHEN** the user views the right side panel
- **THEN** the system displays student profile details without "5 dias seguidos" or flame streak badges, and renders up to 6 real pending tasks sorted by due date, showing title, due date, and subject tag.
