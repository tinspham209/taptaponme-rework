import { Grid, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { BACKGROUND_IMAGE_URL } from 'src/appConfig/constants';
import { muiResponsive } from 'src/appConfig/muiTheme';
import { Button, Image, Text, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import '../styles.scss';

const clsPrefix = 'ctn-root';

const WhatShare: React.FC<Props> = () => {
  const isMobileScreen = useMediaQuery(muiResponsive.MOBILE);

  return (
    <View
      className={`${clsPrefix}-whatShare ${clsPrefix}__margin-auto ${clsPrefix}-backgroundColor full-width max-width-1200 mt-64 py-48`}
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
      }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <View className={`${clsPrefix}-whatShare__content`}>
            <Text
              size={isMobileScreen ? 32 : 40}
              className={`fw-medium text-color-black-900 mb-16 ${isMobileScreen ? 'text-align-center' : ''}`}>
              Bạn có thể chia sẻ những gì
            </Text>
            <Text size={isMobileScreen ? 14 : 20} className={`fw-normal text-color-black-900 mb-16 text-wrap`}>
              Chia sẻ thông tin liên lạc cơ bản chỉ với 1 chạm để chia sẻ từ số điện thoại, email cho đến các nền tảng
              mạng xã hội như Facebook, Zalo, Instagram, Tiktok,...
              <br />
              Ngoài ra, với tính năng lưu danh bạ, đối tác của bạn sẽ chỉ mất 3 giây để có thể lưu liên lạc của bạn.
              <br />
              Và còn nhiều hơn thế nữa...
            </Text>

            <a href="https://m.me/taptapon.me" target="__blank" rel="noopener noreferrer">
              <Button variant="default" className="mt-36">
                Mua ngay
              </Button>
            </a>
          </View>
        </Grid>
        <Grid item container xs={12} sm={6} justifyContent="center">
          <Image
            src={`https://firebasestorage.googleapis.com/v0/b/taptaponme.appspot.com/o/social.09059890.webp?alt=media&token=ee409a04-13ae-4b85-ae14-3db1269bf924`}
            alt={`Thẻ cá nhân thông minh - Chia sẻ thông tin liên lạc chỉ với một chạm`}
            className={`${clsPrefix}-whatShare__img`}
          />
        </Grid>
      </Grid>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WhatShare);
