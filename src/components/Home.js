import React, { Component } from 'react'
import { Layout, Row, Menu, Col, Icon } from "antd";
import gql from 'graphql-tag';
import {graphql} from 'react-apollo'
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const GET_ALL_PROD = gql`
  query getAllProd {
    products {
      productimglink
      productname
      productprice
      producturl
      brand {
        brandname
      }
      vendor {
        vurl
        vname
      }
      cpu {
        cname
      }
      gen {
        genname
      }
      gpu {
        gpuname
      }
    }
  }
`;
class Home extends Component {
  displayProducts() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.products.map(prod => {
        return (
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div class="box">
                <article class="media">
                  <div class="media-left">
                    <figure class="image is-128x128">
                      <img
                        alt="example"
                        width="200px"
                        height="200px"
                        src={prod.productimglink}
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{prod.brand.brandname}</strong>{" "}
                        <small>{prod.cpu.cname}</small>{" "}
                        <small>{prod.gen.genname}</small>{" "}
                        <small>{prod.gpu.gpuname}-VRAM</small>
                        <br />
                        <a href={prod.producturl}>{prod.productname}</a>
                      </p>
                      <p>₹{prod.productprice}</p>
                      <button style={{ float: "right" }}>
                        <Icon type="delete" />
                      </button>
                      <small>{prod.vendor.vurl}</small>
                    </div>
                    <nav class="level is-mobile">
                      <div class="level-left">
                        <a class="level-item" aria-label="reply">
                          <span class="icon is-small">
                            <i class="fas fa-reply" aria-hidden="true"></i>
                          </span>
                        </a>
                        <a class="level-item" aria-label="retweet">
                          <span class="icon is-small">
                            <i class="fas fa-retweet" aria-hidden="true"></i>
                          </span>
                        </a>
                        <a class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </a>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
            </Col>
          </Row>
        );
      });
    }
  }
  render() {
    console.log(this.props);
    return (

      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    subnav 1
                  </span>
                }
              >
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <div className="productScroll">
              <Row gutter={[24, 24]}>{this.displayProducts()}</Row>
            </div>
          </Content>
        </Layout>
      </Content>
    );
  }
};


export default graphql(GET_ALL_PROD)(Home);