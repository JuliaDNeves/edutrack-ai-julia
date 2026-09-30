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
  
    db.get user {
      field_name = "password_reset.token"
      field_value = $input.token
    } as $user
  
    precondition ($user != null) {
      error_type = "notfound"
      error = "Token de redefinição inválido ou não encontrado."
    }
  
    precondition ($user.password_reset.used != true) {
      error_type = "accessdenied"
      error = "Este token de redefinição já foi utilizado."
    }
  
    precondition ($user.password_reset.expiration >= now) {
      error_type = "accessdenied"
      error = "Este token de redefinição expirou."
    }
  
    db.edit user {
      field_name = "id"
      field_value = $user.id
      enforce_hidden_fields = false
      data = {
        password      : $input.new_password
        password_reset: {
        token     : $user.password_reset.token
        expiration: $user.password_reset.expiration
        used      : true
      }
      }
    } as $updated_user
  }

  response = {message: "Senha redefinida com sucesso!"}
}