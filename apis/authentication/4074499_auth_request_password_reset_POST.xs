// Initiate password recovery and generate a reset token
query "auth/request_password_reset" verb=POST {
  api_group = "Authentication"

  input {
    email email? filters=lower|trim
  }

  stack {
    precondition ($input.email != null) {
      error = "Email is required."
    }
  
    db.get user {
      field_name = "email"
      field_value = $input.email
    } as $user
  
    precondition ($user != null) {
      error_type = "notfound"
      error = "No user found for that email."
    }
  
    security.create_uuid as $token
    var $password_reset {
      value = {}
        |set:"token":$token
        |set:"expiration":(now
          |add_secs_to_timestamp:(3600|to_int)
        )
        |set:"used":false
    }
  
    db.edit user {
      field_name = "id"
      field_value = $user.id
      enforce_hidden_fields = false
      data = {password_reset: $password_reset}
    } as $updated_user
  }

  response = {
    message: "Instruções de recuperação geradas com sucesso."
    token  : $token
  }
}