# Design

## Context

EduTrack AI needs a standalone Python script in `scripts/calculate_progress.py` to calculate progress percentage (`completed / total`) and output standard JSON. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Implement CLI parameter parsing using `argparse` for `completed` and `total` parameters.
- Provide a calculation function `calculate_progress(completed: int, total: int)` returning dictionary data.
- Handle zero total (`total = 0`) safely yielding `0.0%`.
- Print formatted JSON output to `stdout`.

**Non-Goals:**
- External API calls or database connections inside the script.
- Complex GUI/frontend components.

## Decisions

- **Use Standard Library (`argparse`, `json`, `sys`)**: Zero third-party dependencies required.
- **Output JSON Schema**:
  - Success case: `{"total": int, "completed": int, "percentage": float, "status": "success"}`
  - Error case: `{"error": str, "status": "error"}`

## Risks / Trade-offs

- **[Risk] Non-numeric or invalid parameters** → **Mitigation**: Catch parsing/validation exceptions and print structured JSON error response.
