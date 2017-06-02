import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPriceFilter, resetPriceFilter } from 'actions/items';

@connect(state => ({
  sortBy: state.items.get('sortBy'),
  sortDir: state.items.get('sortDir'),
}))
export default class Filter extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetFilter = this.resetFilter.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, getItems } = this.props;
    const priceFrom = Number(this.priceFrom.value);
    const priceTo = Number(this.priceTo.value);
    
    dispatch(setPriceFilter(priceFrom, priceTo));
    getItems({ priceFrom, priceTo, page: 0 });
  }

  resetFilter() {
    const { dispatch, getItems } = this.props;
    this.priceFrom.value = '';
    this.priceTo.value = '';
    dispatch(resetPriceFilter());
    getItems();
  }

  render() {
    return (
      <div className='Filter'>
        <span className='Filter__title'>Цена:</span>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            className='Filter__input'
            ref={(input) => { this.priceFrom = input; }}
          />
          <input
            type='text'
            className='Filter__input'
            ref={(input) => { this.priceTo = input; }}
          />
          <button className='Filter__submit'>Go</button>
          <a onClick={this.resetFilter}>
            Reset
          </a>
        </form>
      </div>
    );
  }
}
