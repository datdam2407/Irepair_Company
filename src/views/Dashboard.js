import React from "react";
// react component used to create charts
// react components used to create a SVG / Vector map
import { VectorMap } from "react-jvectormap";
import {
  UncontrolledCarousel,
} from "reactstrap";
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
                      <p className="card-category">Number</p>
                      <Card.Title as="h4">150GB</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
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
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
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
                      <p className="card-category">Errors</p>
                      <Card.Title as="h4">23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
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
                      <p className="card-category">Followers</p>
                      <Card.Title as="h4">+45K</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Top Company</Card.Title>
                <p className="card-category">All products that were repaired</p>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Table responsive>
                      <tbody>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/US.png").default}
                              ></img>
                            </div>
                          </td>
                          <td>USA</td>
                          <td className="text-right">50</td>
                          <td className="text-right">53.23%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/DE.png").default}
                              ></img>
                            </div>
                          </td>
                          <td>Germany</td>
                          <td className="text-right">1.300</td>
                          <td className="text-right">20.43%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/AU.png").default}
                              ></img>
                            </div>
                          </td>
                          <td>Australia</td>
                          <td className="text-right">760</td>
                          <td className="text-right">10.35%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/GB.png").default}
                              ></img>
                            </div>
                          </td>
                          <td>United Kingdom</td>
                          <td className="text-right">690</td>
                          <td className="text-right">7.87%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/RO.png").default}
                              ></img>
                            </div>
                          </td>
                          <td>Romania</td>
                          <td className="text-right">600</td>
                          <td className="text-right">5.94%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                alt="..."
                                src={require("assets/img/flags/BR.png").default}
                              ></img>
                            </div>
                          </td>
                          <td>Brasil</td>
                          <td className="text-right">550</td>
                          <td className="text-right">4.34%</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col className="ml-auto mr-auto" md="6">
                    <VectorMap
                      map={"world_mill"}
                      backgroundColor="transparent"
                      zoomOnScroll={false}
                      containerStyle={{
                        width: "100%",
                        height: "300px",
                      }}
                      containerClassName="map"
                      regionStyle={{
                        initial: {
                          fill: "#e4e4e4",
                          "fill-opacity": 0.9,
                          stroke: "none",
                          "stroke-width": 0,
                          "stroke-opacity": 0,
                        },
                      }}
                      series={{
                        regions: [
                          {
                            values: {
                              VN: 1300,
                              BR: 550,
                              CA: 120,
                              DE: 1300,
                              FR: 540,
                              GB: 690,
                              GE: 200,
                              IN: 200,
                              RO: 600,
                              RU: 2,
                              US: 1,
                            },
                            scale: ["#AAAAAA", "#444444"],
                            normalizeFunction: "polynomial",
                          },
                        ],
                      }}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col md="5">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Hot Service</Card.Title>
                <p className="card-category">All products including Taxes</p>
                <Card.Body>
              <UncontrolledCarousel
                items={carouselItems}
                indicators={false}
                autoPlay={false}
              />
              </Card.Body>
              </Card.Header>               
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="7">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Covid News</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
              <UncontrolledCarousel
                items={covid19Items}
                indicators={false}
                autoPlay={false}
              />
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        
      </Container>
    </>
  );
}

export default Dashboard;
