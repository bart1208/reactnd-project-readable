import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postsSortFunctions } from '../utils/helpers';
import { FaEdit, FaTrash, FaPlus, FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa';
import {
  fetchPosts,
  changeSortPosts,
  fetchDeletePost,
  fetchPostsByCategory,
  fetchVotePostScore
} from '../actions';

class PostsList extends Component {

  componentDidMount() {
    this.props.dispatchFetchPostsOrPostsByCategory(this.props.selectedCategory)
  }

  sortPosts = (event) => {
    this.props.dispatchChangeSortPosts(event.target.value)
  }

  handleVotingPost = (vote, id) => {
    const postVote = {
      id: id,
      option: vote
    }

    this.props.dispatchFetchVotePostScore(postVote)
    this.props.dispatchFetchPostsOrPostsByCategory(this.props.selectedCategory)
  }

  deletePost = (postId) => {
    this.props.dispatchFetchDeletePost(postId);
    this.props.dispatchFetchPostsOrPostsByCategory(this.props.selectedCategory)
  }

  render() {

    const orderedPostsList = this.props.posts
      .map((el, i) => ({
        index: i,
        value: el[this.props.sortMode] || el['voteScore']
      }))
      .sort(postsSortFunctions(this.props.sortMode))
      .map((el) => (
        this.props.posts[el.index]
      ))

    const enhanceOrderedPostsList = orderedPostsList.map((el) => {
      let d = new Date(el.timestamp);
      return {
        ...el,
        dateString: d.toLocaleString('en-GB', {  })
      }
    })

    return (
      <div className="posts-list">
        <h2>Posts</h2>
        <Link to='/add-post' className='posts-addPost'><FaPlus/> Add Post</Link>
        <label className="order-posts-label" htmlFor="order_posts">Order by </label>
        <select id="order_posts" className="order-posts" value={this.props.sortMode} onChange={this.sortPosts}>
          <option value="voteScore">Vote score</option>
          <option value="timestamp">Date</option>
        </select>
        <ul className="posts-list">
          {enhanceOrderedPostsList.map((post) => (
            <li key={post.id}>
              <button className='post-deletePost deletePostList' onClick={() => this.deletePost(post.id)}><FaTrash/> Delete Post</button>
              <Link to={`/edit-post/${post.id}`} className='post-editPost deletePostList'><FaEdit/> Edit Post</Link>
              <Link to={`/post/${post.id}`}>
                <div className="post-title">{post.title}</div>
              </Link>
              <div className="post-body">{post.body}</div>
              <div className="post-author"><label><b>Author: </b></label>{post.author}</div>
              <div className="post-category"><label><b>Category: </b></label>{post.category}</div>
              <div className="post-category"><label><b>Comments: </b></label>{post.numberComments}</div>
              <div className="post-date">{post.dateString}</div>
              <button className="post-FaThumbsOUp" onClick={() => this.handleVotingPost('upVote', post.id)}><FaThumbsOUp /></button>
              <button className="post-FaThumbsODown" onClick={() => this.handleVotingPost('downVote', post.id)}><FaThumbsODown /></button>
              <div className="post-voteScore"><label><b>Score: </b></label>{post.voteScore}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.postsList,
  sortMode: posts.sortPosts
})

const mapDispatchToProps = (dispatch) => ({
  dispatchChangeSortPosts: (data) => dispatch(changeSortPosts(data)),
  dispatchFetchVotePostScore: (data) => dispatch(fetchVotePostScore(data)),
  dispatchFetchDeletePost: (data) => dispatch(fetchDeletePost(data)),
  dispatchFetchPostsOrPostsByCategory: (data) => {
    if (data) {
      return dispatch(fetchPostsByCategory(data))
    } else {
      return dispatch(fetchPosts())
    }
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
