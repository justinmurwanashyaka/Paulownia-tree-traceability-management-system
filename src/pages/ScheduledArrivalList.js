import React from 'react';
import Scheledarrivallist from '../Components/scheduledarrivalList.js';


const ScheduledArrivalList = ({user_compID}) => {
    return (
        <div className="container">
            <div className="table-container">
                <Scheledarrivallist user_compID={user_compID} />
            </div>
        </div>
    );
};

export default ScheduledArrivalList;
