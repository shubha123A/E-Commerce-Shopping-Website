import React from 'react';
import './Description.css';

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">   
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav">
          <div className="descriptionbox-nav-box">Description</div>
          <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
      </div>   

      <div className="descriptionbox-description">
        <p>
          An ecommerce website is a website that allows you to buy and sell tangible goods,
          digital products, or services online. An ecommerce website can process orders, accept
          payments, manage shipping and logistics, and provide customer service.
        </p>
        <p>
          An ecommerce website is any site that facilitates the buying and selling of products
          and services.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
