import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SEO } from 'src/appConfig/constants';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { Button, Image, Text, View } from 'src/components/common';
import SocialItem from 'src/components/SocialItem';
import { IRootState } from 'src/redux/rootReducer';
import { getSocialUserInfoAsync, getUserInfoAsync } from 'src/redux/userRedux/actions';
import { isEmpty } from 'src/validations';
import './styles.scss';

const clsPrefix = `ctn-my-profile`;

const MyProfile: React.FC<Props> = ({ authUser, userInfo, onGetUserInfo, socialUserInfo, onGetSocialUserInfo }) => {
  React.useEffect(() => {
    document.title = `${SEO.TITLE}`;
  }, []);

  React.useEffect(() => {
    if (isEmpty(userInfo)) {
      onGetUserInfo({
        payload: {
          uid: authUser.uid,
        },
        callback: () => {
          document.title = `${userInfo.name} - ${SEO.TITLE}`;
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!isEmpty(userInfo) && isEmpty(socialUserInfo)) {
      onGetSocialUserInfo({
        payload: {
          uid: authUser.uid,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, socialUserInfo]);

  return (
    <View className={`${clsPrefix}`}>
      <View className={`${clsPrefix}__info mb-4`}>
        <Image
          src={userInfo?.userAvatar ? userInfo?.userAvatar : IMAGES.defaultUser}
          className={`${clsPrefix}__avatar mb-4`}
        />
        <Text size={30} className={` fw-bold text-align-center`}>
          {userInfo?.name}
        </Text>
        <Text size={20} className={`fw-medium text-align-center`}>
          {userInfo?.description}
        </Text>

        <View isRow justify="center" className={`mt-32`}>
          <Link to={PATHS.editProfile}>
            <Button variant="default">Chỉnh sửa trang</Button>
          </Link>
        </View>
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
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  authUser: state.auth.user,
  userInfo: state.users.user.data,
  socialUserInfo: state.users.social.data,
});

const mapDispatchToProps = {
  onGetUserInfo: getUserInfoAsync.request,
  onGetSocialUserInfo: getSocialUserInfoAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
