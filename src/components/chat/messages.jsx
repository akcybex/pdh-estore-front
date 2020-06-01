import React, { Component } from "react";
import Chatting from "./chatting";
import UserDetail from "./userDetail";
import "./styles.css";
import API from "../../utils/api";
import Loader from "react-loader-spinner";
import firebase from "../../utils/firebase";
const chatRef = firebase.firestore().collection("CHAT");
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designer: [],
      loading: true,
      chatID: "",
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    API.get(`user/${id}`)
      .then((res) => {
        this.setState({ designer: res.data[0] });
      })
      .catch((err) => console.log("ER", err));
    this.checkChat();
  }
  // Check exist chat
  checkChat = () => {
    let client = JSON.parse(localStorage.getItem("logged"));
    let dID = parseInt(this.props.match.params.id);

    chatRef
      .where("designerId", "==", dID)
      .where("clientId", "==", client.id)
      .get()
      .then(async (data) => {
        if (data.empty) {
          this.createChat(client, dID);
        } else {
          await data.forEach((doc) => {
            this.setState({ chatID: doc.id, loading: false });
          });
        }
      })
      .catch((err) => {
        console.log("errrrrr", err);
      });
  };
  // Create new chat
  createChat = (client, dID) => {
    chatRef
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: new Date().getTime(),
        clientId: client.id,
        designerId: dID,
        client: client,
      })
      .then(async (data) => {
        await this.setState({ chatID: data.id, loading: false });

        // return data;
      })
      .catch((err) => {
        return err;
      });
  };

  render() {
    let { loading } = this.state;
    return (
      <>
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader type="Puff" color="#FF9944" height={70} width={70} />
          </div>
        ) : (
          <div className="container">
            <div className="flex-container">
              <div className="chatting">
                <Chatting chatID={this.state.chatID} />
              </div>
              <div className="user-detail">
                <UserDetail designer={this.state.designer} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
