import { combineReducers } from 'redux';

import { categories } from './categories';
import { posts } from './posts';
import { post } from './post';
import { loadingPost, loadingComment } from './loading';
import { comments } from './comments';
import { comment } from './comment';
import { commentModalOpen } from './commentModalOpen';

export default combineReducers({
  categories,
  posts,
  post,
  comments,
  comment,
  loadingPost,
  loadingComment,
  commentModalOpen,
});
