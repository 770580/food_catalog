import React, { Component } from 'react';

export default class ChangeLog extends Component {
  render() {
    return (
      <div className='ChangeLog'>
        <ul>
          <li>
            <h3>v0.0.3</h3>
            <p>Transition between lists now with animation.</p>
            <p>Lists browsing with the carousel buttons.</p>
          </li>
          <li>
            <h3>v0.0.2</h3>
            <p>Added buttons for transitions between lists.</p>
            <p>Filter added by product list.</p>
            <p>Loading data is indicated by preloader gif.</p>
          </li>
          <li>
            <h3>v0.0.1</h3>
            <p>Added the first components of the project (items list, pagination and sorting).</p>
          </li>
          <li>
            <h3>v0.0.0</h3>
            <p>react boilerplate</p>
          </li>
        </ul>
      </div>
    )
  }
}
