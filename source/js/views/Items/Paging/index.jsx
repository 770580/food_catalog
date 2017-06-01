import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePageAsync } from 'actions/items';

@connect(state => ({
  page: state.items.get('page'),
  count: state.items.get('count'),
  total: state.items.get('total'),
}))

export default class Paging extends Component {
  constructor(props) {
    super(props);
    const { page, count, total } = this.props;
    const pagesCount = Math.floor(total / count);
    this.pages = Array.from(Array(pagesCount).keys());
  }

  handleChangePage(page) {
    const { dispatch, count } = this.props;
    const params = { page, count };
    dispatch(changePageAsync(params));
  }

  render() {
    return (
      <div className='Paging'>
        {this.pages.map((page, index) => (
          <button
            key={index}
            className={
              this.props.page === page
              ? 'Paging__link Paging__link--active'
              : 'Paging__link'
            }
            disabled={this.props.page === page}
            onClick={this.handleChangePage.bind(this, page)}
          >
            {page + 1}
          </button>
        ))}
      </div>
    );
  }
}
