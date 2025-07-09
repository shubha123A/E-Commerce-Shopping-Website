import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ id, name, image, new_price, old_price }) => {
  return (
    <div className='item'>
      <Link to={`/product/${id}`}>
        <img onClick={window.scrollTo(0,0)} src={image} alt={name || "Product Image"} />
      </Link>
      <p>{name}</p>
      <div className="item-prices">
        <div className="item-price-new">₹{new_price}</div>
        {old_price && old_price !== new_price && (
          <div className="item-price-old">
            <del>₹{old_price}</del>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
