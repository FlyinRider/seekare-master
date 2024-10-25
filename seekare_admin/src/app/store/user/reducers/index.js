import * as UserActions from "./../types";

const initialState = {
  mds: [],
  uploadFile: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActions.SET_MDS:
      return {
        ...state,
        mds: action.payload.mds,
      };
    case UserActions.UPLOAD_FILE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        uploadFile: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
