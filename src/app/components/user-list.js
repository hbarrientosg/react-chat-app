//@flow
import React from "react";
import axios from "axios";
import type { User, Status } from "../data";

import { Collection, Preloader } from "react-materialize";
import UserItem from "./user-item";
import STATUS from "../data";

type UserProps = {
  user: User,
  activeConversation: User => void
};

type State = {
  userList: User[],
  status: Status
};

class UsersList extends React.Component<UserProps, State> {
  constructor(props: UserProps) {
    super();
    this.props = props;
    this.state = {
      userList: [],
      status: {
        message: null,
        code: STATUS.LOADING
      }
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  async fetchUsers() {
    const userId = this.props.user.id;
    try {
      const response = await axios.get(`/api/users/${userId}/users`);
      this.setState({
        userList: response.data,
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

  renderUsers() {
    const items = this.state.userList.map((user, id) => (
      <UserItem
        user={user}
        key={id}
        activeContact={user => this.activeContact(user)}
      />
    ));

    return <Collection>{items}</Collection>;
  }

  renderLoading() {
    return <Preloader size="small" />;
  }

  render() {
    const code = this.state.status.code;
    switch (code) {
      case STATUS.LOADING:
        return this.renderLoading();
      case STATUS.READY:
        return this.renderUsers();
      default:
        throw Error("State not found");
    }
  }

  activeContact(user: User) {
    this.setState(prevState => {
      prevState.userList.forEach(item => {
        item.isActive = item.id == user.id;
      });

      return prevState;
    });
    this.props.activeConversation(user);
  }
}

export default UsersList;
