import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import sidebarData from './sidebarData';
import StatusList from './pages/StatusList';
import DistributionStatus from './pages/DistributionStatus';
import TraceabilitySearch from './pages/TraceabilitySearch';
import LogRegistration from './pages/LogRegistration';
import LogSearchList from './pages/LogSearchList';
import ShippingInformation from './pages/ShippingInformationRegistration';
import ShippinginformationList from './pages/ShippingInformationList';
import ArrivalRegistration from './pages/RegisterArrivalInformation';
import ScheduledArrivalList from './pages/ScheduledArrivalList';
import Login from './pages/Login';

function App() {
  const [userRole, setUserRole] = useState(null);

  let routesToRender = null;
  let sidebarLinksToRender = null;

  if (userRole) {
    // Define routes based on the user's role
    routesToRender = (
      <Routes>
        {userRole === 'grower' && (
          <>
           <Route path='/LogRegistration' element={<LogRegistration />} />
            <Route path='/LogSearchList' element={<LogSearchList />} />
            <Route path='/ShippingInformation' element={<ShippingInformation />} />
            <Route path='/ShippingInformationList' element={<ShippinginformationList />} />
            <Route path='/RegisterArrivalInformation' element={<ArrivalRegistration/>}/>     
            <Route path='/ScheduledArrivalList' element={<ScheduledArrivalList/>}/>      
          </>
        )}
        {userRole === 'provider' && (
          <>
           <Route path='/StatusList' element={<StatusList />} />
            <Route path='/DistributionStatus' element={<DistributionStatus />} />
            <Route path='/TraceabilitySearch' element={<TraceabilitySearch />} />
          </>
        )}
      </Routes>
    );

    // Render sidebar links based on user's role
    sidebarLinksToRender = sidebarData.map((item, index) => {
      if ((userRole === 'grower' && item.forGrower) || (userRole === 'provider' && item.forProvider)) {
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
        <Login setUserRole={setUserRole} />
      )}
    </div>
  );
}

export default App;
