// Edit an academic task record belonging to the authenticated user
query "academic_tasks/{academic_tasks_id}" verb=PATCH {
  api_group = "Academic Tasks"
  auth = "user"

  input {
    int academic_tasks_id? filters=min:1
    text title?
    text description?
    date due_date?
    enum status? {
      values = ["pending", "completed"]
    }
  
    int estimated_time?
    int spent_time?
    int subject_id?
  }

  stack {
    db.get academic_tasks {
      field_name = "id"
      field_value = $input.academic_tasks_id
    } as $existing_task
  
    precondition ($existing_task != null && $existing_task.user_id == $auth.id) {
      error_type = "accessdenied"
      error = "Task not found or access denied."
    }
  
    conditional {
      if ($input.subject_id != null) {
        db.get subjects {
          field_name = "id"
          field_value = $input.subject_id
        } as $existing_subject
      
        precondition ($existing_subject != null && $existing_subject.user_id == $auth.id) {
          error_type = "accessdenied"
          error = "Subject not found or access denied."
        }
      }
    }
  
    util.get_raw_input {
      encoding = "json"
      exclude_middleware = false
    } as $raw_input
  
    db.patch academic_tasks {
      field_name = "id"
      field_value = $input.academic_tasks_id
      data = `$input|pick:($raw_input|keys)`|filter_null|filter_empty_text
    } as $updated_task
  }

  response = $updated_task
}