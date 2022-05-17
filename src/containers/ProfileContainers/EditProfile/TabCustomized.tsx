import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import { getUserInfoAsync } from 'src/redux/userRedux/actions';
import { UserInfo } from 'src/redux/userRedux/types';
import './styles.scss';

const clsPrefix = `edit-my-profile-tab-customized`;

const TabCustomized: React.FC<Props> = ({ authUser, userInfo, onGetUserInfo }) => {
  console.log('userInfo TabCustomized: ', userInfo);
  return (
    <View className={`edit-my-profile__info ${clsPrefix}`}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Text key={index} size={30} className={` fw-bold text-align-center mb-16`}>
          TabCustomized
        </Text>
      ))}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    userInfo: UserInfo;
  };

const mapStateToProps = (state: IRootState) => ({
  authUser: state.auth.user,
});

const mapDispatchToProps = {
  onGetUserInfo: getUserInfoAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabCustomized);
