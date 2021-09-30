import { React, useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
// import { postWithToken } from "../ReadAPI";
// import moment from "moment";

export default function CreateNewCompany() {
  const [button, setButton] = useState(true);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [dobError, setDobError] = useState("");
  const [fnerror, setFnError] = useState("");
  const [lnerror, setLnError] = useState("");
  const [joinDateError, setJoinDateError] = useState("");
  const [currentDate, setCurrentDate] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    var dateString = moment(e.target.date.value).format("MM/DD/YYYY");
    var joinDate = moment(e.target.joineddate.value).format("MM/DD/YYYY");
    console.log(e.target.joineddate.value);
    setButton(true);
    postWithToken(
      "/api/users",
      {
        firstName: e.target.firstname.value,
        lastName: e.target.lastname.value,
        dayOfBirth: dateString,
        gender: male === true ? "MALE" : "FEMALE",
        joinDate: joinDate,
        role: e.target.role.value,
        accountId: localStorage.getItem("id"),
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/manageuser";
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          if (
            e.target.firstname.value === "" &&
            e.target.lastname.value === ""
          ) {
            setFnError("firstName must not be blank");
            setLnError("lastName must not be blank");
          } else if (e.target.firstname.value === "") {
            setFnError("firstName must not be blank");
          } else if (e.target.firstname.value === "")
            setLnError("lastName must not be blank");

          if (
            err.response.data.message === "Wrong date! (MM/dd/yyyy)" &&
            e.target.date.value === ""
          )
            setDobError("Wrong date! (MM/dd/yyyy)");

          if (
            err.response.data.message === "Wrong date! (MM/dd/yyyy)" &&
            e.target.joineddate.value === ""
          )
            setJoinDateError("Wrong date! (MM/dd/yyyy)");

          if (
            err.response.data.message ===
            "User is under 18. Please select a different date"
          )
            setDobError("User is under 18. Please select a different date");

          if (
            err.response.data.message ===
            "Joined date is Saturday or Sunday. Please select a different date"
          )
            setJoinDateError(
              "Joined date is Saturday or Sunday. Please select a different date"
            );

          if (
            err.response.data.message ===
            "Joined date is not later than Date of Birth. Please select a different date"
          )
            setJoinDateError(
              "Joined date is not later than Date of Birth. Please select a different date"
            );
        }
      });
  }

  useEffect(() => {
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);
    setCurrentDate(date);
  }, []);

  function onChangeMale(e) {
    setMale(e.target.checked);
    setFemale(!e.target.checked);
  }

  function onChangeFemale(e) {
    setFemale(e.target.checked);
    setMale(!e.target.checked);
  }

  return (
    <div className="container-createuser-form">
      <Container>
        <h3 class="logo-title">Create New Company</h3>
        <Col md={9}>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormGroup>
              <Row>
                <Col>
                  <Label>Name</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder=""
                    onChange={fnerror}
                  />
                  <h6>{fnerror}</h6>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label>SALARY</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder=""
                    onChange={lnerror}
                  />
                  <h6>{lnerror}</h6>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label>COUNTRY</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder=""
                    onChange={lnerror}
                  />
                  <h6>{lnerror}</h6>
                </Col>
              </Row>
            </FormGroup>

            

            <FormGroup>
              <Row>
                <Col>
                  <Label>Join Date</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="date"
                    name="joineddate"
                    id="joineddate"
                    defaultValue={currentDate}
                  />
                  <h6>{joinDateError}</h6>
                </Col>
              </Row>
            </FormGroup>

            <div className="btn-container">
              <Button color="danger">Save</Button>
              <Link to="/admin/company">
                <button className="btn-cancel">Cancel</button>
              </Link>
            </div>
          </Form>
        </Col>
      </Container>
    </div>
  );
}