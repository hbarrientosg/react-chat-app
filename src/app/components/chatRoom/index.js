//@flow
import "./chatRoom.css";
import type { User, Conversation, Message, UserMessage } from "../../data";

import React from "react";
import axios from "axios";
import moment from "moment";
import { Row, Input, Button } from "react-materialize";
import SendBox from "./sendBox";

type Props = Conversation;
type State = {
  messages: UserMessage[]
};

class ChatRoom extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { messages: [] }
  }

  componentDidMount() {
    this.fetchMessages();
  }

  async fetchMessages() {
    const { id, from, to } = this.props;
    let repsonse = await axios.get(`/api/conversations/${id}/messages`);
    let result = repsonse.data;
    result = result.map((x: UserMessage) => {
      x.createAt = moment(x.createAt);
      x.user = x.createBy === from.id ? from : to;
      return x;
    });
    this.setState({ messages: result });
  }

  render() {
    const toName = this.props.from.email;
    const messages = this.state.messages.map((msg: UserMessage, index: number) => (
      <li key={index}><b>{msg.createAt.format("DD-MM-YY HH:mm")} {msg.user.email}</b>: {msg.message}</li>
    ));
    return (
      <Row>
        <Row>
          <h5>Chat with {toName}</h5>
          <ul className="chat-messages">{messages}</ul>
        </Row>
        <SendBox onMessageSend={msg => this.sendMessage(msg)} />
      </Row>
    );
  }

  sendMessage(msg: string) {
    this.saveMessage(msg)
  }

  async saveMessage(msg: string) {
    const response = await axios.post(`/api/messages`, {
      conversationId: this.props.id,
      message: msg,
      userId: this.props.from.id
    });

    await this.fetchMessages();
  }
}

export default ChatRoom;
