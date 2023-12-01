import { FaHome, FaUserPlus, FaCartPlus, FaSearch, FaUserSecret, FaClipboardList, FaShippingFast, FaHistory } from "react-icons/fa";
import { AiFillPlusCircle, AiFillSchedule } from "react-icons/ai";
import { GiCargoCrate, GiCargoShip } from "react-icons/gi";
import { TbUserCode } from "react-icons/tb"
import { MdManageAccounts } from "react-icons/md";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";



const sidebarData = [
  {
    title: 'Status List',
    path: '/StatusListInformation',
    icon: <FaClipboardList />,
    forGrower: true,
    forDistributor: true,
    forProducer: true,
    forPurchasers: true,
  },
  {
    title: 'Traceability Search',
    path: '/TraceabilitySearch',
    icon: <FaHistory />,
    forGrower: true,
  },
  {
    title: 'Distribution Status',
    path: '/DistributionStatus',
    icon: <FaShippingFast />,
    forGrower: true,
  },
  {
    title: 'Log Registration',
    path: '/LogRegistration',
    icon: <AiFillPlusCircle />,
    forGrower: true
  },
  {
    title: 'Log Information Search',
    path: '/LogSearchList',
    icon: <FaSearch />,
    forGrower: true
  },
  {
    title: 'Shipping Registration',
    path: '/ShippingInformationRegistration',
    icon: <GiCargoShip />,
    forGrower: true,
    forDistributor: true
  },
  {
    title: 'Shipping List',
    path: '/ShippingInformationList',
    icon: <GiCargoShip />,
    forGrower: true,
    forDistributor: true
  },
  {
    title: 'Account management',
    path: '/AccountManagement',
    icon: <MdManageAccounts />,
    forProvider: true
  },
  {
    title: 'User Company master',
    path: '/UserCompanyMaster',
    icon: <FaUserSecret />,
    forProvider: true,
  },
  {
    title: 'Code master',
    path: '/CodeMaster',
    icon: <TbUserCode />,
    forProvider: true,
  },
  {
    title: 'Scheduled Arrivals',
    path: '/ScheduledArrivalList',
    icon: <AiFillSchedule />,
    forGrower: true,
    forDistributor: true
  },
  {
    title: 'Register Arrivals',
    path: '/RegisterArrivalInformation',
    icon: <GiCargoCrate />,
    forGrower: true,
    forDistributor: true
  },
  {
    title: 'Arrivals Search List',
    path: '/ArrivalInformationSearchList',
    icon: <FaSearch />,
    forGrower: true,
    forDistributor: true
  },
  {
    title: 'Register Product',
    path: '/ProductRegistration',
    icon: <BsFillCartPlusFill />,
    forProducer: true,

  },
  {
    title: 'Product Search List',
    path: '/ProductInformationSearchList',
    icon: <FaSearch />,
    forProducer: true,
  },
  {
    title: 'Purchased Product',
    path: '/RegistrationPurchasedProductInformation',
    icon: <BsFillCartCheckFill />,
    forPurchasers: true,
  },


];

export default sidebarData;