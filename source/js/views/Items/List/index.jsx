import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItemsAsync } from 'actions/items';

import Item from '../Item';

@connect(state => ({
  list: state.items.get('list'),
  asyncError: state.items.get('asyncError'),
  pending: state.items.get('pending'),
  page: state.items.get('page'),
  count: state.items.get('count'),
}))

export default class List extends Component {
  componentDidMount() {
    const { dispatch, page, count } = this.props;
    const params = { page, count };
    dispatch(getItemsAsync(params));
  }

  render() {
    const { list, pending } = this.props;
    
    return (
      <div className='List'>
        {pending 
        ? <div>Loading...</div>
        : list.map(item => (
            <Item
              key={item.get('id')}
              itemData={{
                id: item.get('id'),
                name: item.get('name'),
                description: item.get('description'),
                image: item.get('image'),
                price: item.get('price'),
                raiting: item.get('raiting')
              }}
            />
          ))
        }
      </div>
    );
  }
}
