import React, { Component } from 'react'
import styled from 'styled-components';
import { Menu, Icon, Layout, Button } from 'antd'
import { Link } from 'react-router-dom'
const {Header} = Layout
// const SubMenu = Menu.SubMenu
// const MenuItemGroup = Menu.ItemGroup

//STYLED COMPONENTS
// const Title = styled.h1`
//   font-size: 3em;
//   font-family: 'Economica', sans-serif;
//   text-align: center;
//   color: palevioletred;
// `
// const Nav = styled(Header)`
//   position: fixed;
//   width: 100%;
// `

class Navbar extends Component {
  state = {
    current: 'home',
  }
  
  // HANDLERS
  handleClick = (ev) => {
    this.setState({
      current: ev.key
    })
  }
  
  render() { 
    return (
      <Header className="header">
        <div className="logo"></div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
        >
          <Menu.Item key="home">
            <Link to="/">
              <Icon type="smile-o" />
              HOME
            </Link>
          </Menu.Item>
          <Menu.Item key="productregistration">
            <Link to="/productregistration">
              <Icon type="appstore" />
              STORE
            </Link>
          </Menu.Item>
          <Menu.Item key="cart">
            <Link to="/cart">
              <Icon type="shopping-cart" />
              CART
            </Link>
          </Menu.Item>
          <Menu.Item key="prodedit">
            <Link to="/prodedit">
              EDIT
            </Link>
          </Menu.Item>

          <Menu.Item key="login" style={{ float: "right" }}>
            <Link to="/login">
              <Icon type="heart-o" />
              SIGN IN
            </Link>
          </Menu.Item>
          <Menu.Item key="logout" style={{ float: "right" }}>
            <Link to="/logout">LogOut</Link>
          </Menu.Item>
          {/* <Menu.Item
            key="logout"
            style={{ float: "right" }}
            onClick={localStorage.clear()}
          >
            Log Out
          </Menu.Item> */}
        </Menu>
      </Header>
    );
  }
}
export default (Navbar);