import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Row, Card } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import _ from "lodash";
import "./CSS/login.css";

const GET_PASS = gql`
  query {
    customer {
      email
      password
      cusid
    }
  }
`;

class CustomerLogin extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    this.state = {
      loggedIn
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        var data = this.props.getpass;
        var pass = _.find(data.customer, { email: values.email });
        if (values.password === pass.password) {
          this.setState({
            loggedIn: true
          });
          localStorage.setItem("cusid", pass.cusid);
          console.log("Holla Amigo");
        }
      }
    });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = this.props.form;

    return (
      <Row type="flex" justify="center" align="middle">
        <Card title="Customer Login" align="middle" style={{ width: 350 }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email"
                  },
                  { required: true, message: "Please input your Email!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <Row>
              Or{" "}
              <a href="http://localhost:3000/customerregistration">
                register now!
              </a>
            </Row>
          </Form>
        </Card>
      </Row>
    );
  }
}

const CusLoginForm = Form.create({ name: "normal_login" })(CustomerLogin);
export default graphql(GET_PASS, { name: "getpass" })(CusLoginForm);
