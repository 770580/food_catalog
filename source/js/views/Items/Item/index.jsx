import React, { Component } from 'react';

export default class Item extends Component {
  render() {
    const {
      id,
      name,
      description,
      image,
      price,
      raiting
    } = this.props.itemData;
    return (
      <div className='Item'>
        <img className='Item__image' src={image} alt='' />
        <div className='Item__card'>
          <h3 className='Item__name'>
            {name}
          </h3>
          <p className='Item__description'>
            {description}
          </p>
          <p className='Item__price'>
            {price}
          </p>
          <p className='Item__raiting'>
            {raiting}
          </p>
        </div>
      </div>
    );
  }
}
