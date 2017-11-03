import React from "react";
import axios from "axios";
import type { User } from "../data/user";
import { CollectionItem, Badge } from "react-materialize"

type UserProps = {
  user: User
};

class UserItem extends React.Component<UserProps, any> {

  render() {
    const name = this.props.user.email;
    return (
      <CollectionItem>
  		{name} <Badge>1</Badge>
    </CollectionItem>)
  }

}

export default UserItem;
