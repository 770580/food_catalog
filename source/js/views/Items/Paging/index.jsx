import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePageAsync } from 'actions/items';

@connect(state => ({
  page: state.items.get('page'),
  count: state.items.get('count'),
  total: state.items.get('total'),
  priceFrom: state.items.get('priceFrom'),
  priceTo: state.items.get('priceTo'),
}))

export default class Paging extends Component {

  getPages(props) {
    const { page, count, total } = props;
    const pagesCount = Math.floor(total / count);
    const space = 1;

    let pages = [ { index: 0, type: 'button' } ];
    if(page > 0 + space) { 
      pages.push({ type: 'delimiter' });
    }
    for(let j = Math.max(1, page - space); j < Math.min(pagesCount - 1, page + space + 1); j++) {
      pages.push({ index: j, type: 'button' });
    }
    if(page < pagesCount - space - 1) {
      pages.push({ type: 'delimiter' });
    }
    pages.push({ index: pagesCount - 1, type: 'button' });

    let activePage = pages.find(p => p.index === page);
    if(activePage) {
      activePage.active = true;
    }

    return pages;
  }

  handleChangePage(page) {
    const { dispatch, count, priceFrom, priceTo } = this.props;
    const params = {
      page,
      count,
      priceFrom,
      priceTo,
    };

    dispatch(changePageAsync(params));
  }

  render() {
    let pages = this.getPages(this.props);
    return (
      <div className='Paging'>
        {
          pages.map((item, index) => 
            item.type === 'button' ? (
              <button
                key={index}
                className={ 
                  'Paging__link' + (item.active ? ' Paging__link--active' : '')
                }
                disabled={item.active}
                onClick={this.handleChangePage.bind(this, item.index)}
              >
                {item.index + 1}
              </button>
            ) : (
              <span key={index}>...</span>
            )
          )
        }
      </div>
    )
  }
}
