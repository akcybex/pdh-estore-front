import React, { Component } from "react";
import API from "../../utils/api";
class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }
  componentDidMount() {
    let id = this.props.id;
    API.get(`/products/${id}`)
      .then((res) => {
        this.setState({ product: res.data[0] });
      })
      .catch((err) => console.log("ER", err));
  }
  render() {
    const { product } = this.state;
    let img = product.images ? product.images.split(",") : [];
    return (
      <>
        <img
          src={product.images ? img[0] : "/assets/images/product/1.jpg"}
          alt="Product-Img"
          style={{ height: "13%" }}
        />
        <h3>{product.name} </h3>
      </>
    );
  }
}
export default ProductItem;
