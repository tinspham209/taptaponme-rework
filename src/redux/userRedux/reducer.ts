import { combineReducers } from 'redux';
import { AsyncState } from 'src/utils/commonAsyncReducer';
import { createReducer } from 'typesafe-actions';
import {
  addUserLinkSocialAsync,
  getSocialUserInfoAsync,
  getUserInfoAsync,
  getUsersAsync,
  updateUserNameAndCardNumberAsync,
  updateUserSocialLinkAsync,
  updateUserTabInfoAsync,
} from './actions';
import { SocialUserInfo, UserInfo } from './types';

export type IUserInfoState = Readonly<{
  user: AsyncState<UserInfo>;
  social: AsyncState<SocialUserInfo[]>;
  users: AsyncState<UserInfo[]>;
}>;

// const defaultAsyncState = {
//   loading: false,
//   error: null,
// };

const defaultAsyncStateWithDataEmpty = {
  data: null,
  loading: false,
  error: null,
};

/* ------------- Initial State ------------- */
const initialState: IUserInfoState = {
  user: {
    ...defaultAsyncStateWithDataEmpty,
  },
  social: {
    ...defaultAsyncStateWithDataEmpty,
  },
  users: {
    data: [],
    loading: false,
    error: null,
  },
};
export const userReducer = createReducer<AsyncState<UserInfo>>(initialState.user)
  .handleAction(getUserInfoAsync.request, state => ({
    ...state,
    loading: true,
  }))
  .handleAction(getUserInfoAsync.success, (state, action) => ({
    ...state,
    loading: false,
    data: action.payload,
  }))
  .handleAction(getUserInfoAsync.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }))
  .handleAction(
    [updateUserNameAndCardNumberAsync.request, updateUserTabInfoAsync.request, addUserLinkSocialAsync.request],
    state => ({
      ...state,
      loading: true,
    }),
  )
  .handleAction(
    [updateUserNameAndCardNumberAsync.success, updateUserTabInfoAsync.success, addUserLinkSocialAsync.success],
    state => ({
      ...state,
      loading: false,
    }),
  )
  .handleAction(
    [updateUserNameAndCardNumberAsync.failure, updateUserTabInfoAsync.failure, addUserLinkSocialAsync.failure],
    (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  );

export const userSocialReducer = createReducer<AsyncState<SocialUserInfo[]>>(initialState.social)
  .handleAction(getSocialUserInfoAsync.request, state => ({
    ...state,
    loading: true,
  }))
  .handleAction(getSocialUserInfoAsync.success, (state, action) => ({
    ...state,
    loading: false,
    data: action.payload,
  }))
  .handleAction(getSocialUserInfoAsync.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }))
  .handleAction(updateUserSocialLinkAsync.request, state => ({
    ...state,
    loading: true,
  }))
  .handleAction(updateUserSocialLinkAsync.success, (state, action) => ({
    ...state,
    loading: false,
  }))
  .handleAction(updateUserSocialLinkAsync.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }));

export const usersReducer = createReducer<AsyncState<UserInfo[]>>(initialState.users)
  .handleAction(getUsersAsync.request, state => ({
    ...state,
    loading: true,
  }))
  .handleAction(getUsersAsync.success, (state, action) => ({
    ...state,
    loading: false,
    data: action.payload,
  }))
  .handleAction(getUsersAsync.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }));

export default combineReducers<IUserInfoState>({
  user: userReducer,
  social: userSocialReducer,
  users: usersReducer,
});
