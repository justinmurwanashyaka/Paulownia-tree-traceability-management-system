import React from 'react';
import ShipmentDataTable from '../Components/shipmentDataTable.js';

const ShippinginformationList = ({user_compID}) => {
    return (
        <div className="container">
            <div className="table-container">
               
                <ShipmentDataTable user_compID={user_compID}/>
                
            </div>
        </div>
    );
};

export default ShippinginformationList;

