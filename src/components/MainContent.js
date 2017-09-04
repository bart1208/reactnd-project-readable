import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class MainContent extends Component {
  render() {
    return (
      <div className="main-content">
        <h3>Posts</h3>
      </div>
    )
  }
}

export default connect()(MainContent);
