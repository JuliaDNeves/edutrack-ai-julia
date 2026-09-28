# Proposal

## Why

Students need a fast and flexible way to find relevant academic subjects, either by searching for a specific subject name or by filtering subjects that currently have overdue tasks requiring immediate attention. Combining these filter modes into a search endpoint with integrated Python evaluation logic allows for efficient task status processing and enhanced study planning.

## What Changes

- Create a GET `/subjects/search` API endpoint in XanoScript under `apis/subjects/get_subjects_search.xs`.
- Implement query parameter handling for subject name search (`query` parameter) and overdue tasks filter (`has_overdue` flag).
- Integrate Python processing logic to compare task due dates against the current date for status evaluation ("pending" tasks past due date).
- Ensure strict user isolation by filtering all database queries by the authenticated user's ID (`user_id`).

## Capabilities

### Modified Capabilities
- `subjects`: Add search and filter requirement to allow searching subjects by name OR by overdue tasks using integrated Python logic.

## Impact

- **APIs**: New GET `/subjects/search` endpoint in `apis/subjects/` group.
- **Database**: Reads from `subjects` and `academic_tasks` tables.
- **Dependencies**: Uses Python execution/eval logic for overdue task date comparison and filtering.
