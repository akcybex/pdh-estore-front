import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getTrendingCollection, getAllProdcuts } from "../../../services";
import { Product4 } from "../../../services/script";
import { addToCart, addToWishlist, addToCompare } from "../../../actions";
import ProductBox from "./ProductBox";
import Pagination from "../../../utils/Pagination";
class Collection extends Component {
  state = {
    currentProducts: [],
    currentPage: null,
    totalPages: null,
  };
  onPageChanged = (data) => {
    const { allProducts } = this.props;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = allProducts.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentProducts, totalPages });
  };
  render() {
    const { items, symbol, addToCart, addToWishlist, allProducts } = this.props;
    const { currentProducts } = this.state;
    const totalProducts = allProducts.length;
    return (
      <div>
        {/*Paragraph*/}
        <section className='ratio_square j-box pets-box section-b-space'>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <div className='title1 title5'>
                  <h2>Top Collection</h2>
                  <hr role='tournament6' />
                </div>
                <Slider {...Product4} className='product-4 product-m no-arrow'>
                  {items.slice(0, 5).map((product, index) => (
                    <div key={index} className='col-xl-3 col-md-6 col-grid-box'>
                      <ProductBox
                        product={product}
                        symbol={symbol}
                        onAddToWishlistClicked={addToWishlist}
                        onAddToCartClicked={addToCart}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='title1 title5'>
                  <h2>All Prodcuts</h2>
                  <hr role='tournament6' />
                </div>
              </div>
            </div>
            <div className='row'>
              {currentProducts.map((product, index) => (
                <div key={index} className='col-xl-3 col-md-6 col-grid-box'>
                  <ProductBox
                    product={product}
                    symbol={symbol}
                    onAddToWishlistClicked={addToWishlist}
                    onAddToCartClicked={addToCart}
                  />
                </div>
              ))}
            </div>
            <div className='row' style={{padding:30}}>
              <div className='col'>
                <Pagination
                  totalRecords={totalProducts}
                  pageLimit={20}
                  pageNeighbours={1}
                  onPageChanged={this.onPageChanged}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  items: getTrendingCollection(state.data.products, ownProps.type),
  allProducts: getAllProdcuts(state.data.products),
  symbol: state.data.symbol,
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist }
)(Collection);
