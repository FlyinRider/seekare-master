import { updateAuthUserInfo } from "../../auth/actions";
import { UPDATE_EMAIL } from "../../auth/types";
import { pushSnackbar } from "../../ui/actions";
import { ADD_USER, SET_MDS, UPLOAD_FILE_SUCCESS } from "../types";
import * as API from "./../../../services/api";

export const updateUserRole = (userID, selectedRole) => {
  return async (dispatch) => {
    try {
      const { message } = await API.userService.updateUser({
        userID,
        role: selectedRole,
      });

      dispatch(pushSnackbar(message, "success"));
    } catch (error) {}
  };
};

/**
 * Update User by payload
 *
 * @param {Object} payload: userInfo
 * @returns
 */
export const updateUser = (payload) => {
  return async (dispatch) => {
    try {
      const { message } = await API.userService.updateUser(payload);

      dispatch(pushSnackbar(message, "success"));
    } catch (error) {
      dispatch(pushSnackbar(error, "error"));
    }
  };
};

/**
 * Delete User Action
 *
 * @param {String} userID
 */
export const deleteUser = (userID) => {
  return async (dispatch) => {
    try {
      const { message } = await API.userService.deleteUser(userID);

      dispatch(pushSnackbar(message, "success"));
    } catch (error) {
      dispatch(pushSnackbar(error, "error"));
    }
  };
};

/**
 * Deactivate User Action
 *
 * @param {string} userID
 * @param {string} activateStatus
 */
export const deactivateUser = (userID, activateStatus) => {
  return async (dispatch) => {
    try {
      const { status, message } = await API.userService.deactivateUser(
        userID,
        activateStatus
      );

      dispatch(pushSnackbar(message, status));
    } catch (error) {
      dispatch(pushSnackbar("Unknow Error", "error"));
    }
  };
};

/**
 * Get User Detail Info
 */
export const getUser = (userID) => {
  return async (dispatch) => {
    try {
      await API.userService.getUser(userID);
    } catch (error) {
      dispatch(pushSnackbar(error, "error"));
    }
  };
};

/**
 * Get MD Helpers
 */
export const getMDs = () => {
  return async (dispatch) => {
    try {
      const { mds } = await API.userService.getMDs();
      dispatch(setMds(mds));
    } catch (error) {}
  };
};

const setMds = (mds) => ({
  type: SET_MDS,
  payload: {
    mds,
  },
});

/**
 * Create User by Admin
 */
export const createUser = (username, email, password) => {
  return async (dispatch) => {
    try {
      const { newUser } = await API.userService.createUser(
        username,
        email,
        password
      );

      dispatch(addUser(newUser));
    } catch (error) {
      dispatch(pushSnackbar(error, "error"));
    }
  };
};

const addUser = (newUser) => ({
  type: ADD_USER,
  payload: {
    newUser,
  },
});

export const updateEmail = (userID, email) => {
  return async (dispatch) => {
    try {
      const { status, message } = await API.userService.updateEmail(
        userID,
        email
      );

      if (status === "success") dispatch(updateUserEmail(email));

      dispatch(pushSnackbar(message, status));
    } catch (error) {
      dispatch(pushSnackbar("Unknow Error", "error"));
    }
  };
};

const updateUserEmail = (email) => ({
  type: UPDATE_EMAIL,
  payload: {
    email,
  },
});

export const updateInfo = (userID, username, intro) => {
  return async (dispatch) => {
    try {
      const { status, message, info } = await API.userService.updateUserInfo(
        userID,
        username,
        intro
      );

      if (status === "success")
        dispatch(updateAuthUserInfo(info.username, info.intro));
      dispatch(pushSnackbar(message, status));
    } catch (error) {
      dispatch(pushSnackbar("Unknown Error", "error"));
    }
  };
};

const uploadFileSuccess = (data) => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: data,
});

export const uploadFile = (payload) => {
  return async (dispatch) => {
    try {
      const { status, message, data } = await API.userService.uploadFile(
        payload
      );

      if (status === "success") return dispatch(uploadFileSuccess(data));
      // dispatch(pushSnackbar(message, status));
    } catch (error) {
      dispatch(pushSnackbar("Unknown Error", "error"));
    }
  };
};
