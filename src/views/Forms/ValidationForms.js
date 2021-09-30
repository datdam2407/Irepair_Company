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

// validators
const emailValidation = (value) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    value
  );
const urlValidation = (value) => {
  let returnValue = true;
  try {
    new URL(value);
  } catch (e) {
    returnValue = false;
  } finally {
    return returnValue;
  }
  return false;
};
const equalTo = (value1, value2) => value1 === value2;
const isRequired = (value) => value !== null && value !== "" && value;
const isNumber = (value) => !isNaN(value) && value !== "";
const minLength = (value, length) => value.length >= length;
const maxLength = (value, length) => value.length <= length && value !== "";
const range = (value, min, max) => min <= value && value <= max;
const minValue = (value, min) => min <= value;
const maxValue = (value, max) => max >= value;

function ValidationForms() {
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerEmailState, setRegisterEmailState] = React.useState(true);
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [registerPasswordState, setRegisterPasswordState] = React.useState(
    true
  );
  const [registerConfirmPassword, setRegisterConfirmPassword] = React.useState(
    ""
  );
  const [
    registerConfirmPasswordState,
    setRegisterConfirmPasswordState,
  ] = React.useState(true);
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginEmailState, setLoginEmailState] = React.useState(true);
  const [loginPassword, setLoginPassword] = React.useState("");
  const [loginPasswordState, setLoginPasswordState] = React.useState(true);
  const [typeRequired, setTypeRequired] = React.useState("");
  const [typeRequiredState, setTypeRequiredState] = React.useState(true);
  const [typeEmail, setTypeEmail] = React.useState("");
  const [typeEmailState, setTypeEmailState] = React.useState(true);
  const [typeNumber, setTypeNumber] = React.useState("");
  const [typeNumberState, setTypeNumberState] = React.useState(true);
  const [typeURL, setTypeURL] = React.useState("");
  const [typeURLState, setTypeURLState] = React.useState(true);
  const [typeEqualTo1, setTypeEqualTo1] = React.useState("");
  const [typeEqualTo1State, setTypeEqualTo1State] = React.useState(true);
  const [typeEqualTo2, setTypeEqualTo2] = React.useState("");
  const [typeEqualTo2State, setTypeEqualTo2State] = React.useState(true);
  const [rangeMinLength, setRangeMinLength] = React.useState("");
  const [rangeMinLengthState, setRangeMinLengthState] = React.useState(true);
  const [rangeMaxLength, setRangeMaxLength] = React.useState("");
  const [rangeMaxLengthState, setRangeMaxLengthState] = React.useState(true);
  const [rangeRange, setRangeRange] = React.useState("");
  const [rangeRangeState, setRangeRangeState] = React.useState(true);
  const [rangeMinValue, setRangeMinValue] = React.useState("");
  const [rangeMinValueState, setRangeMinValueState] = React.useState(true);
  const [rangeMaxValue, setRangeMaxValue] = React.useState("");
  const [rangeMaxValueState, setRangeMaxValueState] = React.useState(true);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Form action="" id="RegisterValidation" method="">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Register Form</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Group
                    className={
                      "has-label " +
                      (registerEmailState ? "has-success" : "has-error")
                    }
                  >
                    <label>
                      Email Address <span className="star">*</span>
                    </label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={registerEmail}
                      onChange={(e) => {
                        setRegisterEmail(e.target.value);
                        if (emailValidation(e.target.value)) {
                          setRegisterEmailState(true);
                        } else {
                          setRegisterEmailState(false);
                        }
                      }}
                    ></Form.Control>
                    {registerEmailState ? null : (
                      <label className="error">This field is required.</label>
                    )}
                  </Form.Group>
                  <Form.Group
                    className={
                      "has-label " +
                      (registerPasswordState ? "has-success" : "has-error")
                    }
                  >
                    <label>
                      Password <span className="star">*</span>
                    </label>
                    <Form.Control
                      id="registerPassword"
                      name="password"
                      type="password"
                      value={registerPassword}
                      onChange={(e) => {
                        setRegisterPassword(e.target.value);
                        if (minLength(e.target.value, 1)) {
                          setRegisterPasswordState(true);
                        } else {
                          setRegisterPasswordState(false);
                        }
                      }}
                    ></Form.Control>
                    {registerPassword ? null : (
                      <label className="error">This field is required.</label>
                    )}
                  </Form.Group>
                  <Form.Group
                    className={
                      "has-label " +
                      (registerConfirmPasswordState
                        ? "has-success"
                        : "has-error")
                    }
                  >
                    <label>
                      Confirm Password <span className="star">*</span>
                    </label>
                    <Form.Control
                      equalto="#registerPassword"
                      id="registerPasswordConfirmation"
                      name="password_confirmation"
                      type="password"
                      value={registerConfirmPassword}
                      onChange={(e) => {
                        setRegisterConfirmPassword(e.target.value);
                        if (equalTo(e.target.value, registerPassword)) {
                          setRegisterConfirmPasswordState(true);
                        } else {
                          setRegisterConfirmPasswordState(false);
                        }
                      }}
                    ></Form.Control>
                    {registerConfirmPassword ? null : (
                      <label className="error">
                        This field is required and needs to be equal with the
                        one above.
                      </label>
                    )}
                  </Form.Group>
                  <div className="card-category form-category">
                    <span className="star">*</span>
                    Required fields
                  </div>
                </Card.Body>
                <Card.Footer className="text-right">
                  <Button
                    className="btn-fill pull-right"
                    variant="info"
                    onClick={() => {
                      if (
                        !registerEmailState ||
                        !emailValidation(registerEmail)
                      ) {
                        setRegisterEmailState(false);
                      } else {
                        setRegisterEmailState(true);
                      }
                      if (
                        !registerPasswordState ||
                        !minLength(registerPassword, 1)
                      ) {
                        setRegisterPasswordState(false);
                      } else {
                        setRegisterPasswordState(true);
                      }
                      if (
                        !registerConfirmPasswordState ||
                        !minLength(registerConfirmPassword, 1) ||
                        !equalTo(registerConfirmPassword, registerPassword)
                      ) {
                        setRegisterConfirmPasswordState(false);
                      } else {
                        setRegisterConfirmPasswordState(true);
                      }
                    }}
                  >
                    Register
                  </Button>
                  <Form.Group className="pull-left">
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
                  <div className="clearfix"></div>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
          <Col md="6">
            <Form action="" id="LoginValidation" method="">
              <Card>
                <Card.Header>
                  <Card.Title as="h4" className="text-center">
                    Login Form
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Group
                    className={
                      "has-label " +
                      (loginEmailState ? "has-success" : "has-error")
                    }
                  >
                    <label>
                      Email Address <span className="star">*</span>
                    </label>
                    <Form.Control
                      name="email"
                      type="text"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        if (emailValidation(e.target.value)) {
                          setLoginEmailState(true);
                        } else {
                          setLoginEmailState(false);
                        }
                      }}
                    ></Form.Control>
                    {loginEmailState ? null : (
                      <label className="error">This field is required.</label>
                    )}
                  </Form.Group>
                  <Form.Group
                    className={
                      "has-label " +
                      (loginPasswordState ? "has-success" : "has-error")
                    }
                  >
                    <label>
                      Password <span className="star">*</span>
                    </label>
                    <Form.Control
                      name="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        if (minLength(e.target.value, 1)) {
                          setLoginPasswordState(true);
                        } else {
                          setLoginPasswordState(false);
                        }
                      }}
                    ></Form.Control>
                    {loginPasswordState ? null : (
                      <label className="error">This field is required.</label>
                    )}
                  </Form.Group>
                  <div className="card-category form-category">
                    <span className="star">*</span>
                    Required fields
                  </div>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button
                    className="btn-fill btn-wd"
                    variant="info"
                    onClick={() => {
                      if (!loginEmailState || !emailValidation(loginEmail)) {
                        setLoginEmailState(false);
                      } else {
                        setLoginEmailState(true);
                      }
                      if (!loginPasswordState || !minLength(loginPassword, 1)) {
                        setLoginPasswordState(false);
                      } else {
                        setLoginPasswordState(true);
                      }
                    }}
                  >
                    Register
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
          <Col md="12">
            <Form
              action=""
              className="form-horizontal"
              id="TypeValidation"
              method=""
            >
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Type Validation</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Form.Label column sm="2">
                      Required Text
                    </Form.Label>
                    <Col sm="7">
                      <Form.Group
                        className={
                          typeRequiredState ? "has-success" : "has-error"
                        }
                      >
                        <Form.Control
                          name="required"
                          type="text"
                          value={typeRequired}
                          onChange={(e) => {
                            setTypeRequired(e.target.value);
                            if (isRequired(e.target.value)) {
                              setTypeRequiredState(true);
                            } else {
                              setTypeRequiredState(false);
                            }
                          }}
                        ></Form.Control>
                        {typeRequiredState ? null : (
                          <label className="error">
                            This field is required.
                          </label>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="label-on-right" sm="3">
                      <code>required</code>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm="2">
                      Email
                    </Form.Label>
                    <Col sm="7">
                      <Form.Group
                        className={typeEmailState ? "has-success" : "has-error"}
                      >
                        <Form.Control
                          name="email"
                          type="text"
                          value={typeEmail}
                          onChange={(e) => {
                            setTypeEmail(e.target.value);
                            if (emailValidation(e.target.value)) {
                              setTypeEmailState(true);
                            } else {
                              setTypeEmailState(false);
                            }
                          }}
                        ></Form.Control>
                        {typeEmailState ? null : (
                          <label className="error">
                            This field is required to be an email.
                          </label>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="label-on-right" sm="3">
                      <code>email="true"</code>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm="2">
                      Number
                    </Form.Label>
                    <Col sm="7">
                      <Form.Group
                        className={
                          typeNumberState ? "has-success" : "has-error"
                        }
                      >
                        <Form.Control
                          name="number"
                          type="text"
                          value={typeNumber}
                          onChange={(e) => {
                            setTypeNumber(e.target.value);
                            if (isNumber(e.target.value)) {
                              setTypeNumberState(true);
                            } else {
                              setTypeNumberState(false);
                            }
                          }}
                        ></Form.Control>
                        {typeNumberState ? null : (
                          <label className="error">
                            This field is required to be a number.
                          </label>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="label-on-right" sm="3">
                      <code>number="true"</code>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm="2">
                      Url
                    </Form.Label>
                    <Col sm="7">
                      <Form.Group
                        className={typeURLState ? "has-success" : "has-error"}
                      >
                        <Form.Control
                          name="url"
                          type="text"
                          value={typeURL}
                          onChange={(e) => {
                            setTypeURL(e.target.value);
                            if (urlValidation(e.target.value)) {
                              setTypeURLState(true);
                            } else {
                              setTypeURLState(false);
                            }
                          }}
                        ></Form.Control>
                        {typeURLState ? null : (
                          <label className="error">
                            This field is required to be a valid URL.
                          </label>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="label-on-right" sm="3">
                      <code>url="true"</code>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm="2">
                      Equal to
                    </Form.Label>
                    <Col sm="3">
                      <Form.Group>
                        <Form.Control
                          id="idSource"
                          placeholder="#idSource"
                          type="text"
                          value={typeEqualTo1}
                          onChange={(e) => setTypeEqualTo1(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col sm="3">
                      <Form.Group
                        className={
                          typeEqualTo2State ? "has-success" : "has-error"
                        }
                      >
                        <Form.Control
                          equalto="#idSource"
                          id="idDestination"
                          placeholder="#idDestination"
                          type="text"
                          value={typeEqualTo2}
                          onChange={(e) => {
                            setTypeEqualTo2(e.target.value);
                            if (equalTo(e.target.value, typeEqualTo1)) {
                              setTypeEqualTo2State(true);
                            } else {
                              setTypeEqualTo2State(false);
                            }
                          }}
                        ></Form.Control>
                        {typeEqualTo2State ? null : (
                          <label className="error">
                            This field is required to be equal to the left one.
                          </label>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="label-on-right" sm="4">
                      <code>equalTo="#idSource"</code>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button
                    variant="info"
                    onClick={() => {
                      if (!typeRequiredState || !isRequired(typeRequired)) {
                        setTypeRequiredState(false);
                      } else {
                        setTypeRequiredState(true);
                      }
                      if (!typeEmailState || !emailValidation(typeEmail)) {
                        setTypeEmailState(false);
                      } else {
                        setTypeEmailState(true);
                      }
                      if (!typeNumberState || !isNumber(typeNumber)) {
                        setTypeNumberState(false);
                      } else {
                        setTypeNumberState(true);
                      }
                      if (!typeURLState || !urlValidation(typeURL)) {
                        setTypeURLState(false);
                      } else {
                        setTypeURLState(true);
                      }
                      if (
                        !typeEqualTo2State ||
                        !equalTo(typeEqualTo1, typeEqualTo2)
                      ) {
                        setTypeEqualTo2State(false);
                      } else {
                        setTypeEqualTo2State(true);
                      }
                    }}
                  >
                    Validate Inputs
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
          <Col md="12">
            <Form
              action=""
              className="form-horizontal"
              id="RangeValidation"
              method=""
            >
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Range Validation</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Form.Label column sm="2">
                      Min Length
                    </Form.Label>
                    <Col sm="7">
                      <Form.Group
                        className={
                          rangeMinLengthState ? "has-success" : "has-error"
                        }
                      >
                        <Form.Control
                          name="min_length"
                          type="text"
                          value={rangeMinLength}
                          onChange={(e) => {
                            setRangeMinLength(e.target.value);
                            if (minLength(e.target.value, 5)) {
                              setRangeMinLengthState(true);
                            } else {
                              setRangeMinLengthState(false);
                            }
                          }}
                        ></Form.Control>
                        {rangeMinLengthState ? null : (
                          <label className="error">
                            This field does not have a minimum length of 5.
                          </label>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="label-on-right" sm="3">
                      <code>minLength="5"</code>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm="2">
                      Max Length
                    </Form.Label>
                    <Col sm="7">
                      <Form.Group
                        className={
                          rangeMaxLengthState ? "has-success" : "has-error"
                        }
                      >
                        <Form.Control
                          name="max_length"
                          type="text"
                          value={rangeMaxLength}
                          onChange={(e) => {
                            setRangeMaxLength(e.target.value);
                            if (maxLength(e.target.value, 5)) {
                              setRangeMaxLengthState(true);
                            } else {
                              setRangeMaxLengthState(false);
                            }
                          }}
                        ></Form.Control>
                        {rangeMaxLengthState ? null : (
                          <label className="error">
                            This field does not have a maximum length of 5.
                          </label>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="label-on-right" sm="3">
                      <code>maxLength="5"</code>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm="2">
                      Range
                    </Form.Label>
                    <Col sm="7">
                      <Form.Group
                        className={
                          rangeRangeState ? "has-success" : "has-error"
                        }
                      >
                        <Form.Control
                          name="range"
                          type="text"
                          value={rangeRange}
                          onChange={(e) => {
                            setRangeRange(e.target.value);
                            if (range(e.target.value, 6, 10)) {
                              setRangeRangeState(true);
                            } else {
                              setRangeRangeState(false);
                            }
                          }}
                        ></Form.Control>
                        {rangeRangeState ? null : (
                          <label className="error">
                            This field has to be a number between 6 and 10.
                          </label>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="label-on-right" sm="3">
                      <code>range="[6,10]"</code>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm="2">
                      Min Value
                    </Form.Label>
                    <Col sm="7">
                      <Form.Group
                        className={
                          rangeMinValueState ? "has-success" : "has-error"
                        }
                      >
                        <Form.Control
                          name="min"
                          type="text"
                          value={rangeMinValue}
                          onChange={(e) => {
                            setRangeMinValue(e.target.value);
                            if (minValue(e.target.value, 6)) {
                              setRangeMinValueState(true);
                            } else {
                              setRangeMinValueState(false);
                            }
                          }}
                        ></Form.Control>
                        {rangeMinValueState ? null : (
                          <label className="error">
                            This field does not have a minimum value of 6.
                          </label>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="label-on-right" sm="3">
                      <code>min="6"</code>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm="2">
                      Max Value
                    </Form.Label>
                    <Col sm="7">
                      <Form.Group
                        className={
                          rangeMaxValueState ? "has-success" : "has-error"
                        }
                      >
                        <Form.Control
                          name="max"
                          type="text"
                          value={rangeMaxValue}
                          onChange={(e) => {
                            setRangeMaxValue(e.target.value);
                            if (maxValue(e.target.value, 6)) {
                              setRangeMaxValueState(true);
                            } else {
                              setRangeMaxValueState(false);
                            }
                          }}
                        ></Form.Control>
                        {rangeMaxValueState ? null : (
                          <label className="error">
                            This field does not have a maximum value of 6.
                          </label>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="label-on-right" sm="3">
                      <code>max="6"</code>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button
                    variant="info"
                    onClick={() => {
                      if (
                        !rangeMinLengthState ||
                        !minLength(rangeMinLength, 5)
                      ) {
                        setRangeMinLengthState(false);
                      } else {
                        setRangeMinLengthState(true);
                      }
                      if (
                        !rangeMaxLengthState ||
                        !maxLength(rangeMaxLength, 5)
                      ) {
                        setRangeMaxLengthState(false);
                      } else {
                        setRangeMaxLengthState(true);
                      }
                      if (!rangeRangeState || !range(rangeRange, 6, 10)) {
                        setRangeRangeState(false);
                      } else {
                        setRangeRangeState(true);
                      }
                      if (!rangeMinValueState || !minValue(rangeMinValue, 6)) {
                        setRangeMinValueState(false);
                      } else {
                        setRangeMinValueState(true);
                      }
                      if (!rangeMaxValueState || !maxValue(rangeMaxValue, 6)) {
                        setRangeMaxValueState(false);
                      } else {
                        setRangeMaxValueState(true);
                      }
                    }}
                  >
                    Validate Inputs
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ValidationForms;
