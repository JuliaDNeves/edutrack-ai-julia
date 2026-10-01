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
    db.add password_reset_tokens {
      data = {
        user_id   : $user.id
        token     : $token
        expiration: now|add_secs_to_timestamp:(3600|to_int)
        used      : false
      }
    } as $reset_token
  }

  response = {
    message: "Instruções de recuperação geradas com sucesso."
    token  : $token
  }
}