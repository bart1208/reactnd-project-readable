import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Loading from 'react-loading';
import uuidv1 from 'uuid/v1';
import { FaEdit, FaTrash, FaPlus, FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa';
import { postsSortFunctions } from '../utils/helpers';
import {
  fetchCommentById,
  fetchCommentsByPostId,
  changeSortComments,
  setCommentModalOpen,
  loadingComment,
  fetchAddComment,
  fetchDeleteComment,
  fetchEditComment,
  fetchVoteCommentScore,
  fetchPostById,
  setComment
} from '../actions';


class CommentsList extends Component {

  componentWillMount() {
    this.props.dispatchFetchCommentsByPostId(this.props.postId);
    this.props.dispatchSetCommentModalOpen('false');
    this.props.dispatchLoadingComment("none");
  }

  sortComments = (event) => {
    this.props.dispatchChangeSortComments(event.target.value)
  }

  handleAddComment = () => {
    this.props.dispatchSetCommentModalOpen('modal_add-comment');
  }

  handleCloseModal = () => {
    this.props.dispatchFetchCommentsByPostId(this.props.postId);
    this.props.dispatchSetCommentModalOpen('false');
    this.props.dispatchLoadingComment("none");
    this.props.dispatchFetchPostById(this.props.postId);
  }

  handleSubmitComment(event) {
    event.preventDefault();

    const postData = {
      id: uuidv1(),
      timestamp: Date.now(),
      body: event.target.querySelector('[name=body]').value,
      author: event.target.querySelector('[name=author]').value,
      parentId: this.props.postId
    }

    this.props.dispatchFetchAddComment(postData);
    this.props.dispatchFetchPostById(this.props.postId);
  }

  handleVotingComment = (vote, id) => {
    const commentVote = {
      id: id,
      option: vote
    }
    this.props.dispatchFetchVoteCommentScore(commentVote);
    this.props.dispatchFetchCommentsByPostId(this.props.postId);
  }

  deleteComment = (commentId) => {
    this.props.dispatchFetchDeleteComment(commentId);
    this.props.dispatchFetchCommentsByPostId(this.props.postId);
  }

  handleEditComment = (commentId) => {
    this.props.dispatchFetchCommentById(commentId);
    this.props.dispatchSetCommentModalOpen('modal_edit-comment');
  }
  handleInputChange(event) {
    this.props.dispatchSetComment({
      ...this.props.comment,
      [event.target.name]: event.target.value
    });
  }
  handleSubmitCommentEdit(event) {
    event.preventDefault();

    const commentData = {
      id: this.props.comment.id,
      timestamp: Date.now(),
      body: event.target.querySelector('[name=body]').value
    }

    this.props.dispatchFetchEditComment(commentData);
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
              <div className="comment-body">
                <Link to={`/comments/${comment.id}`}>{comment.body}</Link>
              </div>
              <div className="comment-author"><label><b>Author: </b></label>{comment.author}</div>
              <div className="comment-date">{comment.dateString}</div>
              <div className="comment-voteScore"><label><b>Score: </b></label>{comment.voteScore}</div>
              <button className="comment-FaThumbsOUp" onClick={() => this.handleVotingComment('upVote', comment.id)}><FaThumbsOUp /></button>
              <button className="comment-FaThumbsODown" onClick={() => this.handleVotingComment('downVote', comment.id)}><FaThumbsODown /></button>
              <button className='comment-deleteComment' onClick={() => this.deleteComment(comment.id)}><FaTrash/> Delete Comment</button>
              <button className='comment-editComment' onClick={() => this.handleEditComment(comment.id)}><FaEdit/> Edit Comment</button>
            </li>
          ))}
        </ul>

        <Modal
          isOpen={this.props.commentModalOpen.isOpen === 'modal_add-comment'}
          onRequestClose={this.handleCloseModal}
          contentLabel="Modal"
        >
          <div className='comment_modal'>
            <h2>Comment Form</h2>
            {this.props.loadingComment.loading === "loaded" &&
              <div className="message">Comment added successfully</div>}
            {this.props.loadingComment.loading === "loading"
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <form className="form-add-edit-comment" onSubmit={(event) => {this.handleSubmitComment(event)} }>
                  <label>Author:</label>
                  <input name="author" type="text" />
                  <label>Body:</label>
                  <textarea name="body" />
                  <input className="submit-button" type="submit" value="Submit" />
                  <button type="button" className="close-button" onClick={this.handleCloseModal}>Close</button>
                </form>
            }
          </div>
        </Modal>
        <Modal
          isOpen={this.props.commentModalOpen.isOpen === 'modal_edit-comment'}
          onRequestClose={this.handleCloseModal}
          contentLabel="Modal"
        >
          <div className='comment_modal'>
            <h2>Comment Form</h2>
            {this.props.loadingComment.loading === "loaded" &&
              <div className="message">Comment edited successfully</div>}
            {this.props.loadingComment.loading === "loading"
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <form className="form-add-edit-comment" onSubmit={(event) => {this.handleSubmitCommentEdit(event)} }>
                  <label>Body:</label>
                  <textarea name="body" value={this.props.comment ? this.props.comment.body : ''} onChange={event => this.handleInputChange(event)} />
                  <input className="submit-button" type="submit" value="Submit" />
                  <button type="button" className="close-button" onClick={this.handleCloseModal}>Close</button>
                </form>
            }
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({ comments, commentModalOpen, loadingComment, comment }) => ({
  comments: comments.commentsList,
  sortMode: comments.sortComments,
  commentModalOpen,
  loadingComment,
  comment,
})

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCommentById: (data) => dispatch(fetchCommentById(data)),
  dispatchFetchCommentsByPostId: (data) => dispatch(fetchCommentsByPostId(data)),
  dispatchChangeSortComments: (data) => dispatch(changeSortComments(data)),
  dispatchSetCommentModalOpen: (data) => dispatch(setCommentModalOpen(data)),
  dispatchLoadingComment: (data) => dispatch(loadingComment(data)),
  dispatchFetchAddComment: (data) => dispatch(fetchAddComment(data)),
  dispatchFetchDeleteComment: (data) => dispatch(fetchDeleteComment(data)),
  dispatchFetchEditComment: (data) => dispatch(fetchEditComment(data)),
  dispatchFetchVoteCommentScore: (data) => dispatch(fetchVoteCommentScore(data)),
  dispatchFetchPostById: (data) => dispatch(fetchPostById(data)),
  dispatchSetComment: (data) => dispatch(setComment(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsList))
