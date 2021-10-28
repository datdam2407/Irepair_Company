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
} from "react-bootstrap";
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
} from "reactstrap";
import {
  TableCell,
  Grid,
  Typography,
} from '@material-ui/core';
import { del, put, get, getWithParams, getWithToken, getWithTokenParams, putWithToken, postWithToken } from "../../service/ReadAPI";
import { makeStyles } from '@material-ui/core/styles';
import FilterState from "./FilterState";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faCaretDown,
    faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
export default function Repairman() {

  const [sortedField, setSortedField] = useState("Id");

  const [ascending, setAscending] = useState(true);
  const [modalDelete, setRepairmanModalDelete] = useState(false);
  const toggleDelete = () => setRepairmanModalDelete(!modalDelete);
  const [RepairmanDelete, setRepairmanDelete] = useState(null);

  //edit
  const [modalEdit, setRepairmanModalEdit] = useState(false);
  const toggleEdit = () => setRepairmanModalEdit(!modalEdit)

  const [modalCreate, setRepairmanModalCreate] = useState(false);
  const toggleCreate = () => setRepairmanModalCreate(!modalCreate)

  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [SelectRepairman, setSelectRepairman] = useState();
  const [RepairmanApprove, setRepairmanApprove] = useState(null);

  const [modalApprove, setModalApprove] = useState(false);
  const toggleApprove = () => setModalApprove(!modalApprove)

  const [useListRepairmanShow, setUseListRepairmanShow] = useState([]);
  const [useListRepairmanShowPage, setUseListRepairmanShowPage] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  const [RepairmanList, setRepairmanList] = useState([]);
  const [RepairmanListName, setRepairmanListName] = useState([]);


  const listStates = [
    "Đã xử lý",
    "Đang trì hoãn",
    "Đã hủy",
  ];

  const [filterState, setListFilterState] = useState(listStates);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateListFilter, setstateListFilter] = useState([]);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);

  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    getWithToken("/api/v1.0/companies", localStorage.getItem("token")).then(
      (res) => {
        if (res && res.status === 200) {
          setRepairmanListName(res.RepairmanName);
          // res.data;
        }
      });
  }, []);
  console.log("aaaaaa", RepairmanListName);

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
  async function handleEditSubmit2() {
    await putWithToken(
      `/api/v1.0/repairmans?repairmanId=${RepairmanApprove}`,
      {
        id: "String",
        RepairmanName: "String",
        description: "String",
        FieldId: "String",
        RepairmanId: "String",
        Price: 0,
        ImageUrl: "String",
        status: 0,
      }, localStorage.getItem("token")
    )
      .then((res) => {
        if (res.status === 200) {
          alert("Approved Successfully")

          window.location = "/admin/repairman";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log("lisstID", RepairmanList)
  useEffect(() => {
    getWithToken("/api/v1.0/repairmans", localStorage.getItem("token")).then(
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
      color: '#1d98e0f7'

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
                        <Input onChange={e => setSearchName(e.target.value)} placeholder="Tìm kiếm..."></Input>
                        <Button className="dropdown-filter-css" >
                          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        </Button>
                      </InputGroup>
                    </Form>
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
                          } else {
                            setSortedField("Username");
                            setAscending(true);
                          }
                        }}
                      >
                        Thợ sửa chữa{" "}
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
                      <th className="description">Số Điện Thoại </th>
                      <th className="description">Ngày Tạo</th>
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
                        Khách hàng{" "}
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
                      <th className="description">Đồ Cần Sửa</th>
                      <th className="description">Hãng</th>
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
                       Vấn đề{" "}
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
                        Giá sữa chữa{" "}
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
                      <th className="description">Đánh Giá Yêu Cầu</th>
                      <th className="description">Trạng Thái</th>
                      <th className="description"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Phạm Hữu Nghĩa</Typography>
                            <Typography color="textSecondary" variant="body2">Irepair 001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        0123254535
                      </td>
                      <td >
                        12-04-2021
                      </td>
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Lê Thuần</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        Ống Nước
                      </td>
                      <td>
                        Khác
                      </td>
                      <td>
                        Nghẹt ống cống nhà tắm
                      </td>
                      <td>
                      400,000 đ
                      </td>

                      <td>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '133px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        > Hài Lòng
                        </Typography>

                        <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '90px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩✩</Typography>
                      </td>
                      <TableCell>
                        <Typography
                          className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '126px',
                            color: 'white',
                            fontSize: '12px'
                          }}
                        >Đã xử lý</Typography>
                      </TableCell>
                      <td>
                       
                      </td>
                    </tr>
                    <tr>

                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Nguyễn Khánh</Typography>
                            <Typography color="textSecondary" variant="body2">Irepair 011
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        0823901392
                      </td>
                      <td >
                        12-10-2020
                      </td>
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Tâm Đăng</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        Xe Ô tô
                      </td>
                      <td>
                        BMW 99
                      </td>
                      <td>
                        Nghẹt ống bô
                      </td>
                      <td>
                          500,000 đ
                      </td>
                      <td>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '133px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        > Rất hài Lòng
                        </Typography>
                        <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '110px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩✩✩</Typography>
                      </td>
                      <TableCell>
                        <Typography
                          className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '126px',
                            color: 'white',
                            fontSize: '12px'
                          }}
                        >Đã xử lý</Typography>
                      </TableCell>
                      <td>
                        
                        </td>
                    </tr>

                    <tr>

                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Phạm Hữu Nghĩa</Typography>
                            <Typography color="textSecondary" variant="body2">Irepair 001
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        0123254535
                      </td>
                      <td >
                        12-04-2021
                      </td>
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Quốc Thịnh</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        Ống Nước
                      </td>
                      <td>
                        Khác
                      </td>
                      <td>
                        Nghẹt ống cống nhà tắm
                      </td>
                      <td>370,000 đ	
