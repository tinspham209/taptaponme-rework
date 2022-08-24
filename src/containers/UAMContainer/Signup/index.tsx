/* eslint-disable react-hooks/exhaustive-deps */
import { Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { Button, Image, Text, ValidatePassword, View } from 'src/components/common';
import MuiTextField from 'src/components/MuiTextField';
import { signUpAsync } from 'src/redux/authRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { ErrorService, Yup } from 'src/services';

type FormValue = {
  email: string;
  password: string;
  username: string;
  name: string;
  cardNumber: string;
};

const INTIAL = {
  email: '',
  password: '',
  username: '',
  name: '',
  cardNumber: '',
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string()
    .required()
    .min(8, '  ')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message: '  ',
    }),
  username: Yup.string().required(),
  name: Yup.string().required(),
  cardNumber: Yup.string().notRequired(),
});

const SignUp: React.FC<Props> = ({ error, loading, isSigningIn, onSignUp }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);

  // =========================== SIGN UP ===========================

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  const handleCreateAccount = (formValues: FormValue) => {
    const payload = {
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      username: formValues.username.trim(),
      name: formValues.name.trim(),
      cardNumber: formValues.cardNumber.trim(),
    };
    onSignUp({
      payload: payload,
    });
  };

  const handleError = (error: AuthError) => {
    switch (error.code) {
      case 'InvalidPasswordException':
        return formRef.current.setErrors({ password: error.message });

      case 'UsernameExistsException':
        return formRef.current.setErrors({ email: error.message });

      default:
        return ErrorService.handler(error);
    }
  };

  return (
    <View className="ctn-uam" flexGrow={1}>
      <div className="ctn-uam__header">
        <Image className="ctn-uam__logoImage mb-32" alt="logo" src={IMAGES.logoFullBlack} />
        <Text className="text-is-32 fw-bold mb-32">Đăng ký tài khoản</Text>
      </div>

      <div className="ctn-uam__body">
        <Formik
          initialValues={INTIAL}
          onSubmit={handleCreateAccount}
          validationSchema={SignupSchema}
          innerRef={formRef}>
          {({ values, errors, getFieldProps, touched, handleSubmit }) => {
            // console.log('values: ', values);
            // console.log('errors: ', errors);
            return (
              <View className="ctn-uam__form">
                <MuiTextField
                  label={`Email của bạn`}
                  errorMessage={touched.email && errors.email ? errors.email : ''}
                  placeholder="Enter your email"
                  className="mb-24"
                  autoComplete="asdasdasdasd"
                  required
                  {...getFieldProps('email')}
                />
                <MuiTextField
                  label={`Tên của bạn`}
                  errorMessage={touched.name && errors.name ? errors.name : ''}
                  placeholder="Enter your name"
                  className="mb-24"
                  autoComplete="asdasdasdasd"
                  required
                  {...getFieldProps('name')}
                />
                <MuiTextField
                  label={`Tên truy cập`}
                  errorMessage={touched.username && errors.username ? errors.username : ''}
                  placeholder="Enter your username"
                  className="mb-24"
                  autoComplete="asdasdasdasd"
                  required
                  {...getFieldProps('username')}
                />
                <MuiTextField
                  label={`Mã số thẻ`}
                  errorMessage={touched.cardNumber && errors.cardNumber ? errors.cardNumber : ''}
                  placeholder="Enter your card number"
                  className="mb-24"
                  autoComplete="asdasdasdasd"
                  // required
                  {...getFieldProps('cardNumber')}
                />
                <MuiTextField
                  label="Mật khẩu"
                  placeholder="Enter your password"
                  errorMessage={touched.password && errors.password ? errors.password : ''}
                  className="mb-24"
                  isPassword
                  required
                  autoComplete="asdasdasdasd"
                  {...getFieldProps('password')}
                />
                <ValidatePassword password={values.password} />

                <Button
                  type="button"
                  isLoading={loading || isSigningIn}
                  className="mt-16"
                  onClick={() => handleSubmit()}>
                  TẠO TÀI KHOẢN
                </Button>

                <View align="center" justify="center" isRow className="my-32">
                  <Text className={`text-is-16 mr-8`}>Nếu bạn đã có tài khoản.</Text>
                  <Link to={PATHS.signIn} className="text-is-16 has-text-primary">
                    Đăng nhập
                  </Link>
                </View>
              </View>
            );
          }}
        </Formik>
      </div>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { history: History };

const mapStateToProps = (state: IRootState) => ({
  isSigningIn: state.auth.isSigningIn,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = {
  onSignUp: signUpAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
