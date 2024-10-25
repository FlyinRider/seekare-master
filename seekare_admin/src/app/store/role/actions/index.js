import { pushSnackbar } from "../../ui/actions";
import { SET_ROLES } from "../types";
import * as API from "./../../../services/api";

export const getRoles = () => {
  return async (dispatch) => {
    try {
      const { roles } = await API.roleService.getRoles();

      dispatch({
        type: SET_ROLES,
        payload: {
          roles,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteRole = (roleID) => {
  return async (dispatch) => {
    try {
      const { roles } = await API.roleService.deleteRole(roleID);
      dispatch({
        type: SET_ROLES,
        payload: {
          roles,
        },
      });

      dispatch(pushSnackbar("Successfully deleted", "success"));
    } catch (error) {
      dispatch(pushSnackbar("Failed To Delete Role", "error"));
    }
  };
};

export const updateRole = (roleID, title, desc) => {
  return async (dispatch) => {
    try {
      const { roles } = await API.roleService.updateRole(roleID, title, desc);

      dispatch({
        type: SET_ROLES,
        payload: {
          roles,
        },
      });
      dispatch(pushSnackbar("Updated role successfully", "success"));
    } catch (error) {
      dispatch(pushSnackbar("Failed to update role", "error"));
    }
  };
};

export const createRole = (title, desc) => {
  return async (dispatch) => {
    try {
      const { roles } = await API.roleService.createRole(title, desc);

      dispatch({
        type: SET_ROLES,
        payload: {
          roles,
        },
      });
      dispatch(pushSnackbar("Updated role successfully", "success"));
    } catch (error) {
      dispatch(pushSnackbar("Failed to create role", "error"));
    }
  };
};
