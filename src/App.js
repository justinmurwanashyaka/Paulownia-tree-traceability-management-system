import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import './App.css';
import sidebarData from './sidebarData';
import StatusList from './pages/StatusList';
import DistributionStatus from './pages/DistributionStatus';
import TraceabilitySearch from './pages/TraceabilitySearch';
import LogRegistration from './pages/LogRegistration';

function App() {
  return (
    <div className="App">
    
        <Routes>
         
          <Route path='/StatusList' element={<StatusList />} />
          <Route path='/DistributionStatus' element={<DistributionStatus />} />
          <Route path='/TraceabilitySearch' element={<TraceabilitySearch />} />
          <Route path='/LogRegistration' element={<LogRegistration />} />
        </Routes>
     
      <div className='sidebar-container'>
        <ul className='nav-list'>
          {sidebarData.map((item, index) => {
            return (
              <li className='nav-item' key={index}>
                <NavLink to={item.path} className={({ isActive }) => ["nav-link", isActive ? "active" : null].join(" ")}>
                  <div className='nav-link-icon'>
                    {item.icon}
                  </div>
                  <span>{item.title}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
