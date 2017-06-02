import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSort } from 'actions/items';

@connect(state => ({
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
    const { dispatch, getItems } = this.props;
    const sortDir = this.calculateSortDir(sortBy);
  
    dispatch(setSort(sortBy, sortDir));
    getItems({ page: 0, sortBy, sortDir });
  }

  calculateArrowStyle(orderBy) {
    const { sortBy, sortDir } = this.props;
    if (orderBy === sortBy) {
      return sortDir === 'DESC' ? ' Sort__link--down' : ' Sort__link--up'
    } else {
      return '';
    }
  }

  render() {
    const { sortBy, sortDir } = this.props;
    return (
      <div className='Sort'>
        <span className='Sort__title'>Сортировка:</span>
        <a
          className={
            'Sort__link' + this.calculateArrowStyle('name')
          }
          onClick={this.handleSortList.bind(this, 'name')}
        >
          По названию
        </a>
        <a
          className={
            'Sort__link' + this.calculateArrowStyle('price')
          }
          onClick={this.handleSortList.bind(this, 'price')}
        >
          По цене
        </a>
        <a
          className={
            'Sort__link' + this.calculateArrowStyle('raiting')
          }
          onClick={this.handleSortList.bind(this, 'raiting')}
        >
          По рейтингу
        </a>
      </div>
    );
  }
}
