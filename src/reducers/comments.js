import * as Type from '../actions/types';

const defaultComments = {
  sortComments: 'voteScore',
  commentsList: []
}

export const comments = (state = defaultComments, action) => {
  switch (action.type) {
    case Type.SET_COMMENTS :
      return {
        ...state,
        commentsList: [...action.comments]
      }
    case Type.CHANGE_SORT_COMMENTS :
      return {
        ...state,
        sortComments: action.sortComments
      }
    default :
      return state;
  }
}
