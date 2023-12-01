import React, { useState } from 'react';
import { FaAccessibleIcon, FaCalendarAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { BsCamera } from 'react-icons/bs';
import { IoMdQrScanner, IoIosQrScanner } from 'react-icons/io'

export default function PurchasedProduct() {
    const [formData, setFormData] = useState({
        growingSite: '',
        plantingDate: ''

    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...FormData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        //Handle form submission. eg. send data to a server
        console.log(FormData)
    };

    return (

        <form className="container" onSubmit={handleSubmit}>
            <div>
                <h1>Scan New Purchased Product</h1>
              <i style={{margin:'40px'}}>  <IoIosQrScanner size={300}/></i> 
                <div >
                <button className='btn'style={{width:'200px'}} >Scan</button>&nbsp;&nbsp;
                <button className='btn' style={{width:'200px'}}>Cancel</button>
                </div>
                
            </div>
            <h1>Registration of purchased product information</h1>
            <div className='form-cont'>
                <div className='sub-entry'>
                    <input type="text" name="productname" value={FormData.productname} onChange={handleInputChange} placeholder='Product name'>
                    </input>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="sellerbusinessname" value={FormData.sellerbusinessname} onChange={handleInputChange} placeholder='Seller business name'></input>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="finalproductname" value={FormData.finalproductname} onChange={handleInputChange} placeholder='Final product name'></input>

                </div>
                <div className='sub-entry'>
                    <input type="text" name="purpose" value={FormData.purpose} onChange={handleInputChange} placeholder='Purpose'></input>
                </div>
                <div className='sub-entry'>
                    <label>Purchase Date</label><br />
                    <input type="date" name="Purchase date" value={FormData.purchasedate} onChange={handleInputChange} placeholder='Purchase date'></input>
                </div>

                <div className='sub-entry'>
                    <input type="text" name="remarks" value={FormData.remarks} onChange={handleInputChange} placeholder='Remarks'></input>
                    <i className='icon-note-1'><FiUpload /></i><i className='icon-note-2'><BsCamera /></i>
                </div>

                <div className='sub-entry'>
                    <button className='btn'>Save</button>
                </div>


                <div className='sub-entry-cancel'>
                    <button className='btn'>Cancel</button>
                </div>
            </div>
        </form>



    );
}
