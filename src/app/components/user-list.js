//@flow
import React from "react";
import axios from "axios";
import type { User } from "../data/user";
import { Collection, Preloader } from "react-materialize"
import UserItem from "./user-item";

type UserProps = {
  user: User
};

type State = {
  message: string,
  userList: User[],
  status: "LOADING" | "ERROR" | "READY"
};

const STATUS = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  READY: "READY"
}


class UsersList extends React.Component<UserProps, State> {
  constructor(props: UserProps) {
    super();
    this.props = props;
    this.state = { status: STATUS.LOADING, message: "", userList: [] };
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
        status: STATUS.READY
      });
    } catch(ex) {
      this.setState({
        message: "Error loading users",
        status: STATUS.ERROR
      })
    }
  }

  renderUsers() {
    const items = this.state.userList.map((user, id) => <UserItem user={user} key={id}></UserItem>)

    return (<Collection>
      {items}
    </Collection>)
  }

  renderLoading() {
    return <Preloader size='small'/>
  }

  render() {
    console.log()
    switch (this.state.status) {
      case STATUS.LOADING:
        return this.renderLoading();
      case STATUS.READY:
        return this.renderUsers();
      default:
        throw Error('State not found');
    }
  }
}

export default UsersList;
