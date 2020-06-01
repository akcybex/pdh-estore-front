import React, { Component } from "react";
import { GiftedChat, Composer, Send } from "react-web-gifted-chat";
import Loader from "react-loader-spinner";
import firebase from "../../utils/firebase";
import "./styles.css";
const chatRef = firebase.firestore().collection("CHAT");

export default class Chatting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      chatID: props.chatID,
      client: JSON.parse(localStorage.getItem("logged")),
      messages: [],
      img: "",
      uploading: false,
      text: "",
    };
  }
  componentDidMount() {
    let { chatID } = this.state;
    chatRef
      .doc(chatID)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot((data) => {
        const list = data.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
          };
        });
        this.setState({
          messages: list,
          loading: false,
        });
      });
  }
  // Image select
  imageSelect = (e) => {
    let fullPath = e.target.files[0];
    this.setState({
      img: fullPath,
      text: `Image(${fullPath.name})`,
    });
  };
  // Uploading image to firebase
  uploadImage = async (image) => {
    const imageRef = firebase.storage().ref(`/chat-img/${image.name}`);
    await imageRef.put(image).catch((error) => {
      throw error;
    });
    const url = await imageRef.getDownloadURL().catch((error) => {
      throw error;
    });
    return url;
  };
  //send chat message
  sendMessage = (data, id) => {
    return chatRef
      .doc(id)
      .collection("MESSAGES")
      .add(data)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return false;
      });
  };
  onSend(messages = []) {
    let { chatID, img, client } = this.state;
    if (img.length == 0) {
      messages.forEach((item) => {
        const message = {
          id: item.id,
          text: item.text,
          createdAt: new Date().getTime(),
          user: {
            id: client.id,
            name: client.name,
            avatar:
              client.image == null
                ? "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"
                : client.image,
          },
          type: "text",
          image: "",
        };
        this.sendMessage(message, chatID).then((msg) => {});
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
      });
    } else {
      this.setState({ uploading: true });
      this.uploadImage(img).then((url) => {
        messages.forEach((item) => {
          const message = {
            id: item.id,
            text: item.text == "" ? "attachment" : item.text,
            createdAt: new Date().getTime(),
            user: {
              id: client.id,
              name: client.name,
              avatar:
                client.image == null
                  ? "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"
                  : client.image,
            },
            type: "image",
            image: url,
          };
          this.sendMessage(message, chatID).then((msg) => {});
          this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
            img: "",
            text: "",
          }));
        });
        this.setState({ uploading: false });
      });
    }
  }

  renderSend = (props) => {
    if (!props.text.trim()) {
      return (
        <i
          class="fa fa-paper-plane"
          style={{ fontSize: "25px", color: "#FF9944", paddingRight: 10 }}
        />
      );
    }
    if (this.state.uploading) {
      return <Loader type="Puff" color="#FF9944" height={40} width={40} />;
    }
    return (
      <Send {...props}>
        <div style={{ paddingRight: 10 }}>
          <i
            class="fa fa-paper-plane"
            style={{ fontSize: "25px", color: "#FF9944" }}
          />
        </div>
      </Send>
    );
  };
  renderComposer = (props) => {
    return (
      <div className="composer">
        <div className="image-upload">
          <label for="file-input">
            <i
              class="fa fa-image"
              style={{ fontSize: "25px", color: "#FF9944", paddingLeft: 10 }}
            />
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={this.imageSelect}
          />
        </div>
        <Composer {...props} />
      </div>
    );
  };
  render() {
    let { client, loading } = this.state;
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
          <>
            <GiftedChat
              text={this.state.text}
              onInputTextChanged={(text) =>
                this.state.uploading
                  ? this.setState({ text: "Sending..." })
                  : this.setState({ text })
              }
              messages={this.state.messages}
              onSend={(messages) => this.onSend(messages)}
              renderSend={this.renderSend}
              renderComposer={this.renderComposer}
              user={{
                id: client.id,
              }}
            />
            {this.state.uploading && (
              <div style={{ paddingLeft: "10px", color: "green" }}>
                Sending...
              </div>
            )}
          </>
        )}
      </>
    );
  }
}
