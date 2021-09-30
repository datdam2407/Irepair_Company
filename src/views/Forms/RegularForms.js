import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function RegularForms() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Card className="stacked-form">
              <Card.Header>
                <Card.Title as="h4">Stacked Form</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form action="#" method="#">
                  <Form.Group>
                    <label>Email address</label>
                    <Form.Control
                      placeholder="Enter email"
                      type="email"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <label>Password</label>
                    <Form.Control
                      placeholder="Password"
                      type="password"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Check>
                      <Form.Check.Label>
                        <Form.Check.Input
                          defaultValue=""
                          type="checkbox"
                        ></Form.Check.Input>
                        <span className="form-check-sign"></span>
                        Subscribe to newsletter
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Button className="btn-fill" type="submit" variant="info">
                  Submit
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="horizontal-form">
              <Card.Header>
                <Card.Title as="h4">Horizontal Form</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form className="form-horizontal">
                  <Form.Group>
                    <Row>
                      <Col className="control-label" md="3">
                        Email
                      </Col>
                      <Col md="9">
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group>
                    <Row>
                      <Col className="control-label" md="3">
                        Password
                      </Col>
                      <Col md="9">
                        <Form.Control
                          placeholder="Password"
                          type="password"
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group>
                    <Row>
                      <Col md="3"></Col>
                      <Col md="9">
                        <Form.Check>
                          <Form.Check.Label>
                            <Form.Check.Input
                              defaultValue=""
                              type="checkbox"
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                            Remember me
                          </Form.Check.Label>
                        </Form.Check>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Col md="9">
                  <Button className="btn-fill" type="submit" variant="info">
                    Sign in
                  </Button>
                </Col>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Form Elements</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form action="/" className="form-horizontal" method="get">
                  <fieldset>
                    <Form.Group>
                      <Row>
                        <Col className="control-label" sm="2">
                          With help
                        </Col>
                        <Col sm="10">
                          <Form.Control type="text"></Form.Control>
                          <Form.Text className="text-muted">
                            A block of help text that breaks onto a new line.
                          </Form.Text>
                        </Col>
                      </Row>
                    </Form.Group>
                  </fieldset>
                  <fieldset>
                    <Form.Group>
                      <Row>
                        <Col className="control-label" sm="2">
                          Password
                        </Col>
                        <Col sm="10">
                          <Form.Control
                            name="password"
                            type="password"
                          ></Form.Control>
                        </Col>
                      </Row>
                    </Form.Group>
                  </fieldset>
                  <fieldset>
                    <Form.Group>
                      <Row>
                        <Col className="control-label" sm="2">
                          Placeholder
                        </Col>
                        <Col sm="10">
                          <Form.Control
                            placeholder="placeholder"
                            type="text"
                          ></Form.Control>
                        </Col>
                      </Row>
                    </Form.Group>
                  </fieldset>
                  <fieldset>
                    <Form.Group>
                      <Row>
                        <Col className="control-label" sm="2">
                          Disabled
                        </Col>
                        <Col sm="10">
                          <Form.Control
                            disabled
                            placeholder="Disabled input here..."
                            type="text"
                          ></Form.Control>
                        </Col>
                      </Row>
                    </Form.Group>
                  </fieldset>
                  <fieldset>
                    <Form.Group>
                      <Row>
                        <Col className="control-label" sm="2">
                          Static control
                        </Col>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            tag="p"
                            defaultValue="hello@creative-tim.com"
                          ></Form.Control>
                        </Col>
                      </Row>
                    </Form.Group>
                  </fieldset>
                  <fieldset>
                    <Form.Group>
                      <Row>
                        <Col className="control-label" sm="2">
                          Checkboxes and radios
                        </Col>
                        <Col sm="10">
                          <Form.Check>
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                              First Checkbox
                            </Form.Check.Label>
                          </Form.Check>
                          <Form.Check>
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                              Second Checkbox
                            </Form.Check.Label>
                          </Form.Check>
                          <Form.Check className="form-check-radio">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue="option1"
                                id="exampleRadios11"
                                name="exampleRadio"
                                type="radio"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                              Radio is off
                            </Form.Check.Label>
                          </Form.Check>
                          <Form.Check className="form-check-radio">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue="option2"
                                id="exampleRadios12"
                                name="exampleRadio"
                                type="radio"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                              Radio is on
                            </Form.Check.Label>
                          </Form.Check>
                        </Col>
                      </Row>
                    </Form.Group>
                  </fieldset>
                  <fieldset>
                    <Form.Group>
                      <Row>
                        <Col className="control-label" sm="2">
                          Inline checkboxes
                        </Col>
                        <Col sm="10">
                          <Form.Check className="checkbox-inline">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue="option1"
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>a
                            </Form.Check.Label>
                          </Form.Check>
                          <Form.Check className="checkbox-inline">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue="option2"
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>b
                            </Form.Check.Label>
                          </Form.Check>
                          <Form.Check className="checkbox-inline">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue="option3"
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>c
                            </Form.Check.Label>
                          </Form.Check>
                        </Col>
                      </Row>
                    </Form.Group>
                  </fieldset>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Input Variants</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form action="/" className="form-horizontal" method="get">
                  <Row>
                    <Col className="control-label" sm="2">
                      Custom Checkboxes &amp; radios
                    </Col>
                    <Col
                      className="checkbox-radios"
                      sm={{ span: 4, offset: 1 }}
                    >
                      <Form.Check>
                        <Form.Check.Label>
                          <Form.Check.Input type="checkbox"></Form.Check.Input>
                          <span className="form-check-sign"></span>
                          Unchecked
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check>
                        <Form.Check.Label>
                          <Form.Check.Input
                            defaultChecked
                            type="checkbox"
                          ></Form.Check.Input>
                          <span className="form-check-sign"></span>
                          Checked
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check disabled>
                        <Form.Check.Label>
                          <Form.Check.Input
                            disabled
                            type="checkbox"
                          ></Form.Check.Input>
                          <span className="form-check-sign"></span>
                          Disabled Unchecked
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check disabled>
                        <Form.Check.Label>
                          <Form.Check.Input
                            disabled
                            type="checkbox"
                          ></Form.Check.Input>
                          <span className="form-check-sign"></span>
                          Disabled Checked
                        </Form.Check.Label>
                      </Form.Check>
                    </Col>
                    <Col className="checkbox-radios" sm="5">
                      <Form.Check className="form-check-radio">
                        <Form.Check.Label>
                          <Form.Check.Input
                            defaultValue="option1"
                            id="exampleRadios21"
                            name="exampleRadio"
                            type="radio"
                          ></Form.Check.Input>
                          <span className="form-check-sign"></span>
                          Radio is off
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="form-check-radio">
                        <Form.Check.Label>
                          <Form.Check.Input
                            defaultChecked
                            defaultValue="option2"
                            id="exampleRadios22"
                            name="exampleRadio"
                            type="radio"
                          ></Form.Check.Input>
                          <span className="form-check-sign"></span>
                          Radio is on
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="form-check-radio" disabled>
                        <Form.Check.Label>
                          <Form.Check.Input
                            defaultValue="option1"
                            disabled
                            id="exampleRadios31"
                            name="exampleRadio1"
                            type="radio"
                          ></Form.Check.Input>
                          <span className="form-check-sign"></span>
                          Radio disabled is off
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="form-check-radio" disabled>
                        <Form.Check.Label>
                          <Form.Check.Input
                            defaultChecked
                            defaultValue="option2"
                            disabled
                            id="exampleRadios32"
                            name="exampleRadio1"
                            type="radio"
                          ></Form.Check.Input>
                          <span className="form-check-sign"></span>
                          Radio disabled is on
                        </Form.Check.Label>
                      </Form.Check>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="control-label" sm="2">
                      Input with success
                    </Col>
                    <Col sm="10">
                      <Form.Group className="has-success">
                        <Form.Control
                          defaultValue="Success"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="control-label" sm="2">
                      Input with error
                    </Col>
                    <Col sm="10">
                      <Form.Group className="has-error">
                        <Form.Control
                          defaultValue="Error"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="control-label" sm="2">
                      Column sizing
                    </Col>
                    <Col sm="10">
                      <Row>
                        <Col md="3">
                          <Form.Group>
                            <Form.Control
                              placeholder=".col-md-3"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="4">
                          <Form.Group>
                            <Form.Control
                              placeholder=".col-md-4"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="5">
                          <Form.Group>
                            <Form.Control
                              placeholder=".col-md-5"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RegularForms;
