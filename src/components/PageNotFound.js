import React, { Component } from 'react';

class PageNotFound extends Component {
  render() {
    return (
      <div className="fof">
        <div className="hgroup">
          <h1>404</h1>
          <h2>Error ! <span>Page Not Found</span></h2>
        </div>
        <p>For Some Reason The Page You Requested Could Not Be Found On Our Server</p>
      </div>
    )
  }
}

export default PageNotFound;
