import React, { useState, useEffect } from "react";
// react component used to create charts
// react components used to create a SVG / Vector map
import { VectorMap } from "react-jvectormap";
import {
  UncontrolledCarousel,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  OverlayTrigger,
  Table,
  Tooltip,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Dashboard() {
  const [numberPage, setNumberPage] = useState(1);

  const [sortedField, setSortedField] = useState("Id");
  const [ascending, setAscending] = useState(true);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  const carouselItems = [
    {
      src: require("assets/img/abc.jpeg").default,
      altText: "Slide 1",
      caption: "",
    },
    {
      src: require("assets/img/Plumber.jpg").default,
      altText: "Slide 2",
      caption: "",
    },
    {
      src: require("assets/img/Electric .jpg").default,
      altText: "Slide 3",
      caption: "",
    },
  ];
  function onClickPage(number) {
    setNumberPage(number);
    setUseListCustomerShowPage(useListCustomerShow.slice(number * 1 - 1, number * 1));
    setTotalNumberPage(Math.ceil(useListCustomerShow.length / 1));
  }
  const covid19Items = [
    {
      src: require("assets/img/covid1.jpg").default,
      altText: "Slide 1",
      caption: "",
    },
    {
      src: require("assets/img/covid2.jpg").default,
      altText: "Slide 2",
      caption: "",
    },
    {
      src: require("assets/img/covid3.jpg").default,
      altText: "Slide 3",
      caption: "",
    },
    {
      src: require("assets/img/covid4.jpg").default,
      altText: "Slide 4",
      caption: "",
    },
  ];

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Tổng đơn đã nhận</p>
                      <Card.Title as="h4">104</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Doanh thu</p>
                      <Card.Title as="h4">17,750,000 đ</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Tổng đơn đã hủy</p>
                      <Card.Title as="h4">23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
               
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Số người đăng ký app</p>
                      <Card.Title as="h4">45</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
             
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
           
              <Card.Body>
                <Row>
<Col className="ml-auto mr-auto" md="6">
                    <Card.Title as="h2" style={{
                      marginLeft: '15px',
                      color:
                        'rgb(27 129 255)',
                      fontWeight: '700'
                    }}>Đơn hàng gần đây</Card.Title>
                    <Table responsive>
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
                        Vấn đề cần sửa{" "}
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
                      <th  className="description">Trạng thái</th>
                      <tbody>
                        <tr>
                          <td>
                            Phạm Hữu Nghĩa
                          </td>
                          <td >
                            Nguyễn Quốc Thịnh
                          </td>
                          <td>
                            Nghẹt ống cống nhà tắm
                          </td>
                          <td>
                            400,000 đ
                          </td>
                          <td style={{
                            color:
                              'green',
                            fontWeight: '700'
                          }}>
                            Đã thanh toán
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Trần Văn Thái
                          </td>
                          <td >
                          Nguyễn Minh Hoàng
                          </td>
                          <td>
                            Hư loa máy tính
                          </td>
                          <td>
                            750,000 đ
                          </td>
                          <td style={{
                            color:
                              'green',
                            fontWeight: '700'
                          }}>
                            Đã thanh toán
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Phạm Hữu Nghĩa
                          </td>
                          <td >
                          Nguyễn Quốc Thịnh
                          </td>
                          <td>
                            Thay mới bóng đèn(2 cái)
                          </td>
                          <td>
                            240,000 đ
                          </td>
                          <td style={{
                            color:
                              'green',
                            fontWeight: '700'
                          }}>
                            Đã thanh toán
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Phạm Tấn Phát
                          </td>
                          <td >
                          Nguyễn Hoàng
                          </td>
                          <td>
                            Tủ lạnh không lạnh, lạnh yếu
                          </td>
                          <td>
                            350,000 đ
                          </td>
                          <td style={{
                            color:
                              'green',
                            fontWeight: '700'
                          }}>
                            Đã thanh toán
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Nguyễn Tấn Phát
                          </td>
                          <td >
                          Nguyễn Hoàng
                          </td>
                          <td>
                            Máy lạnh không lạnh
                          </td>
                          <td>
                            550,000 đ
                          </td>
                          <td style={{
                            color:
                              'green',
                            fontWeight: '700'
                          }}>
                            Đã thanh toán
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <Pagination
                      aria-label="Page navigation example"
                      className="page-right"
                      style={{
                        paddingLeft: '250px'
                      }}
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
                  
                  <Col className="ml-auto mr-auto" md="6">
                    <Card.Title as="h2" style={{
                      marginLeft: '15px',
                      color:
                        'rgb(27 129 255)',
                      fontWeight: '700'
                    }}>Khách hàng thân thiết</Card.Title>
                    <Table responsive>
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
                        Số lần đặt đơn{" "}
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
                       Ngày đặt gần đây{" "}
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
                      <tbody>
                        <tr>
                          <td >
                          Nguyễn Quốc Thịnh
                          </td>
                          <td>
                            40 lần
                          </td>
                          <td style={{
                            color:
                              'green',
                            fontWeight: '700'
                          }}>
                            15-10-2021
                          </td>
                        </tr>
                        <tr>
                          <td>
                            	
Nguyễn Tiến Long
                          </td>
                          <td>
                            23 lần
                          </td>

                          <td style={{
                            color:
                              'green',
                            fontWeight: '700'
                          }}>
                            25-10-2021
                          </td>
                        </tr>
                        <tr>
                          <td>
                          Nguyễn Minh Hoàng
                          </td>

                          <td>
                            12 lần
                          </td>

                          <td style={{
                            color:
                              'green',
                            fontWeight: '700'
                          }}>
                            11-09-2021
                          </td>
                        </tr>
                        <tr>
                          <td>
                          Nguyễn Lê Thuần
                          </td>
                          <td >
                            11 lần
                          </td>
                          <td style={{
                            color:
                              'green',
                            fontWeight: '700'
                          }}>
                            11-10-2021
                          </td>
                        </tr>
                        <tr>
                          <td>
                          Nguyễn Thái Bảo
                          </td>
                          <td >
                            7 lần
                          </td>
                          <td style={{
                            color:
                              'green',
                            fontWeight: '700'
                          }}>
                            11-10-2021
                          </td>
                        </tr>
                        {/* <tr>
                          <td>
                          Nguyễn Hoàng
                          </td>
                          <td >
                            5 lần
                          </td>
                          <td style={{
                            color:
                              'green',
                            fontWeight: '700'
                          }}>
                            15-9-2021
                          </td>
                        </tr> */}
                      </tbody>
                    </Table>
                    <Pagination
                      style={{
                        paddingLeft: '250px'
                      }}
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

                      <PaginationItem

                        disabled={numberPage === totalNumberPage}>
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
    </>
  );
}

export default Dashboard;
