import * as ReadableAPI from '../utils/api';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const CHANGE_SORT_POSTS = 'CHANGE_SORT_POSTS';
export const SET_POST = 'SET_POST';
export const SET_COMMENTS = 'SET_COMMENTS';
export const CHANGE_SORT_COMMENTS = 'CHANGE_SORT_COMMENTS';

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories
})
export const fetchCategories = () => dispatch => (
  ReadableAPI
    .getCategories()
    .then(categories => dispatch(setCategories(categories)))
)

export const setPosts = (posts) => ({
  type: SET_POSTS,
  posts
})
export const fetchPosts = () => dispatch => (
  ReadableAPI
    .getPosts()
    .then(posts => dispatch(setPosts(posts)))
)
export const fetchPostsByCategory = (category) => dispatch => (
  ReadableAPI
    .getPostsByCategory(category)
    .then(posts => dispatch(setPosts(posts)))
)

export const changeSortPosts = (sortPosts) => ({
  type: CHANGE_SORT_POSTS,
  sortPosts
})

export const setPost = (post) => ({
  type: SET_POST,
  post
})
export const fetchPostById = (postId) => dispatch => (
  ReadableAPI
    .getPostById(postId)
    .then(post => dispatch(setPost(post)))
)

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments
})
export const fetchCommentsByPostId = (postId) => dispatch => (
  ReadableAPI
    .getCommentsByPostId(postId)
    .then(comments => dispatch(setComments(comments)))
)
export const changeSortComments = (sortComments) => ({
  type: CHANGE_SORT_COMMENTS,
  sortComments
})
