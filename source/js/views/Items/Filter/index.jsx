import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onPriceFilterInputChanged } from 'actions/items';

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
    const { dispatch, getItems, priceFrom, priceTo } = this.props
    event.preventDefault()
    getItems({ priceFrom, priceTo, page: 0 })
  }

  resetFilter() {
    const { dispatch, getItems } = this.props;
    const priceFrom = '', priceTo = '';
    dispatch(onPriceFilterInputChanged(priceFrom, priceTo));
    getItems({ priceFrom, priceTo, page: 0 });
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
        <span className='Filter__title'>Цена:</span>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            className='Filter__input'
            onChange={this.onPriceFromInputChanged}
          />
          <input
            type='text'
            className='Filter__input'
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
