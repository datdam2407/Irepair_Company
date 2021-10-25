import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faCaretDown,
    faCaretUp,
  } from "@fortawesome/free-solid-svg-icons";
  
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
    OverlayTrigger,
    Tooltip,
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
    DropdownItem,
    InputGroupButtonDropdown,
    Input,
    FormGroup,
} from "reactstrap";
import moment from "moment";
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
import deleteIcon from "assets/img/remove.png";
import editIcon from "assets/img/edit.png";
import { Link } from "react-router-dom";
import { del, post, get, getWithToken } from "../../service/ReadAPI";
import { makeStyles } from '@material-ui/core/styles';

export default function Repairman() {
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
    const [filterState, setListFilterState] = useState(listStates);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [stateListFilter, setstateListFilter] = useState([]);
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
    const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);
  
    const [CustomerDelete, setCustomerDelete] = useState(null);
    const [modalDelete, setCustomerModalDelete] = useState(false);
    const toggleDelete = () => setCustomerModalDelete(!modalDelete);
    //edit
    const [CustomerEdit, setCustomerEdit] = useState(null);
    const [modalEdit, setCustomerModalEdit] = useState(false);
    const toggleEdit = () => setCustomerModalEdit(!modalEdit)

    const myOptions = ['Thợ sửa tivi', 'Thợ Sửa máy tính', 'Thợ điện lạnh', 'Thợ Điện', 'Thợ Sửa ô tô','Thợ Sửa xe máy','Thợ Sửa đồng hồ']
  
    //modal create
  const [modalCreate, setserviceModalCreate] = useState(false);
  const toggleCreate = () => setserviceModalCreate(!modalCreate)
    //view modal
    const [modalStatus, setModalStatus] = useState(false);
    const toggleDetails = () => setModalStatus(!modalStatus);
    const [Selectservice, setSelectservice] = useState();
    const listStates = [
        "Đang Hoạt Động",
        "Ngưng hoạt động",
      ];

    const [customer_Name, setcustomer_Name] = useState("");
    const [address, setaddress] = useState("");

    const [AvatarCus, setAvatarCus] = useState("");
    const [CreateDate, setCreateDate] = useState("");
    const [Email, setEmail] = useState("");
    const [FullName, setFullName] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [Username, setUsername] = useState("");


    const [useListCustomerShow, setUseListCustomerShow] = useState([]);
    const [useListCustomerShowPage, setUseListCustomerShowPage] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [customerListID, setCustomerListID] = useState([]);
    const [numberPage, setNumberPage] = useState(1);
    const [totalNumberPage, setTotalNumberPage] = useState(1);
    const [companyList, setCompanyList] = useState([]);
    const [companyListName, setCompanyListName] = useState([]);



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

    console.log("lisstID", companyList)
    useEffect(() => {
        getWithToken("/api/v1.0/repairmans", localStorage.getItem("token")).then(
            (res) => {
                if (res && res.status === 200) {
                    var temp = res.data;
                    setCompanyList(res.data.CompanyId)
                    setCustomerList(temp);
                    setUseListCustomerShow(temp);
                    setUseListCustomerShowPage(temp.slice(numberPage * 100 - 100, numberPage * 100));
                    setTotalNumberPage(Math.ceil(temp.length / 100));
                }
            });
    }, []);


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
        setUseListCustomerShowPage(useListCustomerShow.slice(number * 100 - 100, number * 100));
        setTotalNumberPage(Math.ceil(useListCustomerShow.length / 100));
    }
    // custom state
    function displayStateName(type) {
        const stateValue = {
            3: "Đã hủy",
            1: "Approved",
            2: "Updating",
            0: "New",
        };
        return stateValue[type] ? stateValue[type] : "";
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
            <Col md="12">
                <Card className="strpied-tabled-with-hover">
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
                    <Button variant="contained" className="add-major-custom" color="primary" onClick={() => { setserviceModalCreate(true); }}>Thêm thợ mới</Button>
                  </Col>
                </Row>
              </div>
                    <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped">
                            <thead>
                                <tr>
                                    {/* <th className="description">Ảnh</th> */}
                                    <th className="description">Thợ sửa chữa</th>
                                    <th className="description">Số điện thoại </th>
                                    <th className="description">Email</th>
                                    <th className="description">Chuyên Môn</th>
                                    <th className="description">Ngày tạo</th>
                                    <th className="description">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                               
                                    <td>
                                        Đỗ Thành Thái
                                    </td>
                                    <td>
                                        0123456789
                                    </td>
                                    <td>
                                        ThaiDTIrepair@gmail.com
                                    </td>
                                    <td>
                                        Sửa Xe Ô tô
                                    </td>
                                    <td >
                                        20-12-2021
                                    </td >

                                        <TableCell>
                                            <Typography
                                                className={classes.Status}
                                                style={{
                                                    backgroundColor:
                                                        'rgb(34, 176, 34)',
                                                        textAlign: 'center',
                                                        width:'133px'

                                                }}
                                            >Đang hoạt động</Typography>
                                        </TableCell>
                                </tr>
                                <tr>
                               
                                    <td>
                                        Trần Văn Thái
                                    </td>
                                    <td>
                                        0989070145
                                    </td>
                                    <td>
                                        ThaiTVIrepair@gmail.com
                                    </td>
                                    <td>
                                        Sửa Máy Tính
                                    </td>
                                    <td >
                                        20-12-2021

                                    </td >
                                        <TableCell>
                                            <Typography
                                                className={classes.Status}
                                                style={{
                                                    backgroundColor:
                                                        'rgb(34, 176, 34)',
                                                    textAlign: 'center',
                                                    width:'133px'

                                                }}
                                            >Đang hoạt động</Typography>
                                        </TableCell>
                                </tr>
                                <tr>
                               
                                    <td>
                                        Phạm Hữu Nghĩa
                                    </td>
                                    <td>
                                        0123456789
                                    </td>
                                    <td>
                                        NghiaPHIrepair@gmail.com
                                    </td>
                                    <td>
                                        Sửa Điện
                                    </td>
                                    <td >
                                        20-12-2021

                                    </td >

                                        <TableCell>
                                            <Typography
                                                className={classes.Status}
                                                style={{
                                                    backgroundColor:
                                                        'rgb(34, 176, 34)',
                                                        textAlign: 'center',
                                                        width:'133px'

                                                }}
                                            >Đang hoạt động</Typography>
                                        </TableCell>
                                </tr>
                                <tr>
                               
                                    <td>
                                        Phạm Tấn Phát
                                    </td>
                                    <td>
                                        0123456789
                                    </td>
                                    <td>
                                        PhatPTIrepair@gmail.com
                                    </td>
                                    <td>
                                        Sửa Điện Lạnh
                                    </td>
                                    <td >
                                        20-12-2021

                                    </td >

                                        <TableCell>
                                            <Typography
                                                className={classes.Status}
                                                style={{
                                                    backgroundColor:
                                                        'rgb(34, 176, 34)',
                                                        textAlign: 'center',
                                                        width:'133px'

                                                }}
                                            >Đang hoạt động</Typography>
                                        </TableCell>
                                </tr>
                                {/* })} */}
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
                                <PaginationItem Đang hoạt động>
                                    <PaginationLink className="page-Đang hoạt động">
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
            <Modal isOpen={modalEdit} toggle={toggleEdit} centered>
                <ModalHeader
                    style={{ color: "#B22222" }}
                    close={closeBtn(toggleEdit)}
                    toggle={toggleEdit}
                >
                    <ModalTitle>Do you want to edit Customer</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                name="customer_Name"
                                id="customer_Name"
                                placeholder="Name"
                                onChange={customer_Name}
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text"
                                type="text"
                                name="Country"
                                id="Country"
                                placeholder="Country"
                                onChange={address}
                            />
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
                                name="description"
                                id="lastname"
                                onChange={address}
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => { // handleCustomerDetele();

                        setCustomerModalEdit(false);
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
                <ModalBody>Do you want to delete this customer</ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={() => {
                            handleCustomerDetele();
                            setCustomerModalDelete(false);
                        }}
                    >
                        Delete
                    </Button>{" "}
                    <Button color="secondary" onClick={toggleDelete}>
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
          <ModalTitle>Tạo mới thợ sữa chữa</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup className="mb-2">
              <Form.Label>Tên thợ</Form.Label>
              <Form.Control type="text" value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <Form.Label>Chuyên Môn </Form.Label>
            <FormGroup className="mb-2">
              <Autocomplete
                options={myOptions}
                multiple
                style={{ width: 500 }}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lựa chọn lĩnh vực"
                    variant="standard"
               
                  />
                )}
              />
            </FormGroup>
            <FormGroup className="mb-2">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
            </FormGroup>
            <FormGroup className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
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
                            {Selectservice !== undefined ? Selectservice.Name : ""}
                            {/* {setSelectservice !== undefined ? displayMajorName(Selectservice.MajorId) : ""} */}
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col className="view-item-size-main" md={3}> Email:</Col>
                        <Col className="view-item-size" md={8}>
                            {Selectservice !== undefined ? Selectservice.Email : ""}
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col className="view-item-size-main" md={4}> Created Date:</Col>
                        <Col className="view-item-size" md={7}>
                            {Selectservice !== undefined ? Selectservice.CreateDate : ""}

                        </Col>
                    </Row>

                    <Row>
                        <Col></Col>
                        <Col className="view-item-size-main" md={3}> Phone:</Col>
                        <Col className="view-item-size" md={8}>{Selectservice !== undefined ? Selectservice.PhoneNumber : ""}</Col>
                    </Row>
                </ModalBody>
            </Modal>
            
        </>
    );
}

