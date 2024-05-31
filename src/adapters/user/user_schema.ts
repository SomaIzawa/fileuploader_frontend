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
  allowed_at :Date;
  created_at :Date;
  updated_at :Date;
}

export const initUser = (): User => {
  return {
    id: 0,
    name: '',
    email: '',
    allowed_at: new Date(0), // Epoch time (1970-01-01)
    created_at: new Date(0),
    updated_at: new Date(0),
  };
}