export enum EDIT_PROFILE_TAB {
  INFO = 'info',
  LINKS = 'links',
  CUSTOMIZED = 'customized',
}

export enum EDIT_PROFILE_TAB_NAME {
  INFO = 'Thông tin cá nhân',
  LINKS = 'Quản lí link',
  CUSTOMIZED = 'Cá nhân hoá',
}

export const EditProfileTabsOptions = [
  {
    label: EDIT_PROFILE_TAB_NAME.INFO,
    value: EDIT_PROFILE_TAB.INFO,
    disabled: false,
  },
  {
    label: EDIT_PROFILE_TAB_NAME.LINKS,
    value: EDIT_PROFILE_TAB.LINKS,
    disabled: false,
  },
  {
    label: EDIT_PROFILE_TAB_NAME.CUSTOMIZED,
    value: EDIT_PROFILE_TAB.CUSTOMIZED,
    disabled: true,
  },
];
