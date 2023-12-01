import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import sidebarData from './sidebarData';
import StatusListInformation from './pages/StatusListInformation';
import DistributionStatus from './pages/DistributionStatus';
import TraceabilitySearch from './pages/TraceabilitySearch';
import LogRegistration from './pages/LogRegistration';
import LogSearchList from './pages/LogSearchList';
import ShippingInformationRegistration from './pages/ShippingInformationRegistration';
import ShippinginformationList from './pages/ShippingInformationList';
import ArrivalRegistration from './pages/RegisterArrivalInformation';
import ScheduledArrivalList from './pages/ScheduledArrivalList';
import ArrivalInformationSearchList from './pages/ArrivalInformationSearchList';
import ProductRegistration from './pages/ProductRegistration';
import ProductInformationSearchList from './pages/ProductInformationSearchList';
import RegistrationPurchasedProductInformation from './pages/RegistrationPurchasedProductInformation';


function App() {
  const [userRole, setUserRole] = useState(null);
  const [user_compID, setUserCompID] = useState(null);
  const [userid, setUserId] = useState(null);

  let routesToRender = null;
  let sidebarLinksToRender = null;

  if (userRole && user_compID) {
    // Define routes based on the user's role
    routesToRender = (
      <Routes>
        {userRole === 1 && (
          <>
            <Route path='/StatusListInformation' element={<StatusListInformation userRole={userRole} />} />
            <Route path='/LogRegistration' element={<LogRegistration userid={userid} user_compID={user_compID} />} />
            <Route path='/LogSearchList' element={<LogSearchList user_compID={user_compID} />} />
            <Route path='/ShippingInformationRegistration' element={<ShippingInformationRegistration user_compID={user_compID} />} />
            <Route path='/ShippingInformationList' element={<ShippinginformationList user_compID={user_compID} />} />
            <Route path='/RegisterArrivalInformation' element={<ArrivalRegistration />} />
            <Route path='/ScheduledArrivalList' element={<ScheduledArrivalList user_compID={user_compID} />} />
            <Route path='/ArrivalInformationSearchList' element={<ArrivalInformationSearchList user_compID={user_compID} user_role={userRole} />} />

          </>
        )}
        {userRole === 2 && (
          <>
            <Route path='/StatusListInformation' element={<StatusListInformation userRole={userRole} />} />
            <Route path='/ShippingInformationRegistration' element={<ShippingInformationRegistration user_compID={user_compID} />} />
            <Route path='/ShippingInformationList' element={<ShippinginformationList />} />
            <Route path='/RegisterArrivalInformation' element={<ArrivalRegistration />} />
            <Route path='/ScheduledArrivalList' element={<ScheduledArrivalList />} />
            <Route path='/ArrivalInformationSearchList' element={<ArrivalInformationSearchList />} />

          </>
        )}
        {userRole === 3 && (
          <>
            <Route path='/StatusListInformation' element={<StatusListInformation userRole={userRole} />} />
            <Route path='/ProductRegistration' element={<ProductRegistration />} />
            <Route path='/ProductInformationSearchList' element={<ProductInformationSearchList user_compID={user_compID} />} />
           
          </>
        )}
        {userRole === 4 && (
          <>
            <Route path='/StatusListInformation' element={<StatusListInformation userRole={userRole} />} />
            <Route path='/RegistrationPurchasedProductInformation' element={<RegistrationPurchasedProductInformation />} />
          </>
           )}
           {userRole === 5&& (
            <>
       
            </>
        )}
      </Routes>
    );
    // Render sidebar links based on user's role
    sidebarLinksToRender = sidebarData.map((item, index) => {
      if ((userRole === 1 && item.forGrower) || (userRole === 3 && item.forProducer) || (userRole === 2 && item.forDistributor) || (userRole === 4 && item.forPurchasers) || (userRole === 5&& item.forProvider)) {
        return (
          <li className='nav-item' key={index}>
            <NavLink to={item.path} className={({ isActive }) => ["nav-link", isActive ? "active" : null].join(" ")}>
              <div className='nav-link-icon'>{item.icon}</div>
              <span>{item.title}</span>
            </NavLink>
          </li>
        );
      }
      return null;
    });
  }

  return (
    <div className="App">
      {userRole ? (
        <>
          {routesToRender}
          <div className='sidebar-container'>
            <ul className='nav-list'>{sidebarLinksToRender}</ul>
          </div>

        </>
      ) : (
        <>
          <Login setUserRole={setUserRole} setUserCompID={setUserCompID} setUserId={setUserId} />

        </>

      )}
    </div>
  );
}

export default App;
