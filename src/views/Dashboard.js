import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
import { useHistory } from "react-router-dom";
// import ImageUpload from "./Upload/ImageUpload.js";
// javascipt plugin for creating charts
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  Form,
  ModalTitle,
  Tooltip,
} from "react-bootstrap";
import firebase from "firebase";
import "firebase/storage";
import 'firebase/firestore';
import {
  Avatar,
} from '@material-ui/core';
// core components
import NumberFormat from 'react-number-format';
import CardsHeader from "../views/Forms/CardsHeader.js";
import "../assets/css/customSizeCompany.css";
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts.js";
import { getWithToken, postWithToken } from "../service/ReadAPI";
export default function Dashboard() {
  const [dataBase, setDataBase] = useState([]);
  const [loadDataBase, setLoadDatabase] = useState(true);

  const [modalCreate, setTipsModalCreate] = useState(false);
  const toggleCreate = () => setTipsModalCreate(!modalCreate)

  const [tips, setTips] = useState([]);
  const [UseListCustomerShowPage, setUseListCustomerShowPage] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [totalNumberPage, setTotalNumberPage] = useState(1);
  const [ShowRoyalName, setShowRoyal] = useState([]);


  const [RepairmanList, setRepairmanList] = useState([]);
  const [totalRepairMan, setTotalRepairMan] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);
  const [totalCustomerCancelOrder, settotalCustomerCancelOrder] = useState("");
  const [totalWorkerCanceledOrder, settotalWorkerCanceledOrder] = useState("");
  const [completedOrder, setcompletedOrder] = useState("");
  const [customersUsesCompanyService, setcustomersUsesCompanyService] = useState("");
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
        setcustomersUsesCompanyService(temp.customersUsesCompanyService);
   
        var totalCanceled = 0;
        temp.topWorkerOfCanceledOrder.map((e, index) =>{
            totalCanceled  +=  e.canceledOrder;
          })
          console.log(totalCanceled);

          localStorage.setItem("totalCanceled", totalCanceled);
       
        var totalCompleted = 0;
        temp.topWorkerOfCompletedOrder.map((e, index) =>{
          totalCompleted  +=  e.completedOrder;
          })
          console.log(totalCompleted);

          localStorage.setItem("totalComplete", totalCompleted);
       
          settotalMoney(temp.totalMoney);
        setTotalOrder(temp.totalOrder);
        setTotalRepairMan(temp.totalRepairMan);
        settotalWorkerCanceledOrder(temp.totalWorkerCanceledOrder);
        // setShowRoyal(res.data.topCustomer[0].fullName);
      });
  }, []);
  //Paging
  function onClickPage(number) {
    setNumberPage(number);
    setUseListCustomerShowPage(useListCustomerShow.slice(number * 10 - 10, number * 10));
    setTotalNumberPage(Math.ceil(useListCustomerShow.length / 10));
  }
  const [activeNav, setActiveNav] = React.useState(1);
  // const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1");
  };



  return (
    <>
      <CardsHeader name="Default" parentName="Dashboards" />
      <Container className="mt--6" fluid>
        <Row style ={{paddingTop:'10px'}}>
          <Col xl="8">
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="title-customer-h3">BEST REPAIRMAN</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>

                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="name" scope="col">
                          #
                        </th>
                        <th className="sort" data-sort="name" scope="col">
                          name
                        </th>
                        <th className="sort" data-sort="budget" scope="col">
                          Completed Order
                        </th>
                      </tr>
                    </thead>
                    <tbody className="list">
                      {topWorkerOfCompletedOrder.map((e, index) => {
                        return (
                          <tr key={index}>
                            <td>      <Avatar style={{
                              backgroundColor: '#FFFFFF',
                              fontSize: '200px',
                              right: '10px',
                              overflow: 'unset',
                              borderRadius: '32%',

                            }} src={e.avatar}>
                            </Avatar></td>
                            <td>
                              <Badge className="badge-dot mr-4" color="">
                                <i className="bg-warning" />
                                <span className="status">{e.name}</span>
                              </Badge>
                            </td>
                            <td  style={{
                              color: 'green', fontWeight:'700'}}>{e.completedOrder}  completed
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
          </Col>

          <Col xl="4">
            <Card>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h1 className="text-uppercase text-muted ls-1 mb-1">
                    Statistic
                    </h1>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Customer use service</th>
                    <th scope="col">Completed Order</th>
                    <th scope="col">Canceled Order</th>
                  </tr>
                </thead>
                <tbody>
    
                      <tr>
                          <td>{customersUsesCompanyService} customer</td>
                        <td style={{color:'green',fontWeight:'700'}}>
                        {localStorage.getItem("totalComplete")} completed  
                                      </td>
                        <td style={{color:'red',fontWeight:'700'}}>
                          {localStorage.getItem("totalCanceled")} canceled
                        </td>
                      </tr>
                    
                  

                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>


        <Row>
        <Col xl="8">
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="title-customer-h3">WORSE REPAIRMAN</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>

                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="name" scope="col">
                          #
                        </th>
                        <th className="sort" data-sort="name" scope="col">
                          name
                        </th>
                        <th className="sort" data-sort="budget" scope="col">
                          Canceled Order
                        </th>
                      </tr>
                    </thead>
                    <tbody className="list">
                      {topWorkerOfCanceledOrder.map((e, index) => {
                        return (
                          <tr key={index}>
                            <td>      <Avatar style={{
                              backgroundColor: '#FFFFFF',
                              fontSize: '200px',
                              right: '10px',
                              overflow: 'unset',
                              borderRadius: '32%',

                            }} src={e.avatar}>
                            </Avatar></td>
                            <td>
                              <Badge className="badge-dot mr-4" color="">
                                <i className="bg-warning" />
                                <span className="status">{e.name}</span>
                              </Badge>
                            </td>
                            <td style={{
                              color: 'red', fontWeight:'700'}}>{e.canceledOrder}  Canceled
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">TOP SERVICE</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => window.location.href = "/company/service"}
                      size="sm"
                    >
                      view all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Service Name</th>
                    <th scope="col">Ordered</th>
                  </tr>
                </thead>
                <tbody>
                  {topServicesOfCompany.map((e, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {index + 1}
                        </td>
                        <td>
                          {e.serviceName}
                        </td>
                        <td>
                          {e.times} times
                        </td>
                      </tr>
                    );
                  })}

                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      

      </Container>
      <Modal isOpen={modalCreate} toggle={toggleCreate} centered>
        <ModalHeader
          style={{ color: "#1bd1ff" }}

        >
          <ModalTitle>Do you want to create new company</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form
          >
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text"
                placeholder="Name"
                name="title"
                onChange={e => settitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text"
                placeholder="Content"
                onChange={e => setcontent(e.target.value)}
              // onChange={name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>


            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter style={{ justifyContent: 'space-around' }}>
          <Button className="Cancel-button" onClick={toggleCreate}>
            Cancel
          </Button>
          <Button onClick={(e) =>  // handleCompanyDetele();
            // handleSubmit()
            createTips()
            // e.preventDefault()
            // setCompanyModalEdit(false);
          }
          >
            Save
          </Button>
          {/* <ImageUpload setData={setData}/> */}

        </ModalFooter>

      </Modal>

    </>
  );
}