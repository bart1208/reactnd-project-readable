import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, changeSortPosts, fetchPostsByCategory } from '../actions';
import { postsSortFunctions } from '../utils/helpers';
import { FaPlus } from 'react-icons/lib/fa';

class PostsList extends Component {

  componentDidMount() {
    if (this.props.selectedCategory) {
      this.props.dispatchFetchPostsByCategory(this.props.selectedCategory)
    } else {
      this.props.dispatchFetchPosts()
    }
  }

  sortPosts = (event) => {
    this.props.dispatchChangeSortPosts(event.target.value)
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
        <Link to='/' className='posts-addPost'><FaPlus/> Add Post</Link>
        <label className="order-posts-label" htmlFor="order_posts">Order by </label>
        <select id="order_posts" className="order-posts" value={this.props.sortMode} onChange={this.sortPosts}>
          <option value="voteScore">Vote score</option>
          <option value="timestamp">Date</option>
        </select>
        <ul className="posts-list">
          {enhanceOrderedPostsList.map((post) => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>
                <div className="post-title">{post.title}</div>
              </Link>
              <div className="post-body">{post.body}</div>
              <div className="post-author"><label><b>Author: </b></label>{post.author}</div>
              <div className="post-category"><label><b>Category: </b></label>{post.category}</div>
              <div className="post-date">{post.dateString}</div>
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
  dispatchFetchPostsByCategory: (data) => dispatch(fetchPostsByCategory(data)),
  dispatchFetchPosts: (data) => dispatch(fetchPosts(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
