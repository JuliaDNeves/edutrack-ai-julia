# insights-ia Specification

## Purpose
Define the requirements for deterministic academic metrics calculation and on-demand AI recommendation generation using authenticated student study data without exposing credentials.

## Requirements

### Requirement: Academic Data Pre-Calculation and Metrics Engine
The system SHALL calculate academic progress indicators and study time comparisons per subject strictly from authenticated user data before dispatching metrics to the AI model.

#### Scenario: Pre-calculate time comparison for completed tasks with recorded spent time
- **WHEN** the metrics engine evaluates study time for a subject
- **THEN** the system SHALL compute the sum of estimated time and the sum of spent time exclusively for tasks with status `completed` that have a valid recorded spent time, and calculate the percentage difference between planned and actual time as `((spent_time - estimated_time) / estimated_time) * 100`

#### Scenario: Exclude tasks without recorded spent time from study time comparison
- **WHEN** a task has `spent_time` null, empty, or unrecorded
- **THEN** the system SHALL exclude that task from the study time comparison sums and percentage difference calculations, while retaining it in task count metrics

#### Scenario: Calculate completion rates and pending task counts per subject
- **WHEN** the metrics engine aggregates task counts for each subject
- **THEN** the system SHALL determine the number of completed tasks, number of pending tasks, and completion percentage `(completed / total) * 100` (or `0.0` when total is zero)

#### Scenario: Enforce strict authenticated user data isolation
- **WHEN** academic data is queried for analysis
- **THEN** the system SHALL filter all subjects and academic tasks strictly where `user_id == $auth.id`, preventing cross-user data leakage

### Requirement: Contextual AI Recommendation Generation
The system SHALL submit pre-calculated metrics to a language model to generate structured, personalized academic recommendations without inventing or hallucinating facts.

#### Scenario: Structured prompt formulation with pre-computed indicators
- **WHEN** sending data to the AI model
- **THEN** the system SHALL construct a contextual prompt containing the calculated metrics (completion rates, task counts, estimated hours, spent hours, and percentage variance per subject) and instruct the model to provide actionable advice

#### Scenario: Generate personalized study recommendations
- **WHEN** the AI model processes the calculated indicators
- **THEN** the system SHALL return contextualized insights highlighting subjects requiring time re-estimation, subjects with high pending workloads, and positive reinforcement for well-paced subjects

#### Scenario: Guard against ungrounded information
- **WHEN** the AI generates feedback
- **THEN** the system SHALL enforce constraints in the system prompt prohibiting the model from fabricating unstated assignments, grades, exam schedules, or external dates

### Requirement: Secure Server-Side AI Integration and Credential Protection
The system SHALL manage AI model integration strictly within server-side components using securely stored environment variables, without exposing API keys or credentials to the client frontend.

#### Scenario: Secure execution with backend API key
- **WHEN** an AI inference call is executed
- **THEN** the request SHALL originate from the server-side environment utilizing a protected API key (such as `GEMINI_API_KEY`) loaded from environment variables or secure vault

#### Scenario: Complete client credential shielding
- **WHEN** the frontend client communicates with the application
- **THEN** the system SHALL NOT transmit, store in `localStorage`, or render in source code any third-party AI provider credentials

### Requirement: On-Demand Insights Endpoint
The system SHALL expose an authenticated API endpoint that executes the calculation engine and invokes the AI integration strictly on demand when explicitly requested.

#### Scenario: Authenticated on-demand request execution
- **WHEN** an authenticated student invokes the insights endpoint
- **THEN** the system SHALL calculate the latest real metrics, request AI recommendations, and return a structured JSON response containing both the computed metrics and the generated recommendations

#### Scenario: Graceful degradation upon AI provider unavailability
- **WHEN** the external AI provider is unreachable or returns an error
- **THEN** the system SHALL return the calculated deterministic metrics accompanied by an informative status indicator without crashing or corrupting user data
