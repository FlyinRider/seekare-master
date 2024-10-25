import { adminService } from '../../../services/api';
import { SET_POPULAR_KEYWORDS, SET_USAGES_BY_KEYWORD } from '../types';

/**
 * Get max 30 Popular Keyowrds Actions
 */
export const getPopularKeywords = () => {
  return async (dispatch) => {
    try {
      const keywords = await adminService.fetchAdminPopularKeywords();
      dispatch(setPopularKeywords(keywords));
    } catch (error) {}
  };
};

const setPopularKeywords = (keywords) => ({
  type: SET_POPULAR_KEYWORDS,
  payload: {
    keywords,
  },
});

/**
 * Get max 30 Popular Keyowrds Actions
 */
export const getUsagesByKeyword = (key, uid = '') => {
  return async (dispatch) => {
    try {
      const { keyword, users } = await adminService.fetchAdminUsageByKeywords(
        key,
        uid
      );
      dispatch(setUsagesByKeyword(users, keyword));
    } catch (error) {}
  };
};

const setUsagesByKeyword = (usageByKey, keyword) => ({
  type: SET_USAGES_BY_KEYWORD,
  payload: {
    usageByKey,
    keyword,
  },
});
