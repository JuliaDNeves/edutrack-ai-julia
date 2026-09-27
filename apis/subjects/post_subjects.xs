// Add a new subject record for the authenticated user
query subjects verb=POST {
  api_group = "Subjects"
  auth = "user"

  input {
    text name
    text teacher?
    int hours?
  }

  stack {
    db.add subjects {
      enforce_hidden_fields = false
      data = {
        created_at: "now"
        name      : $input.name
        teacher   : $input.teacher
        hours     : $input.hours
        user_id   : $auth.id
      }
    } as $subject
  }

  response = $subject
}