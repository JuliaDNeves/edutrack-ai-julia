# dashboard-frontend Specification Delta

## MODIFIED Requirements

### Requirement: Header Section with Greeting and Search Bar
The system SHALL render a top header section featuring a user greeting and a study motivation tip, omitting the visual search bar and notification buttons.

#### Scenario: Display header elements
- **WHEN** the user views the header bar
- **THEN** the system SHALL display the user greeting and motivation subtext, while omitting the search bar, notification icons, and badges

### Requirement: Right Side User Panel and Upcoming Tasks
The system SHALL render a right side panel containing student profile info, followed immediately by the "Relatório PDF" action button, and positioned above the list of up to 6 upcoming real pending tasks retrieved from `GET /academic_tasks`. Pending tasks SHALL be ordered by `due_date` ascending (earliest due date first), displaying the task title, formatted due date/deadline, and associated subject name.

#### Scenario: Render right panel profile without streak metric
- **WHEN** the user views the right side panel
- **THEN** the system SHALL display student profile details without "5 dias seguidos" or flame streak badges, display the "Relatório PDF" action button positioned directly below the profile card and above the upcoming tasks list, and render up to 6 real pending tasks sorted by due date, showing title, due date, and subject tag

