import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
function Customer() {
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
    "Đang hoạt động",
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
      setUseListserviceShowPage(temp.slice(numberPage * 80 - 80, numberPage * 80));
      setTotalNumberPage(Math.ceil(temp.length / 80));
      setCount(count);
    }).catch((err) => {
      console.log(err);
    });
  }
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListserviceShowPage(useListserviceShow.slice(number * 80 - 80, number * 80));
    setTotalNumberPage(Math.ceil(useListserviceShow.length / 80));
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
      1: "Approved",
      0: "New",
      2: "Deleted",
      3: "Updating"
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

                </Row>
              </div>

              <Card.Body className="table">
                <Table className="table">
                  <thead>
                    <tr>
                      <th className="description" >Tên khách hàng</th>
                      <th className="description">Điện Thoại</th>
                      <th className="description">Địa Chỉ</th>
                      <th className="description">Ngày Đăng Ký</th>
                      <th className="description">Đánh giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Nguyễn Lê Thuần</Typography>
                            <Typography color="textSecondary" variant="body2">Cus 001</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>0123456791</td>
                      <td>
                        43 Đ.160, Tăng Nhơn Phú A
                      </td>
                      <td>
                        20-01-2020
                      </td>
                      <td>
                      <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '120px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩✩</Typography>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '253px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        > Gọi thợ nhanh, sửa chữa tận tình
                        </Typography>
                      </td>
                     
                    </tr>
                    <tr >
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Nguyễn Quốc Vinh</Typography>
                            <Typography color="textSecondary" variant="body2">Cus 011</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>0213972832</td>
                      <td>
                        89 Lê Văn Việt, Q9 , TP Thủ Đức
                      </td>
                      <td>
                        20-01-2021
                      </td>
                      <td>
                      <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '120px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩✩✩</Typography>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '253px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        > Thợ sửa ok! Thở sửa tủ lạnh với TV đúng giá
                        </Typography>
                      </td>

                    </tr>
                    <tr >
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Nguyễn Tiến Long</Typography>
                            <Typography color="textSecondary" variant="body2">Cus 012</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>0213912323</td>
                      <td>
                        550 Quang Trung, Q Gò Vấp , Phường 8, TP Hồ Chí Minh
                      </td>
                      <td>
                        11-01-2021
                      </td>
                      <td>
                      <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '120px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩✩</Typography>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '253px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        > Thợ sửa ok! Rất nhanh chóng
                        </Typography>
                      </td>

                    </tr>
                    <tr >
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Đàm Tiến Đạt</Typography>
                            <Typography color="textSecondary" variant="body2">Cus 002</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>0988924312</td>
                      <td>
                        43 Đ.100, Tăng Nhơn Phú B
                      </td>
                      <td>
                        02-02-2010
                      </td>
                      <td>
                      <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '120px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩✩</Typography>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '253px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        > Rất nhanh chóng thợ đã tới
                        </Typography>
                      </td>

                    </tr>

                    <tr >
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Nguyễn Hoàng Quốc Khánh</Typography>
                            <Typography color="textSecondary" variant="body2">Cus 003</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>0909132173</td>
                      <td>
                        Quận 3, Lê Văn Sỹ
                      </td>
                      <td>
                        12-12-2019
                      </td>
                      <td>
                      <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '120px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩✩✩</Typography>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '253px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        > Mọi vấn đề giải quyết rất nhanh chóng
                        </Typography>
                      </td>
                    </tr>

                    <tr >
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Đỗ Dương Tâm Đăng</Typography>
                            <Typography color="textSecondary" variant="body2">Cus 004</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>0982321324</td>
                      <td>
                        Lê Văn Việt, Quận 9
                      </td>
                      <td>
                        12-02-2021
                      </td>
                      <td>
                      <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '120px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩</Typography>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '253px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        > Cần cải tiến thêm một số tính năng 
                        </Typography>
                      </td>
                    </tr>

                    <tr >
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Phạm Tấn Phát</Typography>
                            <Typography color="textSecondary" variant="body2">Cus 005</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>0987654321</td>
                      <td>
                        Gò Vấp
                      </td>
                      <td>
                        02-02-2019
                      </td>
                      <td>
                      <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '120px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩✩✩</Typography>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '253px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        > Dịch vụ uy tín , ứng dụng hữu ích không cần phải đi ra bên ngoài sửa chữa
                        </Typography>
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

      <Modal isOpen={modalCreate} toggle={toggleCreate} centered>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleCreate)}
          toggle={toggleCreate}
        >
          <ModalTitle>Do you want to create new service ?</ModalTitle>
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
            <FormGroup className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="service name" value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </FormGroup>
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
            Save
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
            <FormGroup className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="service name" value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </FormGroup>
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

export default Customer;