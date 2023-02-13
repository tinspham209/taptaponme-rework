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
                'https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/328858952_2759633294171168_2970080231470887563_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=l_--sJfOS84AX_x8ssi&_nc_ht=scontent.fdad1-4.fna&oh=00_AfANszn5nzxPrMwJ6AE6-gLisPbsWyaf_KfjFUBUNsfr_w&oe=63EF4D31',
              name: 'John Doe',
              gender: <BiMaleSign color={'#fff'} />,
              horoscope: 'Xử Nữ',
            },
            {
              avatar:
                'https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/329691413_1308532123336070_688399326453957155_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=uKNiwCWekSgAX8ml6JS&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDhpgDxzOtvh5YIuO0F6kNaH_MdaUa9LMZ_mqrV4lwPzQ&oe=63EF1095',
              name: 'Vip Pro',
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
              <View isRow>
                <i>{item.gender}</i>
                <Text className="text-align-center has-text-white">{item.name}</Text>
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
