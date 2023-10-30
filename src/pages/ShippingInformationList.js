import React from 'react';
import { shippingdata } from '../shippingdata.js';
import ShipmentDataTable from '../Components/shipmentDataTable.js';



const columns = ['#','SHIPPING DESTINATION','SHIPPING ADDRESS','SHIPPING DATE','SHIPMENT','METHOD OF TRANSPORT','EXPECTED ARRIVAL DATE','ACTION'];

const ShippinginformationList = () => {
    return (
        <div className="container">
            <div className="table-container">
                <h1>Shipping Information List </h1>
                <ShipmentDataTable data={shippingdata} columns={columns}/>
                
            </div>
        </div>
    );
};

export default ShippinginformationList;

