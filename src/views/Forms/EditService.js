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
import { put , get } from "service/ReadAPI";

export default function EditService() {
  const [button, setButton] = useState(true);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImage] = useState("");
  const [companyId, setCompanyID] = useState("");
  const [fieldId, setFieldId] = useState("");
  const [statusService, setStatusService] = useState("updating");
  // load resdata
  useEffect(() => {
    let params = {};
    console.log(params);
    get(`/api/v1.0/service/${localStorage.getItem("serviceID")}`).then((res) => {
      setServiceName(res.data.serviceName);

      setDescription(res.data.description);

      setPrice(res.data.price);

      setImage(res.data.imageUrl);

      setStatusService(res.data.status);

      setCompanyID(res.data.companyId);

      // setCheckState(res.data.state.stateName)

      setFieldId(res.data.fieldId);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setButton(true);
    var Name = e.target.serviceName.value;
    var description = e.target.description.value;
    var newPrice = e.target.price.value;
    var newImageUrl = e.target.imageUrl.value;
    var companyId = e.target.companyId.value;
    var newFieldId = e.target.fieldId.value;

    put(`/api/v1.0/service/${localStorage.getItem("serviceID")}`, {
      serviceName: Name,
      description: description,
      price:  newPrice,
      imageUrl: newImageUrl,
      status: 0,
      companyId: companyId, 
      fieldId: newFieldId
    })
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/service";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container-createuser-form">
      <Container>
        <h3 class="logo-title">Edit Service</h3>
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
                    defaultValue={serviceName}
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
                    defaultValue={description}
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
                    defaultValue={price}

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
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    defaultValue={imageUrl}

                    placeholder="imageUrl"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
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
                   disabled
                    type="text"
                    name="companyId"
                    id="companyId"
                    defaultValue={companyId}

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
                    defaultValue={fieldId}

                    placeholder="fieldId"
                    // onChange={lnerror}
                  />
                  {/* <h6>{lnerror}</h6> */}
                </Col>
              </Row>
            </FormGroup>
            <div className="btn-container">
              <Button color="danger">Updating</Button>
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
