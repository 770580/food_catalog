import React, { Component } from 'react';

export default class ChangeLog extends Component {
  constructor() {
    super();
    this.changeLogData = [
      {
        version: 'v0.1.2',
        description: 'fix logic in actions',
      },
      {
        version: 'v0.1.1',
        description: 'added carousel buttons',
      },
      {
        version: 'v0.1.0',
        description: 'added animation of items list',
      },
      {
        version: 'v0.0.6',
        description: 'added item preloader gif',
      },
      {
        version: 'v0.0.5',
        description: 'added component for filterig',
      },
      {
        version: 'v0.0.4',
        description: 'added direction arrows on the sorting component',
      },
      {
        version: 'v0.0.3',
        description: 'added sorting component',
      },
      {
        version: 'v0.0.2',
        description: 'added pagination',
      },
      {
        version: 'v0.0.1',
        description: 'added items list component',
      },
      {
        version: 'v0.0.0',
        description: 'react boilerplate',
      },
    ];
  }
  render() {
    return (
      <div className='ChangeLog'>
        <ul>
          {this.changeLogData.map((change, index) => (
            <li key={index}>
              <h3>{change.version}</h3>
              <p>{change.description}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
