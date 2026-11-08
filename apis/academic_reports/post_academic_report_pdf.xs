// Generate academic report for the authenticated user
query "academic_reports/pdf" verb=POST {
  api_group = "Academic_Reports"
  auth = "user"

  input {
  }

  stack {
    // 1. Get authenticated user record
    db.get user {
      field_name = "id"
      field_value = $auth.id
      output = [
        "id"
        "name"
        "email"
      ]
    } as $user_profile

    // 2. Query all subjects belonging to the authenticated user
    db.query subjects {
      where = $db.subjects.user_id == $auth.id
      return = {type: "list"}
    } as $subjects

    // 3. Query all academic tasks belonging to the authenticated user
    db.query academic_tasks {
      where = $db.academic_tasks.user_id == $auth.id
      return = {type: "list"}
    } as $tasks

    // 4. Set Response Content-Type and Disposition headers for PDF file
    util.set_header {
      value = "Content-Type: application/pdf"
      duplicates = "replace"
    }

    util.set_header {
      value = "Content-Disposition: attachment; filename=\"edutrack-relatorio.pdf\""
      duplicates = "replace"
    }

    // 5. Consolidated academic report data
    var $report_response {
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

  response = $report_response
}
