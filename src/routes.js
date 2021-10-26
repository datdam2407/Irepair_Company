import Dashboard from "views/Dashboard.js";
// import ManageCompany from "views/Components/ManageCompany";
// import CreateNewCompany from "views/Components/CreateNewCompany.js";
// import SweetAlert from "views/Components/SweetAlertPage.js";
// import Notifications from "views/Components/Notifications.js";
// import Icons from "views/Components/Icons.js";
// import Typography from "views/Components/Typography.js";


import MajorTables from "views/Forms/MajorTables.js";
import ServiceTables from "views/Forms/ServiceTables.js";
import Customer from "views/Forms/Customer.js";
// import ManageMajor from "views/Major/ManageMajor.js";
import CreateNewService from "views/Forms/CreateNewService.js";
// import CreateNewMajor from "views/Major/CreateNewMajor.js";
import CreateNewRepairMan from "views/Tables/CreateNewRepairMan.js";
import RepairmanTable from "views/Tables/RepairmanTable.js";

// import Sidebar from "views/Sidebar.js";
import RegisterPage from "views/Pages/RegisterPage.js";
// import LockScreenPage from "views/Pages/LockScreenPage.js";

var routes = [


  //Dashboard
  {
    path: "/dashboard",
    layout: "/company",
    name: "Trang chủ",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
  },
  // {
  //   path: "/Sidebar",
  //   layout: "/company",
  //   name: "Sidebar",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Sidebar,
  // },
  ////////////////////////////////////////////////

  //Company
  // {
  //   collapse: true,
  //   path: "/company",
  //   name: "Company",
  //   state: "openComponents",
  //   icon: "nc-icon nc-bank",
  //   views: [
  //     {
  //       path: "/company",
  //       layout: "/company",
  //       name: "Manage Company",
  //       mini: "GS",
  //       component: ManageCompany,
  //     },


  //Service

  // {
  //   path: "/service",
  //   layout: "/company",
  //   name: "Service",
  //   icon: "nc-icon nc-notes",
  //   component: ServiceTables,
  // },
  {
    path: "/customer",
    layout: "/company",
    name: "Khách Hàng",
    icon: "nc-icon nc-badge",
    component: Customer,
  },
  {
    path: "/history",
    layout: "/company",
    name: "Lịch Sử Yêu Cầu",
    icon: "nc-icon nc-tv-2",
    component: CreateNewService,
  },
  {
    path: "/major",
    layout: "/company",
    name: "Đồ dùng",
    icon: "nc-icon nc-single-copy-04",
    component: MajorTables,
  },
 
  {
    path: "/repairman",
    layout: "/company",
    name: "Thợ Sửa Chữa",
    icon: "nc-icon nc-settings-tool-66",
    component: RepairmanTable,
  },
  // {
  //   collapse: true,
  //   path: "/service",
  //   name: "Service",
  //   state: "openForms",
  //   views: [
  //    
  //     {
  //       path: "/service",
  //       layout: "/company",
  //       name: "Service Table",
  //       mini: "St",
  //       component: ServiceTables,
  //     },
  // {
  //   path: "/validation-forms",
  //   layout: "/company",
  //   name: "Validation Forms",
  //   mini: "VF",
  //   component: ValidationForms,
  // },
  // 
  //   ],
  // },
  ///////////////////////////////////////////////

  //major
  // {
  //   collapse: true,
  //   path: "/major",
  //   name: "Major",
  //   state: "openMajor",
  //   views: [
  //     {
  //       path: "/major",
  //       layout: "/company",
  //       name: "Manage Major",
  //       mini: "GS",
  //       component: ManageMajor,
  //     },
  //     {
  //       path: "/create/major",
  //       layout: "/company",
  //       name: "Create Major",
  //       mini: "CC",
  //       component: CreateNewMajor,
  //     },

  //     // {
  //     //   path: "/notifications",
  //     //   layout: "/company",
  //     //   name: "Notifications",
  //     //   mini: "N",
  //     //   component: Notifications,
  //     // },
  //     // {
  //     //   path: "/icons",
  //     //   layout: "/company",
  //     //   name: "Icons",
  //     //   mini: "I",
  //     //   component: Icons,
  //     // },
  //     // {
  //     //   path: "/typography",
  //     //   layout: "/company",
  //     //   name: "Typography",
  //     //   mini: "T",
  //     //   component: Typography,
  //     // },
  //   ],
  // },
  ///////////////////////////////////////////////


  //Repairman

  
  // {
  //   collapse: true,
  //   path: "/repairman",
  //   name: "RepairMan",
  //   state: "openTables",
  //   views: [
  //     {
  //       path: "/create/repairman",
  //       layout: "/company",
  //       name: "Create Repairman",
  //       mini: "CR",
  //       component: CreateNewRepairMan,
  //     },


  //   ],
  // },



  // {
  //   collapse: true,
  //   path: "/maps",
  //   name: "Maps",
  //   state: "openMaps",
  //   icon: "nc-icon nc-pin-3",
  //   views: [
  //     {
  //       path: "/google-maps",
  //       layout: "/company",
  //       name: "Google Maps",
  //       mini: "GM",
  //       component: GoogleMaps,
  //     },
  //     {
  //       path: "/full-screen-maps",
  //       layout: "/company",
  //       name: "Full Screen Map",
  //       mini: "FSM",
  //       component: FullScreenMap,
  //     },
  //     {
  //       path: "/vector-maps",
  //       layout: "/company",
  //       name: "Vector Map",
  //       mini: "VM",
  //       component: VectorMap,
  //     },
  //   ],
  // },
  // {
  //   path: "/charts",
  //   layout: "/company",
  //   name: "Charts",
  //   icon: "nc-icon nc-chart-bar-32",
  //   component: Charts,
  // },



  // {
  //   path: "/calendar",
  //   layout: "/company",
  //   name: "Calendar",
  //   icon: "nc-icon nc-single-copy-04",
  //   component: Calendar,
  // },



  // {
  //   collapse: true,
  //   path: "/pages",
  //   name: "Pages",
  //   state: "openPages",
  //   icon: "nc-icon nc-puzzle-10",
  //   views: [
  //     {
  //       path: "/user-page",
  //       layout: "/company",
  //       name: "User Page",
  //       mini: "UP",
  //       component: UserPage,
  //     },
  //     {
  //       path: "/register-page",
  //       layout: "/auth",
  //       name: "Register",
  //       mini: "RP",
  //       component: RegisterPage,
  //     },
  //     // {
  //     //   path: "/lock-screen-page",
  //     //   layout: "/auth",
  //     //   name: "Lock Screen Page",
  //     //   mini: "LSP",
  //     //   component: LockScreenPage,
  //     // },
  //   ],
  // },
];
export default routes;
