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
  Container,
  Row,
  Col,
  ModalTitle,
} from "react-bootstrap";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";

const dataTable = [
  ["Charde Marshall", "Regional Director", "San Francisco", "36"],
  ["Haley Kennedy", "Senior Marketing Designer", "London", "43"],
  ["Tatyana Fitzpatrick", "Regional Director", "London", "19"],
  ["Michael Silva", "Marketing Designer", "London", "66"],
  ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "64"],
  ["Gloria Little", "Systems Administrator", "New York", "59"],
  ["Bradley Greer", "Software Engineer", "London", "41"],
  ["Dai Rios", "Personnel Lead", "Edinburgh", "35"],
  ["Jenette Caldwell", "Development Lead", "New York", "30"],
  ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "40"],
  ["Caesar Vance", "Pre-Sales Support", "New York", "21"],
  ["Doris Wilder", "Sales Assistant", "Sidney", "23"],
  ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "47"],
  ["Gavin Joyce", "Developer", "Edinburgh", "42"],
  ["Jennifer Chang", "Regional Director", "Singapore", "28"],
  ["Brenden Wagner", "Software Engineer", "San Francisco", "28"],
  ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "48"],
  ["Shou Itou", "Regional Marketing", "Tokyo", "20"],
  ["Michelle House", "Integration Specialist", "Sidney", "37"],
  ["Suki Burks", "Developer", "London", "53"],
  ["Prescott Bartlett", "Technical Author", "London", "27"],
  ["Gavin Cortez", "Team Leader", "San Francisco", "22"],
  ["Martena Mccray", "Post-Sales support", "Edinburgh", "46"],
  ["Unity Butler", "Marketing Designer", "San Francisco", "47"],
  ["Howard Hatfield", "Office Manager", "San Francisco", "51"],
  ["Hope Fuentes", "Secretary", "San Francisco", "41"],
  ["Vivian Harrell", "Financial Controller", "San Francisco", "62"],
  ["Timothy Mooney", "Office Manager", "London", "37"],
  ["Jackson Bradshaw", "Director", "New York", "65"],
  ["Olivia Liang", "Support Engineer", "Singapore", "64"],
];

function RepairmanTable() {
  //delete modal  
  const [RepairmanDelete, setRepairmanDelete] = useState(null);
  const [modalDelete, setRepairmanModalDelete] = useState(false);
  const toggleDelete = () => setRepairmanModalDelete(!modalDelete);
//edit modal  
  const [RepairmanEdit, setRepairmanEdit] = useState(null);
  const [modalEdit, setRepairmanModalEdit] = useState(false);
  const toggleEdit = () => setRepairmanModalEdit(!modalEdit);
//status modal  
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [selectUser, setSelectUser] = useState();

 
//function delete 
  function handleRepairmanDetele() {
    del("api/repairman/" + RepairmanDelete.repairmanId, localStorage.getItem("token"))
      .then((res) => {
        if (res.status === 200 || res.status === 202) {
          // var temp;
          // temp = useList.filter((x) => x.repairmanId !== RepairmanDelete.repairmanId);
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
  const [data, setData] = React.useState(
    dataTable.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        position: prop[1],
        office: prop[2],
        age: prop[3],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <Button
                onClick={() => {
                  setModalStatus(true);
                  setSelectUser(prop);
                }}
              variant="info"
              size="sm"
              className="text-info btn-link like"
            >
              <i className="fa fa-heart" />
            </Button>{" "}
            {/* use this button to add a edit kind of action */}
            <Button
              onClick={() => {
                setRepairmanEdit();
                setRepairmanModalEdit(true);
              }}
              variant="warning"
              size="sm"
              className="text-warning btn-link edit"
            >
              <i className="fa fa-edit" />
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
                onClick={() => {
                  setRepairmanDelete();
                  setRepairmanModalDelete(true);
                }}
              variant="danger"
              size="sm"
              className="btn-link remove text-danger"
            >
              <i className="fa fa-times" />
            </Button>{" "}
          </div>
        ),
      };
    })
  );
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <h4 className="title">Repairman</h4>
            <p className="category">
              <Link to="/admin/create/repairman">
                Create new Repairman
              </Link>
            </p>
            <Card>
              <Card.Body>
                <ReactTable
                  data={data}
                  columns={[
                    {
                      Header: "Name",
                      accessor: "name",
                    },
                    {
                      Header: "Position",
                      accessor: "position",
                    },
                    {
                      Header: "Office",
                      accessor: "office",
                    },
                    {
                      Header: "Age",
                      accessor: "age",
                    },
                    {
                      Header: "actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  className="-striped -highlight primary-pagination"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      

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
              <Form.Label>Work on</Form.Label>
              <Form.Control type="text" placeholder="Category" />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Company</Form.Label>
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
        <ModalBody>Do you want to delete this repairman</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              handleRepairmanDetele();
              setRepairmanDelete(false);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

<Modal isOpen={modalStatus} toggle={toggleDetails}>
        <ModalHeader
          toggle={toggleDetails}
          style={{ color: "#B22222" }}
          close={closeBtn(toggleDetails)}
        >
          Detailed Repairman Information
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col></Col>
            <Col md={3}>Name</Col>
            <Col md={8}>
              {selectUser !== undefined ? [selectUser[0]] : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Position</Col>
            <Col md={8}>
              {selectUser !== undefined ? [selectUser[1]] : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Company</Col>
            <Col md={8}>
              {selectUser !== undefined ? [selectUser[2]] : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Age</Col>
            <Col md={8}>
              {selectUser !== undefined ? [selectUser[3]] : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>State</Col>
            <Col md={8}>{selectUser !== undefined ? selectUser.state : ""}</Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Note</Col>
            <Col md={8}>{selectUser !== undefined ? selectUser.note : ""}</Col>
          </Row>
        </ModalBody>
      </Modal>


    </>
  );
}

export default RepairmanTable;
