//@flow
import "./loginView.css";
import React from "react";
import axios from "axios";
import type { User, Status } from "../../data";

import { Input, Button, Col, Row, Preloader, Card } from "react-materialize";
import STATUS from "../../data";

type Props = {
  onUserConnected: User => void
};

type State = {
  email: string,
  error: string,
  status: Status
};

const ERROR = {
  EMPTY: "This field cannot be empty",
  NOTFOUND: "This user doesn't exists",
  NETWORK: "We couldn't find the server"
}

class LoginView extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      email: "",
      error: "",
      status: { code: STATUS.READY, message: null }
    };
  }

  componentDidMount() {}

  async fetchUser(email: string) {
    this.setState({ status: { code: STATUS.LOADING, message: "" }})
    try {
      const response = await axios.get(`/api/users?email=${email}`);
      const result = response.data;

      if (result.length) {
        this.props.onUserConnected(result[0]);
      } else {
        this.setState({
          error: ERROR.NOTFOUND,
          status: { code: STATUS.READY, message: "" }
        });
      }
    } catch (ex) {
      this.setState({
        error: ERROR.NETWORK,
        status: { code: STATUS.ERROR, message: ERROR.NETWORK }
      });
    }
  }

  renderLogin() {
    return (
      <div>
        <Input
          s={12}
          label="Email"
          onChange={e => this.updateEmail(e)}
          onKeyPress={e => this.onKeyPress(e)}
          error={this.state.error}
        />
        <Button onClick={e => this.onLogIn()}>Login</Button>
      </div>
    );
  }

  renderLoading() {
    return <Preloader size="small" />;
  }

  render() {
    const code = this.state.status.code;
    let view = null;
    switch (code) {
      case STATUS.LOADING:
        view = this.renderLoading();
        break;
      case STATUS.READY:
        view = this.renderLogin();
        break;
      default:
        throw Error("State not found");
    }

    return (
      <div className="container login-view">
        <Row>
          <Col s={12} className="valign">
            <Card title="Simple Chat">{view}</Card>
          </Col>
        </Row>
      </div>
    );
  }

  updateEmail(event: EventHandler) {
    this.setState({
      email: event.target.value
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.onLogIn()
    }
  }

  onLogIn() {
    if(this.state.email == "") {
      this.setState({ error: ERROR.EMPTY })
    } else {
      this.fetchUser(this.state.email);
    }
  }
}

export default LoginView;
