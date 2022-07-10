import { Grid, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { muiResponsive } from 'src/appConfig/muiTheme';
import { Image, Text, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import { cardProducts } from '../helpers';
import '../styles.scss';

const clsPrefix = 'ctn-root';

const Products: React.FC<Props> = () => {
  const isMobileScreen = useMediaQuery(muiResponsive.MOBILE);

  return (
    <View className={`${clsPrefix}-products ${clsPrefix}__margin-auto mt-48 max-width-1200`}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Image
            src={`https://firebasestorage.googleapis.com/v0/b/taptaponme.appspot.com/o/products.webp?alt=media&token=9adc2333-cb60-44c8-8d06-a645c6b63f66`}
            className={`${clsPrefix}-products__img`}
            alt={`Thẻ cá nhân thông minh - products hero`}
          />
        </Grid>
        {cardProducts.map((card, index) => (
          <Grid item xs={6} sm={3} key={`${card.id}-${index}`}>
            <View className={`${clsPrefix}-products__item`}>
              <Link to={`/products/${card.id}`} className={`${clsPrefix}-products__item-link`}>
                <Image
                  src={card.img}
                  alt={card.name}
                  className={`${clsPrefix}-products__img ${clsPrefix}-products__item-img`}
                />
              </Link>
              <Text size={isMobileScreen ? 16 : 20} className={`text-color-black-900 fw-medium`}>
                {card.name}
              </Text>
              <View isRow>
                <Text size={isMobileScreen ? 14 : 18} className={`text-color-black-900 fw-normal mr-24`}>
                  {card.price},000 VNĐ
                </Text>
                <Text
                  size={isMobileScreen ? 14 : 18}
                  className={`text-color-black-900 fw-normal text-line-through fs-italic`}>
                  {Number(card.price + 50)},000 VNĐ
                </Text>
              </View>
            </View>
          </Grid>
        ))}
      </Grid>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
