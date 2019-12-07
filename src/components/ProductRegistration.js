import React, { Component } from "react";
import { Form, Select, InputNumber, Button, Upload, Icon, Input } from "antd";
import gql from "graphql-tag";
import { graphql} from "react-apollo";
import {compose} from "recompose";
const { Option } = Select;
const GET_ALL = gql`
  query getAll {
    vendor {
      vid
      vname
    }
    gen {
      genid
      genname
    }
    brand {
      brandid
      brandname
    }
    cpu {
      cpuid
      cname
    }
    gpu {
      gpuid
      gpuname
    }
  }
`;

const ADD_PROD = gql`
  mutation(
    $name: String!
    $price: Int!
    $imgurl: String!
    $url: String!
    $vid: Int!
    $brandid: Int!
    $cpuid: Int!
    $gpuid: Int!
    $genid: Int!
  ) {
    insert_products(
      objects: [
        {
          productname: $name
          productprice: $price
          productimglink: $imgurl
          producturl: $url
          vid: $vid
          brandid: $brandid
          cpuid: $cpuid
          gpuid: $gpuid
          genid: $genid
        }
      ]
    ) {
      affected_rows
      returning {
        productname
        productprice
      }
    }
  }
`;

class ProductRegistration extends Component {
  displayBrand() {
    var data = this.props.getall;
    if (data.loading) {
      return <Option value="china">Loading...</Option>;
    } else {
      return data.brand.map((brand,key) => {
        return <Option key={key} value={brand.brandid}>{brand.brandname}</Option>;
      });
    }
  }
  displayCpu() {
    var data = this.props.getall;
    if (data.loading) {
      return <Option value="china">Loading...</Option>;
    } else {
      return data.cpu.map((cpu,key) => {
        return <Option key={key} value={cpu.cpuid}>{cpu.cname}</Option>;
      });
    }
  }
  displayGen() {
    var data = this.props.getall;
    if (data.loading) {
      return <Option value="china">Loading...</Option>;
    } else {
      return data.gen.map((gen,key) => {
        return <Option key={key} value={gen.genid}>{gen.genname}</Option>;
      });
    }
  }
  displayGpu() {
    var data = this.props.getall;
    if (data.loading) {
      return <Option value="china">Loading...</Option>;
    } else {
      return data.gpu.map((gpu,key) => {
        return <Option key={key} value={gpu.gpuid}>{gpu.gpuname}</Option>;
      });
    }
  }
  displayVendor() {
    var data = this.props.getall;
    if (data.loading) {
      return <Option value="china">Loading...</Option>;
    } else {
      return data.vendor.map((v,key) => {
        return <Option key={key} value={v.vid}>{v.vname}</Option>;
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.ADD_PROD({
          variables: {
            name: values.name,
            price: values.price,
            imgurl: values.imgurl,
            url:values.url,
            vid: values.vendor,
            brandid: values.brand,
            cpuid: values.cpu,
            gpuid: values.gpu,
            genid: values.gen
          }
        });
      }
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    console.log(this.props.data);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <h1 align="middle">PRODUCT REGISTRATION</h1>
        <Form.Item label={<span>Laptop's Name</span>}>
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input Laptop's name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Vendor" hasFeedback>
          {getFieldDecorator("vendor", {
            rules: [{ required: true, message: "Please select Vendor!" }]
          })(
            <Select placeholder="Please select Vendor Name">
              {this.displayVendor()}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Brand" hasFeedback>
          {getFieldDecorator("brand", {
            rules: [{ required: true, message: "Please select Laptop Brand!" }]
          })(
            <Select placeholder="Please select Laptop Brand">
              {this.displayBrand()}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="CPU" hasFeedback>
          {getFieldDecorator("cpu", {
            rules: [{ required: true, message: "Please select Laptop CPU!" }]
          })(
            <Select placeholder="Please select CPU">{this.displayCpu()}</Select>
          )}
        </Form.Item>
        <Form.Item label="gen" hasFeedback>
          {getFieldDecorator("gen", {
            rules: [{ required: true, message: "Please select Laptop Gen!" }]
          })(
            <Select placeholder="Please select Gen">{this.displayGen()}</Select>
          )}
        </Form.Item>
        <Form.Item label="GPU" hasFeedback>
          {getFieldDecorator("gpu", {
            rules: [{ required: true, message: "Please select Laptop GPU!" }]
          })(
            <Select placeholder="Please select Laptop GPU!">
              {this.displayGpu()}
            </Select>
          )}
        </Form.Item>

        {/* <Form.Item label="Upload">
          {getFieldDecorator("upload", {
            valuePropName: "fileList",
            getValueFromEvent: this.normFile
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item> */}

        <Form.Item label={<span>Laptop's URL</span>}>
          {getFieldDecorator("url", {
            rules: [
              {
                required: true,
                message: "Please input Laptop's URL!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={<span>Image URL</span>}>
          {getFieldDecorator("imgurl", {
            rules: [
              {
                required: true,
                message: "Please input Image URL!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Enter Price">
          <span className="ant-form-text"> ₹</span>
          {getFieldDecorator("price", {
            rules: [{ required: true, message: "Please enter laptop Price!" }]
          })(<InputNumber />)}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const ProdRegis = Form.create({ name: "ProdRegis" })(ProductRegistration);

//export default graphql(GET_ALL)(ProdRegis);
export default compose(
  graphql(GET_ALL,{name:"getall"}),
  graphql(ADD_PROD,{name:"ADD_PROD"})
  )(ProdRegis);