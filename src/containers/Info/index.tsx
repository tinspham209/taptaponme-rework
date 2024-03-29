import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { SEO } from 'src/appConfig/constants';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { Button, Image, Text, View } from 'src/components/common';
import SocialItem from 'src/components/SocialItem';
import { setShowNavbar } from 'src/redux/commonRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { getSocialUserInfoAsync, getUsersAsync } from 'src/redux/userRedux/actions';
import { isEmpty } from 'src/validations';
import vCardsJS from 'vcards-js';
import SplashScreen from '../StartupContainers/SplashScreen';
import './styles.scss';

const vCard = vCardsJS();

const clsPrefix = 'ctn-info';

const Info: React.FC<Props> = ({
  onGetUsers,
  users,

  loading,
  onGetSocialUserInfo,
  socialUserInfo,
  onSetShowNavbar,
}) => {
  React.useEffect(() => {
    document.title = `${SEO.TITLE}`;
    onSetShowNavbar(false);
  }, [onSetShowNavbar]);

  const location = useLocation();
  const pathname = location.pathname?.split('/')[1];

  React.useEffect(() => {
    onGetUsers();
  }, [onGetUsers, pathname]);

  const userInfo = users.find(
    user =>
      _.lowerCase(user.username) === _.lowerCase(pathname) || _.lowerCase(user.cardNumber) === _.lowerCase(pathname),
  );

  React.useEffect(() => {
    if (userInfo) {
      document.title = `${userInfo?.name} - ${SEO.TITLE}`;
      onGetSocialUserInfo({
        payload: {
          uid: userInfo.uid,
        },
        callback: () => {},
      });
    }
  }, [onGetSocialUserInfo, userInfo]);

  const handleSaveContact = () => {
    if (userInfo && socialUserInfo.some(social => social.icon === 'phoneNumber')) {
      vCard.lastName = userInfo.name;
      vCard.workPhone = `+84${socialUserInfo.find(social => social.icon === 'phoneNumber')?.url}`;
      vCard.url = `https://taptapon.me/${userInfo.username}`;
      vCard.note = userInfo.description ? `${userInfo.description}` : '';
      vCard.organization = 'TaptapOn.me';
      vCard.email = socialUserInfo.find(social => social.icon === 'email')?.url;
      vCard.photo.attachFromUrl('https://taptapon.me/logo192.png', 'png');

      const vCardString = vCard.getFormattedString();

      const blob = new Blob([vCardString], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${userInfo.name}-taptaponme.vcf`;
      link.click();
    }
  };

  return (
    <View className={`${clsPrefix}`}>
      {loading && <SplashScreen />}
      {!loading && (
        <View className={`${clsPrefix}__preview`}>
          <Image
            src={userInfo?.userAvatar ? userInfo?.userAvatar : IMAGES.defaultUser}
            className={`${clsPrefix}__avatar mb-8`}
          />
          <Text size={30} className={`fw-bold text-align-center`}>
            {userInfo?.name}
          </Text>
          <Text size={18} className={`fw-normal text-align-center`}>
            {userInfo?.description}
          </Text>
          <View className={`mt-32 so-cial-wrapper`}>
            {isEmpty(socialUserInfo) && (
              <View align="center" justify="center" className={`so-cial-empty mt-24`}>
                <Text className={`text-is-16 fw-medium`}>Không tìm thấy dữ liệu người dùng</Text>
              </View>
            )}
            {!isEmpty(socialUserInfo) && (
              <>
                {socialUserInfo.some(social => social.icon === 'phoneNumber') && (
                  <Button
                    isFull
                    onClick={() => {
                      handleSaveContact();
                    }}
                    className="mb-16">
                    Lưu danh bạ
                  </Button>
                )}
                {socialUserInfo
                  .sort((prev, cur) => prev.order - cur.order)
                  .map((social, index) => {
                    return (
                      <SocialItem
                        icon={social.icon}
                        title={social.title}
                        url={social.url}
                        key={`${social.title}-${index}`}
                      />
                    );
                  })}
              </>
            )}
          </View>

          <Link
            to={PATHS.root}
            onClick={() => {
              window.scrollTo(0, 0);
            }}>
            <Image className="ctn-uam__logoImage mt-64" alt="logo" src={IMAGES.logoFullBlack} />
          </Link>
        </View>
      )}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => {
  const { users, social } = state.users;
  return {
    users: users.data,
    loading: users.loading || social.loading,
    socialUserInfo: social.data,
  };
};

const mapDispatchToProps = {
  onGetUsers: getUsersAsync.request,
  onGetSocialUserInfo: getSocialUserInfoAsync.request,
  onSetShowNavbar: setShowNavbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
