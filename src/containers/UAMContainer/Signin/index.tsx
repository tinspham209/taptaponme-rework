/* eslint-disable react-hooks/exhaustive-deps */
import { Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { Button, Image, Text, View } from 'src/components/common';
import MuiTextField from 'src/components/MuiTextField';
import { signInAsync } from 'src/redux/authRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { TokenService } from 'src/services';
import { getErrorMessageSignin } from 'src/utils';
import * as Yup from 'yup';
import ForgotPassword from './forgotPassword';
import './styles.scss';

type FormValue = {
  email: string;
  password: string;
};

const INTIAL: FormValue = { email: '', password: '' };

const signInFormSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Signin: React.FC<Props> = ({ error, loading, isSigningIn, onSignIn }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  React.useEffect(() => {
    TokenService.clearToken();
  }, []);

  const handleLogin = (values: FormValue) => {
    const { email, password } = values;
    onSignIn({ email, password });
  };

  React.useEffect(() => {
    if (error) {
      formRef.current?.setErrors({
        email: '',
        password: getErrorMessageSignin(error),
      });
    } else {
      formRef.current?.setErrors({
        email: '',
        password: '',
      });
    }
  }, [error]);

  return (
    <div className="ctn-uam">
      <div className="ctn-uam__header">
        <Image className="ctn-uam__logoImage mb-32" alt="logo" src={IMAGES.logoFullBlack} />
        <Text className="text-is-32 fw-bold mb-32">Chào mừng bạn đến với TapTapOn.me</Text>
      </div>

      <div className="ctn-uam__body">
        <Formik initialValues={INTIAL} onSubmit={handleLogin} validationSchema={signInFormSchema} innerRef={formRef}>
          {({ values, errors, getFieldProps, touched, handleSubmit }) => (
            <View className="ctn-uam__form">
              <MuiTextField
                label={`Email`}
                errorMessage={touched.email && errors.email ? errors.email : ' '}
                placeholder="Enter your email"
                className="mb-24"
                {...getFieldProps('email')}
              />
              <MuiTextField
                label="Mật khẩu"
                placeholder="Enter your password"
                errorMessage={touched.password && errors.password ? errors.password : ' '}
                className="mb-8"
                isPassword
                {...getFieldProps('password')}
              />

              <Button
                type="button"
                variant="link"
                className="ctn-uam__link mb-24 fw-normal"
                onClick={() => {
                  setShowForgotPassword(true);
                }}>
                {'Quên mật khẩu?'}
              </Button>

              <Button type="submit" isLoading={loading || isSigningIn} onClick={() => handleSubmit()}>
                ĐĂNG NHẬP
              </Button>

              <View align="center" justify="center" isRow className="mt-32">
                <Text className={`text-is-16 mr-8`}>Chưa có tài khoản? </Text>
                <Link to={PATHS.signUp} className="text-is-16 has-text-primary">
                  Đăng Ký Tại Đây
                </Link>
              </View>
            </View>
          )}
        </Formik>
      </div>
      {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} />}
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { history: History };

const mapStateToProps = (state: IRootState) => ({
  isSigningIn: state.auth.isSigningIn,
  loading: state.auth.loading,
  error: state.auth.error?.message || '',
});

const mapDispatchToProps = {
  onSignIn: signInAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
