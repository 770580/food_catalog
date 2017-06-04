import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPage } from 'actions/items';

@connect(state => ({
  page: state.items.get('page'),
  total: state.items.get('total'),
  count: state.items.get('count'),
}))

export default class PagingButton extends Component {
  constructor() {
    super();
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage(page) {
    const { dispatch, getItems } = this.props;

    dispatch(setPage(page));
    getItems({ page });
  }

  getNextPageNumber() {
    const { page, nextPage } = this.props;
    return nextPage === 'next' ? page + 1 : page - 1;
  }

  render() {
    const { nextPage, total, count, page } = this.props;

    const nextPageNumber = this.getNextPageNumber();
    const lastPage = Math.floor(total / count) - 1;
    return (
      <div className='PagingButton'>
        <button
          className='PagingButton__button'
          disabled={(page === 0 && nextPage === 'prev') || (page === lastPage && nextPage === 'next')}
          onClick={() => this.handleChangePage(nextPageNumber)}
        >
          {nextPage === 'next' ? '\u003E' : '\u003C'}
        </button>
      </div>
    )
  }
}
