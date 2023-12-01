import React, { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { BsCamera } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import 'formdata-polyfill';

const initialFormData = {
   growingSite: '',
   shape: '',
   plantingDate: '',
   strength: '',
   fallingDate: '',
   quality: '',
   type: '',
   size: '',
   dimension: '',
   note: '',
   durability: '',
   processability: '',
   img: ''
};
const CameraCapture = ({ onCapture, onClose, onImageUpdate, setFormData }) => {
   const [stream, setStream] = useState(null);
   const [video, setVideo] = useState(null);

   useEffect(() => {
      const setupCamera = async () => {
         try {
            const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(cameraStream);

            const videoElement = document.createElement('video');
            videoElement.srcObject = cameraStream;
            videoElement.play();
            setVideo(videoElement);
         } catch (error) {
            console.error('Error setting up camera:', error);
         }
      };

      setupCamera();

      return () => {
         if (stream) {
            stream.getTracks().forEach((track) => track.stop());
         }
      };
   }, []);

   const handleCapture = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
         try {
            const dataUrl = await createObjectURL(blob);
            onCapture(blob);
            onImageUpdate(dataUrl);

            const response = await fetch(dataUrl);
            const blobData = await response.blob();

            const formData = new FormData();
            const fileName = 'camera_capture.png'; // Set the desired file name with .png extension
            formData.append('file', blobData, fileName);

            const uploadResponse = await fetch('http://localhost:8081/upload', {
               method: 'POST',
               body: formData,
            });

            if (uploadResponse.ok) {
               const { filePath } = await uploadResponse.json();
               setFormData((prevData) => ({ ...prevData, note: fileName, img: filePath }));
               console.log('Camera capture uploaded successfully');
            } else {
               console.error('Failed to upload camera capture:', uploadResponse.statusText);
            }

            onClose();
         } catch (error) {
            console.error('Error handling camera capture:', error);
         }
      }, 'image/png');
   };


   const createObjectURL = (blob) => {
      return new Promise((resolve) => {
         const reader = new FileReader();
         reader.onloadend = () => resolve(reader.result);
         reader.readAsDataURL(blob);
      });
   };
   return (
      <div className="camera-dialog" style={{ marginLeft: '400px' }}>
         {video && (
            <video
               autoPlay
               playsInline
               ref={(ref) => (ref ? (ref.srcObject = stream) : null)}
               style={{ width: '20%', height: '20%' }}
            />
         )} <br />
         <button onClick={() => handleCapture(video)} style={{ width: '10%' }}>Capture</button>
         &nbsp;&nbsp;
         <button onClick={onClose} style={{ width: '10%' }}>Cancel</button>
      </div>
   );
}
export default function Form({ userid, user_compID, stream }) {

   const [typeOptions, setTypeOptions] = useState([]);
   const [shapeOptions, setShapeOptions] = useState([]);
   const [qualityOptions, setQualityOptions] = useState([]);
   const [formData, setFormData] = useState(initialFormData);
   const [message, setMessage] = useState('');
   const [imageURL, setImageURL] = useState('');
   const [userChoice, setUserChoice] = useState(null);
   const navigate = useNavigate();
   const [fileInputKey, setFileInputKey] = useState(0);
   const [isCameraOpen, setIsCameraOpen] = useState(false);
   const updateImageURL = (url) => { setImageURL(url); };

   const openCamera = () => {
      setUserChoice('camera');
      setIsCameraOpen(true);
      setUserChoice('');

   };
   const closeCamera = () => {
      setUserChoice('');
      setIsCameraOpen(false);
   };



   const handleFileInputChange = async (e) => {

      const file = e.target.files[0];


      if (file && file.type.startsWith('image/')) {
         try {
            const dataUrl = await readFileAsDataURL(file);

            setImageURL(dataUrl);

            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:8081/upload', {
               method: 'POST',
               body: formData,
            });

            if (response.ok) {
               const { filePath } = await response.json();

               setFormData((prevData) => ({ ...prevData, note: file.name, img: filePath }));
               console.log('File uploaded successfully');
            } else {
               console.error('Failed to upload file:', response.statusText);
            }
         } catch (error) {
            console.error('Error reading or uploading file:', error);
         }
      } else {
         console.error('Please select a valid image file.');
      }

      setFileInputKey((prevKey) => prevKey + 1);
   };


   const readFileAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.onloadend = () => resolve(reader.result);
         reader.onerror = reject;
         reader.readAsDataURL(file);
      });
   };
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };
   useEffect(() => {
      fetch('http://localhost:8081/typeOptions')
         .then((response) => response.json())
         .then((data) => setTypeOptions(data))
         .catch((error) => console.error(error));
      fetch('http://localhost:8081/shapeOptions')
         .then((response) => response.json())
         .then((data) => setShapeOptions(data))
         .catch((error) => console.error(error));


      fetch('http://localhost:8081/qualityOptions')
         .then((response) => response.json())
         .then((data) => setQualityOptions(data))
         .catch((error) => console.error(error));
   }, []);

   const captureImageFromCamera = async (video) => {
      try {
         return new Promise((resolve) => {
            video.onloadeddata = () => {
               const canvas = document.createElement('canvas');
               canvas.width = video.videoWidth;
               canvas.height = video.videoHeight;
               const context = canvas.getContext('2d');
               context.drawImage(video, 0, 0, canvas.width, canvas.height);

               canvas.toBlob((blob) => {
                  resolve(blob);
                  onImageUpdate(canvas.toDataURL());
               }, 'image/png');
            };
         });
      } catch (error) {
         console.error('Error capturing image from the camera:', error);
         throw error;
      }
   };




   const handleCameraIconClick = () => {
      setUserChoice('camera');
      setIsCameraOpen(true);
      // handleCaptureOrUpload();

   };
   const handleUploadIconClick = () => {

      setUserChoice('upload');
      handleCaptureOrUpload();
   };
   const handleDeleteImage = () => {

      setUserChoice('');
      setImageURL('');
      setFormData({ ...formData, remarks: '', img: '' });
   };

   const handleCaptureOrUpload = async () => {
      if (userChoice === 'upload') {
         document.getElementById('fileInput').click();
         setUserChoice('');
      } else if (userChoice === 'camera') {
         handleCapture();
         setUserChoice('');
      }
   };




   let resjson;
   const handleSubmit = async (e) => {
      e.preventDefault();
      const allInputData = { growingSite: formData.growingSite, shape: formData.shape, plantingDate: formData.plantingDate, strength: formData.strength, fallingDate: formData.fallingDate, quality: formData.quality, type: formData.type, size: formData.size, durability: formData.durability, dimension: formData.dimension, note: formData.note, durability: formData.durability, processability: formData.processability, img: formData.img };
      console.log("compid before submitting :", user_compID);
      console.log("userid before submitting :", userid);

      let res = await fetch("http://localhost:8081/logRegistration", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userid} ${user_compID}`
         },
         body: JSON.stringify(allInputData)
      });

      resjson = await res.json();

      if (res.status === 200) {

         setMessage(resjson.success || 'Successfully Inserted');
         setImageURL('');
         setFormData({ ...formData, note: '' });
         setFormData(initialFormData);
         console.log("after instering to database")
         setTimeout(() => {
            setMessage('');
         }, 6000);
      } else {
         setMessage(`Error: ${resjson.error || "Some error occurred."}`);
         console.error(resjson);
      }
      console.log(allInputData)
   };
   const handleCancel = () => {
      setFormData(initialFormData);
      navigate('/LogSearchList');
   };
   return (
      <div>
         <form className="container" onSubmit={handleSubmit}>
            <h1>Log Information Registration</h1>
            {message && <div className={`alert ${resjson && resjson.status !== 200 ? 'error' : ''}`}>{message}</div>}
            <div className='form-cont'>
               <div className='sub-entry'>
                  <input type="text" name="growingSite" value={formData.growingSite} onChange={handleInputChange} placeholder='Growing Site'>
                  </input>
               </div>
               <div className='sub-entry'>
                  <select name="shape" value={formData.shape} onChange={handleInputChange}>
                     <option value="">Select Shape</option>
                     {shapeOptions && Array.isArray(shapeOptions) && shapeOptions.map((option, index) => (
                        <option key={option.m_id} value={option.m_id}>
                           {option.m_name}
                        </option>
                     ))}
                  </select>
               </div>
               <div className='sub-entry'>
                  <label>Growing Day</label>
                  <input type="date" name="plantingDate" required="required" value={formData.plantingDate} onChange={handleInputChange} placeholder='Planting Date' ></input>
               </div>
               <div className='sub-entry'>
                  <input type="text" name="strength" required="required" value={formData.strength} onChange={handleInputChange} placeholder='Strength'></input>
               </div>
               <div className='sub-entry'>
                  <label>falling Date</label>
                  <input type="date" name="fallingDate" required="required" value={formData.fallingDate} onChange={handleInputChange} placeholder='Falling Date'></input>
               </div>
               <div className='sub-entry'>
                  <input type="text" required="required" name="durability" value={formData.durability} onChange={handleInputChange} placeholder='Durability'></input>
               </div>
               <div className='sub-entry'>
                  <select name="quality" required="required" value={formData.quality} onChange={handleInputChange}>
                     <option value="">Select Quality</option>
                     {qualityOptions && Array.isArray(qualityOptions) && qualityOptions.map((option) => (
                        <option key={option.m_id} value={option.m_id}>
                           {option.m_name}
                        </option>
                     ))}
                  </select>
               </div>
               <div className='sub-entry'>
                  <select name="type" value={formData.type} onChange={handleInputChange}>
                     <option value="">Select Type</option>
                     {typeOptions && Array.isArray(typeOptions) && typeOptions.map((option) => (
                        <option key={option.m_id} value={option.m_id}>
                           {option.m_name}
                        </option>
                     ))}
                  </select>
               </div>
               <div className='sub-entry'>
                  <input type="text" name="size" required="required" value={formData.size} onChange={handleInputChange} placeholder='size'></input>
               </div>
               <div className='sub-entry'>
                  <input type="text" name="dimension" required="required" value={formData.dimension} onChange={handleInputChange} placeholder='Dimension'></input>
               </div>
               <div className='sub-entry'>
                  <input type="text" name="durability" required="required" value={formData.durability} onChange={handleInputChange} placeholder='Durability'></input>
               </div>
               <div className='sub-entry'>
                  <input type="text" name="processability" required="required" value={formData.processability} onChange={handleInputChange} placeholder='Processability'></input>
               </div>
               <div className="sub-entry">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <label style={{ marginBottom: '10px' }}>Remarks</label>
                     <div style={{ display: 'flex' }}>
                        <label htmlFor="fileInput" onClick={handleUploadIconClick} style={{ cursor: 'pointer', color: '#248771' }}>
                           <FiUpload size={44} />
                           <input
                              key={fileInputKey}
                              id="fileInput"
                              type="file"
                              accept="image/*"
                              onChange={handleFileInputChange}
                              style={{ display: 'none' }}
                              disabled={userChoice === 'camera'}
                           />
                        </label>
                        <label>
                           {imageURL && (
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                 <img
                                    src={imageURL}
                                    alt="Selected"
                                    style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                                 />
                                 <span>{formData.note}</span>
                                 <i
                                    className="delete-icon"
                                    onClick={handleDeleteImage}
                                    style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }}
                                 >
                                    Delete
                                 </i>
                              </div>
                           )}
                        </label>
                        <i className="icon-note-2" onClick={handleCameraIconClick} style={{ fontSize: '44px', marginLeft: '180px', cursor: 'pointer', color: '#248771' }}>
                           <BsCamera />
                        </i>

                     </div>
                  </div>
               </div>
               <div className='sub-entry'>
                  <button className='btn'>Save</button>
                  <button className='btn' type="button" onClick={handleCancel}>Cancel</button>
               </div>
            </div>

         </form>

         {isCameraOpen && (
            <CameraCapture
               onCapture={captureImageFromCamera}
               onClose={closeCamera}
               onImageUpdate={updateImageURL}
               setFormData={setFormData}
               stream={stream}
            />
         )}
      </div>

   );
}
