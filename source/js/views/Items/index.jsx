import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './List';
import Paging from './Paging';

@connect(state => ({
  total: state.items.get('total'),
}))

export default class Items extends Component {
  render() {
    const { total } = this.props
    return (
      <div className='Items'>
        <List />
        {total > 0 &&
          <Paging />
        }
      </div>
    );
  }
}
