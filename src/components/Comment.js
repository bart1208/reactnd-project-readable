import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import Modal from 'react-modal';
import { FaEdit, FaTrash } from 'react-icons/lib/fa';
import { fetchCommentById,
  loadingComment,
  fetchDeleteComment,
  setCommentModalOpen,
  fetchEditComment,
  setComment,
  fetchAddComment
} from '../actions';

class Comment extends Component {

  componentWillMount() {
    this.props.dispatchFetchCommentById(this.props.commentId);
    this.props.dispatchSetCommentModalOpen(false);
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
    this.props.dispatchSetCommentModalOpen(true)
  }
  handleCloseModal = () => {
    this.props.dispatchFetchCommentById(this.props.commentId);
    this.props.dispatchSetCommentModalOpen(false);
    this.props.dispatchLoadingComment("none");
  }
  handleSubmitComment(event) {
    event.preventDefault();

    const commentData = {
      id: this.props.commentId,
      timestamp: Date.now(),
      body: event.target.querySelector('[name=body]').value
    }

    this.props.dispatchFetchAddComment(commentData);
  }
  handleInputChange(event) {
    this.props.dispatchSetComment({
      ...this.props.comment,
      [event.target.name]: event.target.value
    });
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
              <div className="post-voteScore"><label><b>Score: </b></label>{comment.voteScore}</div>
            </div>
          </div>}

        <Modal
          isOpen={this.props.commentModalOpen.isOpen}
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
  dispatchFetchCommentById: (data) => dispatch(fetchCommentById(data)),
  dispatchLoadingComment: (data) => dispatch(loadingComment(data)),
  dispatchFetchDeleteComment: (data) => dispatch(fetchDeleteComment(data)),
  dispatchSetCommentModalOpen: (data) => dispatch(setCommentModalOpen(data)),
  dispatchFetchEditComment: (data) => dispatch(fetchEditComment(data)),
  dispatchSetComment: (data) => dispatch(setComment(data)),
  dispatchFetchAddComment: (data) => dispatch(fetchAddComment(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));
