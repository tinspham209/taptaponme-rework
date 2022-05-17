import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { SEO } from 'src/appConfig/constants';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { Image, Text, View } from 'src/components/common';
import SocialItem from 'src/components/SocialItem';
import { setShowNavbar } from 'src/redux/commonRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { getSocialUserInfoAsync, getUsersAsync } from 'src/redux/userRedux/actions';
import { isEmpty } from 'src/validations';
import SplashScreen from '../StartupContainers/SplashScreen';
import './styles.scss';
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
          <Text size={20} className={`fw-medium text-align-center`}>
            {userInfo?.description}
          </Text>
          <View className={`mt-32 social-wrapper`}>
            {isEmpty(socialUserInfo) && (
              <View align="center" justify="center" className={`social-empty mt-24`}>
                <Text className={`text-is-16 fw-medium`}>Không tìm thấy dữ liệu người dùng</Text>
              </View>
            )}
            {!isEmpty(socialUserInfo) &&
              socialUserInfo
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
          </View>
          <Link to={PATHS.signIn}>
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
