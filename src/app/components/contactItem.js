import React from "react";
import axios from "axios";
import type { User } from "../data/user";
import { CollectionItem, Badge } from "react-materialize";

type UserProps = {
  user: User,
  activeContact: User => void
};

class ContactItem extends React.Component<UserProps, any> {
  render() {
    const user = this.props.user;
    return (
      <CollectionItem
        active={user.isActive}
        onClick={e => this.props.activeContact(this.props.user)}
      >
        {user.email} <Badge>1</Badge>
      </CollectionItem>
    );
  }
}

export default ContactItem;
