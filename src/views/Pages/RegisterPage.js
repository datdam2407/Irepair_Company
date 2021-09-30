import React from "react";
import { Link} from "react-router-dom";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Media,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function RegisterPage() {
  return (
    <>
      <div
        className="full-page register-page section-image"
        data-color="orange"
        data-image={require("assets/img/bg5.jpg").default}
      >
        <div className="content d-flex align-items-center">
          <Container>
            <Card className="card-register card-plain text-center">
              <Card.Header>
                <Row className="justify-content-center">
                  <Col md="8">
                    <div className="header-text">
                      <Card.Title as="h2">
                        Register page
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col className="ml-auto" md="7" lg="5">
                    <Media>
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-circle-09"></i>
                        </div>
                      </div>
                      <Media.Body>
                        <h4>Account</h4>
                        <p>
                        Allowing users to access the system 
                        without unauthorized addition of members
                        </p>
                      </Media.Body>
                    </Media>
                    <Media>
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-preferences-circle-rotate"></i>
                        </div>
                      </div>
                      <Media.Body>
                        <h4>Policy</h4>
                        <p>
                        Equal opportunity policy , Workplace health and safety, Determine the content needed for the policy,
                        Communicate the new policy to employees, Update and revise the policy as necessary
                        </p>
                      </Media.Body>
                    </Media>
                    <Media>
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-planet"></i>
                        </div>
                      </div>
                      <Media.Body>
                        <h4>Data security</h4>
                        <p>
                          Data security generally involves the protection of specific data blocks,
                          either physically or interpreting them through security sections
                          through meaningful information.
                        </p>
                      </Media.Body>
                    </Media>
                  </Col>
                  <Col className="mr-auto" md="5" lg="4">
                    <Form action="#" method="#">
                      <Card className="card-plain">
                        <div className="card-body">
                          <Form.Group>
                            <Form.Control
                              placeholder="Your First Name"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Your Last Name"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Company"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Enter email"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Password"
                              type="password"
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Password Confirmation"
                              type="password"
                            ></Form.Control>
                          </Form.Group>
                        </div>
                        <div className="card-footer text-center">
                          <Button
                            className="btn-fill btn-neutral btn-wd"
                            type="submit"
                            variant="default"
                          >
                            Create Account
                          </Button>
                          <Button
                          onClick={() => {
                            window.location.href = "https://main.d2ogi9l2y3fj48.amplifyapp.com/admin/dashboard";
                          }}
                          >
                            Cancel 
                          </Button>
                        </div>
                      </Card>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
        <div
          className="full-page-background"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg5.jpg").default + ")",
          }}
        ></div>
      </div>
    </>
  );
}

export default RegisterPage;
