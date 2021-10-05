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
import { del, post ,get } from "../../service/ReadAPI";


export default function CreateNewRepairMan() {
  const [button, setButton] = useState(true);


  function handleSubmit(e) {
    e.preventDefault();
    setButton(true);
    post(
      "/api/v1.0/repairman/create",
      {
        avatar: e.target.avatar.value,
        name: e.target.name.value,
        Phone_Number: e.target.phone_Number.value,
        email: e.target.email.value,
        username: e.target.username.value,
        Is_Online: 0,
        Company_Id: e.target.company_Id.value,
        uid: e.target.uid.value,
      },
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/Company";
        }
      })
      .catch((err) => {
        console.log(err)
      });
    }

 
  // function onChangeMale(e) {
  //   setMale(e.target.checked);
  //   setFemale(!e.target.checked);
  // }

  // function onChangeFemale(e) {
  //   setFemale(e.target.checked);
  //   setMale(!e.target.checked);
  // }

  return (
    <div className="container-createuser-form">
      <Container>
        <h3 class="logo-title">Create New Repairman</h3>
        <Col md={9}>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormGroup>
              <Row>
                <Col>
                  <Label>Avatar</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="avatar"
                    id="avatar"
                    placeholder="Avatar"
                    // onChange={fnerror}
                  />
                  {/* <h6>{fnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label>NAME</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name"
                    // onChange={fnerror}
                  />
                  {/* <h6>{fnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label>Phone Number</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="Phone_Number"
                    id="Phone_Number"
                    placeholder="Phone"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label>Email</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="email"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label>Username</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label>Company</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="company_Id"
                    id="company_Id"
                    placeholder="company"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>

            

            <FormGroup>
              <Row>
                <Col>
                  <Label>uid</Label>
                </Col>

                <Col md={8}>
                <Input
                    type="text"
                    name="uid"
                    id="uid"
                    placeholder="uid"
                    // onChange={lnerror}
                  />
                  {/* <h6>{joinDateError}</h6> */}
                </Col>
              </Row>
            </FormGroup>

            <div className="btn-container">
              <Button color="danger">Save</Button>
              <Link to="/admin/repairman">
                <button className="btn-cancel">Cancel</button>
              </Link>
            </div>
          </Form>
        </Col>
      </Container>
    </div>
  );
}