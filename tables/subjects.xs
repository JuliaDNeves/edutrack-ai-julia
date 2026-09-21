// Table structure for academic subjects
table subjects {
  auth = false

  schema {
    int id
    timestamp created_at?=now {
      visibility = "private"
    }
  
    text name
    text teacher?
    int hours?
  
    // Reference to the authenticated user
    int user_id {
      table = "user"
    }
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "user_id", op: "asc"}]}
  ]
}