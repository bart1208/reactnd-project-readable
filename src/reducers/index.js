import { combineReducers } from 'redux';

import {
  SET_CATEGORIES,
  GET_POSTS,
} from '../actions';

const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES :
      return [...action.categories];
    default :
      return state;
  }
}

const posts = (state = {}, action) => {
  switch (action.type) {
    case GET_POSTS :
      return [...action.posts];
    default :
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
});
