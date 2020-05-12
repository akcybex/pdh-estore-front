import React, { Component } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import API from "../../utils/api";
class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
    };
  }
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("logged"));
    API.get(`/orders?user_id=${user.id}`)
      .then((res) => this.setState({ order: res.data }))
      .catch((err) => console.log("ER", err));
  }
  render() {
    const { order } = this.state;
    return (
      <div>
        <Breadcrumb title={"My Order"} />
        {order.length > 0 ? (
          <section className="wishlist-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <table className="table cart-table table-responsive-xs">
                    <thead>
                      <tr className="table-head">
                        <th scope="col">Order#</th>
                        <th scope="col">Order Items</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Address</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    {order.map((item, index) => {
                      let address = JSON.parse(item.billing_address);
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{JSON.parse(item.order_items).length}</td>
                            <td>
                              <h2>{item.amount}</h2>
                            </td>
                            <td>
                              <p>{`${address.address}, ${address.city}`}</p>
                            </td>
                            <td>{item.status}</td>
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
                      <img
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/empty-wishlist.png`}
                        className="img-fluid mb-4"
                        alt=""
                      />
                      <h3>
                        <strong>My Order is Empty</strong>
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
export default MyOrder;
