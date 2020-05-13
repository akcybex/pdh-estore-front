import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      user: "guest",
    };
  }
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("logged"));
    if (user) {
      this.setState({ user: user.id });
    }
  }

  onClickHandle(img) {
    this.setState({ image: img });
  }

  render() {
    const {
      product,
      symbol,
      onAddToCartClicked,
      onAddToWishlistClicked,
    } = this.props;
    const { user } = this.state;
    let RatingStars = [];
    for (var i = 0; i < product.rating; i++) {
      RatingStars.push(<i className="fa fa-star" key={i} />);
    }
    // let img = product.images.split(",");
    let img = product.images ? product.images.split(",") : [];
    return (
      <div className="product-box">
        <div className="img-wrapper">
          <div className="front">
            <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${
                product.id
              }`}
            >
              {/* <img src={`${
                                product.variants?
                                    this.state.image?this.state.image:product.variants[0].images
                                    :product.pictures[0]
                                }`}
                            className="img-fluid"
                            alt="" /> */}
              <img
                src={`${
                  product.images
                    ? this.state.image
                      ? this.state.image
                      : img[0]
                    : img[0]
                }`}
                className="img-fluid"
                alt=""
              />
            </Link>
          </div>
          <div className="cart-info cart-wrap">
            <button
              title="Add to cart"
              onClick={() => onAddToCartClicked(product, 1, user)}
            >
              <i className="fa fa-shopping-cart" aria-hidden="true" />
            </button>
            <a
              href="javascript:void(0)"
              title="Add to Wishlist"
              onClick={() => onAddToWishlistClicked(product, user)}
            >
              <i className="fa fa-heart" aria-hidden="true" />
            </a>
            <a
              href="javascript:void(0)"
              data-toggle="modal"
              data-target="#quick-view"
              title="Preview"
            >
              <i className="fa fa-eye" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="product-detail">
          <div>
            <div className="rating">{RatingStars}</div>
            <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${
                product.id
              }`}
            >
              <h6>{product.name}</h6>
            </Link>
            <h4>
              {symbol}
              {parseInt(product.price)}
              {/* {parseInt(product.price) -
                (parseInt(product.price) * parseInt(product.discount)) / 100} */}
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductBox;
