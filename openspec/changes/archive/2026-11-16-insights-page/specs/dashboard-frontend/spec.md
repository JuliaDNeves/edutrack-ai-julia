# dashboard-frontend Specification

## MODIFIED Requirements

### Requirement: Navigation Bar and Page Structure
The system SHALL provide navigation linking `dashboard.html`, `subjects.html`, `tasks.html`, `insights.html`, and `settings.html`. On desktop viewports, navigation SHALL render as a fixed left sidebar featuring the "Insights" option. On mobile viewports, navigation SHALL render as a fixed bottom navigation bar showing only icons with active item highlighting.

#### Scenario: Desktop sidebar navigation
- **WHEN** the user views the application on desktop screens
- **THEN** the system displays a fixed left sidebar with Dashboard selected and navigation links for `subjects.html`, `tasks.html`, `insights.html`, and `settings.html`

#### Scenario: Mobile bottom navbar navigation
- **WHEN** the user views the application on small/mobile screens
- **THEN** the sidebar transitions into a fixed bottom navigation bar displaying icons only with active state highlight, including the Insights view

## REMOVED Requirements

### Requirement: Intelligent Insights Dashboard Section and On-Demand Trigger
**Reason**: Transferred from the Dashboard to the dedicated `InsightsPage` (`pages/insights.html`) to declutter the dashboard overview and provide a focused analytics workspace.
**Migration**: Access insights via the new "Insights" option in the sidebar menu linking to `pages/insights.html`.

### Requirement: Structured Insights Results Presentation Cards
**Reason**: Transferred to the dedicated `insights-page` capability.
**Migration**: View structured insight cards on `pages/insights.html`.

### Requirement: Visual Loading and Error States
**Reason**: Transferred to the dedicated `insights-page` capability.
**Migration**: Loading and error feedback are handled within `pages/insights.html`.

### Requirement: Engine Origin and Fallback Badge Indicator
**Reason**: Transferred to the dedicated `insights-page` capability.
**Migration**: Origin indicator badge is rendered in the header of `pages/insights.html`.

