import React, { Component } from 'react';
import List from './List';
import Paging from './Paging';

export default class Items extends Component {
  render() {
    return (
      <div className='Items'>
        <List />
        <Paging />
      </div>
    );
  }
}
