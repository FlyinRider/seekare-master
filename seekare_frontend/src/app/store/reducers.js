import { combineReducers } from 'redux';
import auth from './auth/reducers';
import ui from './ui/reducers';
import question from './question/reducers';
import answer from './answer/reducers';
import tag from './tag/reducers';
import role from './role/reducers';
import user from './user/reducers';
import wiki from './wiki/reducers';
import keywords from './keywords/reducers';

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    ui,
    question,
    answer,
    tag,
    wiki,
    role,
    user,
    keywords,
    ...asyncReducers,
  });

export default createReducer;
