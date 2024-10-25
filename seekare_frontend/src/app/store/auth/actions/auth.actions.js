import { openModal } from "app/store/ui/actions";
import { closeModal, pushSnackbar } from "../../ui/actions";
import { api, authService, paymentService } from "./../../../services/api";
import * as AuthTypes from "./../types";
import {
  SET_PAYMENT,
  SET_USERS,
  ATUH_UPDATE_INFO,
  UPDATE_REDIRECT_URL,
  UPDATE_ACTION_DATA,
} from "./../types";

export const signIn = (emailOrName, password) => {
  return async (dispatch, getState) => {
    dispatch(authPending(true));

    try {
      dispatch(pushSnackbar("", ""));
      const data = await authService.signInWithEmailOrName({
        emailOrName,
        password,
      });

      dispatch(signInSuccess(data));

      api.setToken(data.token);

      dispatch(authPending(false));
      dispatch(pushSnackbar("Successfully Logged In", "success"));
      if (getState().ui.modal.modalType === "LOGIN_MODAL") {
        dispatch(closeModal());
        return data;
      }
    } catch (error) {
      dispatch(pushSnackbar("Sign In Failed, Please try again!", "error"));
      dispatch(signInFail(error));
      dispatch(authPending(false));
    }
  };
};

const signInSuccess = (data) => ({
  type: AuthTypes.POST_SIGNIN_SUCCESS,
  payload: { data },
});

const signInFail = (err) => ({
  type: AuthTypes.POST_SIGNIN_FAILED,
  payload: { error: err },
});
export const emailPending = (pending) => ({
  type: AuthTypes.EMAILCONFIRMATION_PENDING,
  payload: { pending },
});
const emailSent = (data) => ({
  type: AuthTypes.POST_EMAIL_SENT,
  payload: { data },
});

export const emailConfirm = (username, email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch(authPending(true));
      const res = await authService.emailConfirm({
        username,
        email,
      });
      dispatch(authPending(false));
      if (res.status != 200) {
        console.log(res,'testewreadfsdafhsaoudhfoisdajfoisadjfisdajf')
        // dispatch(signUpFail(res.data.error));
        dispatch(pushSnackbar('User Name or Email is already taken', "error"));
        dispatch(pushSnackbar('', "error"));
      } else if (res.status === 200) {
        dispatch(closeModal())
        dispatch(emailPending(true));
        dispatch(emailSent(res.data));
        dispatch(pushSnackbar(`Successfully sent verify code to ${email}`, "success"));
        dispatch(pushSnackbar('', "success"));
        dispatch(openModal("EMAIL_CONFIRM", { username, email, password }));
        // if (getState().ui.modal.modalType === "REGISTER_MODAL") {
        //   dispatch(closeModal());
        // }
        return res
      }
    } catch (error) {
      console.log(error);
      dispatch(signUpFail(error));
      dispatch(authPending(false));
      dispatch(emailPending(false));
    }
  };
};
// 
export const signUp = (username, email, password) => {
  return async (dispatch, getState) => {
    dispatch(closeModal());
    dispatch(authPending(true));
    try {
      const res = await authService.signUpWithEmail({
        username,
        email,
        password,
      });
      dispatch(authPending(false));
      if (res.status === 200) {
        dispatch(signUpSuccess(res.data));

        api.setToken(res.data.token);
        dispatch(pushSnackbar("Successfully registerd", "success"));
        if (getState().ui.modal.modalType === "REGISTER_MODAL") {
          dispatch(closeModal());
        }
        return res
      } else {
        dispatch(signUpFail(res.data.error));
        dispatch(pushSnackbar(res.data.message, res.data.status));
      }
    } catch (error) {
      dispatch(signUpFail(error));
      dispatch(authPending(false));
    }
  };
};

export const signUpWithGoogle = (tokenId) => {
  return async (dispatch, getState) => {
    dispatch(authPending);

    try {
      const res = await authService.signUpWithGoogle(tokenId);

      dispatch(authPending(false));
      if (res.status === 201) {
        dispatch(signUpFail(res.data.error));
        dispatch(pushSnackbar(res.data.message, res.data.status));
      } else if (res.status === 200) {
        dispatch(signUpSuccess(res.data));

        api.setToken(res.data.token);

        dispatch(pushSnackbar("Successfully registerd", "success"));

        if (getState().ui.modal.modalType === "REGISTER_MODAL") {
          dispatch(closeModal());
        }
      }
    } catch (error) {
      dispatch(signUpFail(error));

      dispatch(authPending(false));
    }
  };
};

export const signInWithGoogle = (tokenId) => {
  return async (dispatch, getState) => {
    dispatch(authPending(true));

    try {
      const res = await authService.signInWithGoogle(tokenId);

      if (res.status === 201) {
        dispatch(signInFail(res.data.error));
        dispatch(pushSnackbar(res.data.message, res.data.status));
      } else if (res.status === 200) {
        dispatch(signInSuccess(res.data));

        api.setToken(res.data.token);

        dispatch(pushSnackbar("Successfully registerd", "success"));
        if (getState().ui.modal.modalType === "REGISTER_MODAL") {
          dispatch(closeModal());
        }
      }
    } catch (error) {
      dispatch(signInFail(error));
      dispatch(pushSnackbar("Sign In Failed, Please try again!", "error"));
      dispatch(authPending(false));
    }
  };
};

const signUpSuccess = (data) => ({
  type: AuthTypes.POST_SIGNUP_SUCCESS,
  payload: { data },
});

const signUpFail = (error) => ({
  type: AuthTypes.POST_SIGNUP_FAILED,
  payload: { error },
});

export const authPending = (pending) => ({
  type: AuthTypes.AUTHENTICATION_PENDING,
  payload: { pending },
});

export const signInWithToken = () => {
  return async (dispatch) => {
    dispatch(authPending(true));

    try {
      const data = await authService.signInWithToken();
      if (data.success) {
        dispatch(signInSuccess(data));
      } else {
        api.clearToken();
      }

      dispatch(authPending(false));
    } catch (error) {
      dispatch(signInFail(error));

      dispatch(authPending(false));
      api.clearToken();
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    api.clearToken();
    window.location.href = "/";
    dispatch({
      type: AuthTypes.LOG_OUT,
    });
    dispatch(pushSnackbar("Logged Out", "warning"));
  };
};

export const registerMembership = (paymetData) => {
  return async (dispatch, getState) => {
    try {
      const { payment, role } = await paymentService.registerMembership(
        paymetData
      );

      dispatch({
        type: SET_PAYMENT,
        payload: {
          payment,
          role,
        },
      });

      dispatch(pushSnackbar("You are now in Premium Membership", "success"));

      if (getState().ui.modal.modalType === "REGISTER_MODAL") {
        dispatch(closeModal());
      }
    } catch (error) {
      dispatch(pushSnackbar("Failed, Please try again", "error"));
    }
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const { users } = await authService.getUsers();
      dispatch(setUsers(users));
    } catch (error) {}
  };
};

const setUsers = (users) => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

export const updateAuthUserInfo = (username, intro) => ({
  type: ATUH_UPDATE_INFO,
  payload: {
    username,
    intro,
  },
});

export const updateRedirectUrl = (url) => ({
  type: UPDATE_REDIRECT_URL,
  payload: url,
});

export const updateActionData = (data) => ({
  type: UPDATE_ACTION_DATA,
  payload: data,
});
