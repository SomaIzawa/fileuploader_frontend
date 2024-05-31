export type LoginReq = {
  email: string
  password: string
}

export type SignUpReq = LoginReq & {
  name: string
  password_confirm: string
}

export type User = {
  id :number;
  name :string;
  email :string;
  allowed_at :string;
  created_at :string;
  updated_at :string;
}

export const initUser = (): User => {
  return {
    id: 0,
    name: '',
    email: '',
    allowed_at: new Date(0).toISOString(), // Epoch time (1970-01-01)
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  };
}