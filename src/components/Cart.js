import React, { Component } from "react";
import { Layout, Row, Menu, Col, Icon } from "antd";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { compose } from "recompose";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const GET_ALL_PROD = gql`
  query($cusid: uuid!) {
    cart(where: { cusid: { _eq: $cusid } }) {
      product {
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
  }
`;
const GET_COST = gql`
  query($cusid: uuid!) {
    customer(where: { cusid: { _eq: $cusid } }) {
      name
      total_cost
    }
  }
`;
const DELETE_PROD = gql`
  mutation deleteProd($pid: Int!, $cusid: uuid!) {
    delete_cart(where: { cusid: { _eq: $cusid }, pid: { _eq: $pid } }) {
      affected_rows
    }
  }
`;
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { total_cost: '' };
  }

  handleOnClick = id => e => {
    e.preventDefault();
    console.log("Product ID to be deleted:", id);
    this.props.DELETE_PROD({
      variables: {
        pid: id,
        cusid: localStorage.getItem("cusid")
      },
      refetchQueries: [{ query: GET_ALL_PROD }]
    });
  };
  displayCost(){
    var data = this.props.GET_COST;
    if (data.loading){
      return <div>Loading....</div>
    }else{
    return data.customer.map(cus => {return (<div>{cus.name}'s TotalCost: ‎₹{cus.total_cost}</div>)})
    }
  }
  displayProducts() {
    var data = this.props.GET_ALL_PROD;
    // this.props.GET_ALL_PROD({
    //     variables: {
    //         cusid: localStorage.getItem("cusid")
    //     }
    // });
    if (data.loading) {
      return <div>Loading ....</div>;
    } else {
      return data.cart.map(cart => {
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
                        src={cart.product.productimglink}
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{cart.product.brand.brandname}</strong>{" "}
                        <small>{cart.product.cpu.cname}</small>{" "}
                        <small>{cart.product.gen.genname}</small>{" "}
                        <small>{cart.product.gpu.gpuname}-VRAM</small>
                        <br />
                        <a href={cart.product.producturl}>
                          {cart.product.productname}
                        </a>
                      </p>
                      <p>₹{cart.product.productprice}</p>
                      <button
                        onClick={this.handleOnClick(cart.product.pid)}
                        style={{ float: "right" }}
                      >
                        <Icon type="delete" />
                      </button>
                      <small>{cart.product.vendor.vurl}</small>
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
        <Row>{this.displayCost()}</Row>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
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
    { name: "GET_ALL_PROD" },
    {
      options: props => {
        return {
          variables: {
            cusid: props.cusid
          }
        };
      }
    }
  ),
  graphql(
    GET_COST,
    { name: "GET_COST" },
    {
      options: props => {
        return {
          variables: {
            cusid: props.cusid
          }
        };
      }
    }
  ),
  graphql(DELETE_PROD, { name: "DELETE_PROD" })
)(Cart);
