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
      file: "",
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
  // imageSelect = (e) => {
  //   let fullPath = e.target.files[0];
  //   this.setState({
  //     img: fullPath,
  //     text: `Image(${fullPath.name})`,
  //   });
  // };
  // File select
  fileSelect = (e) => {
    let fullPath = e.target.files[0];
    if (fullPath != null) {
      const name = fullPath.name;
      const type = fullPath.type;
      const lastDot = name.lastIndexOf(".");

      const fileName = name.substring(0, lastDot);
      const ext = type.split("/");
      if (ext[0] == "image") {
        this.setState({
          img: fullPath,
          text: `Image(${fileName})`,
        });
      } else {
        this.setState({
          file: fullPath,
          text: `File(${fileName})`,
        });
      }
    }
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
  // Uploading file to firebase
  uploadFile = async (file) => {
    const fileRef = firebase.storage().ref(`/chat-file/${file.name}`);
    await fileRef.put(file).catch((error) => {
      throw error;
    });
    const url = await fileRef.getDownloadURL().catch((error) => {
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
    let { chatID, img, client, file } = this.state;
    if (img.length === 0 && file.length === 0) {
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
    } else if (file.length !== 0 && img.length === 0) {
      this.setState({ uploading: true });
      this.uploadFile(file).then((url) => {
        messages.forEach((item) => {
          const message = {
            id: item.id,
            text: url,
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
            file: "",
            text: "",
          }));
        });
        this.setState({ uploading: false });
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
        <div className="file-upload">
          <label for="file-input">
            <i
              class="fa fa-paperclip"
              style={{ fontSize: "25px", color: "#FF9944", paddingLeft: 10 }}
            />
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*,.doc,.docx,.pdf,application/msword,application/pdf,text/plain"
            onChange={this.fileSelect}
          />
        </div>
        <Composer {...props} />
      </div>
    );
  };
  //Handle URL press
  handleUrlPress(url, matchIndex /*: number*/) {
    window.open(url, "_blank");
  }
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
              parsePatterns={(linkStyle) => [
                { type: "url", style: linkStyle, onPress: this.handleUrlPress },
              ]}
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
