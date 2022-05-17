import { Add } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, View } from 'src/components/common';
import SocialItem from 'src/components/SocialItem';
import { IRootState } from 'src/redux/rootReducer';
import { getSocialUserInfoAsync, getUserInfoAsync } from 'src/redux/userRedux/actions';
import { SocialUserInfo, UserInfo } from 'src/redux/userRedux/types';
import { isEmpty } from 'src/validations';
import AddLink from './AddLink';
import EditSocialDialog from './EditSocial';
import './styles.scss';

const clsPrefix = `edit-my-profile-tab-links`;

const TabLinks: React.FC<Props> = ({ authUser, userInfo, onGetSocialUserInfo, socialUserInfo }) => {
  const [openAddLinkDialog, setOpenAddLinkDialog] = React.useState(false);
  const [openEditLinkDialog, setOpenEditLinkDialog] = React.useState(false);
  const [selectedSocial, setSelectedSocial] = React.useState<SocialUserInfo>(null);

  // React.useEffect(() => {
  //   if (!userInfo || !socialUserInfo) {
  //     onGetSocialUserInfo({
  //       payload: {
  //         uid: authUser?.uid,
  //       },
  //       callback: () => {},
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [authUser]);

  return (
    <View className={`${clsPrefix} mt-16`}>
      <Button icon={<Add />} onClick={() => setOpenAddLinkDialog(true)}>
        THÊM LINK
      </Button>
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
                  isEdit
                  onClick={() => {
                    setOpenEditLinkDialog(true);
                    setSelectedSocial(social);
                  }}
                />
              );
            })}
      </View>

      {openAddLinkDialog && <AddLink onClose={() => setOpenAddLinkDialog(false)} />}
      {openEditLinkDialog && (
        <EditSocialDialog
          selectedSocial={selectedSocial}
          onClose={() => {
            setOpenEditLinkDialog(false);
            setSelectedSocial(null);
          }}
        />
      )}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    userInfo: UserInfo;
  };

const mapStateToProps = (state: IRootState) => ({
  authUser: state.auth.user,
  socialUserInfo: state.users.social.data,
});

const mapDispatchToProps = {
  onGetUserInfo: getUserInfoAsync.request,
  onGetSocialUserInfo: getSocialUserInfoAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabLinks);
