import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Card } from "antd";
import "./CSS/login.css";
class VendorRegistration extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
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
                    {   required: true, 
                        message: "Please input your Email!" 
                    }
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
export default VenLoginForm;
