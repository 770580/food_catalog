import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePage } from 'actions/items';

@connect()
export default class Paging extends Component {
  handleChangePage(direction) {
    const { dispatch } = this.props;
    dispatch(changePage(direction));
  }
  render() {
    return (
      <div className='Paging'>
        <a
          onClick={this.handleChangePage.bind(this, 'prev')}
        >
          Prev
        </a>
        <a
          onClick={this.handleChangePage.bind(this, 'next')}
        >
          Next
        </a>
      </div>
    );
  }
}
