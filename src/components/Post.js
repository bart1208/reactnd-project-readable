import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import { fetchPostById, fetchDeletePost, loadingPost } from '../actions';
import { FaEdit, FaTrash } from 'react-icons/lib/fa';

import CommentsList from './CommentsList';

class Post extends Component {

  componentWillMount() {
    this.props.dispatchFetchPostById(this.props.postId);
    this.props.dispatchLoadingPost("none");
  }

  redableDate = (timestamp) => {
    let d = new Date(timestamp);
    return d.toLocaleString('en-GB', {  });
  }

  deletePost = () => {
    this.props.dispatchFetchDeletePost(this.props.postId);
  }

  render() {
    const post = this.props.post;

    return (
      <div className="post-block">
        <h2>Post</h2>

        {this.props.loadingPost.loading === "loaded" &&
          <div className="message">Post deleted successfully</div>}

        {this.props.loadingPost.loading === "loading" &&
          <Loading delay={200} type='spin' color='#222' className='loading' />}

        {this.props.loadingPost.loading === "none" &&
          <div>
            <Link to={`/edit-post/${post.id}`} className='post-editPost'><FaEdit/> Edit Post</Link>
            <button className='post-deletePost' onClick={this.deletePost}><FaTrash/> Delete Post</button>
            <div className="post">
              <div className="post-title">{post.title}</div>
              <div className="post-body">{post.body}</div>
              <div className="post-author"><label><b>Author: </b></label>{post.author}</div>
              <div className="post-category"><label><b>Category: </b></label>{post.category}</div>
              <div className="post-date">{this.redableDate(post.timestamp)}</div>
              <div className="post-voteScore"><label><b>Score: </b></label>{post.voteScore}</div>
            </div>
            <CommentsList
              postId={this.props.postId}
            />
          </div>}

      </div>
    )
  }
}

const mapStateToProps = ({ post, loadingPost }) => ({
  post,
  loadingPost
})

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchPostById: (data) => dispatch(fetchPostById(data)),
  dispatchLoadingPost: (data) => dispatch(loadingPost(data)),
  dispatchFetchDeletePost: (data) => dispatch(fetchDeletePost(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
