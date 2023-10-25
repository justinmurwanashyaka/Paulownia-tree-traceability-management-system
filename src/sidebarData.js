import {FaHome, FaUserPlus,FaCartPlus,FaClipboardList, FaShippingFast,FaHistory} from "react-icons/fa";
import {AiFillPlusCircle} from "react-icons/ai"
const sidebarData = [
    {
        title: 'Status List',
        path: '/StatusList',
        icon:<FaClipboardList/>
        
      
    },
    {
        title: 'Traceability Search',
        path: '/TraceabilitySearch',
        icon:<FaHistory/>
 
    
    },
    {
        title: 'Distribution Status',
        path: '/DistributionStatus',
        icon:<FaShippingFast/>
    
    },
    {
        title: 'Log Registration',
        path: '/LogRegistration',
        icon:<AiFillPlusCircle/>
    },
   
  
]

export default sidebarData