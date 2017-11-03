//@flow
import type { User } from "./data/user";
import type { Conversation } from "./data/conversation";

import React from "react";
import { Row, Col } from "react-materialize";
import UsersList from "./components/user-list";
import ChatRoom from "./components/chat-room";

const loggedUser: User = { id: 1, email: "carl@x.com", is_online: true };

type State = {
  loggedUser: User,
  activeConversation: ?Conversation
};

class App extends React.Component<any, State> {
  constructor() {
    super();

    this.state = {
      loggedUser: loggedUser,
      activeConversation: null
    };
  }

  renderNoConversation() {
    return (<div>
      No Active Conversation
    </div>)
  }

  renderChat() {
    if(this.state.activeConversation) {
      return (<ChatRoom />)
    } else {
      return this.renderNoConversation();
    }
  }

  render() {
    return (
      <Row>
        <Col s={3}>
          <UsersList user={loggedUser} />
        </Col>
        <Col s={9}>
          {this.renderChat()}
        </Col>
      </Row>
    );
  }
}

export default App;
