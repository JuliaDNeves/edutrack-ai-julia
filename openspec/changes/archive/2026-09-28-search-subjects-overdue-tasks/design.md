# Design

## Context

See `proposal.md` for motivation. The application currently has basic CRUD operations for subjects (`apis/subjects/`) and academic tasks (`tables/academic_tasks.xs`). We need a search endpoint `GET /subjects/search` that allows users to search subjects by name OR filter subjects containing overdue tasks evaluated via Python logic.

## Goals / Non-Goals

**Goals:**
- Provide a single `GET /subjects/search` endpoint supporting `query` (text) and `has_overdue` (boolean) input parameters.
- Evaluate overdue tasks using Python logic (comparing task `due_date` against the current execution timestamp for tasks with status `pending`).
- Enforce strict tenant isolation by matching `user_id == $auth.id`.

**Non-Goals:**
- Modifying database schemas (tables `subjects` and `academic_tasks` remain unchanged).
- Creating unrequested CRUD endpoints or auxiliary APIs.

## Decisions

### 1. API Endpoint Definition in XanoScript (`apis/subjects/get_subjects_search.xs`)
- **Choice**: Implement `query subjects_search verb=GET` under `api_group = "Subjects"` with `auth = "user"`.
- **Inputs**:
  - `query?` (text): Search term for subject name.
  - `has_overdue?` (boolean, default false): Flag to filter by overdue tasks.
- **Rationale**: Keeps subject search organized under the existing `Subjects` API group while maintaining clear separation from standard list (`GET /subjects`).

### 2. Python Logic Integration for Overdue Tasks Evaluation
- **Choice**: Retrieve academic tasks for `$auth.id` and pass task metadata into Python code/expression block to compute the list of `subject_id`s that have overdue tasks (`due_date < now` and `status == "pending"`).
- **Alternatives Considered**: Direct SQL/Xano query filtering.
- **Rationale**: Python integration satisfies the project requirement for Python-driven business logic evaluation and provides flexibility for complex status/deadline calculations.

### 3. Subject Name OR Overdue Tasks Filtering Strategy
- **Choice**: Evaluate the condition: `(query is provided AND subject.name ILIKE %query%) OR (has_overdue is true AND subject.id IN overdue_subject_ids)`.
- **Rationale**: Fulfills the user requirement to filter subjects by name OR by overdue tasks seamlessly in a single search endpoint.

## Risks / Trade-offs

- **[Risk]** Memory overhead if user has a large volume of tasks evaluated in Python.
  - **Mitigation**: Filter database queries by `user_id == $auth.id` first so Python only processes tasks belonging to the current user.
