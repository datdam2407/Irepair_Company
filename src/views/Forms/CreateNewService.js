import { React, useState, useEffect} from "react";
// import firebase from "../../Firebase/firebaseConfig";
import { storage } from "../../Firebase/firebaseConfig";
import "firebase/storage";
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
import { post } from "service/ReadAPI";

export default function CreateNewService() {

  const [button, setButton] = useState(true);
  const [image, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [urll, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload() {
    const ref = storage.ref(`/images/${file.name}`);
    const uploadTask = ref.put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
          console.log(url);
        });
    });
  }
  console.log(urll);
  function handleSubmit(e) {
    e.preventDefault();
    handleUpload();
    setButton(true);
    post(
      "/api/v1.0/service",
      {
        serviceName: e.target.serviceName.value,
        description: e.target.description.value,
        price: e.target.price.value,
        imageUrl: urll,
        status: 0,
        companyId: e.target.companyId.value,
        fieldId: e.target.fieldId.value,
      },
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/service";
        }
      })
      .catch((err) => {
        console.log(err)
      });
    }

  return (
    <div className="container-createuser-form">
      <Container>
        <h3 class="logo-title">Create New Service</h3>
        <Col md={9}>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormGroup>
              <Row>
                <Col>
                  <Label>SERVICE NAME</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="serviceName"
                    id="serviceName"
                    placeholder="Name"
                  />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label>DESCRIPTION</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="description"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>
            
            <FormGroup>
              <Row>
                <Col>
                  <Label>PRICE</Label>
                </Col>

                <Col md={8}>
                <Input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="price"
                    // onChange={lnerror}
                  />
                  {/* <h6>{joinDateError}</h6> */}
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col>
                  <Label>IMAGE</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="file"
                    onChange= {handleChange}  
                  />
                         
                </Col>
              </Row>
            </FormGroup>
           
            <FormGroup>
              <Row>
                <Col>
                  <Label>companyId</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="companyId"
                    id="companyId"
                    placeholder="companyId"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label>fieldId</Label>
                </Col>

                <Col md={8}>
                  <Input
                    type="text"
                    name="fieldId"
                    id="fieldId"
                    placeholder="fieldId"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>
            <div className="btn-container">
              <Button color="danger">Save</Button>
              <Link to="/admin/service">
                <button className="btn-cancel">Cancel</button>
              </Link>
            </div>
          </Form>
        </Col>
      </Container>
    </div>
  );
}