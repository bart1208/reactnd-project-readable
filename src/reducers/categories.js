import * as Type from '../actions/types';

export const categories = (state = [], action) => {
  switch (action.type) {
    case Type.SET_CATEGORIES :
      return [...action.categories];
    default :
      return state;
  }
}
