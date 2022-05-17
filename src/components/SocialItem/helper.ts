import {
  getUserNameLinkedin,
  getUserNameSocial,
  getUserNameTiktok,
  getWebsiteLink,
  removeFirstZeroNumber,
  socialList,
  SOCIAL_NAME,
} from 'src/utils/socialUtils';

export const getSocialIconInfo = (iconName: string, info: string, title: string) => {
  switch (iconName) {
    case SOCIAL_NAME.FACEBOOK:
      return {
        alt: socialList[SOCIAL_NAME.FACEBOOK].alt,
        name: socialList[SOCIAL_NAME.FACEBOOK].name,
        src: socialList[SOCIAL_NAME.FACEBOOK].src,
        link: 'https://facebook.com/' + getUserNameSocial(info),
      };
    case SOCIAL_NAME.INSTAGRAM:
      return {
        alt: socialList[SOCIAL_NAME.INSTAGRAM].alt,
        name: socialList[SOCIAL_NAME.INSTAGRAM].name,
        src: socialList[SOCIAL_NAME.INSTAGRAM].src,
        link: 'https://instagram.com/' + getUserNameSocial(info),
      };
    case SOCIAL_NAME.PHONE_NUMBER:
      return {
        alt: socialList[SOCIAL_NAME.PHONE_NUMBER].alt,
        name: socialList[SOCIAL_NAME.PHONE_NUMBER].name,
        src: socialList[SOCIAL_NAME.PHONE_NUMBER].src,
        link: `tel:+84${removeFirstZeroNumber(info)}`,
      };
    case SOCIAL_NAME.WEBSITE:
      return {
        alt: socialList[SOCIAL_NAME.WEBSITE].alt,
        name: socialList[SOCIAL_NAME.WEBSITE].name,
        src: socialList[SOCIAL_NAME.WEBSITE].src,
        link: `${getWebsiteLink(info)}`,
      };
    case SOCIAL_NAME.EMAIL:
      return {
        alt: socialList[SOCIAL_NAME.EMAIL].alt,
        name: socialList[SOCIAL_NAME.EMAIL].name,
        src: socialList[SOCIAL_NAME.EMAIL].src,
        link: `mailto:${info}`,
      };
    case SOCIAL_NAME.ZALO:
      return {
        alt: socialList[SOCIAL_NAME.ZALO].alt,
        name: socialList[SOCIAL_NAME.ZALO].name,
        src: socialList[SOCIAL_NAME.ZALO].src,
        link: `https://zalo.me/84${removeFirstZeroNumber(info)}`,
      };

    case SOCIAL_NAME.TIKTOK:
      return {
        alt: socialList[SOCIAL_NAME.TIKTOK].alt,
        name: socialList[SOCIAL_NAME.TIKTOK].name,
        src: socialList[SOCIAL_NAME.TIKTOK].src,
        link: `https://tiktok.com/${getUserNameTiktok(info)}`,
      };
    case SOCIAL_NAME.GITHUB:
      return {
        alt: socialList[SOCIAL_NAME.GITHUB].alt,
        name: socialList[SOCIAL_NAME.GITHUB].name,
        src: socialList[SOCIAL_NAME.GITHUB].src,
        link: `https://github.com/${getUserNameSocial(info)}`,
      };
    case SOCIAL_NAME.LINKEDIN:
      return {
        alt: socialList[SOCIAL_NAME.LINKEDIN].alt,
        name: socialList[SOCIAL_NAME.LINKEDIN].name,
        src: socialList[SOCIAL_NAME.LINKEDIN].src,
        link: `https://linkedin.com/in/${getUserNameLinkedin(info)}`,
      };
    case SOCIAL_NAME.YOUTUBE:
      return {
        alt: socialList[SOCIAL_NAME.LINKEDIN].alt,
        name: socialList[SOCIAL_NAME.LINKEDIN].name,
        src: socialList[SOCIAL_NAME.LINKEDIN].src,
        link: `${getWebsiteLink(info)}`,
      };
    case SOCIAL_NAME.MOMO:
      return {
        alt: socialList[SOCIAL_NAME.MOMO].alt,
        name: socialList[SOCIAL_NAME.MOMO].name,
        src: socialList[SOCIAL_NAME.MOMO].src,
        link: `https://nhantien.momo.vn/0${removeFirstZeroNumber(info)}`,
      };
    case SOCIAL_NAME.TELEGRAM:
      return {
        alt: socialList[SOCIAL_NAME.TELEGRAM].alt,
        name: socialList[SOCIAL_NAME.TELEGRAM].name,
        src: socialList[SOCIAL_NAME.TELEGRAM].src,
        link: `https://t.me/${getUserNameSocial(info)}`,
      };
    case SOCIAL_NAME.TWITTER:
      return {
        alt: socialList[SOCIAL_NAME.TWITTER].alt,
        name: socialList[SOCIAL_NAME.TWITTER].name,
        src: socialList[SOCIAL_NAME.TWITTER].src,
        link: `https://twitter.com/${getUserNameSocial(info)}`,
      };
    case SOCIAL_NAME.SHOPEE:
      return {
        alt: socialList[SOCIAL_NAME.SHOPEE].alt,
        name: socialList[SOCIAL_NAME.SHOPEE].name,
        src: socialList[SOCIAL_NAME.SHOPEE].src,
        link: `https://shopee.vn/${getUserNameSocial(info)}`,
      };
    case SOCIAL_NAME.SKYPE:
      return {
        alt: socialList[SOCIAL_NAME.SKYPE].alt,
        name: socialList[SOCIAL_NAME.SKYPE].name,
        src: socialList[SOCIAL_NAME.SKYPE].src,
        link: `skype:${info}?chat`,
      };
    case SOCIAL_NAME.SNAPCHAT:
      return {
        alt: socialList[SOCIAL_NAME.SNAPCHAT].alt,
        name: socialList[SOCIAL_NAME.SNAPCHAT].name,
        src: socialList[SOCIAL_NAME.SNAPCHAT].src,
        link: `https://www.snapchat.com/add/${info}`,
      };
    case SOCIAL_NAME.SPOTIFY:
      return {
        alt: socialList[SOCIAL_NAME.SPOTIFY].alt,
        name: socialList[SOCIAL_NAME.SPOTIFY].name,
        src: socialList[SOCIAL_NAME.SPOTIFY].src,
        link: `${getWebsiteLink(info)}`,
      };
    case SOCIAL_NAME.SOUNDCLOUD:
      return {
        alt: socialList[SOCIAL_NAME.SOUNDCLOUD].alt,
        name: socialList[SOCIAL_NAME.SOUNDCLOUD].name,
        src: socialList[SOCIAL_NAME.SOUNDCLOUD].src,
        link: `${getWebsiteLink(info)}`,
      };
    default:
      return {
        alt: `${title}` || '',
        name: title,
        src: iconName || '',
        link: info || '',
      };
  }
};
