import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
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
  DropdownItem,
  InputGroupButtonDropdown,
  Input,
  FormGroup,
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
// import "../../assets/css/customSize.css"

import { del, put, get, getWithParams, getWithToken, getWithTokenParams, putWithToken, postWithToken } from "../../service/ReadAPI";
import FilterState from "./FilterState";

// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
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
// import FormDialog from './DialogService';
function ManageSevice() {
  //delete modal  
  const [ServiceDelete, setServiceDelete] = useState(null);
  const [modalDelete, setServiceModalDelete] = useState(false);
  const toggleDelete = () => setServiceModalDelete(!modalDelete);
  //edit modal  
  const [ServiceEdit, setServiceEdit] = useState(null);
  // const [modalEdit, setServiceModalEdit] = useState(false);
  // const toggleEdit = () => setServiceModalEdit(!modalEdit);

  //modal create
  const [modalCreate, setserviceModalCreate] = useState(false);
  const toggleCreate = () => setserviceModalCreate(!modalCreate)

  //Edit service
  const [serviceEdit, setserviceEdit] = useState(null);
  const [modalEdit, setserviceModalEdit] = useState(false);
  const toggleEdit = () => setserviceModalEdit(!modalEdit)
  //Delete service
  const [serviceDelete, setserviceDelete] = useState(null);
  const [modalserviceDelete, setserviceModalDelete] = useState(false);
  const toggleserviceDelete = () => setserviceModalDelete(!modalserviceDelete)

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [selectservice, setSelectservice] = useState();


  //service List
  const [useListserviceShow, setUseListserviceShow] = useState([]);
  const [useListserviceShowPage, setUseListserviceShowPage] = useState([]);
  const [serviceList, setserviceList] = useState([]);
  const [serviceListID, setserviceListID] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  const [count, setCount] = useState(1);

  // field edit
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [companyId, setCompanyID] = useState("");
  const [fieldID, setFieldID] = useState("");
  const [serviceID, setserviceID] = useState("");
  const [fieldSelect, setfieldSelect] = useState("")
  const [data1, setData1] = useState({ array: [] });
  const [FieldSelectID, setFieldSelectID] = useState(-1)



  const [listField, setListField] = useState([]);
  //filter 
  const listStates = [
    "Đang Hoạt Động",
    "Sắp ra mắt",
    "Ngưng hoạt động",
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
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light),
      fontSize: '200px',
      right: '10px',
      overflow: 'unset',
      borderRadius: '32%',

    },
    name: {
      fontWeight: 'bold',
      color: theme.palette.secondary.dark
    },
    Status: {
      fontWeight: '700',
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
    getserviceList(newListState);
  }
  const myOptions = ['SamSung', 'Panasonic', 'Daikin', 'Electrolux', 'LG','Tosiba','Sharp',
  'Mishubíhi','Electric','Aqua','Honda','Yamaha','Piggio','Suzuki','SYM','Davidson','Triump','Harley','Ducati','','','','','',''];

  const initialValue = { name: "", description: "", imageUrl: "", status: "1" }
  const [searchName, setSearchName] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };


  console.log("field", FieldSelectID)
  // update

  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData)
    console.log(oldData)
    handleClickOpen()
  }

  function handleOnchangeSelectedAsset(e, value) {
    //console.log(e.target,value);
    setfieldSelect(e.target.fieldId);
    setFieldSelectID(value.value);
  }
  // /api/v1.0/service/{id}
  //delete fc

  //Load service
  useEffect(() => {
    getserviceList();
  }, []);
  function getserviceList(stateList) {
    let params = {};
    if (stateList && stateList.length > 0)
      params["Status"] = stateList.reduce((f, s) => `${f},${s}`);
    getWithTokenParams(`/api/v1.0/services`, params, localStorage.getItem("token")).then((res) => {
      var temp = res.data.filter((x) => x.state !== "Completed");
      setserviceList(temp);
      setUseListserviceShow(temp);
      setUseListserviceShowPage(temp.slice(numberPage * 8 - 8, numberPage * 8));
      setTotalNumberPage(Math.ceil(temp.length / 8));
      setCount(count);
    }).catch((err) => {
      console.log(err);
    });
  }
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListserviceShowPage(useListserviceShow.slice(number * 8 - 8, number * 8));
    setTotalNumberPage(Math.ceil(useListserviceShow.length / 8));
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
  // Custom state 
  function displayStateName(type) {
    const stateValue = {
      1: "Đang Hoạt Động",
      0: "Sắp ra mắt",
      2: "Ngưng hoạt động",
      // 3: "Updating"
    };
    return stateValue[type] ? stateValue[type] : "";
  }
  function displayCompanyName(type) {
    const stateValue = {
      "234be13b-421b-40d9-8226-0f162dee7ac8": "Công ty điện lạnh Thành Công",
      "7e179e62-21da-45c1-afe4-114a580f0a12": "Công ty điện lạnh Long Châu",
      "404f25c6-4f40-4f83-acfd-16a0d7c2f8e9": "Công ty điện lạnh, điện gia dụng Thủy Tiên",
      "4bb0a83e-e9d9-47b5-8019-20c19e953181": "Công ty điện lạnh Hòa Hưng",
      "dd0b937a-8e90-4af3-bfe8-0a8cc0722f6a": "IrepairX",
      "17ab8695-daec-4ceb-9f78-07c9528c0009": "CompanyX",
    };
    return stateValue[type] ? stateValue[type] : "";
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
                            <DropdownToggle className="dropdown-filter-css" caret> Filter&nbsp;</DropdownToggle>                      <DropdownMenu >
                              <div className="fixed" >
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
                        // onSubmitSearch(e);
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
                  <Col md={8} align="right">
                    <Button variant="contained" className="add-major-custom" color="primary" onClick={() => { setserviceModalCreate(true); }}>Thêm Sản Phẩm</Button>
                  </Col>
                </Row>
              </div>

              <Card.Body className="table">
                <Table className="table">
                  <thead>
                    <tr>
                      <th className="description" >Tên Sản Phẩm</th>
                      <th className="description">Mô Tả</th>
                      <th className="description">Hãng Sản Xuất</th>
                      <th className="description">Trạng Thái</th>
                      <th className="description">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Tủ Lạnh</Typography>
                            <Typography color="textSecondary" variant="body2">TL 001</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>Chuyên Sửa Các Vấn đề liên quan tới tủ lạnh</td>
                      <td>
                        SamSung, Panasonic, Daikin, Electrolux, LG, Tosiba, Sharp, Mishubíhi Electric, Aqua
                      </td>
                      <TableCell>
                        <Typography
                          className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '120px'
                          }}
                        >Đang Hoạt Động</Typography>
                      </TableCell>
                      <td className="td-actions">
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            onClick={() => {
                              // setModalStatus(true);
                              setSelectservice(e);
                            }}
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
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
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
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
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
                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Xe máy</Typography>
                            <Typography color="textSecondary" variant="body2">XM001</Typography>
                          </Grid>
                        </Grid>

                      </TableCell>
                      <td>Chuyên Sửa Các Vấn đề liên quan tới xe máy</td>
                      <td>
                        Honda,Yamaha,Piggio,SYM,Suzuki,Triump,Harley Davidson,Ducati
                      </td>

                      <TableCell>
                        <Typography className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '120px', textAlign: 'center'
                          }}>Đang Hoạt Động</Typography>
                      </TableCell>
                      <td className="td-actions">
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            onClick={() => {
                              // setModalStatus(true);
                              setSelectservice(e);
                            }}
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
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
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
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
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
                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Máy Tính</Typography>
                            <Typography color="textSecondary" variant="body2">MT001</Typography>
                          </Grid>
                        </Grid>

                      </TableCell>
                      <td>Chuyên Sửa Các Vấn đề liên quan tới máy tính</td>
                      <td>
                        Samsung,Apple,Dell,Asus,HP,Lenovo,MSI,Acer
                      </td>

                      <TableCell>
                        <Typography className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '120px', textAlign: 'center'
                          }}>Đang Hoạt Động</Typography>
                      </TableCell>
                      <td className="td-actions">
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            onClick={() => {
                              // setModalStatus(true);
                              setSelectservice(e);
                            }}
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
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
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
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
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
                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Đồng hồ thông minh</Typography>
                            <Typography color="textSecondary" variant="body2">DH001</Typography>
                          </Grid>
                        </Grid>

                      </TableCell>
                      <td>Chuyên Sửa Các Vấn đề liên quan tới đồng hồ</td>
                      <td>
                        Apple, Samsung,Xiaomi, Huawei
                      </td>

                      <TableCell>
                        <Typography className={classes.Status}
                          style={{
                            backgroundColor:
                              'black',
                            width: '120px',
                            textAlign: 'center'
                          }}>Sắp ra mắt</Typography>
                      </TableCell>
                      <td className="td-actions">
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            onClick={() => {
                              // setModalStatus(true);
                              setSelectservice(e);
                            }}
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
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
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
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
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
                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Xe ô tô</Typography>
                            <Typography color="textSecondary" variant="body2">C001</Typography>
                          </Grid>
                        </Grid>

                      </TableCell>
                      <td>Chuyên Sửa Các Vấn đề liên quan tới xe ô tô</td>
                      <td>
                        Honda,Suzuki,Toyota,Chevrolet,Ford,Hyunda,Isuzu,Kia
                      </td>

                      <TableCell>
                        <Typography className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '120px', textAlign: 'center'
                          }}>Đang Hoạt Động</Typography>
                      </TableCell>
                      <td className="td-actions">
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            onClick={() => {
                              // setModalStatus(true);
                              setSelectservice(e);
                            }}
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
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
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
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
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
                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Máy Lạnh</Typography>
                            <Typography color="textSecondary" variant="body2">ML001</Typography>
                          </Grid>
                        </Grid>

                      </TableCell>
                      <td>Chuyên Sửa Các Vấn đề liên quan tới máy lạnh</td>
                      <td>
                        Samsung,Panasonic,Daikin,Electrolux,LG,Toshiba,Sharp,Sanyo
                      </td>

                      <TableCell>
                        <Typography className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '120px', textAlign: 'center'
                          }}>Đang Hoạt Động</Typography>
                      </TableCell>
                      <td className="td-actions">
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            onClick={() => {
                              // setModalStatus(true);
                              setSelectservice(e);
                            }}
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
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
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
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
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
                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Máy Giặt</Typography>
                            <Typography color="textSecondary" variant="body2">MG001</Typography>
                          </Grid>
                        </Grid>

                      </TableCell>
                      <td>Chuyên Sửa Các Vấn đề liên quan tới máy lạnh</td>
                      <td>
                        Samsung,Panasonic,Daikin,Electrolux,LG,Toshiba,Sharp,Sanyo
                      </td>

                      <TableCell>
                        <Typography className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '120px', textAlign: 'center'
                          }}>Đang Hoạt Động</Typography>
                      </TableCell>
                      <td className="td-actions">
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            onClick={() => {
                              // setModalStatus(true);
                              setSelectservice(e);
                            }}
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
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
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
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
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
                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Bếp Gas</Typography>
                            <Typography color="textSecondary" variant="body2">BG001</Typography>
                          </Grid>
                        </Grid>

                      </TableCell>
                      <td>Chuyên Sửa Các Vấn đề liên quan tới bếp gas</td>
                      <td>
                        Rinnai,Giovani,Faber,Teka,Taka,Binova,Paloma,Sunhouse
                      </td>

                      <TableCell>
                        <Typography className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '120px', textAlign: 'center'
                          }}>Đang Hoạt Động</Typography>
                      </TableCell>
                      <td className="td-actions">
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            onClick={() => {
                              // setModalStatus(true);
                              setSelectservice(e);
                            }}
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
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
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
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
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
                    <tr>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Điện thoại</Typography>
                            <Typography color="textSecondary" variant="body2">DT001</Typography>
                          </Grid>
                        </Grid>

                      </TableCell>
                      <td>Chuyên Sửa Các Vấn đề liên quan tới điện thoại</td>
                      <td>
                        Apple, Samsung, Xiaomi, Oppo, Huawei, Pixel, Nokia
                      </td>
                      <TableCell>
                        <Typography className={classes.Status}
                          style={{
                            backgroundColor:
                              'Red',
                            width: '120px'
                          }}>Ngưng Hoạt Động</Typography>
                      </TableCell>
                      <td className="td-actions">
                        <OverlayTrigger
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <Button
                            onClick={() => {
                              // setModalStatus(true);
                              setSelectservice(e);
                            }}
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
                          placement="right"
                        >
                          <Button
                            // onClick={() => handleUpdate(e.data)}
                            // onGridReady={onGridReady}
                            onClick={() => {
                              // setserviceEdit(e.Id);
                              // getserviceByID(e.Id);
                              setserviceModalEdit(true);
                            }}
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
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
                              // setserviceDelete(e.Id);
                              setserviceModalDelete(true);
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

        </Row>
      </Container>


      <Modal isOpen={modalserviceDelete} toggle={toggleserviceDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleserviceDelete)}
          toggle={toggleserviceDelete}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this service</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteserviceByID();
              setserviceModalDelete(false);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleserviceDelete}>
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
          <ModalTitle>Tạo mới một sản phẩm</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup className="mb-2">
              <Form.Label>Tên Sản Phẩm</Form.Label>
              <Form.Control type="text" placeholder="Tên sản phẩm" value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <Form.Label>Hãng Sản Xuất </Form.Label>
            <FormGroup className="mb-2">
              <Autocomplete
                options={myOptions}
                multiple
                style={{ width: 500 }}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lựa chọn hãng"
                    variant="standard"
                    placeholder="hãng sản phẩm"
                  />
                )}
              />
            </FormGroup>
            
            <FormGroup className="mb-2">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mô tả chi tiết"
                as="textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
            </FormGroup>
            {/* <FormGroup className="mb-2">
              <Form.Label></Form.Label>
              <Form.Control type="number" placeholder="service name" value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </FormGroup> */}
            {/* <FormGroup className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="text" value={picture}
                onChange={e => setImage(e.target.value)}
              />
            </FormGroup> */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { // handleServiceDetele();
            handleSubmitCreate();
            setserviceModalCreate(false);
          }}
          >
            Lưu sản phẩm
          </Button>
          <Button color="secondary" onClick={toggleCreate}>
            Hủy tạo
          </Button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEdit} toggle={toggleEdit} centered>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleEdit)}
          toggle={toggleEdit}
        >
          <ModalTitle>Do you want to edit service ?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="mb-2">
              <Form.Label>Company </Form.Label>
              <Form.Control disabled type="text" placeholder="name" value={companyId}
                onChange={e => setCompanyID(e.target.value)}
              />
            </FormGroup>
            <Form.Label>Field </Form.Label>
            <FormGroup className="mb-2">
              <Dropdown
                fluid
                search
                selection
                value={fieldSelect}
                onChange={handleOnchangeSelectedAsset}
                options={listField} />
            </FormGroup>

            <FormGroup className="mb-2">
              <Form.Label>service name</Form.Label>
              <Form.Control type="text" placeholder="Service name" value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                as="textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
            </FormGroup>
            {/* <FormGroup className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="service name" value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </FormGroup> */}
            {/* <FormGroup className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="text" value={picture}
                onChange={e => setImage(e.target.value)}
              />
            </FormGroup> */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { // handleServiceDetele();
            handleEditSubmit();
            setserviceModalEdit(false);
          }}
          >
            Edit
          </Button>
          <Button color="secondary" onClick={toggleEdit}>
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
          Detailed service information
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col></Col>
            <Col md={3}>Name</Col>
            <Col md={8}>
              {selectservice !== undefined ? selectservice.ServiceName : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Company</Col>
            <Col md={8}>
              {selectservice !== undefined ? displayCompanyName(selectservice.CompanyId) : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Description</Col>
            <Col md={8}>
              {selectservice !== undefined ? selectservice.Description : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Price</Col>
            <Col md={8}>
              {selectservice !== undefined ? selectservice.Price : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Picture</Col>
            <Col md={8}>
              {selectservice !== undefined ? <img className="text-left-topic" src={selectservice.ImageUrl} /> : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>State</Col>
            <Col md={8}>{selectservice !== undefined ? displayStateName(selectservice.Status) : ""}</Col>
          </Row>
        </ModalBody>
      </Modal>



    </>
  );
}

export default ManageSevice;