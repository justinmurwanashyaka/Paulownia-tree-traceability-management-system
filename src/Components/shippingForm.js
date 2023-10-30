import React, { useState } from 'react';
import { FaAccessibleIcon, FaCalendarAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { BsCamera } from 'react-icons/bs';

export default function ShippingForm() {
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        //Handle form submission. eg. send data to a server
        console.log(formData)
    };

    return (

        <form className="container" onSubmit={handleSubmit}>
            <h1>Shipping Information Registration</h1>
            <div className='form-cont'>
                <div className='sub-entry'>

                    <input type="text" name="shipment" value={FormData.shipment} onChange={handleInputChange} placeholder='Shipment'>
                    </input>
                </div>
                <div className='sub-entry'>

                    <input type="text" name="shippingDate" value={FormData.shippingDate} onChange={handleInputChange} placeholder='Shipping Date'></input>
                    <i className='icon'><FaCalendarAlt /></i>
                </div>

                <div className='sub-entry'>

                    <input type="text" name="expectedArrivalDate" value={FormData.expectedArrivalDate} onChange={handleInputChange} placeholder='Expected Arrival Date'></input>
                    <i className='icon'><FaCalendarAlt /></i>
                </div>
                <div className='sub-entry'>
                    <select name="shippingDestination" onChange={handleInputChange}>
                        <option >Destination Company</option>
                        <option value={formData.shippingDestination} > Company A</option>
                        <option value={formData.shippingDestination} > Company B</option>
                        <option value={formData.shippingDestination} > Company C</option>
                    </select>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="contactPerson" value={FormData.contactPerson} onChange={handleInputChange} placeholder='Contact Person' ></input>
                </div>

                <div className='sub-entry'>
                  
                    <input type="text" name="remarks" value={FormData.remarks} onChange={handleInputChange} placeholder='Remarks'></input>
                    <i className='icon-note-1'><FiUpload /></i><i className='icon-note-2'><BsCamera /></i>
                </div>
                <div className='sub-entry'>
                    <select name="shippingAddress" onChange={handleInputChange}>
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
                   
                    <input type="text" name="loadingMethod" value={FormData.loadingMethod} onChange={handleInputChange} placeholder='Loading Method'></input>
                </div>

                <div className='sub-entry-cancel'>
                    <button className='btn'>Cancel</button>
                </div>
                <div className='sub-entry'>
                   
                    <input type="text" name="transportationMethod" value={FormData.transportationMethod} onChange={handleInputChange} placeholder='Transportation Method'></input>

                </div>
            </div>
        </form>



    );
}
