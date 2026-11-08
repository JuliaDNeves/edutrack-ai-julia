# geracao-relatorio-pdf Specification

## Purpose
Define the functional and interface requirements for generating, exporting, and downloading a consolidated academic PDF report with EduTrack AI visual identity for authenticated students.

## Requirements

### Requirement: Generate comprehensive academic report PDF
The system SHALL generate a structured academic report in PDF format containing authenticated student information, general progress summary, detailed subjects breakdown, task listings, and comparative study time metrics.

#### Scenario: Report student header section
- **WHEN** the academic PDF report is generated
- **THEN** the document header SHALL display the authenticated student's full name, registered email address, and formatted date and time of report generation

#### Scenario: General overview metrics summary
- **WHEN** the summary section is rendered in the PDF
- **THEN** the system SHALL display total enrolled subjects, total academic tasks, count of pending tasks, count of completed tasks, and calculated task completion percentage

#### Scenario: Subjects detailed section
- **WHEN** the subjects section is rendered in the PDF
- **THEN** the system SHALL list each subject belonging to the user displaying name, teacher name, workload hours, start date, end date, description, and the progress of associated tasks (completed vs total tasks)

#### Scenario: Academic tasks detailed section
- **WHEN** the tasks section is rendered in the PDF
- **THEN** the system SHALL list all user tasks displaying title, associated subject name, status (pending/completed), due date, estimated time (in minutes/hours), spent time (in minutes/hours), and description

#### Scenario: Study time comparison per subject
- **WHEN** the study time comparison section is rendered in the PDF
- **THEN** the system SHALL compute and display the comparison between total estimated time and actual study time per subject exclusively for completed tasks (`status === 'completed'`), adhering to the established EduTrack business rules

#### Scenario: Clean handling of empty and optional fields
- **WHEN** optional subject or task attributes (such as teacher, description, dates, or spent_time) are null, empty, or unassigned
- **THEN** the system SHALL render neutral placeholder indicators (such as "-" or "Não informado") without fabricating or omitting required structural columns

### Requirement: Apply EduTrack visual identity to the PDF report
The system SHALL style the academic report PDF using EduTrack AI design tokens, featuring brand typography, primary palette accents (cyan `#0284c7` / `#53dce3` and lilac `#7c3aed` / `#b19bf1`), clear visual hierarchy, structured data tables, and professional layout formatting.

#### Scenario: Consistent color palette and layout
- **WHEN** the PDF is styled via ReportLab
- **THEN** section headers, progress indicators, table headers, and accent bars SHALL utilize EduTrack cyan and lilac brand colors with clean contrast and consistent margins

#### Scenario: Multi-page flow and table wrapping
- **WHEN** user data spans multiple pages
- **THEN** the document SHALL paginate cleanly with repeating table headers, page numbering, and header/footer metadata on each page

### Requirement: Backend report generation endpoint with strict user isolation
The system SHALL expose an authenticated backend endpoint in Xano that validates the user's authentication token, queries only records where `user_id == $auth.id`, enforces subject-user ownership constraints, and integrates with the Python ReportLab generation service.

#### Scenario: Authenticated request processing
- **WHEN** a valid authenticated request is received with Bearer token
- **THEN** the backend SHALL retrieve only subjects and tasks belonging to `$auth.id` and invoke the report generation process

#### Scenario: Unauthorized request rejection
- **WHEN** a request is submitted without authentication or with an invalid token
- **THEN** the backend SHALL return an HTTP 401 Unauthorized response without executing report generation

### Requirement: Dashboard export button and client-side download flow
The system SHALL provide an action button on the Dashboard interface (`pages/dashboard.html`) allowing the student to trigger report generation and download the resulting PDF document directly to their device.

#### Scenario: Student clicks export button on Dashboard
- **WHEN** the student clicks the "Exportar Relatório PDF" button on the Dashboard
- **THEN** the system SHALL display a visual loading state, request the report from the backend with the user's auth token, and trigger browser download of the PDF file named with the student reference and generation date

#### Scenario: Error handling during report download
- **WHEN** report generation fails due to network or backend errors
- **THEN** the system SHALL restore the button to its normal state and display an informative error notification without breaking dashboard navigation
