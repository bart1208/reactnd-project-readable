import * as ReadableAPI from '../utils/api';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories
})
export const fetchCategories = () => dispatch => (
  ReadableAPI
    .getCategories()
    .then(categories => dispatch(setCategories(categories)))
)

export const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
})
