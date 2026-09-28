#!/usr/bin/env python3
import sys
import json
from datetime import datetime, timezone

def evaluate_overdue_tasks(tasks: list) -> dict:
    """
    Evaluates a list of tasks and returns the unique subject_ids 
    that have at least one overdue pending task.
    """
    now = datetime.now(timezone.utc)
    overdue_subject_ids = set()

    for task in tasks:
        status = task.get("status", "pending")
        due_date_str = task.get("due_date")
        subject_id = task.get("subject_id")

        if status == "pending" and due_date_str and subject_id is not None:
            try:
                # Handle ISO format or YYYY-MM-DD
                if "T" in due_date_str:
                    due_dt = datetime.fromisoformat(due_date_str.replace("Z", "+00:00"))
                else:
                    due_dt = datetime.strptime(due_date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)

                if due_dt < now:
                    overdue_subject_ids.add(subject_id)
            except ValueError:
                continue

    return {
        "status": "success",
        "overdue_subject_ids": list(overdue_subject_ids)
    }

def main():
    if len(sys.argv) > 1:
        raw_input = sys.argv[1]
    else:
        raw_input = sys.stdin.read()

    if not raw_input.strip():
        print(json.dumps({"status": "error", "error": "No input tasks JSON provided."}))
        sys.exit(1)

    try:
        try:
            data = json.loads(raw_input)
        except json.JSONDecodeError:
            data = json.loads(raw_input.replace("'", '"'))

        tasks = data if isinstance(data, list) else data.get("tasks", [])
        result = evaluate_overdue_tasks(tasks)
        print(json.dumps(result, indent=2))
    except Exception as e:
        print(json.dumps({"status": "error", "error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
