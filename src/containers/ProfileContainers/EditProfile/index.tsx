import { Grid, Tab, Tabs, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { SEO, TAB_FILTER } from 'src/appConfig/constants';
import { IMAGES } from 'src/appConfig/images';
import { muiResponsive } from 'src/appConfig/muiTheme';
import { Button, Image, Link, Text, View } from 'src/components/common';
import SocialItem from 'src/components/SocialItem';
import { useCopyToClipboard } from 'src/hooks';
import { IRootState } from 'src/redux/rootReducer';
import { getSocialUserInfoAsync, getUserInfoAsync } from 'src/redux/userRedux/actions';
import { Toastify } from 'src/services';
import { isEmpty } from 'src/validations';
import { EditProfileTabsOptions, EDIT_PROFILE_TAB } from './helpers';
import './styles.scss';
import TabCustomized from './TabCustomized';
import TabInfo from './TabInfo';
import TabLinks from './TabLinks';

const clsPrefix = `edit-my-profile`;

const EditProfile: React.FC<Props> = ({ authUser, userInfo, onGetUserInfo, socialUserInfo, onGetSocialUserInfo }) => {
  const isTabletScreen = useMediaQuery(muiResponsive.TABLET);

  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  React.useEffect(() => {
    document.title = `${SEO.TITLE}`;
  }, []);

  React.useEffect(() => {
    if (userInfo) {
      document.title = `${userInfo.name} - ${SEO.TITLE}`;
    }
  }, [userInfo]);

  const tab = query.get(TAB_FILTER) || EDIT_PROFILE_TAB.INFO;
  const isInfoTab = tab === EDIT_PROFILE_TAB.INFO;
  const isLinksTab = tab === EDIT_PROFILE_TAB.LINKS;
  const isCustomizedTab = tab === EDIT_PROFILE_TAB.CUSTOMIZED;

  const handleChangeCurrentTab = (tab: string) => {
    query.set(TAB_FILTER, tab);
    history.push({ search: query.toString() });
  };

  React.useEffect(() => {
    if (isEmpty(userInfo) || isEmpty(socialUserInfo)) {
      onGetUserInfo({
        payload: {
          uid: authUser.uid,
        },
        callback: () => {
          onGetSocialUserInfo({
            payload: {
              uid: authUser?.uid,
            },
            callback: () => {},
          });
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, copy] = useCopyToClipboard();

  return (
    <View className={`${clsPrefix}`}>
      <Grid container spacing={isTabletScreen ? 1 : 3}>
        <Grid item xs={isTabletScreen ? 12 : 8}>
          <View align="center" justify="center" isRow className="mb-16">
            <Text className={`text-is-20 mr-8  mb-8 fw-medium`}>Link của bạn: </Text>
            <Link
              href={`https://taptapon.me/${userInfo?.username}`}
              className="text-is-20 has-text-primary mr-16 mb-8 fw-medium"
              rel="noopener noreferrer"
              target="__blank">
              {`www.taptapon.me/${userInfo?.username}`}
            </Link>
            <Button
              onClick={() => {
                copy(`https://taptapon.me/${userInfo?.username}`);
                Toastify.success('Đã copy link vào clipboard');
              }}
              className={` mb-8`}>
              Copy link
            </Button>
          </View>
          <View className={`${clsPrefix}__info`}>
            <Tabs
              value={tab}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              onChange={(e, value) => {
                handleChangeCurrentTab(value);
              }}
              classes={{
                root: `${clsPrefix}__tabs`,
              }}>
              {EditProfileTabsOptions.map((option, index) => {
                return <Tab key={option.value} label={option.label} value={option.value} disabled={option.disabled} />;
              })}
            </Tabs>
            {isInfoTab && <TabInfo userInfo={userInfo} />}
            {isLinksTab && <TabLinks userInfo={userInfo} />}
            {isCustomizedTab && <TabCustomized userInfo={userInfo} />}
          </View>
        </Grid>
        {!isTabletScreen && (
          <Grid item xs={12} sm={4}>
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
            </View>
          </Grid>
        )}
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
