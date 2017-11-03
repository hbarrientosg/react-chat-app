//@flow
import "./chatRoom.css";
import type { User, Conversation, Message, UserMessage } from "../../data";

import React from "react";
import axios from "axios";
import moment from "moment";
import { Row, Input, Button } from "react-materialize";
import SendBox from "./sendBox";
import MessageBox from "./messageBox";
import socket from "socket.io-client";
import ReactDom from "react-dom";

type Props = Conversation;
type State = {
  messages: UserMessage[]
};

class ChatRoom extends React.Component<Props, State> {
  socket: any;
  messagesContainer: any;

  constructor(props: Props) {
    super();
    this.props = props;
    this.socket = socket.connect("http://localhost:8555");
    this.state = { messages: [] };
    this.socket.on("updateMessages", ({ userId }) => this.updateView(userId));
  }

  componentDidMount() {
    this.fetchMessages(this.props);
  }

  componentWillReceiveProps(props: Props) {
    this.fetchMessages(props);
  }

  componentDidUpdate() {
    var node = document.getElementsByClassName("chat-messages")[0];
    node.scrollTop = node.scrollHeight;
  }

  async fetchMessages(props: Props) {
    const { id, from, to } = props;
    let repsonse = await axios.get(`/api/conversations/${id}/messages`);
    let result = repsonse.data;
    result = result.map((x: UserMessage) => {
      x.createAt = moment(x.createAt);
      x.user = x.createBy === from.id ? from : to;
      x.isMe = x.createBy === from.id;
      return x;
    });
    this.setState({ messages: result });
  }

  render() {
    const toName = this.props.to.email;
    const messages = this.state.messages.map(msg => (
      <MessageBox
        key={msg.id}
        {...msg}
      />
    ));
    return (
      <Row>
        <Row className="chat-room">
          <h5 className="chat-room--title">{toName}</h5>
          <ul className="chat-messages">{messages}</ul>
        </Row>
        <SendBox onMessageSend={msg => this.sendMessage(msg)} />
      </Row>
    );
  }

  sendMessage(msg: string) {
    this.saveMessage(msg);
  }

  async saveMessage(msg: string) {
    const response = await axios.post(`/api/messages`, {
      conversationId: this.props.id,
      message: msg,
      userId: this.props.from.id
    });

    await this.fetchMessages(this.props);
    await this.notify();
  }

  async notify() {
    const userId = this.props.from.id;
    this.socket.emit("sendMessage", { userId: userId });
  }

  updateView(userId: number) {
    const toId = this.props.to.id;

    if (toId == userId) this.fetchMessages(this.props);
  }
}

export default ChatRoom;
