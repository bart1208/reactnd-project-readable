import * as Type from '../actions/types';

export const commentModalOpen = (state = {isOpen: 'false'}, action) => {
  switch (action.type) {
    case Type.SET_COMMENT_MODAL_OPEN :
      return { isOpen: action.commentModalOpen }
    default :
      return state;
  }
}
