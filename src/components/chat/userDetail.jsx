import React, { Component } from "react";
import "./styles.css";
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img:
        "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
    };
  }
  render() {
    const { designer } = this.props;
    return (
      <div className="user-detail">
        <div className="d-box">
          <div className="d-item">
            <img
              src={designer.image == null ? this.state.img : designer.image}
              className="d-img"
            />
            <div
              style={{
                marginLeft: "10px",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  color: "#000",
                  textAlign: "center",
                }}
              >
                {designer.name}
              </p>
              <p>Experience: {designer.experience}</p>
              <p>Skills: {designer.skills}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
