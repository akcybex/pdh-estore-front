import React, { Component } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import API from "../../utils/api";
import { connect } from "react-redux";
import ProductItem from "./product-item";
class MyReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("logged"));
    API.get(`reviews/${user && user.id}/user`)
      .then((res) => {
        console.log('R', res)
        this.setState({ reviews: res.data });
      })
      .catch((err) => console.log("ER", err));
  }
  render() {
    const { reviews } = this.state;
    return (
      <div>
        <Breadcrumb title={"My Review"} />
        {reviews.length > 0 ? (
          <section className="wishlist-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <table className="table cart-table table-responsive-xs">
                    <thead>
                      <tr className="table-head">
                        <th scope="col">Product</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Rewiew</th>
                      </tr>
                    </thead>
                    {reviews.map((item, index) => {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>
                              {" "}
                              <ProductItem id={item.product_id} />
                            </td>
                            <td>{item.rating}/5</td>
                            <td>
                              <p>{item.testimonial}</p>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
              <div className="row wishlist-buttons">
                <div className="col-12">
                  <Link
                    // to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}
                    to={`/`}
                    className="btn btn-solid"
                  >
                    continue shopping
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="cart-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div>
                    <div className="col-sm-12 empty-cart-cls text-center">
                      {/* <img
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/empty-wishlist.png`}
                        className="img-fluid mb-4"
                        alt=""
                      /> */}
                      <h3>
                        <strong>My Review is Empty</strong>
                      </h3>
                      <h4>Explore more shortlist some items.</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  symbol: state.data.symbol,
});
export default connect(
  mapStateToProps,
  {}
)(MyReview);
