import { Formik, FormikProps } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
import { Button, Image, View } from 'src/components/common';
import MuiTextField from 'src/components/MuiTextField';
import { IRootState } from 'src/redux/rootReducer';
import { getUserInfoAsync, updateUserTabInfoAsync } from 'src/redux/userRedux/actions';
import { UserInfo } from 'src/redux/userRedux/types';
import { Yup } from 'src/services';
import './styles.scss';

const clsPrefix = `edit-my-profile-tab-info`;

const TabInfo: React.FC<Props> = ({ authUser, userInfo, onGetUserInfo, loading, onUpdateUserInfo }) => {
  const formRef = React.useRef<FormikProps<FormValue>>(null);

  const getInitialFormValue = () => {
    return {
      name: userInfo?.name || initialFormValue.name,
      description: userInfo?.description || initialFormValue.description,
      userAvatar: userInfo?.userAvatar || initialFormValue.userAvatar,
    };
  };

  const handleSubmitForm = (formValues: FormValue) => {
    const payload = {
      name: formValues.name.trim(),
      description: formValues.description ? formValues.description.trim() : '',
      userAvatar: formValues.userAvatar ? formValues.userAvatar.trim() : '',
      uid: userInfo?.uid || authUser.uid,
    };
    onUpdateUserInfo({
      payload: payload,
    });
  };

  return (
    <View className={`${clsPrefix} mt-16 mb-32`}>
      <Image
        src={userInfo?.userAvatar ? userInfo.userAvatar : IMAGES.defaultUser}
        className={`${clsPrefix}__avatar mb-8`}
      />
      <Formik
        initialValues={getInitialFormValue()}
        onSubmit={handleSubmitForm}
        validationSchema={FormSchema}
        innerRef={formRef}
        enableReinitialize>
        {({ values, errors, getFieldProps, touched, handleSubmit }) => {
          // console.log('values: ', values);
          // console.log('errors: ', errors);
          return (
            <View className={`mt-32`}>
              <MuiTextField
                label={`Tên`}
                errorMessage={touched.name && errors.name ? (errors.name as string) : ''}
                className="mb-24"
                {...getFieldProps('name')}
              />
              <MuiTextField
                label="Thông tin về bạn"
                errorMessage={touched.description && errors.description ? (errors.description as string) : ''}
                className="mb-24"
                multiline={true}
                minRows={4}
                maxRows={6}
                {...getFieldProps('description')}
              />
              <MuiTextField
                label={`Avatar URL`}
                errorMessage={touched.userAvatar && errors.userAvatar ? (errors.userAvatar as string) : ''}
                className="mb-24"
                {...getFieldProps('userAvatar')}
              />

              <Button type="submit" isLoading={loading} onClick={() => handleSubmit()}>
                LƯU THÔNG TIN
              </Button>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

type FormValue = {
  name: string;
  description: string;
  userAvatar: string;
};

const initialFormValue: FormValue = { name: '', description: '', userAvatar: '' };

const FormSchema = Yup.object().shape({
  name: Yup.string().required(),
  userAvatar: Yup.string(),
  description: Yup.string().nullable(),
});

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    userInfo: UserInfo;
  };

const mapStateToProps = (state: IRootState) => ({
  authUser: state.auth.user,
  loading: state.users.user.loading,
});

const mapDispatchToProps = {
  onGetUserInfo: getUserInfoAsync.request,
  onUpdateUserInfo: updateUserTabInfoAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabInfo);
