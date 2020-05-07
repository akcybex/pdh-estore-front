import React, { Component } from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

import { getTrendingCollection} from '../../../services'
import {Product4} from '../../../services/script'
import {addToCart, addToWishlist, addToCompare} from "../../../actions";
import ProductBox from './ProductBox';


class Collection extends Component {

    render() {
        const { items, symbol, addToCart, addToWishlist } = this.props;
        return (
            <div>
                {/*Paragraph*/}
                <section className="ratio_square j-box pets-box section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="title1 title5">
                                    <h2>Top Collection</h2>
                                    <hr role="tournament6" />
                                </div>
                                <Slider {...Product4} className="product-4 product-m no-arrow">
                                    {items.slice(0, 4).map((product, index) =>
                                        <div className="col-xl-3 col-md-6 col-grid-box">
                                            <ProductBox product={product} symbol={symbol}
                                                onAddToWishlistClicked={() => addToWishlist(product)}
                                                onAddToCartClicked={addToCart} key={index} />
                                        </div>)}
                                </Slider>
                                <br/>
                                {/* <Slider {...Product4} className="product-4 product-m no-arrow">
                                    {items.slice(0, 4).map((product, index) =>
                                        <div className="col-xl-3 col-md-6 col-grid-box">
                                            <ProductBox product={product} symbol={symbol}
                                                onAddToWishlistClicked={() => addToWishlist(product)}
                                                onAddToCartClicked={addToCart} key={index} />
                                        </div>)}
                                </Slider> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    items: getTrendingCollection(state.data.products, ownProps.type),
    symbol: state.data.symbol
})

export default connect(mapStateToProps, { addToCart, addToWishlist })(Collection);