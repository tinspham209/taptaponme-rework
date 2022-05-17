import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { DB_COLLECTION } from 'src/appConfig/fireStoreCollection';
import { fireAuth, fireStore } from 'src/firebase';
import { ChangePasswordPayload, SignInPayload, User } from 'src/redux/authRedux/types';
import { Course, GetCourseDetailParam } from 'src/redux/coursesRedux/types';
import { EditOrderPayload, GetOrderPayload, OrderDetail } from 'src/redux/ordersRedux/types';
import {
  AddUserLinkSocialPayload,
  DeleteUserLinkSocialPayload,
  GetUserInfoPayload,
  SocialUserInfo,
  UpdateUserNameAndCardNumberPayload,
  UpdateUserTabInfoPayload,
  UserInfo,
} from 'src/redux/userRedux/types';
import { TokenService } from '.';

axios.defaults.withCredentials = true;

const create = (baseURL = appConfig.API_URL) => {
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  api.axiosInstance.interceptors.request.use(config => {
    // if (config?.url?.includes('export-custom-declaration')) {
    //   config.headers['response-Type'] = 'blob';
    // }
    return TokenService.getToken()
      .then(token => {
        config.headers.Authorization = 'Bearer ' + token;
        return Promise.resolve(config);
      })
      .catch(() => {
        return Promise.resolve(config);
      });
  });

  const getRoot = () => api.get('');

  // ====================== Auth ======================
  const signIn = (body: SignInPayload) => {
    return fireAuth.setPersistence('session').then(() => {
      return fireAuth.signInWithEmailAndPassword(body.email, body.password);
    });
  };
  const signUp = (body: SignInPayload) => {
    return fireAuth.createUserWithEmailAndPassword(body.email, body.password);
  };

  const signOut = () => fireAuth.signOut();

  const exchangeToken = (user: User) => {
    return fireAuth.onAuthStateChanged(authUser => {
      if (authUser) {
        return authUser;
      } else {
        return null;
      }
    });
  };

  const changePassword = (body: ChangePasswordPayload) => {
    return fireAuth.currentUser.updatePassword(body.newPassword);
  };

  // Renew token is NOT working
  // const renewToken = () => api.get<{ status: string; data: { token: string } }>('/auth/renew', {});

  // const getUserPreference = (params: GetUserPreferencesParams) => {
  //   const { userId } = params;
  //   return api.get(`/users/${userId}/preferences`);
  // };

  // ====================== User Info ======================

  const getUsers = async () => {
    try {
      const dbUser = await fireStore.collection(DB_COLLECTION.USERS).get();
      const data = dbUser.docs.map((doc, index) => {
        return {
          ...doc.data(),
        };
      });
      return data;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  };

  const getUserInfo = async (params: GetUserInfoPayload) => {
    const dbUsers = fireStore.collection(DB_COLLECTION.USERS);
    try {
      const snapshot = await dbUsers.doc(params.uid).get();
      const data = snapshot.data() as UserInfo;
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const getSocialUserInfo = async (params: GetUserInfoPayload) => {
    const dbUserSocial = fireStore.collection(DB_COLLECTION.USERS).doc(params.uid).collection(DB_COLLECTION.SOCIAL);
    try {
      const snapshot = await dbUserSocial.get();
      const data = snapshot.docs.map((doc, index) => {
        return {
          ...doc.data(),
        };
      });
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const updateUserNameAndCardNumber = async (params: UpdateUserNameAndCardNumberPayload) => {
    const dbUsers = fireStore.collection(DB_COLLECTION.USERS);
    try {
      return await dbUsers.doc(params.uid).set({
        name: params.name,
        username: params.username,
        uid: params.uid,
        cardNumber: params.cardNumber,
      });
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
  };

  const updateUserTabInfo = async (params: UpdateUserTabInfoPayload) => {
    const dbUsers = fireStore.collection(DB_COLLECTION.USERS);
    try {
      return await dbUsers.doc(params.uid).update({
        name: params.name,
        description: params.description,
        userAvatar: params.userAvatar,
      });
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
  };
  const addUserLinkSocial = async (params: AddUserLinkSocialPayload) => {
    const dbUsers = fireStore.collection(DB_COLLECTION.USERS);
    try {
      return await dbUsers.doc(params.uid).collection(DB_COLLECTION.SOCIAL).doc(params.icon).set({
        icon: params.icon,
        order: params.order,
        title: params.title,
        url: params.url,
      });
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
  };

  const updateUserSocialLink = async (params: SocialUserInfo) => {
    const dbUserSocial = fireStore.collection(DB_COLLECTION.USERS).doc(params.uid).collection(DB_COLLECTION.SOCIAL);
    try {
      return await dbUserSocial.doc(params.icon).update({
        icon: params.icon,
        order: params.order,
        title: params.title,
        url: params.url,
      });
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
  };

  const deleteUserSocialLink = async (params: DeleteUserLinkSocialPayload) => {
    const dbUserSocial = fireStore.collection(DB_COLLECTION.USERS).doc(params.uid).collection(DB_COLLECTION.SOCIAL);
    try {
      return await dbUserSocial.doc(params.icon).delete();
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
  };

  // ====================== END User Info ======================

  // ====================== Orders ======================

  const getOrders = async () => {
    try {
      const dbUser = await fireStore.collection(DB_COLLECTION.ORDERS).get();
      const data = dbUser.docs.map((doc, index) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      return data;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  };

  const getOrder = async (params: GetOrderPayload) => {
    const dbOrders = fireStore.collection(DB_COLLECTION.ORDERS);
    try {
      const snapshot = await dbOrders.doc(params.uid).get();
      const data = snapshot.data() as OrderDetail;
      return data;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  };

  const editOrder = async (params: EditOrderPayload) => {
    const dbOrders = fireStore.collection(DB_COLLECTION.ORDERS);
    const { uid, order, editInfo } = params;
    try {
      await dbOrders.doc(uid).update({
        ...order,
        editBy: editInfo.editBy,
        updatedTime: editInfo.updatedTime,
      });
      return uid;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  };

  // ====================== END Orders ======================

  // ====================== Courses ======================
  const getCourses = async () => {
    try {
      const dbUser = await fireStore.collection(DB_COLLECTION.COURSES).get();
      const data = dbUser.docs.map((doc, index) => {
        return {
          ...doc.data(),
        };
      });
      return data;
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
  };

  const getCourse = async (params: GetCourseDetailParam) => {
    const dbOrders = fireStore.collection(DB_COLLECTION.COURSES);
    try {
      const snapshot = await dbOrders.doc(params.uid).get();
      const data = snapshot.data() as OrderDetail;
      return data;
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
  };

  const addCourse = async (params: Course) => {
    const dbCourses = fireStore.collection(DB_COLLECTION.COURSES);
    try {
      if (params?.courseUrl) {
        return await dbCourses.doc(params.courseUrl).set(params);
      } else {
        return await dbCourses.add(params);
      }
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
  };

  const editCourse = async (params: Course) => {
    const dbCourses = fireStore.collection(DB_COLLECTION.COURSES);
    try {
      return await dbCourses.doc(params.courseUrl).update(params);
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
  };

  const deleteCourse = async (params: any) => {
    const dbCourses = fireStore.collection(DB_COLLECTION.COURSES);
    try {
      return await dbCourses.doc(params.courseUrl).delete();
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
  };

  // ====================== END Courses ======================

  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  //
  // Notice we're not returning back the `api` created in step 1. That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    getRoot,
    // ====================== Auth ======================

    signIn,
    signUp,
    signOut,
    changePassword,
    exchangeToken,

    // ====================== User Info ======================
    getUsers,
    getUserInfo,
    getSocialUserInfo,
    updateUserNameAndCardNumber,
    updateUserTabInfo,
    addUserLinkSocial,
    updateUserSocialLink,
    deleteUserSocialLink,
    // ====================== END User Info ======================

    // ====================== Orders ======================
    getOrders,
    getOrder,
    editOrder,
    // ====================== END Orders ======================

    // ====================== Courses ======================
    getCourses,
    getCourse,
    addCourse,
    editCourse,
    deleteCourse,
    // ====================== END Courses ======================
  };
};

export type Apis = ReturnType<typeof create>;

export default {
  create,
};
