import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Row,
  Col,
  Table,
  OverlayTrigger,
  Tooltip,
  Container,
  Form,
  ModalTitle,
} from "react-bootstrap";
import { Dropdown } from 'semantic-ui-react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  InputGroup,
  DropdownToggle,
  DropdownMenu,
  InputGroupButtonDropdown,
  Input,
  FormGroup,
} from "reactstrap";
import {
  TableCell,
  Grid,
  Typography,
} from '@material-ui/core';
import { del, put, get, getWithParams, getWithToken, getWithTokenParams, putWithToken, postWithToken, postWithTokenParams } from "../service/ReadAPI";
import { makeStyles } from '@material-ui/core/styles';
import FilterState from "./Forms/FilterState"

// import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { isNullableTypeAnnotation } from "@babel/types";
export default function Workon() {

  const [modalDelete, setRepairmanModalDelete] = useState(false);
  const toggleDelete = () => setRepairmanModalDelete(!modalDelete);
  const [RepairmanDelete, setRepairmanDelete] = useState(null);

  //edit
  const [modalEdit, setRepairmanModalEdit] = useState(false);
  const toggleEdit = () => setRepairmanModalEdit(!modalEdit)

  const [modalCreate, setRepairmanModalCreate] = useState(false);
  const toggleCreate = () => setRepairmanModalCreate(!modalCreate)
  //field edit

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [companyId, setCompanyID] = useState("");
  const [repairmanID, setRepairmanID] = useState("");
  //sort

  const [sortedField, setSortedField] = useState("Id");
  const [ascending, setAscending] = useState(true);

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [SelectRepairman, setSelectRepairman] = useState();

  const [modalApprove, setModalApprove] = useState(false);
  const toggleApprove = () => setModalApprove(!modalApprove)

  const [useListRepairmanShow, setUseListRepairmanShow] = useState([]);
  const [useListRepairmanShowPage, setUseListRepairmanShowPage] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  const [RepairmanList, setRepairmanList] = useState([]);
  const [ServiceList, setServiceList] = useState([]);


  function handleChangeService(e, value){
    setSeviceSelect(e.target.ServiceId);
    setServiceSelectID(value.value);  }
  //onchange

  function handleOnchangeSelectdmajor(e, value) {
    //console.log(e.target,value);
    setMajorSelect(e.target.MajorID);
    setMajorSelectID(value.value);
  }
  const listStates = [
    "New",
    "Approved",
    "Updating",
    "Deleted",
  ];

  const [filterState, setListFilterState] = useState(listStates);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateListFilter, setstateListFilter] = useState([]);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);


  const [ID, setMajorID] = useState("");
  const [IDS, setServiceID] = useState("");
  const [data1, setData1] = useState({ array: [] });

  const [majorSelect, setMajorSelect] = useState("")
  const [MajorSelectID, setMajorSelectID] = useState(ID)
  const [listSelectMajor, setListMajor] = useState([]);

  const [seviceSelect, setSeviceSelect] = useState("")
  const [ServiceSelectID, setServiceSelectID] = useState(IDS)
  const [listSelectService, setListService] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'reactSWD')
    setLoading(true)
    const res = await fetch(
      ' https://api.cloudinary.com/v1_1/fpt-claudary/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    setAvatar(file.secure_url)
    setLoading(false)
  }

  function displayRepairmanName(type) {
    const stateValue = {
      "234be13b-421b-40d9-8226-0f162dee7ac8": "Công ty điện lạnh Thành Công",
      "7e179e62-21da-45c1-afe4-114a580f0a12": "Công ty điện lạnh Long Châu",
      "404f25c6-4f40-4f83-acfd-16a0d7c2f8e9": "Công ty điện lạnh, điện gia dụng Thủy Tiên",
      "4bb0a83e-e9d9-47b5-8019-20c19e953181": "Công ty điện lạnh Hòa Hưng",
      "dd0b937a-8e90-4af3-bfe8-0a8cc0722f6a": "IrepairX",
      "17ab8695-daec-4ceb-9f78-07c9528c0009": "RepairmanX",
    };
    return stateValue[type] ? stateValue[type] : "";
  }
  //delete
  async function handleRepairmanDetele() {
    await del(
      `/api/v1.0/repairmans?id=${RepairmanDelete}`, localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/repairman";
          alert("Deleted Successfully")
        }
      })
  }
  //load repairman
  useEffect(() => {
    let params = {};
    let currentField = {};
    let MajorID = "";
    // let MajorNameByFieldID = "";
    params['Status'] = [1].reduce((f, s) => `${f},${s}`);
    getWithTokenParams("/api/v1.0/repairmans", params, localStorage.getItem("token")
    ).then(res => {
      setData1(res.data);
      const newlistMajor = res.data.reduce((list, item) => [...list,
      {
        text: `${item.Name}`,
        value: item.Id,
        key: item.Id
      }], [])
      setListMajor(
        [currentField, ...newlistMajor],
      );
    })
  }, []);
  //load repairman
  useEffect(() => {
    let params = {};
    let currentField = {};
    let ServiceId = "";
    params['Status'] = [1].reduce((f, s) => `${f},${s}`);
    getWithTokenParams("/api/v1.0/services", params, localStorage.getItem("token")
    ).then(res => {
      setData1(res.data);
      const newlistService = res.data.reduce((list, item) => [...list,
      {
        text: `${item.ServiceName}`,
        value: item.Id,
        key: item.Id
      }], [])
      setListService(
        [currentField, ...newlistService],
      );
    })
  }, []);
