import { Grid, useMediaQuery } from '@material-ui/core';
import { Formik, FormikProps } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { muiResponsive } from 'src/appConfig/muiTheme';
import { Button, Dialog, Image, Select, View } from 'src/components/common';
import MuiTextField from 'src/components/MuiTextField';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { addUserLinkSocialAsync } from 'src/redux/userRedux/actions';
import { Yup } from 'src/services';
import { socialList } from 'src/utils/socialUtils';

const clsPrefix = 'user-info-add-link';

const ChangePasswordDialog: React.FC<Props> = ({
  onClose,
  onNext,
  loading = false,
  onAddUserLinkSocial,
  userInfo,
  uid,
  socialUserInfo,
}) => {
  const formRef = React.useRef<FormikProps<FormValue>>(null);

  const isTabletScreen = useMediaQuery(muiResponsive.MOBILE);

  const handleSubmitForm = (formValues: FormValue) => {
    const payload = {
      icon: formValues.icon.trim(),
      order: socialUserInfo?.length || 0,
      title: socialList[formValues.icon].name,
      url: `${formValues.link}`.trim(),
      uid: userInfo?.uid || uid,
    };
    onAddUserLinkSocial({
      payload: payload,
      callback: () => {
        onClose();
      },
    });
  };

  const getOptionsIcon = () => {
    return Object.entries(socialList).map(item => {
      return {
        value: item[0],
        label: item[1].name,
        key: item[0],
      };
    });
  };

  const handleClickSubmit = () => {
    formRef.current.handleSubmit();
  };
  return (
    <Dialog
      open={true}
      title={'Chọn tài khoản'}
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
            Thêm
          </Button>
        </>
      }>
      <View className={`${clsPrefix} my-16`}>
        <Formik<FormValue>
          initialValues={initialFormValues}
          onSubmit={handleSubmitForm}
          validationSchema={FormSchema}
          innerRef={formRef}>
          {({ values, errors, touched, getFieldProps, setFieldValue }) => {
            // console.log('values: ', values);
            // console.log('errors: ', errors);

            return (
              <View className={``}>
                <Select
                  name="icon"
                  value={values.icon}
                  label="MXH"
                  isTextfieldStyle={true}
                  className={`mb-24`}
                  options={getOptionsIcon()}
                  onChange={(name, value) => {
                    setFieldValue('icon', value);
                  }}
                  errorMessage={touched.icon && errors.icon ? errors.icon : ''}
                />

                <Grid container spacing={1} alignItems="center">
                  {values?.icon && (
                    <Grid item xs={isTabletScreen ? 12 : 1}>
                      <View style={{ transform: 'translateY(-10px)' }} justify="center" align="center">
                        <Image
                          src={socialList[values.icon]?.src}
                          style={{
                            maxWidth: isTabletScreen ? '80px' : '50px',
                          }}
                        />
                      </View>
                    </Grid>
                  )}
                  <Grid item xs={values?.icon ? (isTabletScreen ? 12 : 11) : 12}>
                    <MuiTextField
                      label={`Đường dẫn (URL) / SDT`}
                      errorMessage={touched.link && errors.link ? errors.link : ''}
                      fullWidth
                      className={``}
                      placeholder={values?.icon ? socialList[values.icon]?.placeholder : ''}
                      InputLabelProps={{ shrink: values?.icon ? true : false }}
                      helperText={values?.icon ? 'Vui lòng nhập theo hướng dẫn' : ''}
                      {...getFieldProps('link')}
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

type FormValue = {
  icon: string;
  link: string;
};

const initialFormValues = {
  icon: '',
  link: '',
};

const FormSchema = Yup.object().shape({
  link: Yup.string().required(),
  icon: Yup.string().required(),
});

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    onClose: Callback;
    onNext?: Callback;
  };

const mapStateToProps = (state: IRootState) => {
  const { user, social } = state.users;
  return {
    loading: user.loading || social.loading,
    error: user.error,
    userInfo: user.data,
    uid: state.auth.uid,
    socialUserInfo: social.data,
  };
};

const mapDispatchToProps = {
  onAddUserLinkSocial: addUserLinkSocialAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordDialog);