</td>

                      <td>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '133px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        > Hài Lòng
                        </Typography>

                        <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '90px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩✩</Typography>
                      </td>
                      <TableCell>
                        <Typography
                          className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '126px',
                            color: 'white',
                            fontSize: '12px'
                          }}
                        >Đã xử lý</Typography>
                      </TableCell>
                      <td>
                        
                      </td>
                    </tr>
                    <tr>

                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Trần Văn Thái</Typography>
                            <Typography color="textSecondary" variant="body2">Irepair 003
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        0123456789
                      </td>
                      <td >
                        13-02-2021
                      </td>
                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Tiến Phát</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        Máy Lạnh
                      </td>
                      <td>
                        SamSung
                      </td>
                      <td>
                        Bị Chảy Nước                    
                        </td>
                      <td>
                        </td>
                      <TableCell>
                        <Typography
                          style={{
                            color:
                              'red',
                            fontWeight: '700'
                          }}
                        > Không Liên Hệ Được Thợ</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          className={classes.Status}
                          style={{
                            backgroundColor:
                              'red',
                            width: '126px',
                            color: 'white',
                            fontSize: '12px'
                          }}
                        >Đã Hủy</Typography>
                      </TableCell>
                      <td>
                      </td>
                    </tr>
                    <tr>

                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Nguyễn Lê Thuần</Typography>
                            <Typography color="textSecondary" variant="body2">Irepair 005
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        0980921232
                      </td>
                      <td >
                        19-08-2020
                      </td>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Tiến Long</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        Ống Nước
                      </td>
                      <td>
                        Khác
                      </td>
                      <td>
                        Bể Ống Nước
                      </td>
                      <td>
                        
                      </td>
                      <TableCell>
                        <Typography
                          style={{
                            color:
                              'red',
                            fontWeight: '700'
                          }}
                        >Thời Gian Chờ Thợ đến quá lâu</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          className={classes.Status}
                          style={{
                            backgroundColor:
                              'red',
                            width: '126px',
                            color: 'white',
                            fontSize: '12px'
                          }}
                        >Đã Hủy</Typography>
                      </TableCell>
                      <td>
                        
                      </td>
                    </tr>
                    <tr>

                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Đỗ Thành Thái</Typography>
                            <Typography color="textSecondary" variant="body2">Irepair 004
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                      0980921232
                      </td>
                      <td >
                        19-08-2020
                      </td>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Phạm Tấn Phát</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        Ống Nước
                      </td>
                      <td>
                        Khác
                      </td>
                      <td>
                        Bể Ống Nước
                      </td>
                      <td>
                      </td>

                      <TableCell>
                        <Typography
                          style={{
                            color:
                              'rgb(136 70 13)',
                            fontWeight: '700'
                          }}
                        >Yêu cầu đang xử lý
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          className={classes.Status}
                          style={{
                            backgroundColor:
                              'orange',
                            width: '126px',
                            color: 'white',
                            fontSize: '12px'
                          }}
                        >Thợ đang đến</Typography>
                      </TableCell>
                      <td>
                        
                      </td>
                    </tr>

                    <tr>

                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Trần Văn Thái</Typography>
                            <Typography color="textSecondary" variant="body2">Irepair 003
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        0123456789
                      </td>
                      <td >
                        25-10-2021
                      </td>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Đàm Đạt</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        Laptop
                      </td>
                      <td>
                        Asus
                      </td>
                     
                      <td>
                        Hư card mạng
                      </td>
                      <td>
                        550,000đ
                        </td>

                        <td>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '133px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        >Rất hài Lòng
                        </Typography>

                        <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '133px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩✩✩</Typography>
                      </td>

                      <TableCell>
                        <Typography
                          className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '133px',
                            color: 'white',
                            fontSize: '12px'
                          }}
                        >Đã xử lý</Typography>
                      </TableCell>
                      <td>
                        
                      </td>
                    </tr>
                    <tr>

                      <TableCell>
                        <Grid container>

                          <Grid item lg={10}>
                            <Typography className={classes.name}>Nguyễn Văn Phát</Typography>
                            <Typography color="textSecondary" variant="body2">Irepair 002
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        0123254535
                      </td>
                      <td >
                        12-04-2021
                      </td>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={10}>
                            <Typography className={classes.name}>Phạm Tấn Phát</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <td>
                        Máy tính
                      </td>
                      <td>
                        Asus
                      </td>
                      <td>
                        Hư màn hình
                      </td>
                      <td>
                      1,200,000 đ
                      </td>

                      <td>
                        <Typography
                          style={{
                            color:
                              'green',
                            width: '133px',
                            fontWeight: '700',
                            paddingRight: '15px',
                          }}
                        >Rất hài Lòng
                        </Typography>

                        <Typography
                          style={{
                            color:
                              '#e2930b',
                            width: '133px',
                            fontWeight: '700',
                            paddingRight: '15px',
                            fontSize: '20px',
                          }}
                        >✩✩✩✩✩</Typography>
                      </td>
                      <TableCell>
                        <Typography
                          className={classes.Status}
                          style={{
                            backgroundColor:
                              'rgb(34, 176, 34)',
                            width: '133px',
                            color: 'white',
                            fontSize: '12px'
                          }}
                        >Đã xử lý</Typography>
                      </TableCell>
                      <td>
                        
                      </td>
                    </tr>
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

      <Modal isOpen={modalApprove} toggle={toggleApprove}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleApprove)}
          toggle={toggleApprove}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to Appprove this repairman</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              // deleteMajorFieldsByID();
              handleEditSubmit2();
              setModalApprove(false);
            }}
          >
            Approved
          </Button>{" "}
          <Button color="secondary" onClick={toggleApprove}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
        
        >
          Xóa lịch sử
        </ModalHeader>
        <ModalBody>Bạn có muốn xóa lịch sử yêu cầu này</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              handleRepairmanDetele();
              setRepairmanModalDelete(false);
            }}
          >
            Xóa
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            Hủy
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
            <Col className="view-item-size-main" md={3}>  FullName:</Col>
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
    </>
  );
}

