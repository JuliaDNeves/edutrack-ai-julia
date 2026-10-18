# dashboard-frontend Specification

## MODIFIED Requirements

### Requirement: Academic Overview Metrics
The system SHALL render summary metric cards with real data for the authenticated user:
1. "Disciplinas": total number of active subjects retrieved from `GET /subjects`.
2. "Tarefas Pendentes": total number of user tasks with `status === 'pending'`.
3. "Tempo de estudo": total sum of `spent_time` in minutes of `completed` tasks only, considering only filled values and formatted in human-readable hours and minutes (tasks with empty `spent_time` and pending tasks SHALL NOT contribute to this total).

#### Scenario: Render metric cards
- **WHEN** the user views the academic metrics section
- **THEN** the system displays the actual count of enrolled subjects, actual count of pending tasks, and total completed study time ("Tempo de estudo") calculated by summing `spent_time` of completed tasks with filled values and formatted in hours/minutes.

### Requirement: Study Time Vertical Bar Chart
The system SHALL render a vertical bar chart titled "Tempo de Estudo por Disciplina" comparing two data series for each subject belonging to the authenticated user:
1. "Horas estimadas": sum of `estimated_time` in minutes for completed tasks (`status === 'completed'`) of that subject.
2. "Tempo de estudo": sum of `spent_time` when filled, or `estimated_time` when `spent_time` is null, empty, or unassigned, strictly for completed tasks (`status === 'completed'`) of that subject.

Both series SHALL be visually differentiated using distinct colors from the EduTrack identity palette (cyan `#53dce3` and lilac `#b19bf1`), accompanied by an explanatory legend. On hovering over a subject's bar group, the system SHALL display a tooltip presenting both series side by side with clear color identification and formatted times in hours and minutes.

#### Scenario: Render vertical bar chart
- **WHEN** the user views the study time chart section
- **THEN** the system renders a comparative bar chart for each subject belonging to the authenticated user showing "Horas estimadas" and "Tempo de estudo" using cyan and lilac colors, displaying 0h for subjects without completed tasks.

#### Scenario: User views comparative study time chart
- **WHEN** the user views the "Tempo de Estudo por Disciplina" chart section with subjects and completed tasks
- **THEN** the system SHALL display dual comparative vertical bars for each subject showing "Horas estimadas" and "Tempo de estudo", using cyan and lilac colors and an informative legend.

#### Scenario: User hovers over subject bars
- **WHEN** the user hovers over a subject's chart entry
- **THEN** the system SHALL display an interactive tooltip comparing the subject's estimated hours and actual study time with color indicators and formatted time values.

#### Scenario: Completed task without spent time in subject chart
- **WHEN** a completed task for a subject has empty or null `spent_time`
- **THEN** the "Tempo de estudo" series for that subject SHALL fall back to using the task's `estimated_time`.
