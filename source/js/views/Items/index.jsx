import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItemsAsync } from 'actions/items';
import List from './List';
import Paging from './Paging';
import Sort from './Sort';
import Filter from './Filter';


@connect(state => ({
  total: state.items.get('total'),
  page: state.items.get('page'),
  count: state.items.get('count'),
  sortBy: state.items.get('sortBy'),
  sortDir: state.items.get('sortDir'),
  priceFrom: state.items.get('priceFrom'),
  priceTo: state.items.get('priceTo'),
}))

export default class Items extends Component {
  constructor() {
    super();
    this.getItems = this.getItems.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems(additionalParams = {}) {
    const {
      dispatch,
      page,
      count,
      sortBy,
      sortDir,
      priceFrom,
      priceTo
    } = this.props;

    let params = {
      page,
      count,
      sortBy,
      sortDir,
      priceFrom,
      priceTo
    }
    
    params = Object.assign(params, additionalParams);

    dispatch(getItemsAsync(params))
  }

  render() {
    const { total } = this.props
    return (
      <div className='Items'>
        <Sort getItems={this.getItems} />
        <Filter getItems={this.getItems} />
        <List getItems={this.getItems} />
        {total > 0 &&
          <Paging getItems={this.getItems} />
        }
      </div>
    );
  }
}
