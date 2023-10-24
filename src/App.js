import {Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import sidebarData  from './sidebarData';
import StatusList from './pages/StatusList';
import DistributionStatus from './pages/DistributionStatus';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<StatusList />}></Route>
        <Route path='/' element={<DistributionStatus />}></Route>
        <Route path='/' element={<DistributionStatus />}></Route>
      </Routes>
    <div className='sidebar-container'>
    <ul className='nav-list'>
      {sidebarData.map((item, index) => {
        return(
          <li className ='nav-item' key={index}>
          <NavLink to ={item.path} className={({isActive})=>["nav=link", isActive? "active" : null].join(" ")}>
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
