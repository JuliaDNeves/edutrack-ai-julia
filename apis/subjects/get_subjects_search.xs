// Search subjects by name and/or overdue tasks
query subjects_search verb=GET {
  api_group = "Subjects"
  auth = "user"

  input {
    text query?
    bool has_overdue?
  }

  stack {
    // Get all subjects from the authenticated user
    db.query subjects {
      where = $db.subjects.user_id == $auth.id
      return = {type: "list"}
    } as $subjects
  
    // Result list
    var $result {
      value = []
    }
  
    // Check each subject
    foreach ($subjects) {
      each as $subject {
        // Check if subject name matches search
        var $name_matches {
          value = true
        }
      
        conditional {
          if ($input.query != null && $input.query != "") {
            var $name_lower {
              value = $subject.name|to_lower
            }
          
            var $query_lower {
              value = $input.query|to_lower
            }
          
            var $name_contains {
              value = $name_lower|contains:$query_lower
            }
          
            conditional {
              if ($name_contains) {
                var.update $name_matches {
                  value = true
                }
              }
            
              else {
                var.update $name_matches {
                  value = false
                }
              }
            }
          }
        }
      
        // Check for overdue tasks
        var $has_overdue_task {
          value = false
        }
      
        conditional {
          if ($input.has_overdue) {
            db.query academic_tasks {
              where = $db.academic_tasks.user_id == $auth.id && $db.academic_tasks.subject_id == $subject.id && $db.academic_tasks.due_date != null && $db.academic_tasks.due_date < now && $db.academic_tasks.status != "completed"
              return = {type: "exists"}
            } as $overdue_exists
          
            var.update $has_overdue_task {
              value = $overdue_exists
            }
          }
        }
      
        // Add subject to result
        conditional {
          if (($input.has_overdue == false && $name_matches) || ($input.has_overdue && $has_overdue_task && ($input.query == null || $input.query == "")) || ($input.has_overdue && $has_overdue_task && $name_matches)) {
            var.update $result {
              value = $result|push:$subject
            }
          }
        }
      }
    }
  }

  response = $result
}