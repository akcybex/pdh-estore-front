import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart, addToWishlist } from "../../actions";
import ProductBox from "../layouts/HomePage/ProductBox";
import API from "../../utils/api";
class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    let query = this.props.match.params.name;
    let id = this.props.match.params.category_id;
    let URL =
      id !== undefined
        ? `/products/?search=${query}&category_id=${id}`
        : `/products/?search=${query}`;
    API.get(URL)
      .then((res) => {
        // console.log("RES", res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log("ERR", err.response));
  }
  render() {
    const { symbol, addToCart, addToWishlist } = this.props;
    return (
      <div>
        <section className="ratio_square j-box pets-box section-b-space">
          <div className="container">
            <div className="title1 title5">
              <h2>Search Result</h2>
              <hr role="tournament6" />
            </div>
            {this.state.data.length > 0 ? (
              <div className="row">
                {this.state.data.map((product, index) => (
                  <div className="col-xl-3 col-md-6 col-grid-box">
                    <ProductBox
                      product={product}
                      symbol={symbol}
                      onAddToWishlistClicked={addToWishlist}
                      onAddToCartClicked={addToCart}
                      key={index}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="row">
                <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                  <img
                    src={"/assets/images/empty-search.jpg"}
                    className="img-fluid mb-4"
                  />
                  <h3>
                    Sorry! Couldn't find the product you were looking For!!!{" "}
                  </h3>
                  <p>
                    Please check if you have misspelt something or try searching
                    with other words.
                  </p>
                  <Link to={"/"} className="btn btn-solid">
                    continue shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  symbol: state.data.symbol,
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist }
)(SearchResult);
