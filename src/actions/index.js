import * as ReadableAPI from '../utils/api';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const ADD_NUMBER_COMMENTS_PER_POST = 'ADD_NUMBER_COMMENTS_PER_POST';
export const ADD_NUMBER_COMMENTS_POST = 'ADD_NUMBER_COMMENTS_POST';
export const CHANGE_SORT_POSTS = 'CHANGE_SORT_POSTS';
export const SET_POST = 'SET_POST';
export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_COMMENT = 'SET_COMMENT';
export const CHANGE_SORT_COMMENTS = 'CHANGE_SORT_COMMENTS';
export const LOADING_POST = 'LOADING_POST';
export const SET_COMMENT_MODAL_OPEN = 'SET_COMMENT_MODAL_OPEN';
export const LOADING_COMMENT = 'LOADING_COMMENT';

// CATEGORIES
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories
})
export const fetchCategories = () => dispatch => (
  ReadableAPI
    .getCategories()
    .then(categories => dispatch(setCategories(categories)))
)

// POSTS
export const setPosts = (posts) => ({
  type: SET_POSTS,
  posts
})
export const addNumberCommentsPerPost = (idPost, numberComments) => ({
  type: ADD_NUMBER_COMMENTS_PER_POST,
  idPost,
  numberComments
})
export const addNumberCommentsPost = (idPost, numberComments) => ({
  type: ADD_NUMBER_COMMENTS_POST,
  idPost,
  numberComments
})
export const changeSortPosts = (sortPosts) => ({
  type: CHANGE_SORT_POSTS,
  sortPosts
})
export const setPost = (post) => ({
  type: SET_POST,
  post
})
export const loadingPost = (loadingPost) => ({
  type: LOADING_POST,
  loadingPost
})
export const fetchPosts = () => dispatch => (
  ReadableAPI
    .getPosts()
    .then(posts => dispatch(setPosts(posts)))
    .then(posts => {
      posts.posts.map(post => dispatch(fetchNumberCommentsByPostId(post.id)));
    })
)
export const fetchPostsByCategory = (category) => dispatch => (
  ReadableAPI
    .getPostsByCategory(category)
    .then(posts => dispatch(setPosts(posts)))
    .then(posts => {
      posts.posts.map(post => dispatch(fetchNumberCommentsByPostId(post.id)));
    })
)
export const fetchNumberCommentsByPostId = (postId) => dispatch => (
  ReadableAPI
    .getCommentsByPostId(postId)
    .then(comments => dispatch(addNumberCommentsPerPost(postId, comments.length)))
)
export const fetchNumberCommentsByPostIdSingle = (postId) => dispatch => {
  ReadableAPI
    .getCommentsByPostId(postId)
    .then(comments => dispatch(addNumberCommentsPost(postId, comments.length)))
}
export const fetchPostById = (postId) => dispatch => (
  ReadableAPI
    .getPostById(postId)
    .then(post => dispatch(setPost(post)))
    .then(post => dispatch(fetchNumberCommentsByPostIdSingle(postId)))
)
export const fetchAddPost = (postData) => dispatch => {
  dispatch(loadingPost("loading"));
  ReadableAPI
    .addPost(postData)
    .then(post => dispatch(setPost(post)))
    .then(() => dispatch(loadingPost("loaded")))
}
export const fetchEditPost = (postData) => dispatch => {
  dispatch(loadingPost("loading"));
  ReadableAPI
    .editPost(postData)
    .then(post => dispatch(setPost(post)))
    .then(() => dispatch(loadingPost("loaded")))
}
export const fetchDeletePost = (postId) => dispatch => {
  dispatch(loadingPost("loading"));
  ReadableAPI
    .deletePost(postId)
    //.then(post => dispatch(setPost(post)))
    .then(() => dispatch(loadingPost("loaded")))
}
export const fetchVotePostScore = (postVote) => dispatch => (
  ReadableAPI
    .votingPost(postVote)
)

// COMMENTS
export const setCommentModalOpen = (commentModalOpen) => ({
  type: SET_COMMENT_MODAL_OPEN,
  commentModalOpen
})
export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments
})
export const setComment = (comment) => ({
  type: SET_COMMENT,
  comment
})
export const changeSortComments = (sortComments) => ({
  type: CHANGE_SORT_COMMENTS,
  sortComments
})
export const loadingComment = (loadingComment) => ({
  type: LOADING_COMMENT,
  loadingComment
})
export const fetchCommentsByPostId = (postId) => dispatch => (
  ReadableAPI
    .getCommentsByPostId(postId)
    .then(comments => dispatch(setComments(comments)))
)
export const fetchAddComment = (commentData) => dispatch => {
  dispatch(loadingComment("loading"));
  ReadableAPI
    .addComment(commentData)
    .then(comment => dispatch(setComment(comment)))
    .then(() => dispatch(loadingComment("loaded")))
}
export const fetchCommentById = (commentId) => dispatch => (
  ReadableAPI
    .getCommentById(commentId)
    .then(comment => dispatch(setComment(comment)))
)
export const fetchDeleteComment = (commentId) => dispatch => {
  dispatch(loadingComment("loading"));
  ReadableAPI
    .deleteComment(commentId)
    .then(() => dispatch(loadingComment("loaded")))
}
export const fetchEditComment = (commentData) => dispatch => {
  dispatch(loadingComment("loading"));
  ReadableAPI
    .editComment(commentData)
    .then(comment => dispatch(setComment(comment)))
    .then(() => dispatch(loadingComment("loaded")))
}
export const fetchVoteCommentScore = (commentVote) => dispatch => {
  ReadableAPI
    .votingComment(commentVote)
}
