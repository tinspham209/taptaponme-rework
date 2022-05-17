import { createAsyncAction } from 'typesafe-actions';
import { Callback } from '../types';
import {
  AddUserLinkSocialPayload,
  DeleteUserLinkSocialPayload,
  GetUserInfoPayload,
  SocialUserInfo,
  UpdateUserNameAndCardNumberPayload,
  UpdateUserTabInfoPayload,
  UserInfo,
} from './types';

export const getUsersAsync = createAsyncAction(
  'user/GET_USERS_REQUEST',
  'user/GET_USERS_SUCCESS',
  'user/GET_USERS_FAILURE',
)<void, UserInfo[], Error>();

export const getUserInfoAsync = createAsyncAction(
  'user/GET_USER_INFO_REQUEST',
  'user/GET_USER_INFO_SUCCESS',
  'user/GET_USER_INFO_FAILURE',
)<
  {
    payload: GetUserInfoPayload;
    callback?: Callback;
  },
  UserInfo,
  Error
>();

export const getSocialUserInfoAsync = createAsyncAction(
  'user/GET_SOCIAL_USER_INFO_REQUEST',
  'user/GET_SOCIAL_USER_INFO_SUCCESS',
  'user/GET_SOCIAL_USER_INFO_FAILURE',
)<
  {
    payload: GetUserInfoPayload;
    callback?: Callback;
  },
  SocialUserInfo[],
  Error
>();

export const updateUserNameAndCardNumberAsync = createAsyncAction(
  'user/UPDATE_USERNAME_PROFILE_REQUEST',
  'user/UPDATE_USERNAME_PROFILE_SUCCESS',
  'user/UPDATE_USERNAME_PROFILE_FAILURE',
)<{ payload: UpdateUserNameAndCardNumberPayload; callback?: Callback }, void, Error>();

export const updateUserTabInfoAsync = createAsyncAction(
  'user/UPDATE_TAB_INFO_REQUEST',
  'user/UPDATE_TAB_INFO_SUCCESS',
  'user/UPDATE_TAB_INFO_FAILURE',
)<{ payload: UpdateUserTabInfoPayload; callback?: Callback }, void, Error>();

export const addUserLinkSocialAsync = createAsyncAction(
  'user/ADD_USER_LINK_SOCIAL_REQUEST',
  'user/ADD_USER_LINK_SOCIAL_SUCCESS',
  'user/ADD_USER_LINK_SOCIAL_FAILURE',
)<{ payload: AddUserLinkSocialPayload; callback?: Callback }, void, Error>();

export const updateUserSocialLinkAsync = createAsyncAction(
  'user/UPDATE_USER_SOCIAL_LINK_REQUEST',
  'user/UPDATE_USER_SOCIAL_LINK_SUCCESS',
  'user/UPDATE_USER_SOCIAL_LINK_FAILURE',
)<{ payload: SocialUserInfo; callback?: Callback }, void, Error>();

export const deleteUserSocialLinkAsync = createAsyncAction(
  'user/DELETE_USER_SOCIAL_LINK_REQUEST',
  'user/DELETE_USER_SOCIAL_LINK_SUCCESS',
  'user/DELETE_USER_SOCIAL_LINK_FAILURE',
)<{ payload: DeleteUserLinkSocialPayload; callback?: Callback }, void, Error>();
