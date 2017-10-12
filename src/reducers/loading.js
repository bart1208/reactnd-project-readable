import * as Type from '../actions/types';

export const loadingPost = (state = { loading: "none" }, action) => {
  switch (action.type) {
    case Type.LOADING_POST :
      return { loading: action.loadingPost };
    default :
      return state;
  }
}

export const loadingComment = (state = { loading: "none" }, action) => {
  switch (action.type) {
    case Type.LOADING_COMMENT :
      return { loading: action.loadingComment };
    default :
      return state;
  }
}
