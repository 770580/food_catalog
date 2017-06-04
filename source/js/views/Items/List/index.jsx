import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { getItemsAsync } from 'actions/items';

import Item from '../Item';

@connect(state => ({
  list: state.items.get('list'),
  asyncError: state.items.get('asyncError'),
  pending: state.items.get('pending'),
  page: state.items.get('page'),
  count: state.items.get('count'),
  sortBy: state.items.get('sortBy'),
  sortDir: state.items.get('sortDir'),
  priceFrom: state.items.get('priceFrom'),
  priceTo: state.items.get('priceTo'),
}))

export default class List extends Component {
  constructor() {
    super();
    this.state = { direction: '' };
  }

  componentWillReceiveProps(nextProps) {
    const {
      page,
      sortBy,
      sortDir,
      priceFrom,
      priceTo
    } = this.props;

    if (sortBy !== nextProps.sortBy
      || sortDir !== nextProps.sortDir
      || priceFrom !== nextProps.priceFrom
      || priceTo !== nextProps.priceTo
    ) {
      this.setState({ direction: '' });
    } else if (page < nextProps.page) {
      this.setState({ direction: 'ListNextPage' });
    } else if (page > nextProps.page) {
      this.setState({ direction: 'ListPrevPage' });
    }
  }

  render() {
    const { list, pending} = this.props;
    return (
      <div className='List'>
        {pending &&
          <div className='List__pending' />
        }
        <CSSTransitionGroup
          transitionName={this.state.direction}
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
