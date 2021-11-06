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
  PaginationLink,FormGroup,
} from "reactstrap";
import { Dropdown } from 'semantic-ui-react'

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
import "../../assets/css/customSizeCompany.css"
import { del, getWithTokenParams, getWithToken, putWithToken, postWithToken } from "../../service/ReadAPI";
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
function Workon() {
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
  const [serviceDelete, setserviceDelete] = useState(null);
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
  const [UseListWorkonShow, setUseListWorkonShow] = useState([]); 

  const [modalCreateWorkon, setModalCreateWorkon] = useState(false);
    const toggleCreateWorkon = () => setModalCreateWorkon(!modalCreateWorkon)
  const [WorkOnSelectID, setWorkOnSelectID] = useState(IDS)
  const [IDS, setWorkonID] = useState("");
  const [workonSelectRPID, setWorkonSelectRPID] = useState("")
    const [workonSelect, setWorkonSelect] = useState("")
    const [listSelectService, setListService] = useState([]);

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
  const [data1, setData1] = useState({ array: [] });

  useEffect(() => {
    let params = {};
    let currentField = {};
    let ServiceId = "";
    // params['Status'] = [0].reduce((f, s) => `${f},${s}`);
    getWithToken("/api/v1.0/major-fields?listMajorId=a2bdd6ec-d60c-476e-b53c-7d92900c3bb3", localStorage.getItem("token")
    ).then(res => {
        setData1(res.data);
        const newlistService = res.data.reduce((list, item) => [...list,
        {
            text: `${item.Name}`,
            value: item.Id,
            key: item.Id
        }], [])
        setListService(
            [currentField, ...newlistService],
        );
    })
}, []);
  useEffect(() => {
    getWorkonID();
  }, []);
  function handleChangeService(e, value) {
    setWorkonSelect(e.target.ServiceId);
    setWorkOnSelectID(value.value);
}
function getWorkonID(Id) {
getWithToken(`/api/v1.0/workson?repairmanId=${localStorage.getItem("assetId")}`, localStorage.getItem("token")).then((res) => {
    var temp = res.data;
      setUseListWorkonShow(temp);
}).catch((err) => {
    console.log(err);
});

}
console.log("datta",UseListWorkonShow)



  //Load major
  useEffect(() => {
    getMajorList();
    getWorkonID();
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
  function displayRepairName(type) {
    const stateValue = {
      "304a7d8c-735e-49ef-9ec5-004a4feb3a2f": "Lê Minh Tài",
      "3f37cd77-95c4-407d-af05-21a3498e28d9": "Nguyễn Hoàng Duy",
      "8a022b6b-95de-4430-82b4-2b2fb6e43abf": "Nguyễn Hoàng Quốc Khánh",
      "8f9cd415-da56-44af-8116-6ccbe3e3b037": "Phạm Hữu Nghĩa",
      "8634c44c-7ebc-4b85-a1a7-862fbe7d162c": "Nguyễn Lê Thuần",
      "9f5e4a52-c68b-4eab-9358-a8a90af49f3e": "Đỗ Dương Tâm Đăng",
      "ce714876-383b-4b74-82d9-acefc7061d05": "Hà Lê Phúc",
      "43b11fa5-c4a8-4618-947f-b03c086dbaef": "Đàm Tiến Đạt",
      "c1fc7c9f-84e3-4321-991f-cf29ea554fe0": "Nguyễn Minh Hoàng",
      "e0ca88d0-e18d-4127-ae93-d81863c734e0": "Phạm Tấn Phát",
      "484d58bc-991c-48a7-b6bf-d83fad176b82": "Phạm Gia Nguyên",
      "376f16ef-e4fc-4cc6-873e-fc5fd1255d86": "Lê Anh Nguyên",

      "7c172d79-7c5d-4ed5-8e71-26ba2e7bf1a3": "nguyen thuan",
      "84066527-2ba2-421a-8637-35d765b153e1": "Tam Dang",
      "b123ea59-f40d-495d-b4c8-3be7c96200ad": "Nguyễn Thuần",
      "50d2c8b8-2a11-4802-9592-4f76e92aed12": "Pham Tan Phat (K14 HCM)",
      "00c4858a-f32a-4218-9266-641088f1e373": "Do Duong Tam Dang",

      //
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

  async function handleSubmitCreateWorkon(Id) {
    await postWithToken(
        `/api/v1.0/workson`,
        {
            listFieldId: WorkOnSelectID,
            repairmanId: localStorage.getItem("assetId"),
        },
        localStorage.getItem("token")
    )
        .then((res) => {
            if (res.status === 200) {
                window.location = "/company/workon";
            }
        })
        .catch((err) => {
            console.log(err);
        });
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
  function deleteserviceByID() {
    del(`/api/v1.0/workson?serviceId=${serviceDelete}&repairmanId=${localStorage.getItem("assetId")}`, localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/company/workon";
        }
      }).catch((err) => {
        console.log(err);
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


            <div className="header-form">
                <Row>
            
                  <Col md={3}>
                <h2 style={{paddingLeft:'22px'}}> {displayRepairName(localStorage.getItem("assetId"))} </h2>
                 
                  </Col>
                  <Col md={9} align="right">
                    <Button variant="contained" className="add-major-custom" color="primary" onClick={() => { setModalCreateWorkon(true); }}>Add service</Button>
                  </Col>
                </Row>
              </div>
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
                      {UseListWorkonShow.map((e, index) => {
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
                              <OverlayTrigger
                              onClick={(e) => e.preventDefault()}
                              overlay={
                                <Tooltip id="tooltip-334669391">
                                  Remove Post..
                                </Tooltip>
                              }
                              placement="right\"
                            >
                              <Button
                                onClick={() => {
                                  setserviceDelete(e.Id);
                                  setServiceModalDelete(true);
                                }}
                                className="btn-link btn-icon"
                                type="button"
                                variant="danger"
                              >
                                <i className="fas fa-times"></i>
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

      <Modal isOpen={modalDelete} toggle={toggleMajorDelete}>
        <ModalHeader
          style={{ color: "#1d98e0f7" }}
        >
          <h3>Are you sure?</h3>
        </ModalHeader>
        <ModalBody> <h4>Do you want to delete this service ?</h4></ModalBody>
        <ModalFooter  style={{ justifyContent: 'space-around'}}>
        <Button className="Cancel-button" onClick={() => { toggleMajorDelete(); }}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              deleteserviceByID();
              setServiceModalDelete(false);
            }}
          >
            Delete
          </Button>{" "}
         
        </ModalFooter>
      </Modal>
      <Modal className="modalCreatene" isOpen={modalCreateWorkon} toggle={toggleCreateWorkon} centered>
                <ModalHeader
                    style={{ color: "#B22222" }}
                    close={closeBtn(toggleCreateWorkon)}
                    toggle={toggleCreateWorkon}
                >
                    <ModalTitle>Workon</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>MajorField</Form.Label>
                            <FormGroup className="mb-2">
                                <Dropdown
                                    fluid
                                    search
                                    multiple
                                    value={workonSelect}
                                    onChange={handleChangeService}
                                    options={listSelectService}
                                />
                            </FormGroup>
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => { // handleServiceDetele();
                        setModalCreateWorkon(false);
                        handleSubmitCreateWorkon();
                    }}
                    >
                        Save
                    </Button>
                    <Button color="secondary" onClick={toggleCreateWorkon}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
    </>
  );
}

export default Workon;