// console.log("dataSValue", options[0].value)
  //create
  async function handleSubmitCreate(e) {
    await postWithToken(
      `/api/v1.0/workson`,
      {
        listServiceId: ServiceSelectID,
        repairmanID: MajorSelectID,
        status: 0,
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
  
  console.log("aaaaMajor", MajorSelectID)
  console.log("aaaaService", ServiceSelectID)
  function getRepairmanID(Id) {
    getWithToken(`/api/v1.0/repairmans/${Id}`, localStorage.getItem("token")).then((res) => {
      setRepairmanID(Id);
      //   setCompanyID(CompanyId);
      setName(res.data.name);
      setEmail(res.data.email);
      setUsername(res.data.username);
      setPhoneNumber(res.data.phoneNumber);
      setAvatar(res.data.avatar);
      setStatus(res.data.status);

    }).catch((err) => {
      console.log(err);
    });
  }
  console.log(status)
  console.log(name)

  async function handleEditSubmit2(e) {
    await putWithToken(
      `/api/v1.0/workson`,
      {
        id: repairmanID,
        avatar: avatar,
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        username: username,
        status: 0,
        companyId: localStorage.getItem("IDCompany"),
        uid: "string"
      },
      localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/company/repairman";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log("lisstID", RepairmanList)
  //load repairman
  useEffect(() => {
    getWithToken("/api/v1.0/repairmans", localStorage.getItem("token")).then(
      (res) => {
        if (res && res.status === 200) {
          var temp = res.data;
          setRepairmanList(res.data.RepairmanId)
        }
      });
    getWithToken("/api/v1.0/services", localStorage.getItem("token")).then(
      (res) => {
        if (res && res.status === 200) {
          var temp = res.data;
          setServiceList(res.data.Id)
        }
      });
    getWithToken("/api/v1.0/workson", localStorage.getItem("token")).then(
      (res) => {
        if (res && res.status === 200) {
          var temp = res.data;
          setRepairmanList(res.data.RepairmanId)
          setRepairmanList(temp);
          setUseListRepairmanShow(temp);
          setUseListRepairmanShowPage(temp.slice(numberPage * 10 - 10, numberPage * 10));
          setTotalNumberPage(Math.ceil(temp.length / 10));
        }
      });
  }, []);
  // filter
  async function handleChooseState(e, id) {
    let newListState = [];
    if (id === -1) {
      if (e.target.checked) {
        newListState = listStates.reduce(
          (state, index) => [...state, listStates.indexOf(index)],
          []
        );
      }
    } else {
      if (e.target.checked) newListState = [...stateListFilter, id];
      else newListState = stateListFilter.filter((item) => item !== id);
    }
    //console.log(newListState);
    setstateListFilter(newListState);
    getRepairmanList(newListState);
  }
  function getRepairmanList(stateList) {
    let params = {};
    if (stateList && stateList.length > 0)
      params["Status"] = stateList.reduce((f, s) => `${f},${s}`);
    if (sortedField !== null) {

      getWithTokenParams(`/api/v1.0/repairmans`, params, localStorage.getItem("token")).then((res) => {
        var temp2 = res.data.filter((x) => x.state !== "Completed");
        setRepairmanList(temp2);
        setUseListRepairmanShow(temp2);
        setUseListRepairmanShowPage(temp2.slice(numberPage * 8 - 8, numberPage * 8));
        setTotalNumberPage(Math.ceil(temp2.length / 8));
        setCount(count);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
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
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light),
      fontSize: '200px',
      right: '10px',
      overflow: 'unset',
      borderRadius: '32%',
      // img: 'string',

    },
    name: {
      fontWeight: 'bold',
      color: theme.palette.secondary.dark,

    },
    Status: {
      fontWeight: '700',
      width: '71px',
      fontSize: '0.76rem',
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'green',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
    }
  }));
  const classes = useStyles();

  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListRepairmanShowPage(useListRepairmanShow.slice(number * 10 - 10, number * 10));
    setTotalNumberPage(Math.ceil(useListRepairmanShow.length / 10));
  }
  // custom state
  function displayStateName(type) {
    const stateValue = {
      3: "Deleted",
      1: "Approved",
      0: "New",
      2: "Updating",
    };
    return stateValue[type] ? stateValue[type] : "";
  }
  function onSubmitSearch(e) {
    e.preventDefault();
    if (searchName !== "") {
      getWithToken(
        `/api/v1.0/repairmans?Name=` + searchName,
        localStorage.getItem("token")
      ).then((res) => {
        var temp = res.data;
        setRepairmanList(temp);
        sort(sortedField, ascending, temp);
        setNumberPage(1);
        setUseListRepairmanShow(temp);
        setUseListRepairmanShowPage(temp.slice(0, 8));
        setTotalNumberPage(Math.ceil(temp.length / 8));
      });
    } else if (searchName == "") {
      getWithToken("/api/v1.0/repairmans", localStorage.getItem("token")).then(
        (res) => {
          if (res && res.status === 200) {
            var temp2 = res.data;
            setRepairmanList(temp2);
            setUseListRepairmanShow(temp2);
            setUseListRepairmanShowPage(temp2.slice(numberPage * 8 - 8, numberPage * 8));
            setTotalNumberPage(Math.ceil(temp2.length / 8));
          }
        })
    }
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
  //cancel
  function cancelRepairmanByID() {
    setName("");
    setPhoneNumber("");
    setUsername("");
    setAvatar("");
    setCompanyID("");
    setEmail("");
    setStatus("");
    setRepairmanID("");
    toggleApprove();
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="table">
              <div className="header-form">
                <Row>
                  <div className="header-body-filter">
                    <Col md={7}>
                      <Row className="fixed">
                        <InputGroup>
                          <InputGroupButtonDropdown
                            addonType="append"
                            isOpen={dropdownOpen}
                            toggle={toggleDropDown}
                            className="border border-gray-css"
                          >
                            <DropdownToggle className="dropdown-filter-css" caret> Filter&nbsp;</DropdownToggle>                        <DropdownMenu>
                              <div className="fixed">
                                <FilterState
                                  list={filterState}
                                  onChangeCheckBox={(e, id) => {
                                    handleChooseState(e, id);
                                  }}
                                  key={filterState}
                                />
                              </div>
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>
                      </Row>
                    </Col>
                  </div>
                  <Col md={2}>
                    <Form
                      onClick={(e) => {
                        onSubmitSearch(e);
                      }}
                    >
                      <InputGroup className="fixed">
                        <Input onChange={e => setSearchName(e.target.value)} placeholder="Search name..."></Input>
                        <Button className="dropdown-filter-css" >
                          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        </Button>
                      </InputGroup>
                    </Form>
                  </Col>
                  <Col md={9} align="right">
                    <Button variant="contained" className="add-major-custom" color="primary" onClick={() => { setRepairmanModalCreate(true); }}>Add Repaiman</Button>
                  </Col>
                </Row>
              </div>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th
                        className="description"
                        onClick={() => {
                          if (sortedField === "Username" && ascending) {
                            setSortedField("Username");
                            setAscending(false);
                            sort("Username", false, useListRepairmanShowPage);
                          } else {
                            setSortedField("Username");
                            setAscending(true);
                            sort("Username", true, useListRepairmanShowPage);
                          }
                        }}
                      >
                        Image{" "}
                        {sortedField === "Username" ? (
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
                          if (sortedField === "Id" && ascending) {
                            setSortedField("Id");
                            setAscending(false);
                            sort("Id", false, useListRepairmanShowPage);
                          } else {
                            setSortedField("Id");
                            setAscending(true);
                            sort("Id", true, useListRepairmanShowPage);
                          }
                        }}
                      >
                        Repairman{" "}
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
                      <th className="description">Service </th>

                      {/* <th className="description">Username</th> */}

                      <th className="description">Company</th>
                      <th className="description">Status</th>
                      <th className="description">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListRepairmanShowPage.map((e, index) => {
                      return (
                        <tr key={index}>
                          <td onClick={() => {
                            setModalStatus(true);
                            setSelectRepairman(e);
                          }}>
                            <img className="avatar-repairman" src={e.Avatar} />
                          </td>
                          <TableCell>
                            <Grid container>

                              <Grid item lg={10}>
                                <Typography className={classes.name}>{e.RepairmanId}</Typography>
                                <Typography color="textSecondary" variant="body2">{e.Id}
                                </Typography>
                              </Grid>
                            </Grid>
                          </TableCell>

                          <td onClick={() => {
                            setModalStatus(true);
                            setSelectRepairman(e);
                          }}>
                            {e.ServiceId}
                          </td>
                          <td onClick={() => {
                            setModalStatus(true);
                            setSelectRepairman(e);
                          }}>
                            {displayRepairmanName(localStorage.getItem("IDCompany"))}
                          </td>

                          <TableCell>
                            <Typography
                              className={classes.Status}
                              style={{
                                backgroundColor:
                                  ((e.Status === 1 && 'rgb(34, 176, 34)')
                                    ||
                                    (e.Status === 3 && 'red') ||
                                    (e.Status === 0 && 'rgb(50, 102, 100)'))

                              }}
                            >{displayStateName(e.Status)}</Typography>
                          </TableCell>
                          <td>
                            <td className="td-actions">
                              <OverlayTrigger
                                onClick={(e) => e.preventDefault()}
                                overlay={
                                  <Tooltip id="tooltip-960683717">
                                    Approved Repairman..
                                  </Tooltip>
                                }
                                placement="right"
                              >
                                <Button
                                  onClick={() => {
                                    setModalApprove(true);
                                    getRepairmanID(e.Id)                                                                // setSelectRepairman(e);
                                  }}
                                  className="btn-link btn-icon"
                                  type="button"
                                  variant="success"
                                >
                                  <i className="fas fa-check"></i>
                                </Button>
                              </OverlayTrigger>
                              <OverlayTrigger
                                onClick={(e) => e.preventDefault()}
                                overlay={
                                  <Tooltip id="tooltip-960683717">
                                    Delete Repairman..
                                  </Tooltip>
                                }
                                placement="right"
                              >
                                <Button
                                  onClick={() => {
                                    setRepairmanDelete(e.Id);
                                    setRepairmanModalDelete(true);
                                    // setSelectRepairman(e);
                                  }}
                                  className="btn-link btn-icon"
                                  type="button"
                                  variant="danger"
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              </OverlayTrigger>
                            </td>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Row>
                  <Col md={6}></Col>

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
                </Row>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>



      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this repairman</ModalBody>
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
          <Button className="cancel-button" onClick={toggleDelete}>
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
          <h3> INFORMATION </h3>
        </ModalHeader>
        <ModalBody>

          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}>  Name:</Col>
            <Col className="view-item-size" md={8}>
              {SelectRepairman !== undefined ? SelectRepairman.Name : ""}
              {/* {setSelectRepairman !== undefined ? displayMajorName(SelectRepairman.MajorId) : ""} */}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}> Email:</Col>
            <Col className="view-item-size" md={8}>
              {SelectRepairman !== undefined ? SelectRepairman.Email : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={4}> Created Date:</Col>
            <Col className="view-item-size" md={7}>
              {SelectRepairman !== undefined ? SelectRepairman.CreateDate : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="view-item-size-main" md={3}> Phone:</Col>
            <Col className="view-item-size" md={8}>{SelectRepairman !== undefined ? SelectRepairman.PhoneNumber : ""}</Col>
          </Row>
        </ModalBody>
      </Modal>


      <Modal isOpen={modalApprove} toggle={toggleApprove} centered size="lg" >
        <ModalHeader
          style={{ color: "#B22222" }}>
          <ModalTitle>Do you want to update repairman ?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <FormGroup className="mb-2">
                  <Form.Label>Repairman name</Form.Label>
                  <Form.Control type="text" placeholder="Repairman name" value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control type="text" placeholder="Phone" value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Service name" value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Username" value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <Form.Group className="mb-2 ml-5">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control type="file" onFileChange={avatar}
                    onChange={uploadImage}
                  />
                  {loading ? (
                    <h3>Loading...</h3>
                  ) : (
                    <img src={avatar} style={{ width: '220px' }} />
                  )}
                </Form.Group>
              </Grid>
            </Grid>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              // handleServiceDetele();
              handleEditSubmit2();
              setModalApprove(false);
            }}
          >
            Update
          </Button>
          <Button className="cancel-button" onClick={() => { cancelRepairmanByID(); }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal className="modalCreatene" isOpen={modalCreate} toggle={toggleCreate} centered>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreate)}
          toggle={toggleCreate}
        >
          <ModalTitle>Workon</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>RepairMan</Form.Label>
              <FormGroup className="mb-2">
                <Dropdown
                  fluid
                  search
                  selection
                  value={majorSelect}
                  onChange={handleOnchangeSelectdmajor}
                  options={listSelectMajor}
                />
              </FormGroup>
            </Form.Group>
            <Form.Group className="mb-2">

              <Form.Label>Service</Form.Label>
              <FormGroup className="mb-2">
                <Dropdown
                  fluid
                  search
                  multiple
                  value={seviceSelect}
                  onChange={handleChangeService}
                  options={listSelectService}
                />
              </FormGroup>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { // handleServiceDetele();
            setRepairmanModalCreate(false);
            handleSubmitCreate();
          }}
          >
            Save
          </Button>
          <Button color="secondary" onClick={toggleCreate}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

