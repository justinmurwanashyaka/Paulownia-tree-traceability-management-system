import React from 'react';
import {arrivaldata} from '../arrivaldata.js'
import ArrivalList from '../Components/arrivalList.js';


const columns = ['#','SHIPPING SOURCE','DESTINATION ADDRESS','SHIPPING DATE','SHIPMENT','TRANSPORT METHOD','EXPECTED ARRIVAL DATE','MARKS','ACTION'];

const ScheduledArrivalList = () => {
    return (
        <div className="container">
            <div className="table-container">
                <h1>Sheduled Arrival List</h1>
                <ArrivalList data={arrivaldata} columns={columns}/>
               
            </div>
        </div>
    );
};

export default ScheduledArrivalList;
