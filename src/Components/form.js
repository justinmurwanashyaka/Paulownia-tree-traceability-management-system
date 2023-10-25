import React, { useState } from 'react';
import { FaAccessibleIcon,FaCalendarAlt} from 'react-icons/fa';
import {FiUpload} from 'react-icons/fi';
import {BsCamera} from 'react-icons/bs';

export default function Form() {
   const [formValue, setFormValue]= useState({
    growingSite : '',
    plantingDate : ''

   }); 
   const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value});
   };
   const handleSubmit =(e) => {
    e.preventDefault();
    //Handle form submission. eg. send data to a server
    console.log(FormData)
   };

       return (
        
            <form className="container" onSubmit={handleSubmit}>
             <h1>Log Information Registration</h1>
             <div className='sub-entry'>
                <label>Growing Site</label>
                <input  type="text" name ="growingSite" value={FormData.growingSite} onChange={handleInputChange}>
                 </input>  
             </div>
             <div className='sub-entry'>
                <label>Shape</label>
                <input  type="text" name ="growingSite" value={FormData.growingSite} onChange={handleInputChange}></input>
                
             </div>
             <div className='sub-entry'>
                <label>Planting date</label>
                <input  type="text" name ="plantingDate" value={FormData.growingSite} onChange={handleInputChange} ></input>
                <i className='icon'><FaCalendarAlt/></i>
                
             </div>
             <div className='sub-entry'>
                <label>Strength</label>
                <input  type="text" name ="strength" value={FormData.growingSite} onChange={handleInputChange}></input>
                
             </div>
             <div className='sub-entry'>
                <label>Falling date</label>
                <input  type="text" name ="FallingDate" value={FormData.growingSite} onChange={handleInputChange}></input>
                <i className='icon'><FaCalendarAlt/></i>
             </div>
             <div className='sub-entry'>
                <label>Quality</label>
                <input  type="text" name ="quality" value={FormData.growingSite} onChange={handleInputChange}></input>
                
             </div>
             <div className='sub-entry'>
                <label>Type</label>
                <input  type="text" name ="type" value={FormData.growingSite} onChange={handleInputChange}></input>
                
             </div>
             <div className='sub-entry'>
                <label>Durability</label>
                <input  type="text" name ="durability" value={FormData.growingSite} onChange={handleInputChange}></input>
                
             </div>
             <div className='sub-entry'>
                <label>Dimension</label>
                <input  type="text" name ="dimension" value={FormData.growingSite} onChange={handleInputChange}></input>
                
             </div>
             <div className='sub-entry'>
                <label>Notes</label>
                <input  type="text" name ="growingSite" value={FormData.growingSite} onChange={handleInputChange}></input>
                
                <i className='icon-note-1'><FiUpload/></i><i className='icon-note-2'><BsCamera/></i>
                
             </div>
             <div className='sub-entry'>
                <label>Workability</label>
                <input  type="text" name ="growingSite" value={FormData.growingSite} onChange={handleInputChange}></input>
               
             </div>         
             <div className='sub-entry'>
             <button className='btn btn-success'>Save</button>
             </div>
            <div className='sub-entry-cancel'>
            <button className='btn btn-success'>Cancel</button>
            </div>
            

        </form>
         
        
       
    );
}
