// Generate on-demand AI academic insights and metrics for the authenticated user
query "academic_insights" verb=POST {
  api_group = "Academic_Insights"
  auth = "user"

  input {
  }

  stack {
    // 1. Retrieve authenticated user record
    db.get user {
      field_name = "id"
      field_value = $auth.id
      output = [
        "id"
        "name"
        "email"
      ]
    } as $user_profile

    // 2. Query all subjects belonging strictly to the authenticated user
    db.query subjects {
      where = $db.subjects.user_id == $auth.id
      return = {type: "list"}
    } as $subjects

    // 3. Query all academic tasks belonging strictly to the authenticated user
    db.query academic_tasks {
      where = $db.academic_tasks.user_id == $auth.id
      return = {type: "list"}
    } as $tasks

    // 4. Consolidate academic dataset isolated by authenticated user
    var $insights_payload {
      value = {
        status  : "success"
        user    : {
          id   : $user_profile.id
          name : $user_profile.name
          email: $user_profile.email
        }
        subjects: $subjects
        tasks   : $tasks
      }
    }
  }

  response = $insights_payload
}

