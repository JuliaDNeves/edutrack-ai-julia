// Search and filter subjects by name query OR overdue tasks evaluated via Python logic
query subjects_search verb=GET {
  api_group = "Subjects"
  auth = "user"

  input {
    text query?
    bool has_overdue? = false
  }

  stack {
    // Query academic tasks for authenticated user to evaluate overdue status via Python logic
    db.query academic_tasks {
      where = $db.academic_tasks.user_id == $auth.id
      return = {type: "list"}
    } as $user_tasks

    // Execute Python script to compute subject_ids with overdue tasks
    python.execute {
      script = "scripts/evaluate_overdue_tasks.py"
      input  = $user_tasks
    } as $overdue_eval

    var $overdue_ids = $overdue_eval.overdue_subject_ids

    // Query subjects belonging to authenticated user matching search criteria
    db.query subjects {
      where = ($db.subjects.user_id == $auth.id) && (
        ($input.query != null && $db.subjects.name == $input.query) ||
        ($input.has_overdue == true && $db.subjects.id in $overdue_ids) ||
        ($input.query == null && $input.has_overdue == false)
      )
      return = {type: "list"}
    } as $subjects
  }

  response = $subjects
}
