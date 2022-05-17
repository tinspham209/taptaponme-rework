export type UserSocial = {
  icon: string;
  order: number;
  title: string;
  url: string;
};

export type UserTheme = {
  backgroundColor: string;
  backgroundImageUrl: string;
  color: string;
  iconColor: string;
};

export type UserMoreInfo = {
  bio: string;
  company: string;
};

export type UserInfo = {
  name: string;
  cardNumber: string;
  uid: string;
  username: string;
  social: UserSocial[];
  theme: UserTheme;
  userMoreInfo: UserMoreInfo;
  userUrl: string;
  userAvatar: string;

  description: string;
};

export type GetUserInfoPayload = {
  uid: string;
};

export type UpdateUserNameAndCardNumberPayload = {
  uid: string;
  username: string;
  name: string;
  cardNumber: string;
  email?: string;
};

export type UpdateUserTabInfoPayload = {
  uid: string;
  name: string;
  description: string;
  userAvatar: string;
};

export type AddUserLinkSocialPayload = {
  uid: string;
  icon: string;
  order: number;
  title: string;
  url: string;
};

export type SocialUserInfo = {
  icon: string;
  order: number;
  title: string;
  url: string;
  uid?: string;
};

export type DeleteUserLinkSocialPayload = {
  uid: string;
  icon: string;
};
