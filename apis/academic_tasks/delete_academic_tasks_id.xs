// Delete an academic task record belonging to the authenticated user
query "academic_tasks/{academic_tasks_id}" verb=DELETE {
  api_group = "Academic Tasks"
  auth = "user"

  input {
    int academic_tasks_id? filters=min:1
  }

  stack {
    // Retrieve task and check ownership
    db.get academic_tasks {
      field_name = "id"
      field_value = $input.academic_tasks_id
    } as $existing_task
  
    precondition ($existing_task != null && $existing_task.user_id == $auth.id) {
      error_type = "accessdenied"
      error = "Task not found or access denied."
    }
  
    db.del academic_tasks {
      field_name = "id"
      field_value = $input.academic_tasks_id
    }
  }

  response = null
}