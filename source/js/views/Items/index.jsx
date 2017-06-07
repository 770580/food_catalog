import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setPage } from 'actions/items';
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
    const urlQuery = browserHistory.getCurrentLocation().query;
    let page;
    if (urlQuery.page) {
      page = Number(urlQuery.page) - 1;
    } else if (localStorage.getItem('page')) {
      page = Number(localStorage.getItem('page'));
    } else {
      page = 0;
    }

    dispatch(setPage(page));
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
