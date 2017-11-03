//@flow
import "./app.css";
import type { User, Conversation, Status } from "./data";

import STATUS from "./data";
import axios from "axios";
import React from "react";
import { Row, Col, Navbar } from "react-materialize";
import ContactList from "./components/contactList";
import ChatRoom from "./components/chatRoom";
import LoginView from "./components/loginView";

//const loggedUser: User = { id: 1, email: "carl@x.com", is_online: true };

type State = {
  loggedUser: ?User,
  activeConversation: ?Conversation,
  status: Status
};

class App extends React.Component<any, State> {
  constructor() {
    super();

    this.state = {
      loggedUser: null,
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
    console.log(response.data);
    const result = response.data.filter(x => x.to === toUserId);

    return result.length ? result[0] : null;
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
    const loggedUser = this.state.loggedUser;

    if (!loggedUser) {
      return <LoginView onUserConnected={user => this.onUserConnected(user)} />;
    } else {
      return (
        <div>
          <h3>Welcome {loggedUser.email}</h3>
          <Row>
            <Col s={3}>
              <ContactList
                user={loggedUser}
                activeConversation={user => this.activeConversation(user)}
              />
            </Col>
            <Col s={9}>{this.renderChat()}</Col>
          </Row>
        </div>
      );
    }
  }

  onUserConnected(user: User) {
    this.setState({ loggedUser: user });
  }

  activeConversation(user: User) {
    this.fetchOrCreateConversation(user);
  }
}

export default App;
