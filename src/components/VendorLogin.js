import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Row, Card } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import _ from "lodash";
import "./CSS/login.css";

const GET_PASS = gql`
  query {
    vendor {
      email
      password
      vid
    }
  }
`;


class VendorRegistration extends Component {
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
        var pass = _.find(data.vendor, { email: values.email });
        if (values.password === pass.password) {
          this.setState({
            loggedIn: true
          });
          localStorage.setItem("vid", pass.vid);
          console.log("Holla Amigo");
        }
      }
    });
  };

  render() {
    if (this.state.loggedIn) {
      alert("You Logged In as Vendor");
      return <Redirect to="/productregistration" />;
    }
    const { getFieldDecorator } = this.props.form;

    return (
      <Row type="flex" justify="center" align="middle">
        <Card title="Vendor Login" align="middle" style={{ width: 350 }}>
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
              <a href="http://localhost:3000/vendorregistration">
                register now!
              </a>
            </Row>
          </Form>
        </Card>
      </Row>
    );
  }
}

const VenLoginForm = Form.create({ name: "normal_login" })(
  VendorRegistration
);
export default graphql(GET_PASS, { name: "getpass" })(VenLoginForm);
