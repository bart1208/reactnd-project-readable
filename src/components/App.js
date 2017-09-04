import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import MainContent from './MainContent';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <div className="content">
            <Sidebar></Sidebar>
            <MainContent></MainContent>
          </div>
        )}/>
      </div>
    );
  }
}

export default connect()(App);
