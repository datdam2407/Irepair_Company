import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  ModalTitle,
} from "react-bootstrap";


function ServiceTables() {
//delete modal  
  const [ServiceDelete, setServiceDelete] = useState(null);
  const [modalDelete, setServiceModalDelete] = useState(false);
  const toggleDelete = () => setServiceModalDelete(!modalDelete);
//edit modal  
  const [ServiceEdit, setServiceEdit] = useState(null);
  const [modalEdit, setServiceModalEdit] = useState(false);
  const toggleEdit = () => setServiceModalEdit(!modalEdit);
  function handleServiceDetele() {
    del("api/service/" + ServiceDelete.serviceId, localStorage.getItem("token"))
      .then((res) => {
        if (res.status === 200 || res.status === 202) {
          // var temp;
          // temp = useList.filter((x) => x.repairmanId !== ServiceDelete.repairmanId);
          // setUseListShow(temp);
          // setUseListShowPage(temp.slice(numberPage * 5 - 5, numberPage * 5));
          // setTotalNumberPage(Math.ceil(temp.length / 5));
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setModalConfirm(true);
      });
  }
  const closeBtn = (x) => (
    <button
      className="btn border border-danger"
      style={{ color: "#B22222" }}
      onClick={x}
    >
      X
    </button>
  );
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Card className="table-with-links">
              <Card.Header>
                <Card.Title as="h4">Table with Service</Card.Title>
                <Link to="/admin/create/service">
                  Create new Service
                </Link>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table>
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Image</th>
                      <th>Service Name</th>
                      <th>Category</th>
                      <th className="text-right">Price</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">1</td>
                      <td>Andrew Mike</td>
                      <td>Develop</td>
                      <td>Develop</td>
                      <td className="text-right">€ 99,225</td>
                      <td className="td-actions text-right">
                      <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-150479227">
                              View Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            variant="info"
                          >
                            <i className="fas fa-user"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-292560270">
                              Edit Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={() => {
                              setServiceEdit();
                              setServiceModalEdit(true);
                            }}
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-410038576">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                              onClick={() => {
                            setServiceDelete();
                            setServiceModalDelete(true);
                          }}
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">2</td>
                      <td>John Doe</td>
                      <td>John Doe</td>
                      <td>Design</td>
                      <td className="text-right">€ 89,241</td>
                      <td className="td-actions text-right">
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-150479227">
                              View Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            variant="info"
                          >
                            <i className="fas fa-user"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-292560270">
                              Edit Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={() => {
                              setServiceEdit();
                              setServiceModalEdit(true);
                            }}
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-410038576">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                              onClick={() => {
                            setServiceDelete();
                            setServiceModalDelete(true);
                          }}
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">3</td>
                      <td>Alex Mike</td>
                      <td>Design</td>
                      <td>Design</td>
                      <td className="text-right">€ 92,144</td>
                      <td className="td-actions text-right">
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-499501367">
                              View Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            variant="info"
                          >
                            <i className="fas fa-user"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-992502429">
                              Edit Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={() => {
                              setServiceEdit();
                              setServiceModalEdit(true);
                            }}
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-421510165">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">4</td>
                      <td>Mike Monday</td>
                      <td>Mike Monday</td>
                      <td>Marketing</td>
                      <td className="text-right">€ 49,990</td>
                      <td className="td-actions text-right">
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-138766123">
                              View Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            variant="info"
                          >
                            <i className="fas fa-user"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-661894991">
                              Edit Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={() => {
                              setServiceEdit();
                              setServiceModalEdit(true);
                            }}
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-629938886">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">5</td>
                      <td>Paul Dickens</td>
                      <td>Communication</td>
                      <td>Communication</td>
                      <td className="text-right">€ 69,201</td>
                      <td className="td-actions text-right">
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-232258380">
                              View Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            variant="info"
                          >
                            <i className="fas fa-user"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-897993903">
                              Edit Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={() => {
                              setServiceEdit();
                              setServiceModalEdit(true);
                            }}
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={() => {
                            setServiceDelete();
                            setServiceModalDelete(true);
                          }}
                          overlay={
                            <Tooltip id="tooltip-481441726">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="table-with-switches">
              <Card.Header>
                <Card.Title as="h4">Old Service</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-striped">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Service Name</th>
                      <th>Category</th>
                      <th className="text-right">Price</th>
                      <th className="text-right">Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">1</td>
                      <td>Andrew Mike</td>
                      <td>Develop</td>
                      <td className="text-right">€ 99,225</td>
                      <td className="d-flex justify-content-end">
                        <Form.Check
                          type="switch"
                          id="custom-switch-1"
                          className="mb-1"
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">2</td>
                      <td>John Doe</td>
                      <td>Design</td>
                      <td className="text-right">€ 89,241</td>
                      <td className="d-flex justify-content-end">
                        <Form.Check
                          type="switch"
                          id="custom-switch-2"
                          className="mb-1"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">3</td>
                      <td>Alex Mike</td>
                      <td>Design</td>
                      <td className="text-right">€ 92,144</td>
                      <td className="d-flex justify-content-end">
                        <Form.Check
                          type="switch"
                          id="custom-switch-3"
                          className="mb-1"
                          defaultChecked
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">4</td>
                      <td>Mike Monday</td>
                      <td>Marketing</td>
                      <td className="text-right">€ 49,990</td>
                      <td className="d-flex justify-content-end">
                        <Form.Check
                          type="switch"
                          id="custom-switch-4"
                          className="mb-1"
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="table-big-boy">
              <Card.Header>
                <Card.Title as="h4">Hot Service</Card.Title>
                <p className="card-category">A table for the best rating</p>
                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-bigboy">
                  <thead>
                    <tr>
                      <th className="text-center">Topic</th>
                      <th>Service Title</th>
                      <th className="th-description">Description</th>
                      <th className="text-right">Date</th>
                      <th className="text-right">Views</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-1.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        10 Things that all designers do
                      </td>
                      <td>
                        Most beautiful agenda for the office, really nice paper
                        and black cover. Most beautiful agenda for the office.
                      </td>
                      <td className="td-number">30/08/2016</td>
                      <td className="td-number">1,225</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-618009180">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-461494662">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                            onClick={() => {
                              setServiceDelete();
                              setServiceModalDelete(true);
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-882041852">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                            onClick={() => {
                              setServiceDelete();
                              setServiceModalDelete(true);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                       
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-2.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">Back to School Offer</td>
                      <td>
                        Design is not just what it looks like and feels like.
                        Design is how it works.
                      </td>
                      <td className="td-number">17/07/2016</td>
                      <td className="td-number">49,302</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-65578954">View Post..</Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-38536367">Edit Post..</Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-220404926">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-3.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        First Dribbble Meetup in Romania
                      </td>
                      <td>
                        A groundbreaking Retina display. All-flash architecture.
                        Fourth-generation Intel processors.
                      </td>
                      <td className="td-number">23/06/2016</td>
                      <td className="td-number">1,799</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-793736265">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-10365564">Edit Post..</Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-882041852">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-4.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        How we created our startup with 0$
                      </td>
                      <td>
                        A desk is a generally wooded piece of furniture and a
                        type of useful table often used in a school or office
                        setting for various academic or professional activities
                        ...
                      </td>
                      <td className="td-number">30/06/2016</td>
                      <td className="td-number">23,030</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-662605277">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-967132803">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-972344635">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-1.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        To use or not to use Bootstrap
                      </td>
                      <td>
                        The Office Chair adapts naturally to virtually every
                        body and is a permanent fixture.
                      </td>
                      <td className="td-number">10/05/2016</td>
                      <td className="td-number">13,763</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-436082023">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-334669391">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDelete)}
          toggle={toggleDelete}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this service</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              handleServiceDetele();
              setServiceModalDelete(false);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalEdit} toggle={toggleEdit} centered> 
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleEdit)}
          toggle={toggleEdit}
        >
          <ModalTitle>Do you want to edit ?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>         
            <Form.Group className="mb-2">
              <Form.Label>Service name</Form.Label>
              <Form.Control type="text" placeholder="Service name" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Category" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Price" step="10000" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger"  onClick={() => { // handleServiceDetele();
                                                  setServiceModalEdit(false);  }}        
          >
            Edit
          </Button>
          <Button color="secondary" onClick={toggleEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ServiceTables;
