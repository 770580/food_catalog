import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPriceFilterAsync, resetPriceFilter, getItemsAsync } from 'actions/items';

@connect(state => ({
  count: state.items.get('count'),
  sortBy: state.items.get('sortBy'),
  sortDir: state.items.get('sortDir'),
}))
export default class Filter extends Component {

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, count, sortBy, sortDir } = this.props;
    const params = {
      page: 0,
      priceFrom: Number(this.priceFrom.value),
      priceTo: Number(this.priceTo.value),
      count,
      sortBy,
      sortDir,
    }
    dispatch(setPriceFilterAsync(params));
  }

  resetFilter() {
    const { dispatch, count } = this.props;
    this.priceFrom.value = '';
    this.priceTo.value = '';
    dispatch(resetPriceFilter());
    const params = {
      page: 0,
      count,
    }
    dispatch(getItemsAsync(params));
  }

  render() {
    return (
      <div className='Filter'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' ref={(input) => { this.priceFrom = input; }} />
          <input type='text' ref={(input) => { this.priceTo = input; }} />
          <button>Go</button>
          <a onClick={this.resetFilter.bind(this)}>
            Reset
          </a>
        </form>
      </div>
    );
  }
}
