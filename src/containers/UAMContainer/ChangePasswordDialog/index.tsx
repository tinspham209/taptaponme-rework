import { Formik, FormikProps } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, IconSuccess, Text, ValidatePassword, View } from 'src/components/common';
import MuiTextField from 'src/components/MuiTextField';
import useKeypress from 'src/hooks/useKeyPress';
import { changePasswordAsync, signOutAsync } from 'src/redux/authRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { Yup } from 'src/services';

const clsPrefix = 'change-password';

const ChangePasswordDialog: React.FC<Props> = ({
  onClose,
  onNext,
  loading = false,
  onSignOut,
  authUser,
  onChangePassword,
}) => {
  const formRef = React.useRef<FormikProps<FormValue>>(null);

  const [changePasswordSuccess, setChangePasswordSuccess] = React.useState(false);

  const handleChangePassword = (formValues: FormValue) => {
    onChangePassword({
      payload: {
        email: authUser.email,
        oldPassword: formValues.oldPassword,
        newPassword: formValues.newPassword,
      },
      callback: () => {
        setChangePasswordSuccess(true);
      },
    });
  };

  const handleBackToLogin = () => {
    onClose();
    onNext();
    onSignOut();
  };

  useKeypress('Enter', () => {
    formRef.current.handleSubmit();
  });

  const handleClickResetButton = () => {
    formRef.current.handleSubmit();
  };

  return (
    <Dialog
      open={true}
      title={changePasswordSuccess ? ' ' : 'Đổi mật khẩu'}
      maxWidth="sm"
      fullWidth
      onClose={onClose}
      loading={loading}
      disabledButton={changePasswordSuccess}
      hideTitle={changePasswordSuccess}
      dialogActions={
        <>
          {changePasswordSuccess ? (
            <Button className="full-width" onClick={() => handleBackToLogin()}>
              Đăng nhập lại
            </Button>
          ) : (
            <>
              <Button variant="link" onClick={onClose} className="mr-16">
                Huỷ bỏ
              </Button>
              <Button onClick={handleClickResetButton} isLoading={loading} type="button">
                Thay đổi
              </Button>
            </>
          )}
        </>
      }>
      <View className={`${clsPrefix} my-16`}>
        {changePasswordSuccess ? (
          <View className="">
            <View className="flex-center justify-center">
              <IconSuccess size={60} className="mb-12" />
            </View>
            <Text size={32} className="text-color-black-700 fw-medium mb-32 text-align-center">
              Thay đổi mật khẩu thành công.
            </Text>
            <View className={``} align="center" justify="center" isRow>
              <Text className={`ml-16 text-align-center`}>
                Mật khẩu của bạn đã được thay đổi.
                <br />
              </Text>
            </View>
          </View>
        ) : (
          <Formik<FormValue>
            initialValues={initialFormValues}
            onSubmit={handleChangePassword}
            validationSchema={FormSchema}
            innerRef={formRef}>
            {({ values, errors, touched, getFieldProps }) => {
              // console.log('values: ', values);
              // console.log('errors: ', errors);
              return (
                <View className={``}>
                  <MuiTextField
                    label={`Current password`}
                    errorMessage={touched.oldPassword && errors.oldPassword ? errors.oldPassword : ' '}
                    placeholder="Enter current password"
                    fullWidth
                    className={`mb-16`}
                    isPassword
                    {...getFieldProps('oldPassword')}
                  />
                  <MuiTextField
                    label={`New password`}
                    errorMessage={touched.newPassword && errors.newPassword ? errors.newPassword : ' '}
                    placeholder="Enter new password"
                    fullWidth
                    isPassword
                    {...getFieldProps('newPassword')}
                  />

                  <ValidatePassword password={values.newPassword} />
                </View>
              );
            }}
          </Formik>
        )}
      </View>
    </Dialog>
  );
};

type FormValue = {
  oldPassword: string;
  newPassword: string;
};

const initialFormValues = {
  oldPassword: '',
  newPassword: '',
};

const FormSchema = Yup.object().shape({
  oldPassword: Yup.string().required(),
  newPassword: Yup.string()
    .required()
    .min(8, '  ')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message: '  ',
    }),
});

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    onClose: Callback;
    onNext?: Callback;
  };

const mapStateToProps = (state: IRootState) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  authUser: state.auth.user,
});

const mapDispatchToProps = {
  onSignOut: signOutAsync.request,
  onChangePassword: changePasswordAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordDialog);
