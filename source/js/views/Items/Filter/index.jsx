import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onPriceFilterInputChanged, setFilter } from 'actions/items';

@connect(state => ({
  priceFrom: state.items.get('priceFrom'),
  priceTo: state.items.get('priceTo'),
}))
export default class Filter extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.onPriceFromInputChanged = this.onPriceFromInputChanged.bind(this);
    this.onPriceToInputChanged = this.onPriceToInputChanged.bind(this);
  }

  handleSubmit(event) {
    const { dispatch, priceFrom, priceTo } = this.props;
    event.preventDefault();
    dispatch(setFilter(priceFrom, priceTo));
  }

  resetFilter() {
    const { dispatch } = this.props;
    const priceFrom = '', priceTo = '';
    dispatch(setFilter(priceFrom, priceTo));
  }

  onPriceFromInputChanged(event) {
    const { dispatch, priceTo } = this.props;
    dispatch(onPriceFilterInputChanged(event.target.value, priceTo));
  }

  onPriceToInputChanged(event) {
    const { dispatch, priceFrom } = this.props;
    dispatch(onPriceFilterInputChanged(priceFrom, event.target.value));
  }

  render() {
    const { priceFrom, priceTo } = this.props;
    return (
      <div className='Filter'>
        <span className='Filter__title'>Price:</span>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            className='Filter__input'
            value={priceFrom}
            onChange={this.onPriceFromInputChanged}
          />
          <input
            type='text'
            className='Filter__input'
            value={priceTo}
            onChange={this.onPriceToInputChanged}
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
