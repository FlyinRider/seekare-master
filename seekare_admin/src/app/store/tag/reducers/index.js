import * as TagActionTypes from "../types";

const initialState = {
  tags: [],
};

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TagActionTypes.SET_TAGS:
      return {
        ...state,
        tags: action.payload.tags,
      };
    default:
      return state;
  }
};

export default tagsReducer;
