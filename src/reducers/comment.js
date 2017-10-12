import * as Type from '../actions/types';

export const comment = (state = {}, action) => {
  switch (action.type) {
    case Type.SET_COMMENT :
      return action.comment;
    default :
      return state;
  }
}
