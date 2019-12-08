import React, { Component } from "react";
import { Layout, Row, Menu, Col, Icon } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from 'react-router-dom'
import { compose } from "recompose";
const { Header, Content, Sider, Form, InputNumber, Button } = Layout;
const { SubMenu } = Menu;
const GET_ALL_PROD = gql`
  query getAllProd($vid:Int!) {
    products(where: { vendor: { vid: { _eq: $vid } } }) {
      pid
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
const DELETE_PROD = gql`
  mutation deleteProd($pid: Int!) {
    delete_products(where: { pid: { _eq: $pid } }) {
      affected_rows
      returning {
        productname
        vendor {
          vname
        }
      }
    }
  }
`;


const UPDATE_PRICE = gql`
  mutation($pid: Int!, $price: Int!) {
    update_products(
      where: { pid: { _eq: $pid } }
      _set: { productprice: $price }
    ) {
      affected_rows
      returning {
        productname
        productprice
      }
    }
  }
`;

class ProductEdit extends Component {
  state = {
    pid:'',
    price:''
  }
  handleOnClick = id => e => {
    e.preventDefault();
    console.log("Product ID to be deleted:", id);
    this.props.DELETE_PROD({
      variables: {
        pid: id
      },
      refetchQueries: [{ query: GET_ALL_PROD }]
    });
  };

  handleSubmit = ()=>{
                       this.props.UPDATE_PRICE({
                       variables: {
                       pid: this.state.pid,
                       price: this.state.price
                       }
                       });
                     }

  handlePriceChange = (id,e) => {
    e.preventDefault();

    console.log("ID",e.target.value,id)
    this.setState({
      pid:id,
      price:e.target.value
    })
  };

  displayProducts() {
    var data = this.props.getall;
    if (data.loading) {
      return <div>Loading ...</div>;
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
                      <input onChange={(e)=>this.handlePriceChange(prod.pid, e)}/>
                      <button onClick={this.handleSubmit}>Submit</button>
                      <button
                        onClick={this.handleOnClick(prod.pid)}
                        style={{ float: "right" }}
                      >
                        <Icon type="delete" />
                      </button>
                      {/* <Link
                        to={`/produpdate?pid=${prod.pid}`}
                        style={{ float: "right" }}
                      >
                        <li>EDIT</li>
                      </Link> */}
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
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <h1 align="middle">CART</h1>
            <div className="productScroll">
              <Row gutter={[24, 24]}>{this.displayProducts()}</Row>
            </div>
          </Content>
        </Layout>
      </Content>
    );
  }
}



export default compose(
  graphql(
    GET_ALL_PROD,
    { name: "getall" },
    {
      options: props => {
        return {
          variables: {
            vid: props.vid
          }
        };
      }
    }
  ),
  graphql(UPDATE_PRICE, { name: "UPDATE_PRICE" }),
  graphql(DELETE_PROD, { name: "DELETE_PROD" })
)(ProductEdit);
