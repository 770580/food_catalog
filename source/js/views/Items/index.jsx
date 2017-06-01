import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './List';
import Paging from './Paging';
import Sort from './Sort';
import Filter from './Filter';

@connect(state => ({
  total: state.items.get('total'),
}))

export default class Items extends Component {
  render() {
    const { total } = this.props
    return (
      <div className='Items'>
        <Sort />
        <Filter />
        <List />
        {total > 0 &&
          <Paging />
        }
      </div>
    );
  }
}
