// Add a new academic task for the authenticated user
query academic_tasks verb=POST {
  api_group = "Academic Tasks"
  auth = "user"

  input {
    text title
    text description?
    date due_date
    enum status?=pending {
      values = ["pending", "completed"]
    }
  
    int estimated_time
    int spent_time?
    int subject_id
  }

  stack {
    // Validate that the subject exists and belongs to the authenticated user
    db.get subjects {
      field_name = "id"
      field_value = $input.subject_id
    } as $existing_subject
  
    precondition ($existing_subject != null && $existing_subject.user_id == $auth.id) {
      error_type = "accessdenied"
      error = "Subject not found or access denied."
    }
  
    // Insert task bound to authenticated user
    db.add academic_tasks {
      enforce_hidden_fields = false
      data = {
        created_at    : "now"
        title         : $input.title
        description   : $input.description
        due_date      : $input.due_date
        status        : $input.status
        estimated_time: $input.estimated_time
        spent_time    : $input.spent_time
        subject_id    : $input.subject_id
        user_id       : $auth.id
      }
    } as $task
  }

  response = $task
}