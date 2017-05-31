import React, { Component } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItemsAsync } from 'actions/items';

@connect(state => ({
  list: state.items.get('list'),
  asyncError: state.items.get('asyncError'),
  pending: state.items.get('pending'),
  page: state.items.get('page'),
  count: state.items.get('count'),
}))

export default class List extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getItemsAsync());
  }
  render() {
    const { list, pending } = this.props;
    
    return (
      <div className='List'>
        {pending 
        ? <div>Loading...</div>
        : list.map(item => (
            <div key={item.get('id')}>
              {item.get('name')}
            </div>
          ))
        }
      </div>
    );
  }
}
