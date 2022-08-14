import { IconButton } from '@material-ui/core';
import { Facebook, Instagram } from '@material-ui/icons';
import cn from 'classnames';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { IRootState } from 'src/redux/rootReducer';
import { Image, Text, View } from '../common';
import './styles.scss';

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <View className={cn('cmp-footer', className)} isRow justify="space-between" align="center">
      <View>
        <Link to={PATHS.root}>
          <Image src={IMAGES.logoOnly} className={`cmp-navbar__img`} />
        </Link>
      </View>
      <Text size={16}>Taptapon.me - Copyright © {moment().format('YYYY')}</Text>
      <View isRow>
        <a href="https://www.facebook.com/taptapon.me" target="__blank" rel="noopener noreferrer">
          <IconButton>
            <Facebook color={'primary'} />
          </IconButton>
        </a>
        <a href="https://www.instagram.com/taptapon.me" target="__blank" rel="noopener noreferrer">
          <IconButton>
            <Instagram color={'primary'} />
          </IconButton>
        </a>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    className?: string;
  };
const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
