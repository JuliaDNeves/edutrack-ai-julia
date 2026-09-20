// Query all cliente records
query cliente verb=GET {
  api_group = "Event Logs"

  input {
  }

  stack {
    db.query cliente {
      return = {type: "list"}
    } as $cliente
  }

  response = $cliente
}