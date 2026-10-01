// Validate token and reset user password
query "auth/reset_password" verb=POST {
  api_group = "Authentication"

  input {
    text token?
    password new_password?
  }

  stack {
    precondition ($input.token != null) {
      error = "Token is required."
    }
  
    precondition ($input.new_password != null) {
      error = "New password is required."
    }
  
    db.get password_reset_tokens {
      field_name = "token"
      field_value = $input.token
    } as $reset_token
  
    precondition ($reset_token != null) {
      error_type = "notfound"
      error = "Token de redefinição inválido ou não encontrado."
    }
  
    precondition ($reset_token.used != true) {
      error_type = "accessdenied"
      error = "Este token de redefinição já foi utilizado."
    }
  
    precondition ($reset_token.expiration >= now) {
      error_type = "accessdenied"
      error = "Este token de redefinição expirou."
    }
  
    db.get user {
      field_name = "id"
      field_value = $reset_token.user_id
    } as $user
  
    precondition ($user != null) {
      error_type = "notfound"
      error = "Usuário não encontrado."
    }
  
    db.edit user {
      field_name = "id"
      field_value = $user.id
      enforce_hidden_fields = false
      data = {password: $input.new_password}
    } as $updated_user
  
    db.edit password_reset_tokens {
      field_name = "id"
      field_value = $reset_token.id
      data = {used: true}
    } as $used_token
  }

  response = {message: "Senha redefinida com sucesso!"}
}