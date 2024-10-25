import * as AuthTypes from "./../types";

const initialState = {
  pending: false,
  isAuthenticated: false,
  token: null,
  user_data: {},
  error: null,
  redirect_url: "",
  actionData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.POST_SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.data.token,
        user_data: {
          userID: action.payload.data.userID,
          username: action.payload.data.username,
          email: action.payload.data.email,
          role: action.payload.data.role,
          searchHistory: action.payload.data.searchHistory,
        },
      };
    case AuthTypes.POST_SIGNUP_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user_data: {},
      };
    case AuthTypes.POST_SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.data.token,
        user_data: {
          userID: action.payload.data.userID,
          username: action.payload.data.username,
          email: action.payload.data.email,
          role: action.payload.data.role,
          searchHistory: action.payload.data.searchHistory,
        },
      };
    case AuthTypes.POST_EMAIL_SENT:
      return {
        ...state,
        code: action.payload.data.code,
      };
    case AuthTypes.POST_SIGNIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user_data: {},
      };
    case AuthTypes.AUTHENTICATION_PENDING:
      return {
        ...state,
        pending: action.payload.pending,
      };
    case AuthTypes.EMAILCONFIRMATION_PENDING:
      return {
        ...state,
        emailConfirming: action.payload.pending,
      };
    case AuthTypes.SET_PAYMENT:
      return {
        ...state,
        user_data: {
          ...state.user_data,
          role: action.payload.role,
          payment: action.payload.payment,
        },
      };
    case AuthTypes.UPDATE_EMAIL:
      return {
        ...state,
        user_data: {
          ...state.user_data,
          email: action.payload.email,
        },
      };
    case AuthTypes.ATUH_UPDATE_INFO:
      return {
        ...state,
        user_data: {
          ...state.user_data,
          ...action.payload, // {username, intro}
        },
      };
    case AuthTypes.LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user_data: {},
      };
    case AuthTypes.UPDATE_REDIRECT_URL:
      return {
        ...state,
        redirect_url: action.payload,
      };
    case AuthTypes.UPDATE_ACTION_DATA:
      return {
        ...state,
        actionData: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
