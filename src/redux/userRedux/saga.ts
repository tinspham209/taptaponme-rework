import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Toastify } from 'src/services';
import { Apis } from 'src/services/api';
import { toastifyErrorSaga } from '../commonSagas/toastifyFailureSaga';
import {
  addUserLinkSocialAsync,
  getSocialUserInfoAsync,
  getUserInfoAsync,
  getUsersAsync,
  updateUserNameAndCardNumberAsync,
  updateUserSocialLinkAsync,
  updateUserTabInfoAsync,
} from './actions';

// function* getDataWithoutParams(api, asyncActionCreator) {
//   yield call(callApi, api, {
//     asyncAction: asyncActionCreator,
//     onFailure: toastifyErrorSaga,
//   });
// }

function* getUsers(api, { payload: params }: any) {
  const response = yield call(api, params);
  try {
    yield put(getUsersAsync.success(response));
    if (params?.callback) {
      params.callback();
    }
  } catch (error) {
    // yield toastifyErrorSaga(error);
  }
}

function* getUserInfo(api, { payload: params }: any) {
  const response = yield call(api, params.payload);
  try {
    yield put(getUserInfoAsync.success(response));
    if (params?.callback) {
      params.callback();
    }
  } catch (error) {
    // yield toastifyErrorSaga(error);
  }
}

function* getSocialUserInfo(api, { payload: params }: any) {
  const response = yield call(api, params.payload);
  try {
    yield put(getSocialUserInfoAsync.success(response));
    if (params?.callback) {
      params.callback();
    }
  } catch (error) {
    // yield toastifyErrorSaga(error);
  }
}

function* updateUserNameAndCardNumber(api, { payload: params }: any) {
  const response = yield call(api, params?.payload);
  try {
    yield put(updateUserNameAndCardNumberAsync.success(response));
    if (params?.callback) {
      params.callback();
    }
    yield put(
      getUserInfoAsync.request({
        payload: {
          uid: params?.payload.uid,
        },
      }),
    );
  } catch (error) {
    yield all([updateUserNameAndCardNumberAsync.failure(error), toastifyErrorSaga(error)]);
  }
}

function* updateUserTabInfo(api, { payload: params }: any) {
  const response = yield call(api, params?.payload);
  try {
    yield put(updateUserTabInfoAsync.success(response));
    yield put(
      getUserInfoAsync.request({
        payload: {
          uid: params.payload.uid,
        },
      }),
    );
    Toastify.success('Cập nhật thông tin thành công');
    if (params?.callback) {
      params.callback();
    }
  } catch (error) {
    yield all([updateUserTabInfoAsync.failure(error), toastifyErrorSaga(error)]);
  }
}

function* addUserLinkSocial(api, { payload: params }: any) {
  const response = yield call(api, params?.payload);
  try {
    yield put(addUserLinkSocialAsync.success(response));
    yield put(
      getSocialUserInfoAsync.request({
        payload: {
          uid: params.payload.uid,
        },
      }),
    );
    Toastify.success('Thêm link thành công');
    if (params?.callback) {
      params.callback();
    }
  } catch (error) {
    yield all([addUserLinkSocialAsync.failure(error), toastifyErrorSaga(error)]);
  }
}

function* updateUserSocialLink(api, { payload: params }: any) {
  const response = yield call(api, params?.payload);
  try {
    yield put(updateUserSocialLinkAsync.success(response));
    yield put(
      getSocialUserInfoAsync.request({
        payload: {
          uid: params.payload.uid,
        },
      }),
    );
    Toastify.success('Cập nhật đường link thành công');
    if (params?.callback) {
      params.callback();
    }
  } catch (error) {
    yield all([updateUserSocialLinkAsync.failure(error), toastifyErrorSaga(error)]);
  }
}

export default function authSaga(apiInstance: Apis) {
  return [
    takeLatest(getUsersAsync.request, getUsers, apiInstance.getUsers),
    takeLatest(getUserInfoAsync.request, getUserInfo, apiInstance.getUserInfo),
    takeLatest(getSocialUserInfoAsync.request, getSocialUserInfo, apiInstance.getSocialUserInfo),
    takeLatest(
      updateUserNameAndCardNumberAsync.request,
      updateUserNameAndCardNumber,
      apiInstance.updateUserNameAndCardNumber,
    ),
    takeLatest(updateUserTabInfoAsync.request, updateUserTabInfo, apiInstance.updateUserTabInfo),
    takeLatest(addUserLinkSocialAsync.request, addUserLinkSocial, apiInstance.addUserLinkSocial),
    takeLatest(updateUserSocialLinkAsync.request, updateUserSocialLink, apiInstance.updateUserSocialLink),
  ];
}
