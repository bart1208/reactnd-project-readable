import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCategories, fetchCategories } from '../actions';

class Sidebar extends Component {

  componentWillMount() {
    this.props.dispatchFetchCategories();
  }

  render() {
    return (
      <div className="sidebar">
        <h3>Categories</h3>
        <ul className="categories_list">
          {this.props.categories.map((category) => (
            <li key={category.name}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }) => ({
  categories
})

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCategories: (data) => dispatch(fetchCategories(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
