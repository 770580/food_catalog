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

  handleChangePage() {
    const { dispatch, page, nextPage } = this.props;
    const nextPageNumber = nextPage === 'next' ? page + 1 : page - 1;

    dispatch(setPage(nextPageNumber));
  }

  render() {
    const { nextPage, total, count, page } = this.props;

    const lastPage = Math.floor(total / count) - 1;
    return (
      <div className='PagingButton'>
        <button
          className='PagingButton__button'
          disabled={(page === 0 && nextPage === 'prev') || (page === lastPage && nextPage === 'next')}
          onClick={this.handleChangePage}
        >
          {nextPage === 'next' ? '\u003E' : '\u003C'}
        </button>
      </div>
    )
  }
}
