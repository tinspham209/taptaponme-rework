import { useMediaQuery } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { muiResponsive } from 'src/appConfig/muiTheme';
import { Image, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import '../styles.scss';

const clsPrefix = 'ctn-root';

const Hero: React.FC<Props> = () => {
  const isMobileScreen = useMediaQuery(muiResponsive.MOBILE);

  return (
    <View className={`${clsPrefix}-hero full-width`}>
      <h1 className={`${clsPrefix}-hero__title`}>
        Thẻ cá nhân thông minh - Chia sẻ thông tin liên lạc chỉ với một chạm
      </h1>
      <Image
        src={
          isMobileScreen
            ? `https://firebasestorage.googleapis.com/v0/b/taptaponme.appspot.com/o/hero-mobile.png?alt=media&token=7b55702f-4322-4965-aeab-ca4ae5fd7e42`
            : `https://firebasestorage.googleapis.com/v0/b/taptaponme.appspot.com/o/hero.jpg?alt=media&token=a7233cbf-af8d-4160-b0a5-10b355fe7628`
        }
        alt={`Thẻ cá nhân thông minh - Chia sẻ thông tin liên lạc chỉ với một chạm`}
        className={`${clsPrefix}-hero__img`}
      />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
