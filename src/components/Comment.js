import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import Modal from 'react-modal';
import { FaEdit, FaTrash, FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa';
import * as actions from '../actions';

class Comment extends Component {

  componentWillMount() {
    this.props.dispatchFetchCommentById(this.props.commentId);
    this.props.dispatchSetCommentModalOpen('false');
    this.props.dispatchLoadingComment("none");
  }

  redableDate = (timestamp) => {
    let d = new Date(timestamp);
    return d.toLocaleString('en-GB', {  });
  }

  deleteComment = () => {
    this.props.dispatchFetchDeleteComment(this.props.commentId);
  }

  handleEditComment = () => {
    this.props.dispatchSetCommentModalOpen('modal_edit-comment')
  }
  handleCloseModal = () => {
    this.props.dispatchFetchCommentById(this.props.commentId);
    this.props.dispatchSetCommentModalOpen('false');
    this.props.dispatchLoadingComment("none");
  }
  handleSubmitComment(event) {
    event.preventDefault();

    const commentData = {
      id: this.props.commentId,
      timestamp: Date.now(),
      body: event.target.querySelector('[name=body]').value
    }

    this.props.dispatchFetchEditComment(commentData);
  }
  handleInputChange(event) {
    this.props.dispatchSetComment({
      ...this.props.comment,
      [event.target.name]: event.target.value
    });
  }

  handleVotingComment = (vote, id) => {
    const commentVote = {
      id: id,
      option: vote
    }

    this.props.dispatchFetchVoteCommentScore(commentVote)
    this.props.dispatchFetchCommentById(this.props.commentId)
  }

  render() {
    const comment = this.props.comment;

    return (
      <div className="comment-block">
        <h2>Comment</h2>

        {this.props.loadingComment.loading === "loaded" &&
          <div className="message">Comment deleted successfully</div>}

        {this.props.loadingComment.loading === "loading" &&
          <Loading delay={200} type='spin' color='#222' className='loading' />}

        {this.props.loadingComment.loading === "none" &&
          <div>
            <button className='post-editPost' onClick={this.handleEditComment}><FaEdit/> Edit Comment</button>
            <button className='post-deletePost' onClick={this.deleteComment}><FaTrash/> Delete Comment</button>
            <div className="post">
              <div className="post-body">{comment.body}</div>
              <div className="post-author"><label><b>Author: </b></label>{comment.author}</div>
              <div className="post-date">{this.redableDate(comment.timestamp)}</div>
              <button className="post-FaThumbsOUp" onClick={() => this.handleVotingComment('upVote', comment.id)}><FaThumbsOUp /></button>
              <button className="post-FaThumbsODown" onClick={() => this.handleVotingComment('downVote', comment.id)}><FaThumbsODown /></button>
              <div className="post-voteScore"><label><b>Score: </b></label>{comment.voteScore}</div>
            </div>
          </div>}

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
              : <form className="form-add-edit-comment" onSubmit={(event) => {this.handleSubmitComment(event)} }>
                  <label>Body:</label>
                  <textarea name="body" value={comment.body} onChange={event => this.handleInputChange(event)} />
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

const mapStateToProps = ({ comment, loadingComment, commentModalOpen }) => ({
  comment,
  loadingComment,
  commentModalOpen
})

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCommentById: (data) => dispatch(actions.fetchCommentById(data)),
  dispatchLoadingComment: (data) => dispatch(actions.loadingComment(data)),
  dispatchFetchDeleteComment: (data) => dispatch(actions.fetchDeleteComment(data)),
  dispatchSetCommentModalOpen: (data) => dispatch(actions.setCommentModalOpen(data)),
  dispatchFetchEditComment: (data) => dispatch(actions.fetchEditComment(data)),
  dispatchSetComment: (data) => dispatch(actions.setComment(data)),
  dispatchFetchVoteCommentScore: (data) => dispatch(actions.fetchVoteCommentScore(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));
