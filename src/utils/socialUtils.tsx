import { upperFirst } from 'lodash';

export type SocialTitle =
  | SOCIAL_NAME.FACEBOOK
  | SOCIAL_NAME.INSTAGRAM
  | SOCIAL_NAME.PHONE_NUMBER
  | SOCIAL_NAME.GITHUB
  | SOCIAL_NAME.LINKEDIN
  | SOCIAL_NAME.WEBSITE
  | SOCIAL_NAME.EMAIL
  | SOCIAL_NAME.ZALO
  | SOCIAL_NAME.TIKTOK
  | SOCIAL_NAME.YOUTUBE
  | SOCIAL_NAME.MOMO
  | SOCIAL_NAME.TELEGRAM
  | SOCIAL_NAME.TWITTER
  | SOCIAL_NAME.SHOPEE
  | SOCIAL_NAME.SKYPE
  | SOCIAL_NAME.SNAPCHAT
  | SOCIAL_NAME.SPOTIFY
  | SOCIAL_NAME.SOUNDCLOUD;

export enum SOCIAL_NAME {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  PHONE_NUMBER = 'phoneNumber',
  GITHUB = 'github',
  LINKEDIN = 'linkedin',
  WEBSITE = 'website',
  EMAIL = 'email',
  ZALO = 'zalo',
  TIKTOK = 'tiktok',
  YOUTUBE = 'youtube',
  MOMO = 'momo',
  TELEGRAM = 'telegram',
  TWITTER = 'twitter',
  SHOPEE = 'shopee',
  SKYPE = 'skype',
  SNAPCHAT = 'snapchat',
  SPOTIFY = 'spotify',
  SOUNDCLOUD = 'soundcloud',
}

const domainsLink: { name: string; length: number }[] = [
  {
    name: '.com/',
    length: 5,
  },
  {
    name: '.me/',
    length: 4,
  },
  {
    name: '.vn/',
    length: 4,
  },
];

