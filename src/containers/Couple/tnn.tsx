import { Avatar } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SEO } from 'src/appConfig/constants';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { Image, Text, View } from 'src/components/common';
import { setShowNavbar } from 'src/redux/commonRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { getSocialUserInfoAsync, getUsersAsync } from 'src/redux/userRedux/actions';
import Heart from './heart';
import MusicPlayer from './musicPlayer';
import './styles.scss';

const clsPrefix = 'ctn-couple-tnn';

const TnnContainer: React.FC<Props> = ({ onSetShowNavbar }) => {
  React.useEffect(() => {
    document.title = `${SEO.TITLE}`;
    onSetShowNavbar(false);
  }, [onSetShowNavbar]);

  return (
    <View className={`${clsPrefix}`}>
      <View className={`${clsPrefix}__preview`}>
        <View className={`${clsPrefix}__count`}>
          <Text size={16} className="text-align-center has-text-white">
            11/03/2022
          </Text>
          <Heart />

          <Text size={20} className="text-align-center has-text-white fw-bold">
            {moment().diff(moment('11/03/2022', 'DD/MM/YYYY'), 'days')} days
          </Text>
        </View>

        <View className={`${clsPrefix}__people`} isRow justify="space-between">
          {[
            {
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/taptaponme.appspot.com/o/20220813_095906.png?alt=media&token=44cdb192-4d26-4897-bb83-d3a4b7030d3d',
              name: 'Tins Tins',
              gender: <BiMaleSign color={'#fff'} />,
              horoscope: 'Xử Nữ',
            },
            {
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/taptaponme.appspot.com/o/FB_IMG_1662222471397.jpg?alt=media&token=6748a2b6-321f-4f4f-a58f-ceb8ee94dfbe',
              name: 'Mei Ngọc',
              gender: <BiFemaleSign color={'#fff'} />,
              horoscope: 'Ma Kết',
            },
          ].map(item => (
            <View className={`${clsPrefix}__people-person`}>
              <View isRow justify="center">
                <Avatar
                  alt={item.name}
                  src={item.avatar}
                  classes={{
                    root: `${clsPrefix}__people-person--avatar`,
                  }}
                />
              </View>
              <View isRow className={`${clsPrefix}__people-person--name`}>
                <i>{item.gender}</i>
                <Text className="text-align-center has-text-white fw-bold">{item.name}</Text>
              </View>
            </View>
          ))}
        </View>
        <View>
          <MusicPlayer />
        </View>
      </View>
      <Link
        to={PATHS.root}
        onClick={() => {
          window.scrollTo(0, 0);
        }}>
        <Image className="ctn-uam__logoImage mt-48" alt="logo" src={IMAGES.logoFullBlack} />
      </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(TnnContainer);
