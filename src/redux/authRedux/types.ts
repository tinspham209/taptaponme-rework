export type User = {
  email: string;
  displayName: string;
  refreshToken?: string;
  uid: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
  username: string;
  name: string;
  cardNumber: string;
};

export type Token = string;

export type AuthPayload = {
  user?: User | null;
};

export type ChangePasswordPayload = {
  email: string;
  oldPassword: string;
  newPassword: string;
};
