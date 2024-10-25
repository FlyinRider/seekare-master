import {
  OPEN_WIKI_LEFT_SIDEBAR,
  OPEN_WIKI_RIGHT_SIDEBAR,
  FETCH_WIKI_BY_TAG_SUCCESS,
  FETCH_ALL_WIKI_DATA,
  FETCH_WIKI_BY_ID_SUCCESS,
  CREATE_WIKI_SUCCESS,
  CREATE_WIKI_FAILURE,
  UPDATE_WIKI_SUCCESS,
  DELETE_WIKI_SUCCESS,
  SET_ACTIVE_WIKI_ITEM,
  SET_WIKILIST_KEYWORD,
  SET_WIKILIST_DIALOG_VISIBLE,
  SET_WIKILIST_LOAD_PENDING,
} from '../types';

const initialState = {
  loading: false,
  errors: [],
  activeWiki: {},
  wikiList: {
    data: [],
    visible: false,
    keyword: '',
    loading: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_WIKI_LEFT_SIDEBAR:
      return {
        ...state,
        wikiLeftSidebarData: action.payload,
      };
    case OPEN_WIKI_RIGHT_SIDEBAR:
      return {
        ...state,
        wikiRightSidebarData: action.payload,
      };
    case FETCH_ALL_WIKI_DATA:
      return {
        ...state,
        wikis: action.payload,
      };
    case SET_ACTIVE_WIKI_ITEM:
      return {
        ...state,
        activeWiki: action.payload,
      };

    case FETCH_WIKI_BY_TAG_SUCCESS:
      return {
        ...state,
        wikiByTag: action.payload,
      };
    case FETCH_WIKI_BY_ID_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        wikiById: action.payload,
      };
    case CREATE_WIKI_SUCCESS:
      return {
        ...state,
        wiki: action.payload,
      };
    case CREATE_WIKI_FAILURE:
      return {
        ...state,
        wiki: action.payload,
      };
    case UPDATE_WIKI_SUCCESS:
      return {
        ...state,
        wiki: action.payload,
      };
    case DELETE_WIKI_SUCCESS:
      return {
        ...state,
        wiki: action.payload,
      };
    case SET_WIKILIST_KEYWORD: {
      return {
        ...state,
        wikiList: {
          ...state.wikiList,
          data: action.payload.wikiList,
          keyword: action.payload.keyword,
        },
      };
    }
    case SET_WIKILIST_DIALOG_VISIBLE:
      return {
        ...state,
        wikiList: {
          ...state.wikiList,
          visible: action.payload,
        },
      };
    case SET_WIKILIST_LOAD_PENDING:
      return {
        ...state,
        wikiList: {
          ...state.wikiList,
          loading: action.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
