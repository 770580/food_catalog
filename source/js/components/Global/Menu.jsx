import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { routeCodes } from '../../routes';

export default class Menu extends Component {

  render() {
    return (
      <div className='Menu'>
        <div className='Menu-links'>
          <IndexLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to={ routeCodes.ITEMS }
          >
            Catalog
          </IndexLink>
          <Link
            activeClassName='Menu-link--active'
            className='Menu-link'
            to='404'
          >
            404
          </Link>
        </div>
      </div>
    );
  }
}
