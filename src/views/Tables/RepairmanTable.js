import React, { useState, useEffect } from "react";
import { IconName, TiStar, TiLockClosed } from "react-icons/ti";

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
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Dropdown,
    InputGroup,
    DropdownToggle,
    DropdownMenu,
    InputGroupButtonDropdown,
    Input,
    FormGroup,
} from "reactstrap";
import moment from "moment";
import {
    TableCell,
    Grid,
    Typography,
} from '@material-ui/core';
import { del, put, get, getWithParams, getWithToken, getWithTokenParams, putWithToken, postWithToken, postWithTokenParams } from "../../service/ReadAPI";
import { makeStyles } from '@material-ui/core/styles';
import FilterState from "../Forms/FilterState"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faCaretDown,
    faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
export default function Repairman() {

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

    function checkDisableImage(state) {
        if (state == null)
            return false;
        else return true;
    }
    async function handleRepairmanDetele() {
        await del(
            `/api/v1.0/repairmans?id=${RepairmanDelete}`, localStorage.getItem("token")
        )
            .then((res) => {
                if (res.status === 200) {
                    window.location = "/company/repairman";
                }
            })
    }
    async function handleSubmitCreate(e) {
        await postWithToken(
            `/api/v1.0/repairmans`,
            {
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
 
    async function handleEditSubmit2(e) {
        await putWithToken(
            `/api/v1.0/repairmans`,
            {
                id: repairmanID,
                avatar: avatar,
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                username: username,
                workStatus: 0,
                rating: 0,
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
    //load repairman
    useEffect(() => {
        getWithToken("/api/v1.0/repairmans", localStorage.getItem("token")).then(
            (res) => {
                if (res && res.status === 200) {
                    var temp = res.data;
                    setRepairmanList(res.data.RepairmanId)
                    setRepairmanList(temp);
                    setUseListRepairmanShow(temp);
                    setUseListRepairmanShowPage(temp.slice(numberPage * 5 - 5, numberPage * 5));
                    setTotalNumberPage(Math.ceil(temp.length / 5));
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
                setUseListRepairmanShowPage(temp2.slice(numberPage * 5 - 5, numberPage * 5));
                setTotalNumberPage(Math.ceil(temp2.length / 5));
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
            color: '#e86a10f7',
            width: '194px',
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
        setUseListRepairmanShowPage(useListRepairmanShow.slice(number * 5 - 5, number * 5));
        setTotalNumberPage(Math.ceil(useListRepairmanShow.length / 5));
    }
    // custom state
    function displayStateName(type) {
        const stateValue = {
            3: "Deleted",
            1: "Approved",
            0: "New",
            2: "Updating",
            "7e179e62-21da-45c1-afe4-114a580f0a12": "Công ty điện lạnh Long Châu",
      "404f25c6-4f40-4f83-acfd-16a0d7c2f8e9": "Công ty điện lạnh, điện gia dụng Thủy Tiên",
      "4bb0a83e-e9d9-47b5-8019-20c19e953181": "Công ty điện lạnh Hòa Hưng",
      "dd0b937a-8e90-4af3-bfe8-0a8cc0722f6a": "IrepairX",
      "17ab8695-daec-4ceb-9f78-07c9528c0009": "CompanyX",
      "234be13b-421b-40d9-8226-0f162dee7ac8": "Công ty điện lạnh Thành Công",
      "e427ae66-4f89-47c9-8032-0cca6577b28f": "Cty sửa chữa xe máy PHÁT THÀNH VINH 10",
      "0e9ceddf-9796-478a-87fc-132567a68116": "Tiệm Sửa Xe Đinh Thành",
      "a9f6fc01-3033-4b57-93eb-13fbc04d4e42": "Tiệm Sửa Xe Trường",
      "4bb0a83e-e9d9-47b5-8019-20c19e953181": "Công ty điện lạnh Hòa Hưng",
      "e5260446-f254-4d8c-a2a8-366748f11068": "Tiệm Sửa Xe Khoa Tay Ga",
      "99e14380-7924-4522-91d5-69533f247258": "Tiệm Sửa Xe Thanh Long",
      "473274b9-8345-4d0d-b765-87daf43a9bf7": "Sửa xe Tuấn 195 Bạch Đằng",
      "033c9453-18a7-4066-b40e-923f685071ae": "Tiệm Sửa Xe Thành Trung",
      "2e0a4a57-7ff9-4f0c-859e-9c6ef6228ca2": "Trung Tâm Kĩ Thuật Xe Máy Hải Dương",
      "b7153746-4f68-47fb-83e5-e5f1ecbed192": "Sửa xe máy Hoài Thu",
      "c2dc1cf0-24c1-4e52-9504-f1dad032f6e9": "Sửa xe Đinh Nguyễn 77",
        };
        return stateValue[type] ? stateValue[type] : "";
    }
    function displayStateWorking(type) {
        const stateValue = {
            1: "Busy",
            0: "Free",
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
                        setUseListRepairmanShowPage(temp2.slice(numberPage * 5 - 5, numberPage * 5));
                        setTotalNumberPage(Math.ceil(temp2.length / 5));
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
                                                    if (sortedField === "username" && ascending) {
                                                        setSortedField("username");
                                                        setAscending(false);
                                                        sort("username", false, useListRepairmanShowPage);
                                                    } else {
                                                        setSortedField("username");
                                                        setAscending(true);
                                                        sort("username", true, useListRepairmanShowPage);
                                                    }
                                                }}
                                            >
                                                Image{" "}
                                                {sortedField === "username" ? (
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
                                                    if (sortedField === "id" && ascending) {
                                                        setSortedField("id");
                                                        setAscending(false);
                                                        sort("id", false, useListRepairmanShowPage);
                                                    } else {
                                                        setSortedField("id");
                                                        setAscending(true);
                                                        sort("id", true, useListRepairmanShowPage);
                                                    }
                                                }}
                                            >
                                                Repairman{" "}
                                                {sortedField === "id" ? (
                                                    ascending === true ? (
                                                        <FontAwesomeIcon icon={faCaretUp} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faCaretDown} />
                                                    )
                                                ) : (
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                )}
                                            </th>
                                            <th className="description">Phone </th>
                                            <th
                                                className="description"
                                                onClick={() => {
                                                    if (sortedField === "email" && ascending) {
                                                        setSortedField("email");
                                                        setAscending(false);
                                                        sort("email", false, useListRepairmanShowPage);
                                                    } else {
                                                        setSortedField("email");
                                                        setAscending(true);
                                                        sort("email", true, useListRepairmanShowPage);
                                                    }
                                                }}
                                            >
                                                Email{" "}
                                                {sortedField === "email" ? (
                                                    ascending === true ? (
                                                        <FontAwesomeIcon icon={faCaretUp} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faCaretDown} />
                                                    )
                                                ) : (
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                )}
                                            </th>

                                            {/* <th className="description">Username</th> */}
                                            <th className="description">Company</th>
                                            <th
                                                className="description"
                                                onClick={() => {
                                                    if (sortedField === "lastRequest" && ascending) {
                                                        setSortedField("name");
                                                        setAscending(false);
                                                        sort("name", false, useListRepairmanShowPage);
                                                    } else {
                                                        setSortedField("name");
                                                        setAscending(true);
                                                        sort("name", true, useListRepairmanShowPage);
                                                    }
                                                }}
                                            >
                                                Full Name{" "}
                                                {sortedField === "name" ? (
                                                    ascending === true ? (
                                                        <FontAwesomeIcon icon={faCaretUp} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faCaretDown} />
                                                    )
                                                ) : (
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                )}
                                            </th>
                                            <th className="description">Stars</th>
                                            <th className="description">Working</th>
                                            <th className="description">Status</th>
                                            <th className="viewAll">Actions</th>
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
                                                        <img className="avatar-repairman" src={e.avatar} />
                                                    </td>
                                                    <TableCell>
                                                        <Grid container>

                                                            <Grid item lg={10}>
                                                                <Typography className={classes.name}>{e.username}</Typography>
                                                                <Typography color="textSecondary" variant="body2">{e.id}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>

                                                    <td onClick={() => {
                                                        setModalStatus(true);
                                                        setSelectRepairman(e);
                                                    }}>
                                                        {e.phoneNumber}
                                                    </td>
                                                    <td onClick={() => {
                                                        setModalStatus(true);
                                                        setSelectRepairman(e);
                                                    }}>
                                                        {e.email}
                                                    </td>
                                                    <td onClick={() => {
                                                        setModalStatus(true);
                                                        setSelectRepairman(e);
                                                    }}>{displayStateName(e.companyId)}
                                                    </td>
                                                    <td onClick={() => {
                                                        setModalStatus(true);
                                                        setSelectRepairman(e);
                                                    }}>
                                                        {e.name}
                                                    </td>
                                                    {checkDisableImage(e.rating) ?
                                                        <td className="point-customer">
                                                            {e.rating}  <TiStar />
                                                        </td> : (

                                                            <td>
                                                            </td>
                                                        )}
                                                    <td> 
                                                    {displayStateWorking(e.workStatus)}
                                                    </td>

                                                    <TableCell>
                                                        <Typography
                                                            className={classes.Status}
                                                            style={{
                                                                backgroundColor:
                                                                    ((e.status === 1 && 'rgb(34, 176, 34)')
                                                                        ||
                                                                        (e.status === 3 && 'red') ||
                                                                        (e.status === 2 && 'black') ||
                                                                        (e.status === 0 && 'rgb(50, 102, 100)'))

                                                            }}
                                                        >{displayStateName(e.status)}</Typography>
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
                                                                        getRepairmanID(e.id)                                                                // setSelectRepairman(e);
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
                                                                        setRepairmanDelete(e.id);
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
                    style={{ color: "#1d98e0f7" }}
                >
                    Are you sure?
                </ModalHeader>
                <ModalBody>Do you want to delete this repairman</ModalBody>
                <ModalFooter style={{ justifyContent: 'space-around'}}>
                <Button className="cancel-button" onClick={toggleDelete}>
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => {
                            handleRepairmanDetele();
                            setRepairmanModalDelete(false);
                        }}
                    >
                        Delete
                    </Button>{" "}
                   
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
                            {SelectRepairman !== undefined ? SelectRepairman.name : ""}
                            {/* {setSelectRepairman !== undefined ? displayMajorName(SelectRepairman.MajorId) : ""} */}
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col className="view-item-size-main" md={3}>Company:</Col>
                        <Col className="view-item-size" md={8}>{SelectRepairman !== undefined ? displayStateName(SelectRepairman.companyId) : ""}</Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col className="view-item-size-main" md={3}> Email:</Col>
                        <Col className="view-item-size" md={8}>
                            {SelectRepairman !== undefined ? SelectRepairman.email : ""}
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col className="view-item-size-main" md={3}> UserName:</Col>
                        <Col className="view-item-size" md={8}>
                            {SelectRepairman !== undefined ? SelectRepairman.username : ""}
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col className="view-item-size-main" md={3}> Phone:</Col>
                        <Col className="view-item-size" md={8}>{SelectRepairman !== undefined ? SelectRepairman.phoneNumber : ""}</Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col className="view-item-size-main" md={3}>Status:</Col>
                        <Col className="view-item-size" md={8}>{SelectRepairman !== undefined ? displayStateName(SelectRepairman.status) : ""}</Col>
                    </Row>
                </ModalBody>
            </Modal>


            <Modal isOpen={modalApprove} toggle={toggleApprove} centered size="lg" >
                <ModalHeader
                    style={{ color: "#1d98e0f7" }}>
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
                <ModalFooter style={{ justifyContent: 'space-around'}}>
                <Button className="cancel-button" onClick={() => { cancelRepairmanByID(); }}>
                        Cancel
                    </Button>
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
                  
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalCreate} toggle={toggleCreate} centered size="lg" >
                <ModalHeader
                    style={{ color: "#1d98e0f7" }}>
                    <ModalTitle>Do you want to create new repairman ?</ModalTitle>
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
                                        <img src={avatar} style={{ width: '300px' }} />
                                    )}
                                </Form.Group>
                            </Grid>
                        </Grid>
                    </Form>
                </ModalBody>
                <ModalFooter style={{ justifyContent: 'space-around'}}>
                <Button className="cancel-button" onClick={() => { toggleCreate(); }}>
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => {
                            // handleServiceDetele();
                            handleSubmitCreate();
                            setRepairmanModalCreate(false);
                        }}
                    >
                        Save
                    </Button>
                  
                </ModalFooter>
            </Modal>

        </>
    );
}

