
import type { User, Conversation, Message } from "../../data";

import React from "react";
import { Row, Input, Button } from "react-materialize"

type Prop = {
  onMessageSend: Message => void
}

type State = {
  message: string
}

class SendBox extends React.Component<Prop,any> {
  constructor() {
    super();
    this.state = { message: "" };
  }

  render() {
    return (<Row>
      <Input s={10} label="Message" onKeyPress={e => this.onKeyPress(e)} onChange={e => this.updateMessage(e)}></Input>
      <Button s={2} waves='light' onClick={e => this.onClickSend()}>Send</Button>
    </Row>)
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.onClickSend();
    }
  }

  updateMessage(event: EventHandler) {
    this.setState({
      message: event.target.value
    });
  }

  onClickSend(event: EventHandler) {
    const message = this.state.message;
    if (message !== "")
      this.props.onMessageSend(message);
  }
}
