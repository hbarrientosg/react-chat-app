//@flow
import type { User, Conversation, Status } from "./data";

import STATUS from "./data";
import axios from "axios";
import React from "react";
import { Row, Col } from "react-materialize";
import UsersList from "./components/user-list";
import ChatRoom from "./components/chat-room";

const loggedUser: User = { id: 1, email: "carl@x.com", is_online: true };

type State = {
  loggedUser: User,
  activeConversation: ?Conversation,
  status: Status
};

class App extends React.Component<any, State> {
  constructor() {
    super();

    this.state = {
      loggedUser: loggedUser,
      activeConversation: null,
      status: {
        code: STATUS.READY,
        message: null
      }
    };
  }

  renderNoConversation() {
    return <div>No Active Conversation</div>;
  }

  renderChat() {
    const activeConversation = this.state.activeConversation;

    if (activeConversation) {
      return <ChatRoom {...activeConversation} />;
    } else {
      return this.renderNoConversation();
    }
  }

  async fetchConversation(toUserId: number): Promise<?Conversation> {
    const userId = this.state.loggedUser.id;
    const response = await axios.get(`/api/users/${userId}/conversations`);
    console.log(response.data)
    const result = response.data.filter(x => x.to === toUserId);

    return result.length? result[0]: null;
  }

  async createConversation(toId: number): Promise<number> {
    const fromId: number = this.state.loggedUser.id;
    const response = await axios.post(`/api/conversations`, {
      from: fromId,
      to: toId
    });

    return response.data;
  }

  async fetchOrCreateConversation(toUser: User) {
    this.setState({ status: { code: STATUS.LOADING, message: null } });

    const fromId = this.state.loggedUser.id;
    const toId = toUser.id;

    let conversationId = null;

    try {
      const conversation = await this.fetchConversation(toId);
      console.log(conversation);
      if (conversation) {
        conversationId = conversation.id;
      } else {
        conversationId = await this.createConversation(toId);
      }

      this.setState({
        activeConversation: {
          id: conversationId,
          user: toUser
        },
        status: {
          code: STATUS.READY,
          message: null
        }
      });
    } catch (ex) {
      this.setState({
        status: {
          message: "Error loading users",
          code: STATUS.ERROR
        }
      });
    }
  }

  render() {
    return (
      <Row>
        <Col s={3}>
          <UsersList
            user={loggedUser}
            activeConversation={user => this.activeConversation(user)}
          />
        </Col>
        <Col s={9}>{this.renderChat()}</Col>
      </Row>
    );
  }

  activeConversation(user: User) {
    this.fetchOrCreateConversation(user);
  }
}

export default App;
