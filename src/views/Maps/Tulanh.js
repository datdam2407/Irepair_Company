import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/customSizeCompany.css"
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
import "../../assets/css/customSizeCompany.css"
import { del, put, get, getWithParams, getWithToken, getWithTokenParams, putWithToken, postWithToken } from "../../service/ReadAPI";

const dataUpdate=["Tủ Lạnh", "Xe máy", "Máy Tính", "Xe ô tô", "Máy Lạnh", "Máy Giặt", "Bếp Gas"];


// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { makeStyles } from "@material-ui/core/styles";

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
} from "@material-ui/core";
// import FormDialog from './DialogService';
function Tulanh() {
  //delete modal
  const [ServiceDelete, setServiceDelete] = useState(null);
  const [modalDelete, setServiceModalDelete] = useState(false);
  const toggleDelete = () => setServiceModalDelete(!modalDelete);
  //edit modal
  const [ServiceEdit, setServiceEdit] = useState(null);
  // const [modalEdit, setServiceModalEdit] = useState(false);
  // const toggleEdit = () => setServiceModalEdit(!modalEdit);

  const [sortedField, setSortedField] = useState("Id");
  const [ascending, setAscending] = useState(true);
  //modal create
  const [modalCreate, setserviceModalCreate] = useState(false);
  const toggleCreate = () => setserviceModalCreate(!modalCreate);
  const [description2, setDescription2] = useState("");
  //Edit service
  const [serviceEdit, setserviceEdit] = useState(null);
  const [modalEdit, setserviceModalEdit] = useState(false);
  const toggleEdit = () => setserviceModalEdit(!modalEdit);
  //Delete service
  const [serviceDelete, setserviceDelete] = useState(null);
  const [modalserviceDelete, setserviceModalDelete] = useState(false);
  const toggleserviceDelete = () => setserviceModalDelete(!modalserviceDelete);

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
  const [fieldSelect, setfieldSelect] = useState("");
  const [data1, setData1] = useState({ array: [] });
  const [FieldSelectID, setFieldSelectID] = useState(-1);

  const [listField, setListField] = useState([]);
  //filter
  const listStates = ["Đang Hoạt Động", "Sắp ra mắt", "Ngưng hoạt động"];
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
      margin: "10px 10px",
      maxWidth: " 100%",
    },
    tableHeaderCell: {
      color: "burlywood",
      fontWeight: "bold",
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark),
      backgroundColor: "gray",
      fontWeight: "700",
    },
    thmajorheaderform: {
      fontWeight: "bold",
      fontWeight: "700",
      color: theme.palette.getContrastText(theme.palette.primary.dark),
    },

    avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light),
      fontSize: "200px",
      right: "10px",
      overflow: "unset",
      borderRadius: "32%",
    },
    name: {
      fontWeight: "bold",
      color: "#1d98e0f7",
      width: '250px'
    },
    Status: {
      fontWeight: "700",
      width: "71px",
      fontSize: "0.76rem",
      color: "white",
      backgroundColor: "green",
      borderRadius: 8,
      padding: "3px 10px",
      display: "inline-block",
    },
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
  const myOptions = [
    "SamSung",
    "Panasonic",
    "Daikin",
    "Electrolux",
    "LG",
    "Tosiba",
    "Sharp",
    "Mishubíhi",
    "Electric",
    "Aqua",
    "Honda",
    "Yamaha",
    "Piggio",
    "Suzuki",
    "SYM",
    "Davidson",
    "Triump",
    "Harley",
    "Ducati",
    "Rinnai",
    "Giovani",
    "Faber",
    "Teka",
    "Taka",
    "Binova",
    "Paloma",
    "Sunhouse",
    "Apple",
    "Samsung",
    "Xiaomi",
    "Oppo",
    "Huawei",
    "Pixel",
    "Nokia",
    "Samsung",
    "Apple",
    "Dell",
    "Asus",
    "HP",
    "Lenovo",
    "MSI",
    "Acer",
  ];

  const dataUpdate = [
    "Tủ Lạnh",
    "Xe máy",
    "Máy Tính",
    "Xe ô tô",
    "Máy Lạnh",
    "Máy Giặt",
    "Bếp Gas",
  ];

  async function handleRepairmanDetele() {
     window.location = "/admin/repairman";      
}
  const initialValue = { name: "", description: "", imageUrl: "", status: "1" };
  const [searchName, setSearchName] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log("field", FieldSelectID);
  // update

  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData);
    console.log(oldData);
    handleClickOpen();
  };

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
    getWithTokenParams(
      `/api/v1.0/services`,
      params,
      localStorage.getItem("token")
    )
      .then((res) => {
        var temp = res.data.filter((x) => x.state !== "Completed");
        setserviceList(temp);
        setUseListserviceShow(temp);
        setUseListserviceShowPage(
          temp.slice(numberPage * 80 - 80, numberPage * 80)
        );
        setTotalNumberPage(Math.ceil(temp.length / 80));
        setCount(count);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListserviceShowPage(
      useListserviceShow.slice(number * 80 - 80, number * 80)
    );
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
      "404f25c6-4f40-4f83-acfd-16a0d7c2f8e9":
        "Công ty điện lạnh, điện gia dụng Thủy Tiên",
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
                <p className="abc"> Tủ lạnh</p>
                  <Col md={1}>
                    <Dropdown>
                      <Dropdown.Menu>
                        <Dropdown.Item href="/company/gas">Bếp gas</Dropdown.Item>
                        <Dropdown.Item href="/company/ServiceMotobike">Xe máy</Dropdown.Item>
                        <Dropdown.Item href="/company/refrigerator">Tủ lạnh</Dropdown.Item>
                        <Dropdown.Item href="/company/washer">Máy giặt</Dropdown.Item>
                        <Dropdown.Item href="/company/air">Máy lạnh</Dropdown.Item>
                        <Dropdown.Item href="/company/computer">Máy tính</Dropdown.Item>
                        <Dropdown.Item href="/company/car">Xe ô tô</Dropdown.Item>
                        <Dropdown.Item href="/company/Service">Tất cả</Dropdown.Item>

                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <div className="header-body-filter">
                    <Col md={7}>
                      <Row className="fixed">
                      <Form
                      onClick={(e) => {
                        // onSubmitSearch(e);
                      }}
                    >
                      <InputGroup className="fixed">
                        <Input
                          onChange={(e) => setSearchName(e.target.value)}
                          placeholder="Tìm kiếm..."
                        ></Input>
                        <Button className="dropdown-filter-css">
                          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        </Button>
                      </InputGroup>
                    </Form>
                      </Row>
                    </Col>
                  </div>
                 
                  <Col md={8} align="right">
                    <Button
                      variant="contained"
                      className="add-major-custom"
                      color="primary"
                      onClick={() => {
                        setserviceModalCreate(true);
                      }}
                    >
                      Thêm dịch vụ
                    </Button>
                  </Col>
                </Row>
              </div>

              <Card.Body className="table">
                <Table className="table">
                  <thead>
                    <tr>
                      <th className="description" >thiết bị</th>
                      <th
                        className="description"
                        onClick={() => {
                          if (sortedField === "Username" && ascending) {
                            setSortedField("Username");
                            setAscending(false);
                          } else {
                            setSortedField("Username");
                            setAscending(true);
                          }
                        }}
                      >
                        dịch vụ cần sửa{" "}
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
                          if (sortedField === "Username" && ascending) {
                            setSortedField("Username");
                            setAscending(false);
                          } else {
                            setSortedField("Username");
                            setAscending(true);
                          }
                        }}
                      >
                        Giá tiền{" "}
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
                      <th className="description">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>

                  <tr>
                       <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Tủ lạnh
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              TL001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>               
                             <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Phát ra tiếng ồn lớn
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 0016
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>120,000đ - 220,000đ</td>

                      <td>
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
                            <Typography className={classes.name}>
                              Tủ lạnh
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              TL001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Đèn sáng nhưng không chạy
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 0026
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>120,000đ - 220,000đ</td>

                      <td>
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
                            <Typography className={classes.name}>
                              Tủ lạnh
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              TL001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Lốc máy nóng hơn bình thường
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 003
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>100,000đ - 500,000đ</td>

                      <td>
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
                            <Typography className={classes.name}>
                              Tủ lạnh
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              TL001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Cửa tủ bị chênh
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 004
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>100,000đ - 220,000đ</td>

                      <td>
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
                            <Typography className={classes.name}>
                              Tủ lạnh
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              TL001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Ngăn đá bám tuyết nhiều
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 005
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>120,000đ - 220,000đ</td>

                      <td>
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
                            <Typography className={classes.name}>
                              Tủ lạnh
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              TL001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Bị chảy nước
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 006
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>120,000đ - 320,000đ</td>

                      <td>
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
                            <Typography className={classes.name}>
                              Tủ lạnh
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              TL001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Bản lề cửa bị lệch
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 007
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>100,000đ - 520,000đ</td>

                      <td>
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
                            <Typography className={classes.name}>
                              Tủ lạnh
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              TL001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Ron cửa bị hở
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 008
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>100,000đ - 220,000đ</td>

                      <td>
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
                            <Typography className={classes.name}>
                              Tủ lạnh
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              TL001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Bị hở các lỗ luồn dây điện, đường ống
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 009
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>120,000đ - 520,000đ</td>

                      <td>
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
                            <Typography className={classes.name}>
                              Tủ lạnh
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              TL001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>
                              Ngăn đông không hoạt động
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                              SV 0017
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <td>200,000đ - 1,000,000đ</td>

                      <td>
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
        <ModalHeader style={{ color: "#1bd1ff" }}>
          Xóa dịch vụ cần sửa
        </ModalHeader>
        <ModalBody>Bạn có muốn xóa dịch vụ cần sửa này?</ModalBody>
        <ModalFooter>
          <Button
            style={{ color: "white", backgroundColor: "brown" }}
            onClick={toggleserviceDelete}
          >
            Hủy xóa
          </Button>
          <Button onClick={toggleserviceDelete}>Xóa</Button>{" "}
        </ModalFooter>
      </Modal>

      <Modal className="modalCreatene" isOpen={modalCreate} toggle={toggleCreate} centered>
        <ModalHeader
          style={{ color: "#1bd1ff" }}
      
        >
          <ModalTitle>Tạo mới dịch vụ cần sửa</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup className="mb-2">
              <Form.Label>Tên Thiết bị</Form.Label>
              <Form.Control type="text" placeholder="Thiết bị.." value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
          <FormGroup className="mb-2">
          <Form.Label>dịch vụ cần sửa </Form.Label>
              <Form.Control type="text" placeholder="Thiết bị.." value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-2">

            <Row>
              <Col>
              <Form.Label>Giá tiền nhỏ nhất</Form.Label>

              <Form.Control
                type="number"
                value={description}
                step="1000"
                max="90000000"                min="0"

                onChange={e => setDescription(e.target.value)}
              />
              </Col>
              <Col>
             
              <Form.Label>Giá tiền lớn nhất</Form.Label>
              <Form.Control
                type="number"
                step="1000"
                min="0"
                max="100000000"
                value={description2}
                onChange={e => setDescription2(e.target.value)}
                rows={3}
              />
              </Col>
            </Row>
            </FormGroup>
            
          </Form>
        </ModalBody>
        <ModalFooter>
        <Button  style={{ color: "white" ,backgroundColor:"brown" }} onClick={toggleCreate}>
            Hủy tạo
          </Button>
          <Button  onClick={toggleCreate}>
            Lưu dịch vụ
          </Button>
      
        </ModalFooter>
      </Modal>
      <Modal className="modalCreatene" isOpen={modalEdit} toggle={toggleEdit} centered>
        <ModalHeader
          style={{ color: "#1bd1ff" }}
      
        >
          <ModalTitle>Cập nhật dịch vụ cần sửa</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup className="mb-2">
          <Form.Label>Tên thiết bị </Form.Label>
              <Autocomplete
               
                options={dataUpdate}
                Selection
                style={{ width: 500 }}
                value={'Tủ Lạnh'}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Lựa chọn thiết bị"
                    variant="standard"
                    // placeholder="hãng sản phẩm"
                  />
                )}
              />
            </FormGroup>
            <Form.Label>dịch vụ cần sửa </Form.Label>
            <FormGroup className="mb-2">
              <Autocomplete
                options={myOptions}
                
                style={{ width: 500 }}
                value={'Lốc máy nóng hơn bình thường'}

                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                  
                    {...params}
                  
                    variant="standard"
                  />
                )}
              />
            </FormGroup>
         
            <FormGroup className="mb-2">

            <Row>
              <Col>
              <Form.Label>Giá tiền nhỏ nhất</Form.Label>

              <Form.Control
                type="number"
                value={100000}
                step="1000"
                max="90000000"                min="0"
                
                onChange={e => setDescription(e.target.value)}
              />
              </Col>
              <Col>
             
              <Form.Label>Giá tiền lớn nhất</Form.Label>
              <Form.Control
                type="number"
                step="1000"
                min="0"
                max="100000000"
                value={500000}
                onChange={e => setDescription2(e.target.value)}
                rows={3}
              />
              </Col>
            </Row>
            </FormGroup>
            
          </Form>
        </ModalBody>
        <ModalFooter>
        <Button  style={{ color: "white" ,backgroundColor:"brown" }} onClick={toggleEdit}>
            Hủy cập nhật
          </Button>
          <Button  onClick={toggleEdit}>
            Cập nhật
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
              {selectservice !== undefined
                ? displayCompanyName(selectservice.CompanyId)
                : ""}
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
              {selectservice !== undefined ? (
                <img className="text-left-topic" src={selectservice.ImageUrl} />
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>State</Col>
            <Col md={8}>
              {selectservice !== undefined
                ? displayStateName(selectservice.Status)
                : ""}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Tulanh;
