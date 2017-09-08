import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';

class Sidebar extends Component {

  componentWillMount() {
    this.props.dispatchFetchCategories()
  }

  render() {
    return (
      <div className="sidebar">
        <h2>Categories</h2>
        <ul className="categories-list">
          {this.props.categories.map((category) => (
            <li key={category.name}>
              <Link
                to={`/category/${category.name}`}
                className={
                  'categories-link' +
                  (category.name === this.props.selectedCategory ? ' selected' : '')
                }
              >
                {category.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/"
              className={
                'categories-link' +
                (!this.props.selectedCategory ? ' selected' : '')
              }
            >
              all
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
})

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCategories: (data) => dispatch(fetchCategories(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
