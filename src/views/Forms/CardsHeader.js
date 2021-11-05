import React, { useState, useEffect } from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import { getWithTokenParams, getWithToken } from "../../service/ReadAPI";

function CardsHeader() {

// useEffect(() => {
//     if (localStorage.getItem("token") === null) {
//       history.push("/");
//     }
// }, "");

const [dashboard, setDashboard] = useState([]);
const [companyListID, setCompanyList] = useState([]);
const [companyListID2, setCompanyList2] = useState([]);
const [serviceList, setServiceList] = useState("");
const [OrderList, setOrderList] = useState("");
const [OrderCancelList, setOrderCancelList] = useState("");
const [OrderCusCancelList, setOrderCusCancelList] = useState("");
const [OrderCompletedList, setOrderComletedlList] = useState("");
const [Customer, setCustomer] = useState([]);
const [TopCustomer, setTopCustomer] = useState([]);
const [MajorFields, setMajorFields] = useState("");
const [Major, setMajor] = useState("");

const [sortedField, setSortedField] = useState("Id");
const [ascending, setAscending] = useState(true);

const [RepairmanList, setRepairmanList] = useState([]);
const [ totalRepairMan, setTotalRepairMan] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);
  const [totalCustomerCancelOrder , settotalCustomerCancelOrder] = useState("");
  const [totalWorkerCanceledOrder, settotalWorkerCanceledOrder] = useState("");
  const [completedOrder , setcompletedOrder ] = useState("");
  const [totalMoney, settotalMoney] = useState("");
  const [topWorkerOfCompletedOrder, setTopWorkerOfCompletedOrder] = useState([]);
  const [topWorkerOfCanceledOrder, setTopWorkerOfCanceledOrder] = useState([]);
  const [topServicesOfCompany, setTopServicesOfCompany] = useState([]);
  


  useEffect(() => {
  
    getWithToken("/api/v1.0/all-count", localStorage.getItem("token")).then(
      (res) => {
        var temp = res.data;
        setTopWorkerOfCanceledOrder(temp.topWorkerOfCanceledOrder);
        setTopWorkerOfCompletedOrder(temp.topWorkerOfCompletedOrder);
        setTopServicesOfCompany(temp.topServicesOfCompany);
        setcompletedOrder(temp.completedOrder);
        settotalCustomerCancelOrder(temp.totalCustomerCancelOrder);
        settotalMoney(temp.totalMoney);
        setTotalOrder(temp.totalOrder);
        setTotalRepairMan(temp.totalRepairMan);
        settotalWorkerCanceledOrder(temp.totalWorkerCanceledOrder);
        // setShowRoyal(res.data.topCustomer[0].fullName);
      });
  }, []);
  console.log("data RP" , RepairmanList)

  function getCompanyList(stateList) {
    let params = {};
    if (stateList && stateList.length > 0)
      params["Status"] = stateList.reduce((f, s) => `${f},${s}`);
    if (sortedField !== null) {

      getWithTokenParams("/api/v1.0/companies", params, localStorage.getItem("token")).then((res) => {
        var temp = res.data.filter((x) => x.state !== "Completed");
        setCompanyList2(temp);      
      }).catch((err) => {
        console.log(err);
      });
    }
  }
// console.log("top 10 cus", TopCustomer)
  return (
    <>
      <div className="header-body-header-a">
        <Container fluid>
          <div className="header-body-header">
            <Row>
              <Col md="4" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Repairman
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                {totalRepairMan} members
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                          <i className="ni ni-active-40" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 
                      </span>{" "}
                      <span className="text-nowrap">Updating</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                            totalOrder
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalOrder}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <i className="ni ni-chart-pie-35" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 
                      </span>{" "}
                      <span className="text-nowrap">Updating</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                        Completed Order
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{completedOrder}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                          <i className="ni ni-money-coins" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 
                      </span>{" "}
                      <span className="text-nowrap">Updating</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                            Revenue
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalMoney} VND</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                          <i className="ni ni-chart-bar-32" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 
                      </span>{" "}
                      <span className="text-nowrap">Updating</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

CardsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default CardsHeader;