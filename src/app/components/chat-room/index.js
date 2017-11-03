//@flow
import "./chat-room.css";
import type { User, Conversation } from "../../data";

import React from "react";
import axios from "axios";
import { Row, Input, Button } from "react-materialize"


type Props = Conversation;


class ChatRoom extends React.Component<Props, any> {

  render() {
    const toName = this.props.user.email;

    return (
      <Row>
        <Row>
          <h5>Chat with {toName}</h5>
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
