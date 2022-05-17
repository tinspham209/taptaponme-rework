import {
  CircularProgress,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { isEmpty } from 'src/validations';
import { Text, View } from '..';
import './styles.scss';

const Dialog: React.FC<
  DialogProps & {
    iconTitle?: React.ReactNode;
    title: string;
    dialogActions?: React.ReactNode;
    dialogContentClasses?: DialogContentProps['classes'];
    fullScreen?: boolean;
    loading?: boolean;
    overflowVisible?: boolean;
    disabledButton?: boolean;
    hideTitle?: boolean;
  }
> = ({
  iconTitle,
  children,
  title,
  dialogActions,
  onClose,
  dialogContentClasses,
  fullScreen,
  loading,
  overflowVisible,
  disabledButton,
  hideTitle,
  ...dialogProps
}) => {
  const handleCloseClicked = () => onClose({}, 'backdropClick');

  return (
    <MuiDialog
      onClose={onClose}
      {...dialogProps}
      fullScreen={fullScreen}
      disableBackdropClick={loading || disabledButton}
      classes={{ paper: overflowVisible ? 'cmp-dialog-content-visible' : '' }}>
      {!hideTitle && (
        <DialogTitle className="cmp-dialog-title" disableTypography>
          <View isRow>
            {iconTitle && <i className="mr-8">{iconTitle}</i>}
            <Text size={18} className="fw-bold mr-8">
              {isEmpty(title) ? ` ` : title}
            </Text>
            {loading && <CircularProgress size={25} />}
          </View>
          {!disabledButton && (
            <IconButton className="cmp-dialog-close-icon" onClick={handleCloseClicked} disabled={disabledButton}>
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent classes={{ root: overflowVisible ? 'cmp-dialog-content-visible' : '' }}>{children}</DialogContent>
      <DialogActions className="cmp-dialog-footer">{dialogActions}</DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
