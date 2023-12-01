import React, { useState } from 'react';
import { FaAccessibleIcon, FaCalendarAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { BsCamera } from 'react-icons/bs';

export default function ProductForm() {
    const [formData, setFormData] = useState({
        incomingCargoUsed: '',
        productName: '',
        quantity: '',
        manufacturingLocation: '',
        manufacturingPurpose: '',
        size: '',
        shape: '',
        productionDate: '',
        strength: '',
        material: '',
        productionMethod: '',
        usedMachine: '',
        manufacturingManager: '',
        remarks: ''

    });
    const [message, setMessage] = useState();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...FormData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Handle form submission. eg. send data to a server
        let res = await fetch("http://localhost:8081/productRegistration", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(FormData)
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
        console.log(FormData)
    };
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (

        <form className="container" onSubmit={handleSubmit}>
            <h1>Registration of Product Information</h1>
            <div className='form-cont'>

                <div className='sub-entry'>
                    <select name="incomingCargoUsed" onChange={handleInputChange}>
                        <option>Incoming Cargo used</option>
                        <option>Incoming cargo 1 </option>
                    </select>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="strength" value={FormData.strength} onChange={handleInputChange} placeholder='Strength' />
                </div>
                <div className='sub-entry'>
                    <input type="text" name="productName" value={FormData.productName} onChange={handleInputChange} placeholder='Product Name' />
                </div>
                <div className='sub-entry'>
                    <input type="text" name="material" value={FormData.material} onChange={handleInputChange} placeholder='material' />
                </div>
                <div className='sub-entry'>

                    <input type="text" name="quantity" value={FormData.quantity} onChange={handleInputChange} placeholder='Quantity' ></input>

                </div>
                <div className='sub-entry'>
                    <input type="text" name="productionMethod" value={FormData.productionMethod} onChange={handleInputChange} placeholder='Production Method'></input>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="manufacturingLocation" value={FormData.manufacturingLocation} onChange={handleInputChange} placeholder='Manufacturing Location'></input>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="usedMachine" value={FormData.usedMachine} onChange={handleInputChange} placeholder='Used Machine'></input>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="manufacturingPurpose" value={FormData.manufacturingPurpose} onChange={handleInputChange} placeholder='Manufacturing Purpose'></input>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="manufacturingManager" value={FormData.manufacturingManager} onChange={handleInputChange} placeholder='Manufacturing Manager'></input>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="size" value={FormData.size} onChange={handleInputChange} placeholder='Size'></input>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="marks" value={FormData.marks} onChange={handleInputChange} placeholder='Remarks'></input>
                    <i className='icon-note-1'><FiUpload /></i><i className='icon-note-2'><BsCamera /></i>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="shape" value={FormData.shape} onChange={handleInputChange} placeholder='Shape'></input>
                </div>

              
                <div className='sub-entry'>
                    <label>Production Date</label><br />
                    <input type="date" name="productionDate" value={FormData.productionDate} onChange={handleInputChange} placeholder='Production Date'></input>
                </div>
                <div className='sub-entry'>
                    <button className='btn'>Save</button>
                    <button className='btn'>Cancel</button>
                </div>
               
            </div>
        </form>



    );
}
