import React, { Component } from "react";
import { Link } from "react-router-dom";
class ProductItem extends Component {
  render() {
    const { items, status } = this.props;
    return (
      <>
        {items.map((item) => {
          let img = item.images ? item.images.split(",") : [];
          return (
            <div style={{ float: "left", margin: "2px", position: "relative" }}>
              <img
                src={item.images ? img[0] : "/assets/images/product/1.jpg"}
                alt="Product-Img"
                style={{ height: "70px", width: "60px" }}
              />
              {(status == "Delivered" || "Shipped") && (
                <Link
                  style={{
                    position: "absolute",
                    fontSize: "13px",
                    zIndex: "1000",
                    fontWeight: "bold",
                    left: 4,
                    color: "#FFF",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                  to={`/left-sidebar/product/${item.id}/review-allowed`}
                >
                  Review
                </Link>
              )}
            </div>
          );
        })}
      </>
    );
  }
}
export default ProductItem;
