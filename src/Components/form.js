import React, { useState } from 'react';
import { FaAccessibleIcon, FaCalendarAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { BsCamera } from 'react-icons/bs';

export default function Form() {
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
         <h1>Log Information Registration</h1>
         <div className='form-cont'>
         <div className='sub-entry'>
          
            <input type="text" name="growingSite" value={FormData.growingSite} onChange={handleInputChange} placeholder='Growing Site'>
            </input>
         </div>
         <div className='sub-entry'>
 
            <input type="text" name="growingSite" value={FormData.growingSite} onChange={handleInputChange} placeholder='Shape'></input>

         </div>
         <div className='sub-entry'>
  
            <input type="text" name="plantingDate" value={FormData.growingSite} onChange={handleInputChange} placeholder='Planting Date' ></input>
            <i className='icon'><FaCalendarAlt /></i>

         </div>
         <div className='sub-entry'>
           
            <input type="text" name="strength" value={FormData.growingSite} onChange={handleInputChange} placeholder='Strength'></input>

         </div>
         <div className='sub-entry'>

            <input type="text" name="FallingDate" value={FormData.growingSite} onChange={handleInputChange} placeholder='Falling Date'></input>
            <i className='icon'><FaCalendarAlt /></i>
         </div>
         <div className='sub-entry'>
        
            <input type="text" name="quality" value={FormData.growingSite} onChange={handleInputChange} placeholder='Quality'></input>

         </div>
         <div className='sub-entry'>
            
            <input type="text" name="type" value={FormData.growingSite} onChange={handleInputChange} placeholder='Type'></input>

         </div>
         <div className='sub-entry'>
      
            <input type="text" name="durability" value={FormData.growingSite} onChange={handleInputChange} placeholder='Durability'></input>

         </div>
         <div className='sub-entry'>
      
            <input type="text" name="dimension" value={FormData.growingSite} onChange={handleInputChange} placeholder='Dimension'></input>

         </div>
         <div className='sub-entry'>
      
            <input type="text" name="growingSite" value={FormData.growingSite} onChange={handleInputChange} placeholder='Note'></input>

            <i className='icon-note-1'><FiUpload /></i><i className='icon-note-2'><BsCamera /></i>

         </div>
         <div className='sub-entry'>
            
            <input type="text" name="growingSite" value={FormData.growingSite} onChange={handleInputChange} placeholder='Workability'></input>

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
