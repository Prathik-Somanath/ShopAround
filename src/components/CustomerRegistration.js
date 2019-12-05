import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const ADD_CUSTOMER = gql`
  mutation addCustomer($name: name!, $email: name!, $password: name!) {
    insert_customer(
      objects: [{ name: $name, email: $email, password: $password }]
    ) {
      affected_rows
      returning {
        name
        email
        password
      }
    }
  }
`;
class RegistrationForm extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
                        this.props.ADD_CUSTOMER({
                          variables: {
                            name: values.name,
                            email: values.email,
                            password: values.password
                          }
                        });
      }
    });

  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 4 },
        sm: { span: 6 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label={<span>Name</span>}>
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input your name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const CustomerRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default graphql(ADD_CUSTOMER,{name:"ADD_CUSTOMER"})(CustomerRegistrationForm);