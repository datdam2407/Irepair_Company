import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
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
import { del, post, get , put} from "../../service/ReadAPI";
import { createLogicalAnd } from "typescript";

function ServiceTables() {
  //delete modal
  // const [ServiceDelete, setServiceDelete] = useState(null);
  // const [modalDelete, setServiceModalDelete] = useState(false);
  // const toggleServiceDelete = () => setServiceModalDelete(!modalDelete);
  //edit modal
  const [ServiceEdit, setServiceEdit] = useState(null);
  // const [modalEdit, setServiceModalEdit] = useState(false);
  // const toggleEdit = () => setServiceModalEdit(!modalEdit);

  //Edit Service
  // const [ServiceEdit, setServiceEdit] = useState(null);
  const [modalEdit, setServiceModalEdit] = useState(false);
  const toggleEdit = () => setServiceModalEdit(!modalEdit);
  //Delete Service
  const [ServiceDelete, setServiceDelete] = useState(null);
  const [modalServiceDelete, setServiceModalDelete] = useState(false);
  const toggleServiceDelete = () => setServiceModalDelete(!modalServiceDelete);
  // undo Service
  const [ServiceUndo, setServiceUndo] = useState(null);
  const [modalServiceUndo, setServiceModalUndo] = useState(false);
  const toggleServiceUndo = () => setServiceModalUndo(!modalServiceUndo);


  //view modal
  const [modalStatus, setModalStatus] = useState(false);
  const toggleDetails = () => setModalStatus(!modalStatus);
  const [selectService, setSelectService] = useState();
  const [selectField, setSelectField] = useState();
  // const [FieldId, setFieldId] = useState("");
  // const [Status, setStatus] = useState("");

  //Service List
  const [useListServiceShow, setUseListServiceShow] = useState([]);
  const [useListServiceStatusShowPage, setUseListServiceStatusShow] = useState(
    []
  );
  const [useListServiceShowPage, setUseListServiceShowPage] = useState([]);
  const [useListServiceShowStatusPage, setUseListServiceShowStatusPage] =
    useState([]);
  const [ServiceList, setServiceList] = useState([]);
  const [ServiceListState, setServiceStatusList] = useState([]);
  const [ServiceListID, setServiceListID] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  const [count, setCount] = useState(1);
  const [Status, setStatus] = useState("");

  const [filterState, setListFilterState] = useState([]);

  // field edit
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setImage] = useState("");
  const [isDeleted, setIsDeleted] = useState("");

  const setData = (data) => {
    console.log("aaaaa", data);
    let { Id } = data;
    localStorage.setItem("serviceID", Id);
  };

  // Load Service by ID
  // useEffect(() => {
  //   getServiceByID();
  //   get(`/Service/get-by-id?id=${ServiceEdit}`).then((res)=>{
  //     setName(res.data.name);
  //     setDescription(res.data.description);
  //     setImage(res.data.picture);
  //     setIsDeleted(res.data.is_Delete);
  //   });
  // }, []);
  // function getServiceByID(){
  //   get(`/Service/get-by-id?id=${ServiceEdit}`).then((res)=>{

  //     setName(res.data.name);
  //     setDescription(res.data.description);
  //     setImage(res.data.picture);
  //     setIsDeleted(res.data.is_Delete);
  //   }).catch((err)=>{
  //     console.log(err);
  //   });
  // }

  //delete fc
  function deleteServiceByID() {
    del(`/api/v1.0/service/${ServiceDelete}`)
      .then((res) => {
        if (res.status === 200) {
          window.location = "/admin/service";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //reverse
  function ReverseByID() {
    del(`/api/v1.0/service/${ServiceUndo}`)
      .then((res) => {
        if (res.status === 200 && res.data.Status == "3") {
          setStatus("3");
          console.log(Status)
          window.location = "/admin/service";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Load Service
  useEffect(() => {
    getServiceList();
    displayFIeldName();
    displayStateName();
    get("​/api​/v1.0​/company​").then((res) => {
      if (res && res.status === 200) {
        setListFilterState(res.data);
      }
    });
    get("/api​/v1.0​/major_field​").then((res) => {
      if (res && res.status === 200) {
        setListFilterState(res.data);
      }
    });
  }, []);
  //6aeac270-3ce6-4693-b9af-07e8575e72e6

  function getServiceList() {
    get("​/api/v1.0/service")
      .then((res) => {
        var temp = res.data;
        // setName(temp.name);
        // setDescription(temp.description);
        // setImage(temp.picture);
        // setIsDeleted(temp.is_Delete);
        setServiceList(temp);
        setUseListServiceShow(temp);
        setUseListServiceShowPage(
          temp.slice(numberPage * 5 - 5, numberPage * 5)
        );
        setTotalNumberPage(Math.ceil(temp.length / 5));
        setCount(count);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListServiceShowPage(
      useListServiceShow.slice(number * 5 - 5, number * 5)
    );
    setTotalNumberPage(Math.ceil(useListServiceShow.length / 5));
  }
  // Delete Fc
  // function handleServiceDetele() {
  //   del("​/api​/v1.0​/service​/delete-by-id" + ServiceDelete.serviceId, localStorage.getItem("token"))
  //     .then((res) => {
  //       if (res.status === 200 || res.status === 202) {
  //         // var temp;
  //         // temp = useList.filter((x) => x.repairmanId !== ServiceDelete.repairmanId);
  //         // setUseListShow(temp);
  //         // setUseListShowPage(temp.slice(numberPage * 5 - 5, numberPage * 5));
  //         // setTotalNumberPage(Math.ceil(temp.length / 5));
  //       }
  //     })
  //     .catch((err) => {
  //       setErrorMessage(err.response.data.message);
  //       setModalConfirm(true);
  //     });
  // }
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
      2: "Delete",
      3: "Updating",
    };
    return stateValue[type] ? stateValue[type] : "";
  }
  // Custome fieldID tạm thời
  function displayFIeldName(type) {
    const nameValue = {
      "6cf49d92-03f7-4b27-852c-09255e380fcc": "Két sắt",
      "813a4c08-fa29-48bb-9d76-0beaa4d133f8": "Xe đạp điện",
      "82ab0ec7-8341-4faa-a342-2b5b407f5ee4": "Máy lạnh",
      "8d55b787-eb63-4bf6-b60c-0c1de5595f37": "Tủ đông",
      "458dcfdd-d1e1-43cf-9276-176574447f61": "Xe ô tô máy xăng",
      "b65f8d53-c476-4474-9b45-268ea039ecbf": "Xe ô tô máy điện",
      "0f3bdcd5-ac67-4c34-bd70-51fe26b9b2af": "Máy giặt",
    };
    return nameValue[type] ? nameValue[type] : "";
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card className="table-with-links">
              <Card.Header>
                <Card.Title as="h4">Table with Service</Card.Title>
                <Link to="/admin/create/Service">Create new Service</Link>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table>
                  <thead>
                    <tr>
                      {/* <th className="text-center">#</th> */}
                      {/* <th>CompanyId</th> */}
                      {/* <th>Name</th> */}
                      <th>ServiceName</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>ImageUrl</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListServiceShowPage.map((e, index) => {
                      if (e.Status != "2") {
                        return (
                          <tr key={index}>
                            {/* <td>
                            {e.CompanyName}
                          </td> */}
                            {/* <td>{displayFIeldName(e.FieldId)}</td> */}
                            <td>{e.ServiceName}</td>
                            <td>{e.ServiceName}</td>
                            <td>{e.Description}</td>
                            <td>{e.Price}</td>
                            <td>{e.ImageUrl}</td>
                            <td>{displayStateName(e.Status)}</td>
                            <td className="td-actions text-right">
                              <OverlayTrigger
                                onClick={(e) => e.preventDefault()}
                                overlay={
                                  <Tooltip id="tooltip-150479227">
                                    View Profile..
                                  </Tooltip>
                                }
                              >
                                <Button
                                  onClick={() => {
                                    setModalStatus(true);
                                    setSelectService(e);
                                  }}
                                  variant="info"
                                  size="sm"
                                  className="text-info btn-link like"
                                >
                                  <i className="fa fa-heart" />
                                </Button>
                              </OverlayTrigger>
                              <OverlayTrigger
                                overlay={
                                  <Tooltip id="tooltip-292560270">
                                    Edit Profile..
                                  </Tooltip>
                                }
                              >
                                <Link
                                  to="/admin/update"
                                  onClick={() => setData(e)}
                                  className="btn-link btn-xs"
                                  variant="success"
                                >
                                  <i className="fas fa-edit"></i>
                                </Link>
                              </OverlayTrigger>
                              <OverlayTrigger
                                onClick={(e) => e.preventDefault()}
                                overlay={
                                  <Tooltip id="tooltip-410038576">
                                    Remove..
                                  </Tooltip>
                                }
                              >
                                <Button
                                  className="btn-link btn-xs"
                                  onClick={() => {
                                    setServiceDelete(e.Id);
                                    setServiceModalDelete(true);
                                  }}
                                  variant="danger"
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        );
                      }
                    })}
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

          <Col md="4">
            <Card className="table-with-switches">
              <Card.Header>
                <Card.Title as="h4">Old Service</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-striped">
                  <thead>
                    <tr>
                      {/* <th className="text-center">#</th> */}
                      {/* <th>CompanyId</th> */}
                      {/* <th>FieldId</th> */}
                      <th>ServiceName</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>ImageUrl</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useListServiceShowPage.map((e, index) => {
                      if (e.Status == "2") {
                        return (
                          /* load all status not avaliable*/
                          <tr key={index}>
                            {/* <td>
                            {e.CompanyName}
                          </td>
                          <td>
                            {e.Name}
                          </td> */}
                            <td>{e.ServiceName}</td>
                            <td>{e.Description}</td>
                            <td>{e.Price}</td>
                            <td>{e.ImageUrl}</td>
                            <td className="td-actions text-right">
                              <OverlayTrigger
                                onClick={(e) => e.preventDefault()}
                                overlay={
                                  <Tooltip id="tooltip-150479227">
                                    View Profile..
                                  </Tooltip>
                                }
                              >
                                <Button
                                  onClick={() => {
                                    setModalStatus(true);
                                    setSelectService(e);
                                  }}
                                  variant="info"
                                  size="sm"
                                  className="text-info btn-link like"
                                >
                                  <i className="fa fa-heart" />
                                </Button>
                              </OverlayTrigger>

                              <OverlayTrigger
                                onClick={(e) => e.preventDefault()}
                                overlay={
                                  <Tooltip id="tooltip-410038576">
                                    Remove..
                                  </Tooltip>
                                }
                              >
                                <Button
                                  className="btn-link btn-xs"
                                  onClick={() => {
                                    setServiceUndo(e.Id);
                                    setStatus(e.Status);
                                    setServiceModalUndo(true);
                                  }}
                                  variant="danger"
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="table-big-boy">
              <Card.Header>
                <Card.Title as="h4">Hot Service</Card.Title>
                <p className="card-category">A table for the best rating</p>
                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table className="table-bigboy">
                  <thead>
                    <tr>
                      <th className="text-center">Topic</th>
                      <th>Service Title</th>
                      <th className="th-description">Description</th>
                      <th className="text-right">Date</th>
                      <th className="text-right">Views</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-1.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        10 Things that all designers do
                      </td>
                      <td>
                        Most beautiful agenda for the office, really nice paper
                        and black cover. Most beautiful agenda for the office.
                      </td>
                      <td className="td-number">30/08/2016</td>
                      <td className="td-number">1,225</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-618009180">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-461494662">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                            onClick={() => {
                              setServiceDelete();
                              setServiceModalDelete(true);
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-882041852">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="danger"
                            onClick={() => {
                              setServiceDelete();
                              setServiceModalDelete(true);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-2.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">Back to School Offer</td>
                      <td>
                        Design is not just what it looks like and feels like.
                        Design is how it works.
                      </td>
                      <td className="td-number">17/07/2016</td>
                      <td className="td-number">49,302</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-65578954">View Post..</Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-38536367">Edit Post..</Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-220404926">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
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
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-3.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        First Dribbble Meetup in Romania
                      </td>
                      <td>
                        A groundbreaking Retina display. All-flash architecture.
                        Fourth-generation Intel processors.
                      </td>
                      <td className="td-number">23/06/2016</td>
                      <td className="td-number">1,799</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-793736265">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-10365564">Edit Post..</Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-882041852">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
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
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-4.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        How we created our startup with 0$
                      </td>
                      <td>
                        A desk is a generally wooded piece of furniture and a
                        type of useful table often used in a school or office
                        setting for various academic or professional activities
                        ...
                      </td>
                      <td className="td-number">30/06/2016</td>
                      <td className="td-number">23,030</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-662605277">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="info"
                          >
                            <i className="far fa-image"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-967132803">
                              Edit Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-972344635">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
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
                      <td>
                        <div className="img-container">
                          <img
                            alt="..."
                            src={require("assets/img/blog-1.jpg").default}
                          ></img>
                        </div>
                      </td>
                      <td className="td-name">
                        To use or not to use Bootstrap
                      </td>
                      <td>
                        The Office Chair adapts naturally to virtually every
                        body and is a permanent fixture.
                      </td>
                      <td className="td-number">10/05/2016</td>
                      <td className="td-number">13,763</td>
                      <td className="td-actions">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-960683717">
                              View Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
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
                          placement="left"
                        >
                          <Button
                            className="btn-link btn-icon"
                            type="button"
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-334669391">
                              Remove Post..
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <Button
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modalServiceUndo} toggle={toggleServiceUndo}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleServiceUndo)}
          toggle={toggleServiceUndo}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to reverse this Service</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              ReverseByID();
              setServiceModalUndo(false);
            }}
          >
            Reverse
          </Button>{" "}
          <Button color="secondary" onClick={toggleServiceUndo}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalServiceDelete} toggle={toggleServiceDelete}>
        <ModalHeader
          style={{ color: "#B22222" }}
          close={closeBtn(toggleServiceDelete)}
          toggle={toggleServiceDelete}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Do you want to delete this Service</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              deleteServiceByID();
              setServiceModalDelete(false);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleServiceDelete}>
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
          <ModalTitle>Do you want to edit Service ?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Service name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Service name"
                defaultValue={name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                as="textarea"
                defaultValue={description}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="file" defaultValue={picture} />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              // handleServiceDetele();
              setServiceModalEdit(false);
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
          Detailed Service Information
        </ModalHeader>
        <ModalBody>
          {/* <Row>
            <Col></Col>
            <Col md={3}>Field</Col>
            <Col md={8}>
              {selectService !== undefined} ?{" "}
              {displayFIeldName(selectService.FieldId)} : {""}
            </Col>
          </Row> */}
          <Row>
            <Col></Col>
            <Col md={3}> Service</Col>
            <Col md={8}>
              {selectService !== undefined ? selectService.ServiceName : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Description</Col>
            <Col md={8}>
              {selectService !== undefined ? selectService.Description : ""}
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md={3}>Price</Col>
            <Col md={8}>
              {selectService !== undefined ? selectService.Price : ""} $
            </Col>
          </Row>
          <Row>
            {/* <Col></Col>
            <Col md={3}>Status</Col>

            <Col md={8}>
              {selectService !== undefined} ?{" "}
              {displayStateName(selectService.Status)} : {""}
            </Col> */}
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ServiceTables;
