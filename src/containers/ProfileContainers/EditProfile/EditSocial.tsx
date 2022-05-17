import { Grid } from '@material-ui/core';
import { Formik, FormikProps } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, View } from 'src/components/common';
import MuiTextField from 'src/components/MuiTextField';
import SocialItem from 'src/components/SocialItem';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import {
  addUserLinkSocialAsync,
  deleteUserSocialLinkAsync,
  updateUserSocialLinkAsync,
} from 'src/redux/userRedux/actions';
import { SocialUserInfo } from 'src/redux/userRedux/types';
import { Yup } from 'src/services';
import { socialList } from 'src/utils/socialUtils';

const clsPrefix = 'user-info-edit-social';

const EditSocialDialog: React.FC<Props> = ({
  onClose,
  onNext,
  loading = false,
  onAddUserLinkSocial,
  uid,
  selectedSocial,
  onUpdateSocialLink,
  onDeleteSocialLink,
}) => {
  const formRef = React.useRef<FormikProps<SocialUserInfo>>(null);

  const handleSubmitForm = (formValues: SocialUserInfo) => {
    // console.log('formValues: ', formValues);
    onUpdateSocialLink({
      payload: {
        ...formValues,
        uid: uid,
      },
      callback: () => {
        onClose();
      },
    });
  };

  const handleClickSubmit = () => {
    formRef.current.handleSubmit();
  };

  const getInitialValues = () => {
    return {
      ...selectedSocial,
    };
  };

  const handleOnDeleteLink = () => {
    onDeleteSocialLink({
      payload: {
        uid: uid,
        icon: selectedSocial.icon,
      },
      callback: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog
      open={true}
      title={'Chỉnh sửa đường link'}
      maxWidth="sm"
      fullWidth
      onClose={onClose}
      loading={loading}
      overflowVisible
      dialogActions={
        <>
          <Button variant="link" onClick={onClose} className="mr-16">
            Huỷ
          </Button>
          <Button onClick={() => handleClickSubmit()} isLoading={loading} type="button">
            Cập nhập
          </Button>
        </>
      }>
      <View className={`${clsPrefix} my-16`}>
        <Formik<SocialUserInfo>
          initialValues={getInitialValues()}
          onSubmit={handleSubmitForm}
          validationSchema={FormSchema}
          innerRef={formRef}>
          {({ values, errors, touched, getFieldProps, setFieldValue }) => {
            // console.log('values: ', values);
            // console.log('errors: ', errors);

            return (
              <View className={``}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Button
                      onClick={() => {
                        handleOnDeleteLink();
                      }}
                      isLoading={loading}
                      type="button">
                      Xoá
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <SocialItem
                      icon={selectedSocial.icon}
                      title={selectedSocial.title}
                      url={selectedSocial.url}
                      isView
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      label={`Đường dẫn (URL) / SDT`}
                      errorMessage={touched.url && errors.url ? errors.url : ''}
                      fullWidth
                      className={``}
                      placeholder={values?.icon ? socialList[values.icon]?.placeholder : ''}
                      InputLabelProps={{ shrink: values?.icon ? true : false }}
                      helperText={values?.icon ? socialList[values.icon]?.placeholder : 'Vui lòng nhập theo hướng dẫn'}
                      {...getFieldProps('url')}
                      {...(values?.icon && socialList[values.icon]?.type === 'number'
                        ? {
                            type: 'number',
                          }
                        : undefined)}
                    />
                  </Grid>
                </Grid>
              </View>
            );
          }}
        </Formik>
      </View>
    </Dialog>
  );
};

const FormSchema = Yup.object().shape({
  url: Yup.string().required(),
  icon: Yup.string().required(),
});

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    onClose: Callback;
    onNext?: Callback;
    selectedSocial: SocialUserInfo;
  };

const mapStateToProps = (state: IRootState) => {
  const { user, social } = state.users;
  return {
    loading: user.loading || social.loading,
    error: social.error,
    uid: state.auth.uid,
  };
};

const mapDispatchToProps = {
  onAddUserLinkSocial: addUserLinkSocialAsync.request,
  onUpdateSocialLink: updateUserSocialLinkAsync.request,
  onDeleteSocialLink: deleteUserSocialLinkAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSocialDialog);
