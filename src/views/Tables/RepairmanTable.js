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
    OverlayTrigger,
    Tooltip,
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

    const [CustomerDelete, setCustomerDelete] = useState(null);
    const [modalDelete, setCustomerModalDelete] = useState(false);
    const toggleDelete = () => setCustomerModalDelete(!modalDelete);
    //edit
    const [CustomerEdit, setCustomerEdit] = useState(null);
    const [modalEdit, setCustomerModalEdit] = useState(false);
    const toggleEdit = () => setCustomerModalEdit(!modalEdit)

    const [modalCreate, setCustomerModalCreate] = useState(false);
    const toggleCreate = () => setCustomerModalCreate(!modalCreate)

    //view modal
    const [modalStatus, setModalStatus] = useState(false);
    const toggleDetails = () => setModalStatus(!modalStatus);
    const [Selectservice, setSelectservice] = useState();


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

    // useEffect(() => {
    //     getWithToken("/api/v1.0/companies", localStorage.getItem("token")).then(
    //         (res) => {
    //             if (res && res.status === 200) {
    //                 setCompanyListName(res.CompanyName);
    //                 // res.data;
    //             }
    //         });
    // }, []);
    // console.log("aaaaaa", companyListName);

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
                    setUseListCustomerShowPage(temp.slice(numberPage * 10 - 10, numberPage * 10));
                    setTotalNumberPage(Math.ceil(temp.length / 10));
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
        setUseListCustomerShowPage(useListCustomerShow.slice(number * 10 - 10, number * 10));
        setTotalNumberPage(Math.ceil(useListCustomerShow.length / 10));
    }
    // custom state
    function displayStateName(type) {
        const stateValue = {
            2: "Deleted",
            1: "Approved",
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

                    <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover table-striped">
                            <thead>
                                <tr>
                                    <th className="description">Image</th>
                                    <th className="description">Worker</th>
                                    <th className="description">Phone </th>
                                    <th className="description">Email</th>
                                    {/* <th className="description">Username</th> */}
                                    <th className="description">Create Date</th>
                                    <th className="description">FullName</th>
                                    <th className="description">Company</th>
                                    <th className="description">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {useListCustomerShowPage.map((e, index) => {
                                    return (
                                        <tr key={index}>
                                            <td onClick={() => {
                                                setModalStatus(true);
                                                setSelectservice(e);
                                            }}>
                                                <img src={e.Avatar} />
                                            </td>
                                            <TableCell>
                                                <Grid container>

                                                    <Grid item lg={10}>
                                                        <Typography className={classes.name}>{e.Username}</Typography>
                                                        <Typography color="textSecondary" variant="body2">{e.Id}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>

                                            <td onClick={() => {
                                                setModalStatus(true);
                                                setSelectservice(e);
                                            }}>
                                                {e.PhoneNumber}
                                            </td>
                                            <td onClick={() => {
                                                setModalStatus(true);
                                                setSelectservice(e);
                                            }}>
                                                {e.Email}
                                            </td>


                                            <td onClick={() => {
                                                setModalStatus(true);
                                                setSelectservice(e);
                                            }}>{moment(e.CreateDate).format("MM-DD-YYYY")}
                                            </td>
                                            <td onClick={() => {
                                                setModalStatus(true);
                                                setSelectservice(e);
                                            }}>
                                                {e.Name}
                                            </td>
                                            <td onClick={() => {
                                                setModalStatus(true);
                                                setSelectservice(e);
                                            }}>
                                                {displayCompanyName(e.CompanyId)}
                                            </td>

                                            <td>
                                                <TableCell>
                                                    <Typography
                                                        className={classes.Status}
                                                        style={{
                                                            backgroundColor:
                                                                ((e.Status === 1 && 'rgb(34, 176, 34)')
                                                                    ||
                                                                    (e.Status === 2 && 'red')||
                                                                    (e.Status === 0 && 'rgb(50, 102, 100)'))

                                                        }}
                                                    >{displayStateName(e.Status)}</Typography>
                                                </TableCell>
                                            </td>
                                            <td></td>
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

