import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import uuidv1 from 'uuid/v1';
import { fetchCategories, fetchAddPost, loadingPost } from '../actions';

class AddPost extends Component {

  componentDidMount() {
    this.props.dispatchFetchCategories();
    this.props.dispatchLoadingPost("none");
  }

  handleSubmit(event) {
    event.preventDefault();

    const postData = {
      id: uuidv1(),
      timestamp: Date.now(),
      title: event.target.querySelector('[name=title]').value,
      body: event.target.querySelector('[name=body]').value,
      author: event.target.querySelector('[name=author]').value,
      category: event.target.querySelector('[name=category]').value
    }

    this.props.dispatchFetchAddPost(postData);
  }

  render() {

    return (
      <div className="add-edit-post-block">
        <h2>Post Form</h2>
        {this.props.loadingPost.loading === "loaded" &&
          <div className="message">Post added successfully</div>}
        {this.props.loadingPost.loading === "loading"
          ? <Loading delay={200} type='spin' color='#222' className='loading' />
          : <form className="form-add-edit-post" onSubmit={(event) => {this.handleSubmit(event)} }>
              <label>Title:</label>
              <input name="title" type="text" />
              <label>Author:</label>
              <input name="author" type="text" />
              <label>Category:</label>
              <select name="category">
                {this.props.categories.map((category) => (
                  <option value={category.name} key={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div></div>
              <div></div>
              <label>Body:</label>
              <textarea name="body" />
              <input className="submit-button" type="submit" value="Submit" />
            </form>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ categories, post, loadingPost }) => ({
  categories,
  post,
  loadingPost
})

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCategories: (data) => dispatch(fetchCategories(data)),
  dispatchFetchAddPost: (data) => dispatch(fetchAddPost(data)),
  dispatchLoadingPost: (data) => dispatch(loadingPost(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPost))
