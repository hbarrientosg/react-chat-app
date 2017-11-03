import "./chat-room.css";
import type { User } from "../data/user";
import type { Conversation } from "../data/conversation";

import React from "react";
import axios from "axios";
import { Row, Input, Button } from "react-materialize"


type UserProps = {
  from: User,
  to: User,
  conversation: Conversation
};

class ChatRoom extends React.Component<UserProps, any> {

  render() {
    const toName = this.props.to.email;

    return (
      <Row>
        <Row>
          <h2>Chat with {toName}</h2>
          <div className="chat-messages">
            <div></div>
          </div>
        </Row>
        <Row>
          <Input s={10} label="Message"></Input>
          <Button s={2} waves='light'>Send</Button>
        </Row>
      </Row>)
  }

}

export default ChatRoom;
