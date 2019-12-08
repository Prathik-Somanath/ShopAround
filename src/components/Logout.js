import React, { Component } from "react";
import { Row, Col } from "antd";

class Login extends Component {
  render() {
    return (
      <Row>
        <Col span={12}>
          You Have Been Logged Out{localStorage.clear()}
        </Col>
      </Row>
    );
  }
}

export default Login;
