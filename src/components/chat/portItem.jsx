import React, { Component } from "react";
import { Link } from "react-router-dom";

class PortItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      logged: false,
    };
  }
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("logged"));
    if (user) {
      this.setState({ logged: true });
    }
  }

  render() {
    const { portfolios } = this.props;
    const { logged } = this.state;
    let img = portfolios.images ? portfolios.images.split(",") : [];
    return (
      <div className="product-box">
        <div className="img-wrapper">
          <div className="front">
            <Link
              to={`${process.env.PUBLIC_URL}/conversation/${
                portfolios.user_id
              }`}
              onClick={() => !logged && alert("First Login!")}
            >
              <img
                src={`${portfolios.images && img[0]}`}
                className="img-fluid"
                alt=""
              />
            </Link>
          </div>
          <div className="product-detail">
            <div>
              <h3>{portfolios.title}</h3>
              <h6>{portfolios.description.substring(0, 100) + "..."}</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PortItem;
