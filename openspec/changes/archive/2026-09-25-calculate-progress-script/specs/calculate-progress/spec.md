# calculate-progress Specification

## Purpose
Provides a Python utility script to calculate progress percentage (completed tasks over total tasks) and return the output as formatted JSON.

## ADDED Requirements

### Requirement: Calculate progress percentage
The system SHALL provide a Python script at `scripts/calculate_progress.py` that calculates the completion percentage from total and completed item counts.

#### Scenario: Valid input parameters
- **WHEN** the script is executed with valid completed and total counts
- **THEN** the script calculates the percentage as (completed / total) * 100 and outputs a JSON object containing total, completed, percentage, and status

#### Scenario: Zero total items
- **WHEN** the script is executed with total count equal to zero
- **THEN** the script outputs a JSON object with percentage 0.0 without causing a division by zero error

#### Scenario: Missing or invalid arguments
- **WHEN** the script is executed with missing or non-numeric arguments
- **THEN** the script outputs a JSON object with an error message and appropriate error status
