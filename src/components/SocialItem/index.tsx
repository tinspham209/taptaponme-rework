import { IconButton, Tooltip } from '@material-ui/core';
import React from 'react';
import { IoIosArrowForward, IoIosBrush } from 'react-icons/io';
import { connect } from 'react-redux';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { isEmpty } from 'src/validations';
import { View } from '../common';
import { getSocialIconInfo } from './helper';
import './styles.scss';

const clsPrefix = 'social-item';

const SocialItem: React.FC<Props> = ({ icon, title, url, isEdit, isView, onClick }) => {
  const item: {
    alt: string;
    name: string;
    src: string;
    link: string;
  } = getSocialIconInfo(icon, url, title);
  return (
    <div className={clsPrefix} key={`${icon}-${title}-${url}`}>
      {isView && (
        <div className={`${clsPrefix}-wrapper`}>
          <div className={`${clsPrefix}-icon`}>
            <img src={item?.src} alt={`${item?.alt}-icon`} />
          </div>
          <p className={`${clsPrefix}-text`}>{isEmpty(item.name) ? 'Error !' : item.name}</p>
          <View />
        </div>
      )}
      {!isView && isEdit && (
        <div className={`${clsPrefix}-wrapper`}>
          <div className={`${clsPrefix}-icon`}>
            <img src={item?.src} alt={`${item?.alt}-icon`} />
          </div>
          <p className={`${clsPrefix}-text`}>{isEmpty(item.name) ? 'Error !' : item.name}</p>
          <Tooltip title="Chỉnh sửa">
            <IconButton onClick={onClick}>
              <IoIosBrush />
            </IconButton>
          </Tooltip>
        </div>
      )}
      {!isView && !isEdit && (
        <a className={`${clsPrefix}-wrapper`} rel="noopener noreferrer" target="__blank" href={item?.link}>
          <div className={`${clsPrefix}-icon`}>
            <img src={item?.src} alt={`${item?.alt}-icon`} />
          </div>
          <p className={`${clsPrefix}-text`}>{isEmpty(item.name) ? 'Error !' : item.name}</p>
          <IconButton>
            <IoIosArrowForward />
          </IconButton>
        </a>
      )}
    </div>
  );
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    icon: string;
    title: string;
    url: string;
    isEdit?: boolean;
    isView?: boolean;
    onClick?: Callback;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SocialItem);
