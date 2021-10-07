import React, { useState, useEffect } from "react";
import {logout} from '../../Firebase/firebaseConfig';
// react-bootstrap components
import {
  Badge,
  Button,
  Dropdown,
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import routes from "routes.js";

function AdminNavbar() {
 
  const [modal, setModalLogOut] = useState(false);
  const toggleLogOut = () => setModalLogOut(!modal);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
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
              className="mr-2"
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
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-165516306"
                  variant="default"
                >
                  <i className="nc-icon nc-planet"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Create New Post
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Manage Something
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Do Nothing
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Submit to live
                  </Dropdown.Item>
                  <li className="divider"></li>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Another action
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-414718872"
                  variant="default"
                >
                  <i className="nc-icon nc-bell-55 mr-1"></i>
                  <span className="notification">5</span>
                  <span className="d-lg-none">Notification</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Notification 1
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Notification 2
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Notification 3
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Notification 4
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Notification 5
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-41471887333"
                  variant="default"
                >
                  <i className="nc-icon nc-bullet-list-67"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  alignRight
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="nc-icon nc-email-85"></i>
                    Messages
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="nc-icon nc-umbrella-13"></i>
                    Help Center
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="nc-icon nc-settings-90"></i>
                    Settings
                  </Dropdown.Item>
                  <div className="divider"></div>

                  <Dropdown.Item
                    className="text-danger"
                    href="#pablo"
                    onClick={() => {
                      // Logout(e);
                      setModalLogOut(true);
                    }}
                  >
                    <i className="nc-icon nc-button-power"></i>
                    Log out
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
          <h5>Do you want to log out?</h5>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              logout();
              setModalLogOut(true);
              window.location.href = "/";
              localStorage.clear();
              sessionStorage.clear();
            }}
          >     
            Log out
          </Button>{""}

          <Button color="secondary" onClick={toggleLogOut}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AdminNavbar;
