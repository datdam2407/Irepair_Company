import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  ModalTitle,
  Table,
} from "react-bootstrap";
import {
  Modal,
  ModalHeader,
  Media,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import deleteIcon from "assets/img/remove.png";
import editIcon from "assets/img/edit.png";
import { Link } from "react-router-dom";
import { del, post ,get } from "../../service/ReadAPI";


function RepairmanTable() {
  const [RepairmanDelete, setRepairmanDelete] = useState(null);
  const [modalDelete, setRepairmanModalDelete] = useState(false);
  const toggleDelete = () => setRepairmanModalDelete(!modalDelete);
//edit
  const [RepairmanEdit, setRepairmanEdit] = useState(null);
  const [modalEdit, setRepairmanModalEdit] = useState(false);
  const toggleEdit = () => setRepairmanModalEdit(!modalEdit)

  const [modalCreate, setRepairmanModalCreate] = useState(false);
  const toggleCreate = () => setRepairmanModalCreate(!modalCreate)
  

  const [useListRepairmanShow, setUseListRepairmanShow] = useState([]);
  const [useListRepairmanShowPage, setUseListRepairmanShowPage] = useState([]);
  const [RepairmanList, setRepairmanList] = useState([]);
  const [RepairmanListID, setRepairmanListID] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  
  useEffect(() => {
    getRepairmanList();
    get("/api/v1.0/repairman/get-all").then(
      (res) => {
        if (res && res.status === 200) {
          setRepairmanList(res.data);
          // res.data;
          console.log(res.data);
        }});}, []);
  function getRepairmanList(){
    get("/api/v1.0/repairman").then((res)=>{
      var temp = res.data;
      setRepairmanList(temp);
      setUseListRepairmanShow(temp);
      setUseListRepairmanShowPage(temp.slice(numberPage * 5 - 5, numberPage * 5));
      setTotalNumberPage(Math.ceil(temp.length / 5));
    }).catch((err)=>{
      console.log(err);
    });
  }
  function getRepairmanListID(){
    get("​/api​/v1.0​/repairman​/get-by-id" + RepairmanEdit).then((res)=>{
      var temp = res.data;
      setRepairmanListID(temp);
    }).catch((err)=>{
      console.log(err);
    });
  }

  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListRepairmanShowPage(useListRepairmanShow.slice(number * 5 - 5, number * 5));
    setTotalNumberPage(Math.ceil(useListRepairmanShow.length / 5));
  }
  // custom state
  function displayStateName(type) {
    const stateValue = {
      1: "Active",
      0: "Not Alaviable",
    };
    return stateValue[type] ? stateValue[type] : "";
  }

  function handleRepairmanDetele() {
    // console.log("abc" , RepairmanDelete);
    post("/Repairman/" + RepairmanDelete ,
      {
        is_Online: 0,
        is_Delete: 1,
      },
    )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          // window.location = "/admin/Repairman";
        }
      })
      .catch((err) => {
        // setErrorMessage(err.response.data.message);
        // setModalConfirm(true);
        console.log(err)
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
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Manage Repairman</Card.Title>
                {/* <Link to="/admin/create/Repairman">
                  
                  
                </Link> */}
                <Button
                       
                          onClick={() => {
                            // setRepairmanEdit(e.Id);
                            // getRepairmanListID();
                            setRepairmanModalCreate(true);
                          }}>
                        Create new Repairman
                      </Button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Avatar</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">PhoneNumber</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Username</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">CompanyId</th>
                      <th className="border-0">Uid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListRepairmanShowPage.map((e,index)=>{
                    return(
                      <tr key={index}>
                        <td>
                          {e.Id}
                        </td>
                        <td>
                          {e.Name}
                        </td>
                        <td>
                          {e.Avatar}
                        </td>
                        <td>
                          {e.PhoneNumber}
                        </td>
                        <td>
                          {e.Email}
                        </td>
                        <td>
                          {e.Username}
                        </td>
                        <td>
                          {displayStateName(e.Status)}
                        </td>
                        <td>
                          {e.CompanyId}
                        </td>
                        <td>
                          {e.Uid}
                        </td>
                        <td>
                        <Media
                          src={editIcon}
                          onClick={() => {
                            setRepairmanEdit(e.Id);
                            getRepairmanListID();
                            setRepairmanModalEdit(true);
                          }}
                        />
                      </td>
                      <td>
                        <Media
                          src={deleteIcon}
                          onClick={() => {
                            setRepairmanDelete(e.Id);
                            setRepairmanModalDelete(true);
                          }}
                        />
                      </td>
                      </tr>  
                   );
                  })}
                  </tbody>
                </Table>
                <Row>
        <Col md={6}></Col>
        <Col md={6}>
          <Pagination
            aria-label="Page navigation example"
            className="page-right"
          >
            <PaginationItem disabled={numberPage === 1}>
              <PaginationLink
                className="page"
                previous
                //disable={numberPage === 1 ? "true" : "false"}

                onClick={() => {
                  if (numberPage - 1 > 0) {
                    onClickPage(numberPage - 1);
                  }
                }}
              >
                Previous
              </PaginationLink>
            </PaginationItem>
            {numberPage - 1 > 0 ? (
              <PaginationItem>
                <PaginationLink
                  className="page"
                  onClick={() => {
                    onClickPage(numberPage - 1);
                  }}
                >
                  {numberPage - 1}
                </PaginationLink>
              </PaginationItem>
            ) : (
              ""
            )}
            <PaginationItem active>
              <PaginationLink className="page-active">
                {numberPage}
              </PaginationLink>
            </PaginationItem>
            {numberPage + 1 <= totalNumberPage ? (
              <PaginationItem>
                <PaginationLink
                  className="page"
                  onClick={() => {
                    onClickPage(numberPage + 1);
                  }}
                >
                  {numberPage + 1}
                </PaginationLink>
              </PaginationItem>
            ) : (
              ""
            )}
            {numberPage + 2 <= totalNumberPage ? (
              <PaginationItem>
                <PaginationLink
                  className="page"
                  onClick={() => {
                    onClickPage(numberPage + 2);
                  }}
                >
                  {numberPage + 2}
                </PaginationLink>
              </PaginationItem>
            ) : (
              ""
            )}

            <PaginationItem disabled={numberPage === totalNumberPage}>
              <PaginationLink
                className="page"
                next
                //disable={numberPage === totalNumberPage ? true : false}
                onClick={() => {
                  if (numberPage + 1 <= totalNumberPage) {
                    onClickPage(numberPage + 1);
                  }
                }}
              >
                Next
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Hot Service </Card.Title>
                <p className="card-category">
                  This is a text
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Service Name</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">Description</th>
                      <th className="border-0">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>

                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modalCreate} toggle={toggleCreate} centered>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreate)}
          toggle={toggleCreate}
        >
          <ModalTitle>Do you want to create new Repairman</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address" />
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
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>HOTLINE</Form.Label>
              <Form.Control type="text" placeholder="HOTLINE" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
           
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { // handleRepairmanDetele();
            
            setRepairmanModalCreate(false);
          }}
          >
            Create
          </Button>
          <Button color="secondary" onClick={toggleCreate}>
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
          <ModalTitle>Do you want to edit Repairman</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Service name" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Category" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Price" step="10000" />
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
          <Button color="danger" onClick={() => { // handleRepairmanDetele();
            
            setRepairmanModalEdit(false);
          }}
          >
            Edit
          </Button>
          <Button color="secondary" onClick={toggleEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDelete)}
          toggle={toggleDelete}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this Repairman</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              handleRepairmanDetele();
              setRepairmanModalDelete(false);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default RepairmanTable;