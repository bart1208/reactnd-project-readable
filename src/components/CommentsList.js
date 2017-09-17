import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/lib/fa';
import { postsSortFunctions } from '../utils/helpers';
import { fetchCommentsByPostId, changeSortComments, setCommentModalOpen } from '../actions';


class CommentsList extends Component {

  componentWillMount() {
    this.props.dispatchFetchCommentsByPostId(this.props.postId);
    this.props.dispatchSetCommentModalOpen(false)
  }

  sortComments = (event) => {
    this.props.dispatchChangeSortComments(event.target.value)
  }

  handleAddComment = () => {
    this.props.dispatchSetCommentModalOpen(true)
  }
  handleCloseModal = () => {
    this.props.dispatchSetCommentModalOpen(false)
  }

  render() {

    const orderedCommentsList = this.props.comments
      .map((el, i) => ({
        index: i,
        value: el[this.props.sortMode] || el['voteScore']
      }))
      .sort(postsSortFunctions(this.props.sortMode))
      .map((el) => (
        this.props.comments[el.index]
      ))

    const enhanceOrderedCommentsList = orderedCommentsList.map((el) => {
      let d = new Date(el.timestamp);
      return {
        ...el,
        dateString: d.toLocaleString('en-GB', {  })
      }
    })

    return (
      <div className="comments-block">
        <h3>Comments</h3>
        <label className="order-comments-label" htmlFor="order_comments">Order by </label>
        <select id="order_comments" className="order-comments" value={this.props.sortMode} onChange={this.sortComments}>
          <option value="voteScore">Vote score</option>
          <option value="timestamp">Date</option>
        </select>
        <button className="button-comment" onClick={this.handleAddComment}><FaPlus/>Add Comment</button>
        <ul className="comments-list">
          {enhanceOrderedCommentsList.map((comment) => (
            <li key={comment.id}>
              <div className="comment-body">{comment.body}</div>
              <div className="comment-author"><label><b>Author: </b></label>{comment.author}</div>
              <div className="comment-date">{comment.dateString}</div>
              <div className="comment-voteScore"><label><b>Score: </b></label>{comment.voteScore}</div>
            </li>
          ))}
        </ul>

        <Modal
          isOpen={this.props.commentModalOpen.isOpen}
          onRequestClose={this.handleCloseModal}
          contentLabel="Modal"
        >
          <div>Modal</div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({ comments, commentModalOpen }) => ({
  comments: comments.commentsList,
  sortMode: comments.sortComments,
  commentModalOpen
})

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCommentsByPostId: (data) => dispatch(fetchCommentsByPostId(data)),
  dispatchChangeSortComments: (data) => dispatch(changeSortComments(data)),
  dispatchSetCommentModalOpen: (data) => dispatch(setCommentModalOpen(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsList))
