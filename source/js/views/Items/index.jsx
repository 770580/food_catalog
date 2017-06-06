import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItemsAsync } from 'actions/items';
import List from './List';
import Paging from './Paging';
import Sort from './Sort';
import Filter from './Filter';
import PagingButton from './PagingButton';

@connect(state => ({
  total: state.items.get('total'),
}))

export default class Items extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getItemsAsync());
  }

  render() {
    const { total } = this.props
    return (
      <div className='Items'>
        <Sort />
        <Filter />
        <div className='Items__carousel'>
          <PagingButton nextPage='prev' />
          <List />
          <PagingButton nextPage='next' />
        </div>
        {total > 0 &&
          <Paging />
        }
      </div>
    );
  }
}