export const socialList = {
  [SOCIAL_NAME.PHONE_NUMBER]: {
    alt: SOCIAL_NAME.PHONE_NUMBER,
    name: `Số điện thoại`,
    src: 'https://img.icons8.com/fluent/48/000000/phone.png',
    placeholder: '0xxx.xxx.xxx',
    type: 'number',
  },
  [SOCIAL_NAME.EMAIL]: {
    alt: SOCIAL_NAME.EMAIL,
    name: upperFirst(SOCIAL_NAME.EMAIL),
    src: 'https://img.icons8.com/fluency/48/000000/mail.png',
    placeholder: 'Your email',
  },
  [SOCIAL_NAME.FACEBOOK]: {
    alt: SOCIAL_NAME.FACEBOOK,
    name: upperFirst(SOCIAL_NAME.FACEBOOK),
    src: 'https://img.icons8.com/fluent/48/000000/facebook-new.png',
    placeholder: 'https://facebook.com/username',
  },
  [SOCIAL_NAME.INSTAGRAM]: {
    alt: SOCIAL_NAME.INSTAGRAM,
    name: upperFirst(SOCIAL_NAME.INSTAGRAM),
    src: 'https://img.icons8.com/fluent/48/000000/instagram-new.png',
    placeholder: 'https://instagram.com/username',
  },
  [SOCIAL_NAME.ZALO]: {
    alt: SOCIAL_NAME.ZALO,
    name: upperFirst(SOCIAL_NAME.ZALO),
    src: 'https://img.icons8.com/plasticine/64/000000/zalo.png',
    placeholder: '0xxx.xxx.xxx',
    type: 'number',
  },
  [SOCIAL_NAME.WEBSITE]: {
    alt: SOCIAL_NAME.WEBSITE,
    name: upperFirst(SOCIAL_NAME.WEBSITE),
    src: 'https://img.icons8.com/external-outline-agus-raharjo/64/000000/external-global-communication-outline-agus-raharjo.png',
    placeholder: 'Your domain',
  },
  [SOCIAL_NAME.TIKTOK]: {
    alt: SOCIAL_NAME.TIKTOK,
    name: upperFirst(SOCIAL_NAME.TIKTOK),
    src: 'https://img.icons8.com/fluent/48/000000/tiktok.png',
    placeholder: 'https://www.tiktok.com/@username',
  },
  [SOCIAL_NAME.GITHUB]: {
    alt: SOCIAL_NAME.GITHUB,
    name: upperFirst(SOCIAL_NAME.GITHUB),
    src: 'https://img.icons8.com/fluent/48/000000/github.png',
    placeholder: 'https://github.com/username',
  },
  [SOCIAL_NAME.LINKEDIN]: {
    alt: SOCIAL_NAME.LINKEDIN,
    name: upperFirst(SOCIAL_NAME.LINKEDIN),
    src: 'https://img.icons8.com/color/48/000000/linkedin.png',
    placeholder: 'https://www.linkedin.com/in/username',
  },
  [SOCIAL_NAME.YOUTUBE]: {
    alt: SOCIAL_NAME.YOUTUBE,
    name: upperFirst(SOCIAL_NAME.YOUTUBE),
    src: 'https://img.icons8.com/doodle/100/000000/youtube-play.png',
    placeholder: 'https://www.youtube.com/c/username',
  },
  [SOCIAL_NAME.MOMO]: {
    alt: SOCIAL_NAME.MOMO,
    name: upperFirst(SOCIAL_NAME.MOMO),
    src: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
    placeholder: '0xxx.xxx.xxx',
    type: 'number',
  },
  [SOCIAL_NAME.TELEGRAM]: {
    alt: SOCIAL_NAME.TELEGRAM,
    name: upperFirst(SOCIAL_NAME.TELEGRAM),
    src: 'https://img.icons8.com/color/48/000000/telegram-app--v1.png',
    placeholder: 'https://t.me/username',
  },
  [SOCIAL_NAME.TWITTER]: {
    alt: SOCIAL_NAME.TWITTER,
    name: upperFirst(SOCIAL_NAME.TWITTER),
    src: 'https://img.icons8.com/color-glass/48/000000/twitter.png',
    placeholder: 'https://twitter.com/username',
  },
  [SOCIAL_NAME.SHOPEE]: {
    alt: SOCIAL_NAME.SHOPEE,
    name: upperFirst(SOCIAL_NAME.SHOPEE),
    src: 'https://img.icons8.com/doodle/48/000000/shopee.png',
    placeholder: 'https://shopee.vn/username',
  },
  [SOCIAL_NAME.SKYPE]: {
    alt: SOCIAL_NAME.SKYPE,
    name: upperFirst(SOCIAL_NAME.SKYPE),
    src: 'https://img.icons8.com/fluent/48/000000/skype.png',
    placeholder: 'skype username',
  },
  [SOCIAL_NAME.SNAPCHAT]: {
    alt: SOCIAL_NAME.SNAPCHAT,
    name: upperFirst(SOCIAL_NAME.SNAPCHAT),
    src: 'https://img.icons8.com/plasticine/48/000000/snapchat.png',
    placeholder: 'snapchat username',
  },
  [SOCIAL_NAME.SPOTIFY]: {
    alt: SOCIAL_NAME.SPOTIFY,
    name: upperFirst(SOCIAL_NAME.SPOTIFY),
    src: 'https://img.icons8.com/doodle/48/000000/spotify.png',
    placeholder: 'spotify url',
  },
  [SOCIAL_NAME.SOUNDCLOUD]: {
    alt: SOCIAL_NAME.SOUNDCLOUD,
    name: upperFirst(SOCIAL_NAME.SOUNDCLOUD),
    src: 'https://img.icons8.com/color/48/000000/soundcloud.png',
    placeholder: 'https://soundcloud.com/username',
  },
};

export const getUserNameSocial = (link: string) => {
  // https://m.fb.com/tinspham209/
  let replaceLink: string = '';

  link.replace(/\s/g, ''); //remove space character

  domainsLink.every(item => {
    const indexOfUrlLink = link.indexOf(item.name);
    replaceLink = indexOfUrlLink !== -1 ? link.substring(indexOfUrlLink + item.length) : link;
    if (indexOfUrlLink !== -1) return false;
    else return true;
  });
  // tinspham209/

  const indexOfSlashChar = replaceLink.indexOf('/');
  replaceLink = indexOfSlashChar !== -1 ? replaceLink.substring(0, replaceLink.length - 1) : replaceLink; // replace slash if last character is /
  // tinspham209

  return replaceLink;
};

export const removeFirstZeroNumber = (number: string) => {
  if (number.substring(0, 1) === '0') {
    return number.substring(1);
  }
  if (number.substring(0, 2) === '84') {
    return number.substring(2);
  }
  if (number.substring(0, 3) === '0') {
    return number.substring(3);
  }

  return number;
};

export const getUserNameTiktok = (link: string) => {
  let username = getUserNameSocial(link);
  if (username.substring(0, 1) === '@') {
    username = username.substring(1, username.length);
  }
  return `@${username}`;
};

export const getWebsiteLink = (link: string) => {
  if (link.indexOf('http') !== -1) {
    return link;
  } else {
    return `https://${link}`;
  }
};

export const getUserNameLinkedin = (link: string) => {
  let username = getUserNameSocial(link);
  if (username.substring(0, 3) === 'in/') {
    username = username.substring(3, username.length);
  }
  return `${username}`;
};
