import React, { useEffect, useState } from 'react';
import { FaAccessibleIcon, FaCalendarAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { BsCamera } from 'react-icons/bs';

export default function ShippingForm({ user_compID }) {
    const [formData, setFormData] = useState({
        shipment: '',
        shippingDestination: '',
        contactPerson: '',
        shippingAddress: '',
        transportationMethod: '',
        loadingMethod: '',
        shippingDate: '',
        expectedArrivalDate: '',
        remarks: ''

    });
    const [message, setMessage] = useState();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const [shipmentdata, setShipmentData] = useState();

    useEffect(() => {
        fetch('http://localhost:8081/shippingNameGrower', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.text())
            .then((data) => {
                console.log('shipment before save', data);
                setShipmentData(data);
                console.log('shipment user_id after fetch:', user_compID);
            })
            .catch(err => console.log(err));
    }, [user_compID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Handle form submission. eg. send data to a server

        const allInputData = { shipment: shipmentdata, shippingDestination: FormData.shippingDestination, contactPerson: formData.contactPerson, shippingAddress: formData.shippingAddress, transportationMethod: formData.transportationMethod, loadingMethod: formData.loadingMethod, shippingDate: formData.shippingDate, expectedArrivalDate: formData.expectedArrivalDate, remarks: formData.remarks };

        let res = await fetch("http://localhost:8081/shippingRegistration", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(allInputData)
        });

        let resjson = await res.json();
        if (res.status === 200) {
            setMessage(resjson.success);
            setTimeout(() => {
                // navigate('/datatable');
            }, 200);
        } else {
            setMessage("some error!!")
        }
    };
    return (

        <form className="container" onSubmit={handleSubmit}>
            <h1>Shipping Information Registration</h1>
            <div className='form-cont'>
                <div className='sub-entry'>
                    <input type="text" style={{ color: '#248771', fontWeight: '1000' }} value={shipmentdata} disabled />
                </div>

                <div className='sub-entry'>
                    <label>Ship Date</label>
                    <input type="date" name="shippingDate" required="required" value={FormData.shippingDate} onChange={handleInputChange} placeholder='Shipping Date'></input>
                </div>
                <div className='sub-entry'>
                    <select name="shippingDestination" required="required" onChange={handleInputChange}>
                        <option >Destination Company</option>
                        <option value={formData.shippingDestination} > Company A</option>
                        <option value={formData.shippingDestination} > Company B</option>
                        <option value={formData.shippingDestination} > Company C</option>
                    </select>
                </div>
                <div className='sub-entry'>
                    <label>Expected Arrival Date</label>
                    <input type="date" name="expectedArrivalDate" required="required" value={FormData.expectedArrivalDate} onChange={handleInputChange} placeholder='Expected Arrival Date'></input>
                </div>

                <div className='sub-entry'>
                    <input type="text" name="contactPerson" required="required" value={FormData.contactPerson} onChange={handleInputChange} placeholder='Contact Person' ></input>
                </div>
                <div className='sub-entry'>

                    <input type="text" name="remarks" required="required" value={FormData.remarks} onChange={handleInputChange} placeholder='Remarks'></input>
                    <i className='icon-note-1'><FiUpload /></i><i className='icon-note-2'><BsCamera /></i>
                </div>

                <div className='sub-entry'>
                    <select name="shippingAddress" required="required" onChange={handleInputChange}>
                        <option >Select Shipping Adress</option>
                        <option value={FormData.shippingAddress} >address 1</option>
                        <option value={FormData.shippingAddress} >address 2</option>
                        <option value={FormData.shippingAddress} >address 3</option>
                    </select>
                </div>
                <div className='sub-entry'>
                    <button className='btn'>Save</button>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="loadingMethod" required="required" value={FormData.loadingMethod} onChange={handleInputChange} placeholder='Loading Method'></input>
                </div>
                <div className='sub-entry-cancel'>
                    <button className='btn'>Cancel</button>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="transportationMethod" required="required" value={FormData.transportationMethod} onChange={handleInputChange} placeholder='Transportation Method'></input>
                </div>



            </div>
        </form>



    );
}
