import {
  OPEN_WIKI_LEFT_SIDEBAR,
  OPEN_WIKI_RIGHT_SIDEBAR,
  FETCH_WIKI_BY_ID_SUCCESS,
  CREATE_WIKI_SUCCESS,
  CREATE_WIKI_FAILURE,
  UPDATE_WIKI_SUCCESS,
  UPDATE_WIKI_FAILURE,
  DELETE_WIKI_SUCCESS,
  DELETE_WIKI_FAILURE,
  FETCH_ALL_WIKI_DATA,
  SET_ACTIVE_WIKI_ITEM,
  WIKI_ID_TYPE,
  SET_WIKILIST_KEYWORD,
  SET_WIKILIST_DIALOG_VISIBLE,
  SET_WIKILIST_LOAD_PENDING,
} from "../types";

import { wikiService } from "app/services/api";
import { pushSnackbar } from "app/store/ui/actions";

export const openWikiLeftSidebar = (payload) => ({
  type: OPEN_WIKI_LEFT_SIDEBAR,
  payload,
});

export const openWikiRightSidebar = (payload) => ({
  type: OPEN_WIKI_RIGHT_SIDEBAR,
  payload,
});

const setWikiActiveItem = (payload) => ({
  type: SET_ACTIVE_WIKI_ITEM,
  payload,
});

/**
 * Get Wiki By Tag
 */
const fetchWikiByIDSuccess = (payload) => ({
  type: FETCH_WIKI_BY_ID_SUCCESS,
  payload,
});

export const fetchWikiByID = (wikiId) => {
  return async (dispatch) => {
    try {
      const res = await wikiService.getWikiById(wikiId);
      dispatch(fetchWikiByIDSuccess({ ...res, wikiId }));
      dispatch(setWikiActiveItem({ type: WIKI_ID_TYPE, id: wikiId }));
    } catch (error) { }
  };
};

export const reloadCurrentWiki = () => {
  return async (dispatch, getState) => {
    try {
      const state = await getState();
      const { type: activeWikiType, id: activeWikiId } = state.wiki.activeWiki;
      if (activeWikiType === WIKI_ID_TYPE) {
        dispatch(fetchWikiByID(activeWikiId));
      }
    } catch (error) { }
  };
};
const fetchAllWikisSuccess = (payload) => ({
  type: FETCH_ALL_WIKI_DATA,
  payload,
});

export const fetchAllWikis = () => {
  return async (dispatch) => {
    try {
      const wikis = await wikiService.getAllWikiData();
      dispatch(fetchAllWikisSuccess(wikis));
    } catch (error) { }
  };
};

export const createNewWikiData = () => {
  return async (dispatch) => {
    try {
      dispatch(setWikiActiveItem({ type: WIKI_ID_TYPE, id: "new-wiki" }));
    } catch (error) { }
  };
};

export const fetchWikiListByKeyword = (keyword) => async (dispatch) => {
  try {
    dispatch(setWikiListPending(true));
    const wikiList = await wikiService.getWikiListByKeywoard(keyword);
    dispatch(setWikiListByKeyword(wikiList, keyword));
  } catch (error) { }
  dispatch(setWikiListPending(false));
};

export const setWikiListByKeyword = (wikiList, keyword) => ({
  type: SET_WIKILIST_KEYWORD,
  payload: {
    wikiList,
    keyword,
  },
});

export const showWikiListWindow = (visible) => ({
  type: SET_WIKILIST_DIALOG_VISIBLE,
  payload: visible,
});

export const setWikiListPending = (loading) => ({
  type: SET_WIKILIST_LOAD_PENDING,
  payload: loading,
});

/**
 * Create Wiki
 */
const createWikiSuccess = (payload) => ({ type: CREATE_WIKI_SUCCESS, payload });
const createWikiFailure = (payload) => ({ type: CREATE_WIKI_FAILURE, payload });

export const createWiki = (data, params) => {
  return async (dispatch) => {
    try {
      const res = await wikiService.createWiki(data, params);
      dispatch(createWikiSuccess(res));
      dispatch(reloadCurrentWiki());
    } catch (error) {
      return dispatch(createWikiFailure(error));
    }
  };
};

/**
 * Update Wiki
 */
const updateWikiSuccess = (payload) => ({ type: UPDATE_WIKI_SUCCESS, payload });
const updateWikiFailure = (payload) => ({ type: UPDATE_WIKI_FAILURE, payload });

export const updateWiki = (wikiId, params) => {
  return async (dispatch) => {
    try {
      const response = await wikiService.updateWiki(wikiId, params);

      if (response.status === 200) {
        return dispatch(updateWikiSuccess(response.data));
      }
      return dispatch(updateWikiFailure(response.message));
    } catch (error) {
      return dispatch(updateWikiFailure(error));
    }
  };
};
// question to the wiki
export const appendQuestionWiki = (wikiId, params) => {
  return async (dispatch) => {
    try {
      await wikiService.updateQuestionToWiki(wikiId, params);
      dispatch(reloadCurrentWiki());
      dispatch(
        pushSnackbar("Add or Update the question successfully!", "success")
      );
    } catch (error) {
      dispatch(updateWikiFailure(error));
    }
  };
};

// question to the wiki
export const deleteQuestionToWiki = (wikiId, quizId) => {
  return async (dispatch) => {
    console.log(quizId);
    try {
      await wikiService.deleteQuestionToWiki(wikiId, quizId);
      dispatch(reloadCurrentWiki());
      dispatch(pushSnackbar("Deleted the question from Wiki!", "success"));
    } catch (error) {
      dispatch(updateWikiFailure(error));
      dispatch(
        pushSnackbar("Failed trying to delete the question from Wiki!", "error")
      );
    }
  };
};

/**
 * Delete Wiki
 */
const deleteWikiSuccess = (payload) => ({ type: DELETE_WIKI_SUCCESS, payload });
const deleteWikiFailure = (payload) => ({ type: DELETE_WIKI_FAILURE, payload });

export const deleteWiki = (wikiId) => {
  return async (dispatch) => {
    try {
      const response = await wikiService.deleteWiki(wikiId);

      if (response.status === 200) {
        return dispatch(deleteWikiSuccess(response.data));
      }
      return dispatch(deleteWikiFailure(response.message));
    } catch (error) {
      return dispatch(deleteWikiFailure(error));
    }
  };
};

export const updateWikiCategoryByWikiId = (wikiId, categs) => {
  return async (dispatch) => {
    try {
      await wikiService.updateWikiCategory(wikiId, categs);
      dispatch(reloadCurrentWiki());
    } catch (error) { }
  };
};
