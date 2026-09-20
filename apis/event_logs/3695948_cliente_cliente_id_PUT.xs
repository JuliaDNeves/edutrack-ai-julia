// Update cliente record
query "cliente/{cliente_id}" verb=PUT {
  api_group = "Event Logs"

  input {
    int cliente_id? filters=min:1
    dblink {
      table = "cliente"
    }
  }

  stack {
    db.edit cliente {
      field_name = "id"
      field_value = $input.cliente_id
      enforce_hidden_fields = false
      data = {nome: $input.nome}
    } as $model
  }

  response = $model
}