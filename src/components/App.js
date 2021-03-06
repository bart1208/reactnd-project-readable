import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import PostsList from './PostsList';
import Post from './Post';
import AddPost from './AddPost';
import EditPost from './EditPost';
import Comment from './Comment';
import PageNotFound from './PageNotFound';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => (
            <div className="content">
              <Sidebar />
              <PostsList />
            </div>
          )}/>
          <Route path='/category/:selectedCategory' render={({match}) => (
            <div className="content">
              <Sidebar
                selectedCategory = {match.params.selectedCategory}
              />
              <PostsList
                key= {match.params.selectedCategory}
                selectedCategory = {match.params.selectedCategory}
              />
            </div>
          )}/>
          <Route path='/post/:postId' render={({match}) => (
            <div className="content">
              <Sidebar
                selectedCategory = 'no-category'
              />
              <Post
                postId = {match.params.postId}
              />
            </div>
          )}/>
          <Route path='/add-post' render={() => (
            <div className="content">
              <Sidebar
                selectedCategory = 'no-category'
              />
              <AddPost/>
            </div>
          )}/>
          <Route path='/edit-post/:postId' render={({match}) => (
            <div className="content">
              <Sidebar
                selectedCategory = 'no-category'
              />
              <EditPost
                postId = {match.params.postId}
              />
            </div>
          )}/>
          <Route path='/comments/:commentId' render={({match}) => (
            <div className="content">
              <Sidebar
                selectedCategory = 'no-category'
              />
              <Comment
                commentId = {match.params.commentId}
              />
            </div>
          )}/>
          <Route path='/404' component={PageNotFound} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App));
