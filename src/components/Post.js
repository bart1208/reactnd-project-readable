import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPostById } from '../actions';

import CommentsList from './CommentsList';

class Post extends Component {

  componentWillMount() {
    this.props.dispatchFetchPostById(this.props.postId)
  }

  render() {
    const post = this.props.post;

    return (
      <div className="post-block">
        <div className="post">
          <h2>Post</h2>
          <div className="post-title">{post.title}</div>
          <div className="post-body">{post.body}</div>
          <div className="post-author"><label><b>Author: </b></label>{post.author}</div>
          <div className="post-category"><label><b>Category: </b></label>{post.category}</div>
          <div className="post-date">{post.dateString}</div>
          <div className="post-voteScore"><label><b>Score: </b></label>{post.voteScore}</div>
        </div>
        <CommentsList
          postId={this.props.postId}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ post }) => ({
  post
})

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchPostById: (data) => dispatch(fetchPostById(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
