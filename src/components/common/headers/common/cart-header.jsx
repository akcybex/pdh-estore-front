import React, { Component } from "react";
import { Link } from "react-router-dom";

const CartHeader = ({ item, total, symbol, removeFromCart }) => {
  //   console.log("CAR", item);
  // let img = item.images.split(",");
  let img = item.images ? item.images.split(",") : [];
  return (
    <li>
      <div className="media">
        <Link to={"/cart"}>
          <img alt="" className="mr-3" src={`${img[0]}`} />
        </Link>
        {/* <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}>
          <img alt="" className="mr-3" src={`${img[0]}`} />
        </Link> */}
        <div className="media-body">
          <Link to={"/cart"}>
            <h4>{item.name}</h4>
          </Link>
          {/* <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}>
            <h4>{item.name}</h4>
          </Link> */}
          <h4>
            <span>
              {item.qty} x {symbol} {parseInt(item.price)}
              {/* {item.qty} x {symbol} {(item.price * item.discount) / 100} */}
            </span>
          </h4>
        </div>
      </div>
      {/*<span>{cart}</span>*/}
      <div className="close-circle">
        <a href={null} onClick={removeFromCart}>
          <i className="fa fa-times" aria-hidden="true" />
        </a>
      </div>
    </li>
  );
};

export default CartHeader;
