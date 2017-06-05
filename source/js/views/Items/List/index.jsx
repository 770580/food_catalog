import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { getItemsAsync } from 'actions/items';

import Item from '../Item';

@connect(state => ({
  list: state.items.get('list'),
  asyncError: state.items.get('asyncError'),
  pending: state.items.get('pending'),
  transitionName: state.items.get('transitionName'),
}))

export default class List extends Component {
  render() {
    const { list, pending, transitionName } = this.props;
    return (
      <div className='List'>
        {pending &&
          <div className='List__pending' />
        }
        <CSSTransitionGroup
          transitionName={transitionName}
          transitionAppear={false}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
          transitionEnter={true}
          transitionLeave={true}>
            {!pending &&
            <div className='List__items'>
            {list.map(item => (
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
            ))}
            </div>
            }
        </CSSTransitionGroup>
      </div>
    );
  }
}
