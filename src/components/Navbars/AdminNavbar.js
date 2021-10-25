import React, { useState, useEffect } from "react";
import { logout } from "Firebase/firebaseConfig";
import "../../assets/css/customSizeCompany.css";
// react-bootstrap components
import {
  Badge,
  Button,
  Dropdown,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import routes from "routes.js";

function AdminNavbar() {
  function displayCompanyName(type) {
    const stateValue = {
      "234be13b-421b-40d9-8226-0f162dee7ac8": "Công ty điện lạnh Thành Công",
      "7e179e62-21da-45c1-afe4-114a580f0a12": "Công ty điện lạnh Long Châu",
      "404f25c6-4f40-4f83-acfd-16a0d7c2f8e9": "Công ty điện lạnh, điện gia dụng Thủy Tiên",
      "4bb0a83e-e9d9-47b5-8019-20c19e953181": "Công ty điện lạnh Hòa Hưng",
      "dd0b937a-8e90-4af3-bfe8-0a8cc0722f6a": "IrepairX",
      "17ab8695-daec-4ceb-9f78-07c9528c0009": "CompanyX",
    };
    return stateValue[type] ? stateValue[type] : "";
  }
  const [modal, setModalLogOut] = useState(false);
  const toggleLogOut = () => setModalLogOut(!modal);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const getBrandText = () => {
   
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[0].layout + routes[0].path) == 0) {
        return displayCompanyName(localStorage.getItem("IDCompany"));
      }
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <>
      <Navbar expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-minimize">
              <Button
                className="btn-fill btn-round btn-icon d-none d-lg-block bg-dark border-dark"
                variant="dark"
                onClick={() => document.body.classList.toggle("sidebar-mini")}
              >
                <i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
                <i className="fas fa-bars visible-on-sidebar-mini"></i>
              </Button>
              <Button
                className="btn-fill btn-round btn-icon d-block d-lg-none bg-dark border-dark"
                variant="dark"
                onClick={() =>
                  document.documentElement.classList.toggle("nav-open")
                }
              >
                <i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
                <i className="fas fa-bars visible-on-sidebar-mini"></i>
              </Button>
            </div>
            <Navbar.Brand
              href="#home"
              onClick={(e) => e.preventDefault()}
              className="mr-2-css"
            >
              {getBrandText()}
            </Navbar.Brand>
          </div>
          <button
            className="navbar-toggler navbar-toggler-right border-0"
            type="button"
            onClick={() => setCollapseOpen(!collapseOpen)}
          >
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
          </button>
          <Navbar.Collapse className="justify-content-end" in={collapseOpen}>
            <Nav navbar>
              <Dropdown className="userDropdown" as={Nav.Item}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-41471887333"
                  variant="default"
                  className="userDropdown"
                >
                        <Row>
                    <Col md={4}>
                  <div className="photoCustomer">
                    <img
                      alt="..."
                      src={localStorage.getItem("photo")}
                    ></img>
                  </div>
                  </Col>
                 
                  </Row>
                  <div className="info-customer">
                    <a
                      data-toggle="collapse"
                      href="#pablo"
                    >
                      <span>
                      {localStorage.getItem("NAME")}
  <b className="caret"></b>
                      </span>
                    </a>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  alignRight
                  aria-labelledby="navbarDropdownMenuLink"
                >
            
                  <Dropdown.Item>
                  
                    <i className="nc-icon nc-email-85"></i>
                    Tin nhắn
                  </Dropdown.Item>
                  {/* <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="nc-icon nc-umbrella-13"></i>
                    Help Center
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    href="#pablo"
                    
                    onClick={(e) => 
                      window.location.href = "https://main.d2ogi9l2y3fj48.amplifyapp.com/admin/user-page"}
                      // window.location.href = "http://localhost:3000/admin/user-page"}
                  >
                    <i className="nc-icon nc-settings-90"></i>
                    Cài Đặt
                  </Dropdown.Item>
                  <div className="divider"></div>

                  <Dropdown.Item
                    className="text-danger"
                    href="#pablo"
                    onClick={() => {
                      // Logout(e);
                      setModalLogOut(true);
                    }}                  >
                    <i className="nc-icon nc-button-power"></i>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal isOpen={modal} toggle={toggleLogOut}>
        <ModalHeader
          style={{ color: "#B22222" }}
        // close={closeBtn(toggleLogOut)}
        // toggle={toggleLogOut}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>
          <h5>Bạn có muốn đăng xuất?</h5>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              setModalLogOut(false);
              logout();
              window.location.href = "/";
            }}
          >
            Đăng Xuất
          </Button>{" "}
          <Button color="secondary" onClick={toggleLogOut}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AdminNavbar;
