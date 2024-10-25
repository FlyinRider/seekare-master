import { SET_POPULAR_KEYWORDS, SET_USAGES_BY_KEYWORD } from '../types';

const initialState = {
  keywords: [],
  usageByKey: null,
};

const keywordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POPULAR_KEYWORDS:
      return {
        ...state,
        keywords: action.payload.keywords.map(({ name, count }) => ({
          name,
          count,
        })),
      };
    case SET_USAGES_BY_KEYWORD: {
      const { usageByKey, keyword } = action.payload;
      return {
        ...state,
        usageByKey: {
          keyword,
          users:
            usageByKey.map(({ userId, count, user }) => ({
              userId,
              count,
              user: user && user[0],
            })) || [],
        },
      };
    }
    default:
      return state;
  }
};

export default keywordsReducer;
