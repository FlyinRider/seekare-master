import React, { useReducer } from "react";
import {
  fetchAdminCommonData,
  fetchAdminInviteEmailData,
  fetchUserAdminAnalysis,
} from "app/services/api/admin.service.js";

const DashboardContext = React.createContext();

const initialState = {
  user: { loading: false, data: [], labels: [], total: 0 },
  common: { wikis: 0, users: 0, quiz: 0, loading: false },
  email: { loading: false, data: [], labels: [], total: 0 },
};

const USER_SIGNUP_DATA_LOADING = `USER_SIGNUP_DATA_LOADING`;
const USER_SIGNUP_DATA_SUCCESS = `USER_SIGNUP_DATA_SUCCESS`;
const USER_SIGNUP_DATA_FAILED = `USER_SIGNUP_DATA_FAILED`;
const COMMON_INFO_DATA_LOADING = `COMMON_INFO_DATA_LOADING`;
const COMMON_INFO_DATA_SUCCESS = `COMMON_INFO_DATA_SUCCESS`;
const COMMON_INFO_DATA_FAILED = `COMMON_INFO_DATA_FAILED`;
const EMAIL_SENDING_DATA_LOADING = `EMAIL_SENDING_DATA_LOADING`;
const EMAIL_SENDING_DATA_SUCCESS = `EMAIL_SENDING_DATA_SUCCESS`;
const EMAIL_SENDING_DATA_FAILED = `EMAIL_SENDING_DATA_FAILED`;

const shortMonthsName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function reducer(state, action) {
  switch (action.type) {
    case USER_SIGNUP_DATA_LOADING:
      return { ...state, user: { ...state.user, loading: true } };
    case USER_SIGNUP_DATA_SUCCESS: {
      const { type } = action.payload;
      const labels = action.payload.map((item) => {
        const start = new Date(item.start);
        const end = new Date(item.end);
        return `${shortMonthsName[start.getMonth()]} ${start.getDate()} - ${
          shortMonthsName[end.getMonth()]
        } ${end.getDate()}`;
      });
      const data = action.payload.map((item) => item.count);

      return { ...state, user: { loading: false, labels, data, type } };
    }
    case USER_SIGNUP_DATA_FAILED:
      return {
        ...state,
        user: { loading: false, data: [], total: 0, labels: [] },
      };
    case EMAIL_SENDING_DATA_LOADING:
      return { ...state, email: { ...state.email, loading: true } };
    case EMAIL_SENDING_DATA_SUCCESS: {
      const { type } = action.payload;
      const labels = action.payload.map((item) => {
        const start = new Date(item.start);
        const end = new Date(item.end);
        return `${shortMonthsName[start.getMonth()]} ${start.getDate()} - ${
          shortMonthsName[end.getMonth()]
        } ${end.getDate()}`;
      });
      const data = action.payload.map((item) => item.count);

      return { ...state, email: { loading: false, labels, data, type } };
    }
    case EMAIL_SENDING_DATA_FAILED:
      return {
        ...state,
        email: { loading: false, data: [], total: 0, labels: [] },
      };
    case COMMON_INFO_DATA_LOADING: {
      return { ...state, common: { ...state.common, loading: true } };
    }
    case COMMON_INFO_DATA_SUCCESS: {
      return { ...state, common: { loading: false, ...action.payload } };
    }

    case COMMON_INFO_DATA_FAILED: {
      return {
        ...state,
        common: { loading: false, wikis: 0, quizs: 0, users: 0 },
      };
    }

    default:
      throw new Error();
  }
}

const DashboardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchUserData = async (type = "week") => {
    try {
      dispatch({ type: USER_SIGNUP_DATA_LOADING });
      const { analysis: payload } = await fetchUserAdminAnalysis({
        type,
      });
      dispatch({ type: USER_SIGNUP_DATA_SUCCESS, payload });
      return;
    } catch (error) {}
    dispatch({ type: USER_SIGNUP_DATA_FAILED });
  };

  const fetchUserCommonData = async () => {
    try {
      dispatch({ type: COMMON_INFO_DATA_LOADING });
      const payload = await fetchAdminCommonData();
      dispatch({ type: COMMON_INFO_DATA_SUCCESS, payload });
      return;
    } catch (error) {}
    dispatch({ type: COMMON_INFO_DATA_FAILED });
  };

  const fetchInviteEmailData = async () => {
    try {
      dispatch({ type: EMAIL_SENDING_DATA_LOADING });
      const payload = await fetchAdminInviteEmailData();
      dispatch({ type: EMAIL_SENDING_DATA_SUCCESS, payload });
      return;
    } catch (error) {}
    dispatch({ type: EMAIL_SENDING_DATA_FAILED });
  };

  return (
    <DashboardContext.Provider
      value={{
        fetchUserData,
        fetchUserCommonData,
        fetchInviteEmailData,
        state,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardContextProvider };
