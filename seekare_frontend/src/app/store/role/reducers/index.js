const { SET_ROLES } = require("../types");

const initialState = {
  items: [],
};

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLES:
      return {
        items: [...action.payload.roles],
      };
    default:
      return state;
  }
};

export default rolesReducer;
