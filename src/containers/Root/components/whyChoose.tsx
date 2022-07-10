import { Grid, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { BACKGROUND_IMAGE_URL } from 'src/appConfig/constants';
import { muiResponsive } from 'src/appConfig/muiTheme';
import { Image, Text, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import { whyChooseOptions } from '../helpers';
import '../styles.scss';

const clsPrefix = 'ctn-root';

const WhyChoose: React.FC<Props> = () => {
  const isMobileScreen = useMediaQuery(muiResponsive.MOBILE);

  return (
    <View
      className={`${clsPrefix}-why ${clsPrefix}__margin-auto ${clsPrefix}-backgroundColor full-width max-width-1200 mt-64 py-48`}
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
      }}>
      <Grid container spacing={3}>
        <Grid item container xs={12} sm={6} justifyContent="center">
          <Image
            src={`https://firebasestorage.googleapis.com/v0/b/taptaponme.appspot.com/o/key-feature.842286ba.webp?alt=media&token=33aa6036-3512-458d-925c-a31da2d69bb6`}
            alt={`Thẻ cá nhân thông minh - Chia sẻ thông tin liên lạc chỉ với một chạm`}
            className={`${clsPrefix}-why__img`}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <View className={`${clsPrefix}-why__content`}>
            <Text size={24} className={`fw-bold has-text-primary mb-16 ${isMobileScreen ? 'text-align-center' : ''}`}>
              TẠI SAO NÊN CHỌN TAPTAPON.ME
            </Text>
            <Text
              size={isMobileScreen ? 32 : 40}
              className={`fw-medium text-color-black-900 mb-16 ${isMobileScreen ? 'text-align-center' : ''}`}>
              Xu hướng kết nối hiện đại
            </Text>

            {whyChooseOptions.map((item, index) => (
              <View isRowWrap align="center" key={index} className={`${clsPrefix}-why__content-options px-16 mb-36`}>
                <Image
                  src={item.img}
                  alt={`Thẻ cá nhân thông minh - Chia sẻ thông tin liên lạc chỉ với một chạm`}
                  className={`${clsPrefix}-why__content-options-img mr-16`}
                />
                <View>
                  <Text size={isMobileScreen ? 20 : 24} className={`fw-medium text-color-black-900 mb-8`}>
                    {item.title}
                  </Text>
                  <Text size={14} className={`fw-normal text-color-black-900 mb-16 text-wrap`}>
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Grid>
      </Grid>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WhyChoose);
