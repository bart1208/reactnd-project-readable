import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import PostsList from './PostsList';
import Post from './Post';

class App extends Component {

  render() {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default withRouter(connect()(App));
