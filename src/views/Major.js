import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  InputGroup,
  DropdownToggle,
  DropdownMenu,
  InputGroupButtonDropdown,
  PaginationItem,
  Input,
  PaginationLink,
} from "reactstrap";
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'
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
  ModalTitle,
} from "react-bootstrap";
// import "..//css/customSizeCompany.css"
import "../assets/css/customSizeCompany.css"
import FilterState from "./Forms/FilterState"
import { del, getWithTokenParams, getWithToken, putWithToken, postWithToken } from "../service/ReadAPI";
import { makeStyles } from '@material-ui/core/styles';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
} from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
function Major() {
  //delete modal  
  const [modalDelete, setServiceModalDelete] = useState(false);
  const toggleDelete = () => setServiceModalDelete(!modalDelete);
  //edit modal  
  const [searchName, setSearchName] = useState("");
  //modal create
  const [modalCreate, setMajorModalCreate] = useState(false);
  const toggleCreate = () => setMajorModalCreate(!modalCreate)
  //Edit Major
  const [modalEdit, setMajorModalEdit] = useState(false);
  const toggleEdit = () => setMajorModalEdit(!modalEdit)
  //Delete Major
  const [MajorDelete, setMajorDelete] = useState(null);
  const [modalMajorDelete, setMajorModalDelete] = useState(false);
  const toggleMajorDelete = () => setMajorModalDelete(!modalMajorDelete)

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [selectMajor, setSelectMajor] = useState();
  //Approved
  const [modalApprove, setMajorModalApprove] = useState(false);
  const toggleApprove = () => setMajorModalApprove(!modalApprove)
  //Major List
  const [useListMajorShow, setUseListMajorShow] = useState([]);
  const [useListMajorShowPage, setUseListMajorShowPage] = useState([]);
  const [MajorList, setMajorList] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  const [count, setCount] = useState(1);
  // field edit
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setImage] = useState("");
  const [isDeleted, setIsDeleted] = useState("");
  const [majorID, setMajorID] = useState("");
  //sort
  const [sortedField, setSortedField] = useState("Id");
  const [ascending, setAscending] = useState(true);
  //filterState
  const listStates = [
    "Inactive",
    "Actice",
  ];
  const [filterState, setListFilterState] = useState(listStates);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateListFilter, setstateListFilter] = useState([]);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
      borderRadius: 15,
      margin: '10px 10px',
      maxWidth: ' 100%'
    },
    tableHeaderCell: {
      color: 'burlywood',
      fontWeight: 'bold',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark),
      backgroundColor: 'gray',
      fontWeight: '700',

    },
    thmajorheaderform: {
      fontWeight: 'bold',
      fontWeight: '700',
      color: theme.palette.getContrastText(theme.palette.primary.dark),
    },

    avatar: {
      backgroundColor: '#FFFFFF',
      fontSize: '200px',
      right: '10px',
      overflow: 'unset',
      borderRadius: '32%',
      // img: 'string',
    },
    name: {
      fontWeight: 'bold',
   color: '#1d98e0f7',

    },
    Status: {
      fontWeight: '700',
      textAlign: 'center',
      width: '71px',
      fontSize: '0.76rem',
      color: 'white',
      backgroundColor: 'green',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
    }
  }));
  const classes = useStyles();

  
  // get major by ID
  function getMajorByID(Id) {
    getWithTokenParams(`/api/v1.0/majors?CompanyId=${localStorage.getItem("IDCompany")}`, localStorage.getItem("token")).then((res) => {
      setMajorID(Id);
      setName(res.data.name);
      setDescription(res.data.description);
      setImage(res.data.imageUrl);
      setStatus(res.data.status);
    }).catch((err) => {
      console.log(err);
    });
  }

  //Load major
  useEffect(() => {
    getMajorList();
  }, []);
  function getMajorList(stateList) {
    let params = {};
    if (stateList && stateList.length > 0)
      params["Status"] = stateList.reduce((f, s) => `${f},${s}`);
    if (sortedField !== null) {
      getWithTokenParams(`/api/v1.0/majors?CompanyId=${localStorage.getItem("IDCompany")}`, params, localStorage.getItem("token")).then((res) => {
        var temp = res.data.filter((x) => x.state !== "Completed");
        setMajorList(temp);
        setUseListMajorShow(temp);
        setUseListMajorShowPage(temp.slice(numberPage * 7 - 7, numberPage * 7));
        setTotalNumberPage(Math.ceil(temp.length / 7));
        setCount(count);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListMajorShowPage(useListMajorShow.slice(number * 7 - 7, number * 7));
    setTotalNumberPage(Math.ceil(useListMajorShow.length / 7));
  }
  // close button
  const closeBtn = (x) => (
    <button
      className="btn border border-danger"
      style={{ color: "#B22222" , backgroundColor:"white"}}
      onClick={x}
    >
      X
    </button>
  );
  // Custom state 
  function displayStateName(type) {
    const stateValue = {
      1: "Inactive",
      0: "Active",
    };
    return stateValue[type] ? stateValue[type] : "";
  }
  function onSubmitSearch(e) {
    e.preventDefault();
    if (searchName !== "") {
      getWithToken(
        `/api/v1.0/majors?Name=` + searchName,
        localStorage.getItem("token")
      ).then((res) => {
        var temp = res.data;
        setMajorList(temp);
        sort(sortedField, ascending, temp);
        setNumberPage(1);
        setUseListMajorShow(temp);
        setUseListMajorShowPage(temp.slice(0, 7));
        setTotalNumberPage(Math.ceil(temp.length / 7));
      });
    } else if (searchName == "") {
      getWithToken("/api/v1.0/majors", localStorage.getItem("token")).then(
        (res) => {
          if (res && res.status === 200) {
            var temp2 = res.data;
            setMajorList(temp2);
            setUseListMajorShow(temp2);
            setUseListMajorShowPage(temp2.slice(numberPage * 7 - 7, numberPage * 7));
            setTotalNumberPage(Math.ceil(temp2.length / 7));
          }
        })
    }
  }
  //sort
  function sort(field, status, items) {
    items.sort((a, b) => {
      if (a[field] < b[field]) {
        if (status) {
          return -1;
        } else {
          return 1;
        }
      }
      if (a[field] > b[field]) {
        if (status) {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;
    });
  }

  function cancelRepairmanByID() {
    setName("");
    setDescription("");
    setImage("");
    setMajorID("");
    toggleEdit();
}
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="table">
              <Card.Body className="table">
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <th
                          className="description"
                          onClick={() => {
                            if (sortedField === "Id" && ascending) {
                              setSortedField("Id");
                              setAscending(false);
                              sort("Id", false, useListMajorShowPage);
                            } else {
                              setSortedField("Id");
                              setAscending(true);
                              sort("Id", true, useListMajorShowPage);
                            }
                          }}
                        >
                          Name{" "}
                          {sortedField === "Id" ? (
                            ascending === true ? (
                              <FontAwesomeIcon icon={faCaretUp} />
                            ) : (
                              <FontAwesomeIcon icon={faCaretDown} />
                            )
                          ) : (
                            <FontAwesomeIcon icon={faCaretDown} />
                          )}
                        </th>
                        <th
                          className="description"
                          onClick={() => {
                            if (sortedField === "Description" && ascending) {
                              setSortedField("Description");
                              setAscending(false);
                              sort("Description", false, useListMajorShowPage);
                            } else {
                              setSortedField("Description");
                              setAscending(true);
                              sort("Description", true, useListMajorShowPage);
                            }
                          }}
                        >
                          Description{" "}
                          {sortedField === "Description" ? (
                            ascending === true ? (
                              <FontAwesomeIcon icon={faCaretUp} />
                            ) : (
                              <FontAwesomeIcon icon={faCaretDown} />
                            )
                          ) : (
                            <FontAwesomeIcon icon={faCaretDown} />
                          )}
                        </th>
                        <th className="description">Status</th>
                        <th className="description">Actions</th>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {useListMajorShowPage.map((e, index) => {
                        return (
                          <tr key={index}>
                            <TableCell>
                              <Grid container>
                                <Tooltip html={(
                                  <div style={{ width: 700, height: 300 }}>
                                    <strong>
                                      <ModalHeader
                                        style={{ color: "yellow" }}
                                      >
                                        Detailed Major Information
                                      </ModalHeader>
                                      <ModalBody>
                                        <Row>
                                          <Col md={2}> Major Name:</Col>
                                          <Col md={3}>  {e.Name}</Col>
                                        </Row>
                                        <Row>
                                          <Col md={2}>Description:</Col>
                                          <Col md={3}>
                                            {e.Description}
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col md={3} ><img className="text-left-topic-toolpi" src={e.ImageUrl} /></Col>
                                        </Row>
                                      </ModalBody>
                                    </strong>
                                  </div>
                                )}
                                >
                                  <Grid item lg={2}>
                                    <Avatar src={e.ImageUrl} className={classes.avatar} >
                                      <img src="none" />
                                    </Avatar>
                                  </Grid>
                                </Tooltip>

                                <Grid item lg={10}>
                                  <Typography className={classes.name}>{e.Name}</Typography>
                                  <Typography color="textSecondary" variant="body2">{e.Id}</Typography>
                                </Grid>
                              </Grid>
                            </TableCell>
                            <TableCell>
                              <Typography color="black" fontSize="0.80rem">{e.Description}</Typography>
                              {/* <Typography color="textSecondary" variant="body2">{row.company}</Typography> */}
                            </TableCell>
                            <TableCell onClick={() => {
                              // setMajorEdit(e.Id);
                              getMajorByID(e.Id);
                              setMajorModalApprove(true)
                            }}>
                              <Typography
                                className={classes.Status}
                                style={{
                                  backgroundColor:
                                    ((e.Status === 1 && 'RED') ||
                                      (e.Status === 0 && 'rgb(34 176 34)'))
                                }}
                              >{displayStateName(e.Status)}</Typography>
                            </TableCell>


                            <td className="td-actions">
                              <OverlayTrigger
                                onClick={(e) => e.preventDefault()}
                                overlay={
                                  <Tooltip id="tooltip-960683717">
                                    <br />
                                    <br />
                                    View Post..
                                  </Tooltip>
                                }
                                placement="right"
                              >
                                <Button
                                  onClick={() => {
                                    setModalStatus(true);
                                    setSelectMajor(e);
                                  }}
                                  className="btn-link btn-icon"
                                  type="button"
                                  variant="info"
                                >
                                  <i className="far fa-image"></i>
                                </Button>
                              </OverlayTrigger>

                            
                            </td>
                          </tr>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
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

        </Row>
      </Container>

      
      <Modal isOpen={modalStatus} toggle={toggleDetails}>
        <ModalHeader
          style={{ color: "#1bd1ff" }}
          close={closeBtn(toggleDetails)}
          toggle={toggleDetails}>
          <h3>INFORMATION</h3>
        </ModalHeader>
        <ModalBody>
          <div className="img-container">
            {selectMajor !== undefined ? <img className="text-left-topic" src={selectMajor.ImageUrl} /> : ""}
          </div>
        </ModalBody>
        <ModalBody>
        <a className="name" style={{color:"#1d98e0f7"}}>Name:</a> <a className="name"> {selectMajor !== undefined ? selectMajor.Name : ""}</a>
          <br />
          <a className="name" style={{color:"#1d98e0f7"}}>Description:</a>  <a className="name">{selectMajor !== undefined ? selectMajor.Description : ""}</a>

          <br />
          <a className="name" style={{color:"#1d98e0f7"}}>Status</a><a className="name"> {selectMajor !== undefined ? displayStateName(selectMajor.Status) : ""}</a>
          <br />
        </ModalBody>

      </Modal>

      <Modal isOpen={modalApprove} toggle={toggleApprove}>
        <ModalHeader
          style={{ color: "#1bd1ff" }}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody><h4>Do you want to approve this major? </h4></ModalBody>
        <ModalFooter style={{ justifyContent: 'space-around'}}>
        <Button className="Cancel-button" onClick={toggleApprove}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              // deleteMajorFieldsByID();
              handleEditSubmit2();
              setMajorModalApprove(false);
            }}
          >
            Approved
          </Button>{" "}
         
        </ModalFooter>
      </Modal>
  
    </>
  );
}

export default Major;