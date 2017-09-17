import { combineReducers } from 'redux';

import {
  SET_CATEGORIES,
  SET_POSTS,
  CHANGE_SORT_POSTS,
  SET_POST,
  SET_COMMENTS,
  CHANGE_SORT_COMMENTS,
  LOADING_POST,
  SET_COMMENT_MODAL_OPEN,
} from '../actions';

const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES :
      return [...action.categories];
    default :
      return state;
  }
}

const defaultPosts = {
  sortPosts: 'voteScore',
  postsList: []
}
const posts = (state = defaultPosts, action) => {
  switch (action.type) {
    case SET_POSTS :
      return {
        ...state,
        postsList: [...action.posts]
      };
    case CHANGE_SORT_POSTS :
      return {
        ...state,
        sortPosts: action.sortPosts
      }
    default :
      return state;
  }
}

const post = (state = {}, action) => {
  switch (action.type) {
    case SET_POST :
      return action.post;
    default :
      return state;
  }
}

const loadingPost = (state = { loading: "none" }, action) => {
  switch (action.type) {
    case LOADING_POST :
      return { loading: action.loadingPost };
    default :
      return state;
  }
}

const defaultComments = {
  sortComments: 'voteScore',
  commentsList: []
}
const comments = (state = defaultComments, action) => {
  switch (action.type) {
    case SET_COMMENTS :
      return {
        ...state,
        commentsList: [...action.comments]
      }
    case CHANGE_SORT_COMMENTS :
      return {
        ...state,
        sortComments: action.sortComments
      }
    default :
      return state;
  }
}

const commentModalOpen = (state = {isOpen: false}, action) => {
  switch (action.type) {
    case SET_COMMENT_MODAL_OPEN :
      return { isOpen: action.commentModalOpen }
    default :
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  post,
  comments,
  loadingPost,
  commentModalOpen
});
