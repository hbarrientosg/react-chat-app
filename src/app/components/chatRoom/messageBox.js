import type { User, Conversation, Message, UserMessage } from "../../data";

import React from "react";
import axios from "axios";
import moment from "moment";
import { Row, Input, Button } from "react-materialize";
import SendBox from "./sendBox";

type Props = UserMessage;

class MessageBox extends React.Component<Props, any> {
  render() {
    const msg = this.props;
    const classType = msg.isMe? "message--right": "message--left"
    return (
      <li className={`message ${classType}`}>
        <div className="message-item">
          <span>{msg.user.email} -- {msg.createAt.format("DD-MM-YY HH:mm")}</span>
          {msg.message}
        </div>
      </li>)
  }
}

export default MessageBox;
