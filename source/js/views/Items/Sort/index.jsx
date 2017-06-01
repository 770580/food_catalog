import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortListAsync } from 'actions/items';

@connect(state => ({
  count: state.items.get('count'),
  sortBy: state.items.get('sortBy'),
  sortDir: state.items.get('sortDir'),
}))

export default class Sort extends Component {

  calculateSortDir(sortBy) {
    let sortDir = 'DESC';
    if (this.props.sortBy === sortBy) {
      sortDir = this.props.sortDir === 'DESC' ? 'ASC' : 'DESC'
    }
    return sortDir;
  }

  handleSortList(sortBy) {
    const { dispatch, count } = this.props;
    const sortDir = this.calculateSortDir(sortBy);
    const params = {
      page: 0,
      count,
      sortBy,
      sortDir,
    }
    dispatch(sortListAsync(params));
  }

  render() {
    return (
      <div className='Sort'>
        Сортировка:
        <a
          onClick={this.handleSortList.bind(this, 'name')}
        >
          По названию
        </a>
        <a
          onClick={this.handleSortList.bind(this, 'price')}
        >
          По цене
        </a>
        <a
          onClick={this.handleSortList.bind(this, 'raiting')}
        >
          По рейтингу
        </a>
      </div>
    );
  }
}
