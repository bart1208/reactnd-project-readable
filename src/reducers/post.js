import * as Type from '../actions/types';

export const post = (state = { id: 'none' }, action) => {
  switch (action.type) {
    case Type.SET_POST :
      return action.post;
    case Type.ADD_NUMBER_COMMENTS_POST :
      return {
        ...state,
        numberComments: action.numberComments
      };
    default :
      return state;
  }
}
