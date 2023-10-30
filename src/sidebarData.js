import { FaHome, FaUserPlus, FaCartPlus, FaSearch,FaUserSecret, FaClipboardList, FaShippingFast, FaHistory } from "react-icons/fa";
import { AiFillPlusCircle, AiFillSchedule} from "react-icons/ai";
import {  GiCargoCrate,GiCargoShip } from "react-icons/gi";
import { TbUserCode } from "react-icons/tb"
import {MdManageAccounts } from "react-icons/md";


const sidebarData = [
  {
    title: 'Status List',
    path: '/StatusList',
    icon: <FaClipboardList />,
    forGrower: false, 
    forProvider: true, 
  },
  {
    title: 'Traceability Search',
    path: '/TraceabilitySearch',
    icon: <FaHistory />,
    forGrower: false, 
    forProvider: true, 
  },
  {
    title: 'Distribution Status',
    path: '/DistributionStatus',
    icon: <FaShippingFast />,
    forGrower: false, 
    forProvider: true, 
    },
  {
    title: 'Log Registration',
    path: '/LogRegistration',
    icon: <AiFillPlusCircle />,
    forGrower: true, 
    forProvider: false, 
  },
  {
    title: 'Log Information Search',
    path: '/LogSearchList',
    icon: <FaSearch />,
    forGrower: true,
    forProvider: false,
  },
  {
    title: 'Shipping Registration',
    path: '/ShippingInformation',
    icon: <GiCargoShip />,
    forGrower: true,
    forProvider: false,
  },
  {
    title: 'Shipping List',
    path: '/ShippingInformationList',
    icon: <GiCargoShip />,
    forGrower: true,
    forProvider: false,
  },
  {
    title: 'Account management',
    path: '/AccountManagement',
    icon: <MdManageAccounts />,
    forGrower: false,
    forProvider: true,
  },
  {
    title: 'User Company master',
    path: '/UserCompanyMaster',
    icon: <FaUserSecret />,
    forGrower: false,
    forProvider: true,
  },
  {
    title: 'Code master',
    path: '/CodeMaster',
    icon: <TbUserCode />,
    forGrower: false,
    forProvider: true,
  },
  {
    title: 'Scheduled Arrivals',
    path: '/ScheduledArrivalList',
    icon: <AiFillSchedule />,
    forGrower: true,
    forProvider: false,
  },
  {
    title: 'Register Arrivals',
    path: '/RegisterArrivalInformation',
    icon: <GiCargoCrate />,
    forGrower: true,
    forProvider: false,
  },
  
  ];

export default sidebarData;