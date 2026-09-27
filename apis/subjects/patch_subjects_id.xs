// Edit a subject record belonging to the authenticated user
query "subjects/{subjects_id}" verb=PATCH {
  api_group = "Subjects"
  auth = "user"

  input {
    int subjects_id? filters=min:1
    text name?
    text teacher?
    int hours?
  }

  stack {
    db.get subjects {
      field_name = "id"
      field_value = $input.subjects_id
    } as $existing_subject
  
    precondition ($existing_subject != null && $existing_subject.user_id == $auth.id) {
      error_type = "accessdenied"
      error = "Subject not found or access denied."
    }
  
    util.get_raw_input {
      encoding = "json"
      exclude_middleware = false
    } as $raw_input
  
    db.patch subjects {
      field_name = "id"
      field_value = $input.subjects_id
      data = `$input|pick:($raw_input|keys)`|filter_null|filter_empty_text
    } as $updated_subject
  }

  response = $updated_subject
}