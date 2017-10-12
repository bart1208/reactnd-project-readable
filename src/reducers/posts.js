import * as Type from '../actions/types';

const defaultPosts = {
  sortPosts: 'voteScore',
  postsList: []
}

export const posts = (state = defaultPosts, action) => {
  switch (action.type) {
    case Type.SET_POSTS :
      return {
        ...state,
        postsList: [...action.posts]
      };
    case Type.ADD_NUMBER_COMMENTS_PER_POST :
      const postPosition = state.postsList.findIndex(element => (element.id === action.idPost));
      let newPostsList = [...state.postsList];
      if (typeof newPostsList[postPosition] === 'object')
        newPostsList[postPosition].numberComments = action.numberComments;

      return {
        ...state,
        postsList: newPostsList
      };
    case Type.CHANGE_SORT_POSTS :
      return {
        ...state,
        sortPosts: action.sortPosts
      }
    default :
      return state;
  }
}
