import React, { useState } from 'react';
import { FaAccessibleIcon, FaCalendarAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { BsCamera } from 'react-icons/bs';

export default function ArrivalForm() {
    const [formData, setFormData] = useState({
        incomingcargo: '',
        arrivalday: '',
        receivingcompany: '',
        storagelocation: '',
        personalincharge: '',
        coment: '',
        quantity: '',
        remarks: ''

    });
    const [message, setMessage] = useState();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Handle form submission. eg. send data to a server
      
      const allInputData = {incomingcargo:FormData.incomingcargo, arrivalday:formData.arrivalday, receivingcompany:formData.receivingcompany, storagelocation:formData.storagelocation, personalincharge: formData.personalincharge, coment: formData.coment, quantity:formData.quantity, remarks:formData.remarks };
     
      let res = await fetch("http://localhost:8081/arrivalRegistration", {
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
            <h1>Register Arrival Informations</h1>
            <div className='form-cont'>
                <div className='sub-entry'>
                    <input type="text" name="incomingcargo" value={FormData.incomingcargo} onChange={handleInputChange} placeholder='Incaming Cargo'>
                    </input>
                </div>
                <div className='sub-entry'>

                    <input type="text" name="arrivalday" value={FormData.arrivalday} onChange={handleInputChange} placeholder='Arrival Day'></input>
                    <i className='icon'><FaCalendarAlt /></i>
                </div>

                <div className='sub-entry'>
                    <input type="text" name="receivingcompany" value={FormData.receivingcompany} onChange={handleInputChange} placeholder='Receiving company'>
                    </input>
                </div>
                <div className='sub-entry'>
                    <select name="storagelocation" onChange={handleInputChange}>
                        <option >Destination Company</option>
                        <option value={formData.storagelocation} > Location 1</option>
                        <option value={formData.storagelocation} > Location 2</option>
                        <option value={formData.storagelocation} > Location 3</option>
                    </select>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="contactPerson" value={FormData.contactPerson} onChange={handleInputChange} placeholder='Contact Person' ></input>
                </div>
                <div className='sub-entry'>
                    <input type="text" name="quantity" value={FormData.quantity} onChange={handleInputChange} placeholder='Quantity' ></input>
                </div>
                <div className='sub-entry'>

                    <input type="text" name="coment" value={FormData.coment} onChange={handleInputChange} placeholder='Coment'></input>

                </div>

                <div className='sub-entry'>

                    <input type="text" name="remarks" value={FormData.remarks} onChange={handleInputChange} placeholder='Remarks'></input>
                    <i className='icon-note-1'><FiUpload /></i><i className='icon-note-2'><BsCamera /></i>
                </div>
                <div className='sub-entry'>

                    <input type="text" name="personalincharge" value={FormData.personalincharge} onChange={handleInputChange} placeholder='Personal Incharge'></input>
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
