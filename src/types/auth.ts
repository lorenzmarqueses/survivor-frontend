// src/types/auth.ts
export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegistrationFormInputs {
  email: string;
  password: string;
}

export interface RegistrationResponse {
  access_token: string;
}
