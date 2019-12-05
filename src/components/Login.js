import React, { Component } from "react"
import CusLogin from './CustomerLogin'
import VenLogin from "./VendorLogin"
import { Row,Col } from "antd";

class Login extends Component {
    
    render() { 
        return (
          <Row>
            <Col>
              <CusLogin />
              <VenLogin />
            </Col>
          </Row>
        );
    }
}
 
export default Login;