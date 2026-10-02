// Table structure for academic tasks linked to subjects and users
table academic_tasks {
  auth = false

  schema {
    int id
    timestamp created_at?=now {
      visibility = "private"
    }
  
    text title
    text description?
    date due_date
    enum status?=pending {
      values = ["pending", "completed"]
    }
  
    int estimated_time
    int spent_time?
  
    // Reference to the academic subject
    int subject_id {
      table = "subjects"
    }
  
    // Reference to the authenticated user
    int user_id {
      table = "user"
    }
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "user_id", op: "asc"}]}
    {type: "btree", field: [{name: "subject_id", op: "asc"}]}
  ]
}