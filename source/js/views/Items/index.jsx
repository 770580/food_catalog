import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setPage } from 'actions/items';
import List from './List';
import Paging from './Paging';
import Sort from './Sort';
import Filter from './Filter';
import CarouselButton from './CarouselButton';

@connect(state => ({
  total: state.items.get('total'),
}))

export default class Items extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    let urlPage = Number(browserHistory.getCurrentLocation().query.page);
    urlPage = urlPage ? urlPage - 1 : 0;
    const lsPage = Number(localStorage.getItem('page'));
    const page = urlPage || lsPage || 0;
    dispatch(setPage(page));
  }

  render() {
    const { total } = this.props
    return (
      <div className='Items'>
        <Sort />
        <Filter />
        <div className='Items__carousel'>
          <CarouselButton nextPage='prev' />
          <List />
          <CarouselButton nextPage='next' />
        </div>
        {total > 0 &&
          <Paging />
        }
      </div>
    );
  }
}
