import React, { Component } from "react";
import "./styles.css";
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [
        {
          id: 1,
          name: "Jhon vick",
          img:
            "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
          des: "Hi, I'm from pakistan. professional designer",
          lang: "English",
        },
      ],
    };
  }
  render() {
    return (
      <div className="user-detail">
        <div className="d-box">
          {this.state.conversation.map((item, index) => (
            <div className="d-item">
              <img src={item.img} className="d-img" />
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
                  {item.name}
                </p>
                <p>{item.des}</p>
                <p>Language: {item.lang}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
