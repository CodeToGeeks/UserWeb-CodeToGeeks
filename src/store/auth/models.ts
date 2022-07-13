export interface SignUpPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SendVerificationCodePayload {
  email: string
}

export interface CheckVerificationCodePayload {
  code: string
}

export interface ResetPasswordPayload {
  code: string
  password: string
}

export interface VerifyEmailPayload {
  token: string
}
