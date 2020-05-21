import React, { Component } from "react";
import Conversation from "./conversations";
import Chatting from "./chatting";
import UserDetail from "./userDetail";
import "./styles.css";
export default class Messages extends Component {
  render() {
    return (
      <div className="container">
        <div className="flex-container">
          <div className="conversation">
            <Conversation />
          </div>
          <div className="chatting">
            <Chatting />
          </div>
          <div className="user-detail">
            <UserDetail />
          </div>
        </div>
      </div>
    );
  }
}
