import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import { loadingPost, fetchPostById, fetchEditPost, setPost } from '../actions';

class EditPost extends Component {

  componentDidMount() {
    this.props.dispatchFetchPostById(this.props.postId);
    this.props.dispatchLoadingPost("none");
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.dispatchFetchEditPost({
      ...this.props.post,
      title: event.target.querySelector('[name=title]').value,
      body: event.target.querySelector('[name=body]').value,
    });
  }

  handleInputChange(event) {
    this.props.dispatchSetPost({
      ...this.props.post,
      [event.target.name]: event.target.value
    });
  }

  render() {

    const { title = '', body = '' } = this.props.post;

    return (
      <div className="add-edit-post-block">
        <h2>Post Form</h2>
        {this.props.loadingPost.loading === "loaded" &&
          <div className="message">Post edited successfully</div>}
        {this.props.loadingPost.loading === "loading"
          ? <Loading delay={200} type='spin' color='#222' className='loading' />
          : <form className="form-add-edit-post" onSubmit={(event) => {this.handleSubmit(event)}}>
              <label>Title:</label>
              <input name="title" type="text" value={title} onChange={(event) => {this.handleInputChange(event)}} />
              <div></div>
              <div></div>
              <label>Body:</label>
              <textarea name="body" value={body} onChange={(event) => {this.handleInputChange(event)}} />
              <input className="submit-button" type="submit" value="Submit" />
            </form>
        }
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
  dispatchFetchEditPost: (data) => dispatch(fetchEditPost(data)),
  dispatchLoadingPost: (data) => dispatch(loadingPost(data)),
  dispatchSetPost: (data) => dispatch(setPost(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost))
