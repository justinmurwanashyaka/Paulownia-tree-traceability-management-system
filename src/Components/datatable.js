import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField, Checkbox, Menu, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, grid2Classes } from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';
import { BsFillImageFill } from 'react-icons/bs';
import QRCode from 'react-qr-code';
import Form from './form';
import { FiUpload } from 'react-icons/fi';
import { BsCamera } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const CameraCapture = ({ onCapture, onClose, onImageUpdate, setEditedValues }) => {
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
                    setEditedValues((prevData) => ({ ...prevData, remarks: fileName, img: filePath }));
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
        <div className="camera-dialog" style={{ textAlign: 'center' }}>
            {video && (
                <video
                    autoPlay
                    playsInline
                    ref={(ref) => (ref ? (ref.srcObject = stream) : null)}
                    style={{ width: '20%', height: '10%' }}
                />
            )} <br />
            <button onClick={() => handleCapture(video)} style={{ width: '10%' }}>Capture</button>
            &nbsp;&nbsp;
            <button onClick={onClose} style={{ width: '10%' }}>Cancel</button>
        </div>
    );
}

const DataTable = ({ user_compID, stream }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [error, setError] = useState(null);
    const [clickedRow, setClickedRow] = useState(null);
    const [openDialogforView, setOpenDialogforView] = useState(false);
    const [openDialogforEdit, setOpenDialogforEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [isViewEditModalOpen, setIsViewEditModalOpen] = useState(false);
    const rowsPerPage = 20;
    const [openDialogforPrintQR, setOpenDialogforPrintQR] = useState(false);
    const [editedValues, setEditedValues] = useState();
    const [typeOptions, setTypeOptions] = useState([]);
    const [shapeOptions, setShapeOptions] = useState([]);
    const [qualityOptions, setQualityOptions] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [userChoice, setUserChoice] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [imageURL, setImageURL] = useState('');
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const updateImageURL = (url) => { setImageURL(url); };
    const navigate = useNavigate();


    const openCamera = () => {
        setUserChoice('camera');
        setIsCameraOpen(true);
        setUserChoice('');

    };
    const closeCamera = () => {
        setUserChoice('');
        setIsCameraOpen(false);
    };
    const handleEdit = () => {
        setEditedValues({
            growDay: formatDate(selectedRowData.growDay),
            growPlace: selectedRowData.growPlace,
            type: selectedRowData.type,
            size: selectedRowData.size,
            shape: selectedRowData.shape,
            strength: selectedRowData.strength,
            situation: selectedRowData.situation,
            quality: selectedRowData.quality,
            durability: selectedRowData.durability,
            remarks: selectedRowData.remarks,
            processability: selectedRowData.processability,
            img: selectedRowData.img_file,
            fellDate: formatDate(selectedRowData.fellDate),

        });
        setOpenDialogforEdit(true);
        handleCloseMenu();
    };
    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        return dateObject.toISOString().split('T')[0];
    };
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8081/deleteteLogsrowselected/${selectedRowData.logID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_compID}`,
                },
                body: JSON.stringify(editedValues),
            });
            if (response.ok) {

                console.log('Tree updated successfully');

                const updatedResponse = await fetch('http://localhost:8081/logsinformationView', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user_compID}`
                    }
                });
                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setData(updatedData ?? []);
                } else {
                    console.error('Error fetching updated data');

                }
            } else {
                console.error('Failed to update tree');

            }
        } catch (error) {
            console.error('Error during tree update:', error);

        }
    };
    const handleFieldChange = (fieldName, value) => {
        setEditedValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };
    const handleSaveEditForm = async () => {
        try {
            const response = await fetch(`http://localhost:8081/updateLogInformation/${selectedRowData.logID}`, {
                method: 'PUT', // or 'PATCH' depending on your server implementation
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_compID}`,
                },
                body: JSON.stringify(editedValues),
            });

            if (response.ok) {
                // Update the local state or perform any necessary actions
                console.log('Tree updated successfully');

                // Fetch the updated data from the server
                setMessage(' 正常に更新されました');
                setTimeout(() => {
                    setMessage('');
                }, 6000);
                const updatedResponse = await fetch('http://localhost:8081/logsinformationView', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user_compID}`
                    }
                });

                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setData(updatedData ?? []);
                } else {
                    console.error('Error fetching updated data');

                }
            } else {
                console.error('Failed to update tree');

            }
        } catch (error) {
            console.error('Error during tree update:', error);

        }

        setOpenDialogforEdit(false);
    };
    const handleBulkDeletion = async () => {
        try {
            const response = await fetch('http://localhost:8081/bulkDeletionLogsInformation', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_compID}`,
                },
                body: JSON.stringify({ logIDs: selectedRows }),
            });
            if (response.ok) {
                console.log('deleted successfully');
                const updatedResponse = await fetch('http://localhost:8081/logsinformationView', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user_compID}`
                    }
                });
                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setData(updatedData ?? []);
                } else {
                    console.error('Error fetching updated data');
                    // Handle error cases
                }
            } else {
                console.error('Failed to update tree');
                // Handle error cases
            }
        } catch (error) {
            console.error('Error during tree update:', error);
            // Handle error cases
        }
        setOpenDialogforEdit(false);
    };
    useEffect(() => {
        fetch('http://localhost:8081/logsinformationView', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((responseData) => {
                console.log('Data received:', responseData);
                setData(responseData ?? []);
                if (responseData.length > 0) {
                    const initialRow = responseData[0];
                    setEditedValues({
                        growDay: formatDate(initialRow.growDay),
                        growPlace: initialRow.growPlace,
                        type: initialRow.type,
                        size: initialRow.size,
                        shape: initialRow.shape,
                        strength: initialRow.strength,
                        situation: initialRow.situation,
                        quality: initialRow.quality,
                        durability: initialRow.durability,
                        remarks: initialRow.remarks,
                        processability: initialRow.processability,
                        img: initialRow.img,
                        fellDate: formatDate(initialRow.fellDate),
                    });
                }
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError(err);
            });
    }, [user_compID]);
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

    const handleCheckboxChange = (logID) => {
        const isSelected = selectedRows.includes(logID);
        if (isSelected) {
            setSelectedRows((prevSelected) => prevSelected.filter((id) => id !== logID));
        } else {
            setSelectedRows((prevSelected) => [...prevSelected, logID]);
        }
    };
    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        setSelectedRows(selectAll ? [] : dataToDisplay.map((row) => row.logID));
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
        setClickedRow(null);
    };
    const handleRowClick = (row, event) => {
        const isCheckboxClick = event.target.type === 'checkbox';
        const isCiMenuKebabClick = event.target.closest('.ci-menu-kebab') !== null;
        if (isCiMenuKebabClick) {
            setSelectedRowData(row);
            setAnchorEl(event.currentTarget);
            setClickedRow(row.logID);
        }
    };
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (anchorEl && !anchorEl.contains(event.target)) {
                handleCloseMenu();
            }
        };
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [anchorEl]);
    const handleView = () => {
        console.log('View clicked');
        setOpenDialogforView(true);
        handleCloseMenu();
    };
    const handleCloseDialog = () => {
        setOpenDialogforEdit(false);
        setOpenDialogforView(false);
        setOpenDialogforPrintQR(false);
        setUserChoice('');
        setImageURL('');
        const navigate = useNavigate();
        navigate('/LogSearchList');
        //setEditedValues({ ...editedValues, note: '', img: '' });
    };
    const handlePrint = () => {
        const printButton = document.getElementById('printButton');
        const printButton2 = document.getElementById('printButton2');
        const returnButton = document.getElementById('returnButton');
        const titledialog = document.getElementById('titledialog');
        if (printButton2 && printButton && returnButton && titledialog) {
            printButton.style.display = 'none';
            printButton2.style.display = 'none';
            returnButton.style.display = 'none';
            titledialog.style.display = 'none';
            window.print();
            setOpenDialogforView(false);
            setOpenDialogforPrintQR(false);
        }
    };
    const handlePrint2 = () => {
        const printButton2 = document.getElementById('printButton2');
        const returnButton = document.getElementById('returnButton');
        const titledialog = document.getElementById('titledialog');
        if (printButton2 && returnButton && titledialog) {
            printButton2.style.display = 'none';
            returnButton.style.display = 'none';
            titledialog.style.display = 'none';
            window.print();
            setOpenDialogforView(false);
            setOpenDialogforPrintQR(false);
            openNewPage();
        }
    };
    const handlePrintQRCode = () => {
        setOpenDialogforPrintQR(true);
        handleCloseMenu();
    };
    const generateQRCodeLink = () => {
        const link = `http://localhost:3000/view-data?growingPlace=${selectedRowData.growingPlace}&=${selectedRowData.growDay}`;
        return link;
    };
    const openNewPage = () => {
        const qrCodeLink = generateQRCodeLink();
        window.open(qrCodeLink, '_blank');
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

                    setEditedValues((prevData) => ({ ...prevData, remarks: file.name, img: filePath }));
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
        handleCaptureOrUpload();
    };

    const handleUploadIconClick = () => {
        setUserChoice('upload');
        handleCaptureOrUpload();
    };
    const handleDeleteImage = () => {

        setUserChoice('');
        setImageURL('');
        setEditedValues({ ...editedValues, note: '', img: '' });
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
    const filteredData = Array.isArray(data)
        ? data.filter((row) => {
            return (
                (row.growPlace?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
                (row.growDay?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
                (row.typename?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
                (row.size?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
                (row.shapename?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
                (row.qualityname?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
            );
        }) : [];
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const dataToDisplay = filteredData.slice(startIndex, endIndex);
    const columns = ['#', 'GROWING SITE', 'GROWING DAY', 'TYPE', 'SIZE', 'SHAPE', 'SITUATIN', 'QUALITY', 'REMARKS', 'ACTION'];
    const columns1 = ['date', 'process', 'product name', 'quality', 'place', 'size', 'compatible company', 'situation'];
    // const columns = ['#', '生育場所', '生育日', '種別', '寸法', '形状', '状態', '品質', '備考', 'アクション'];
    return (
        <div className='table-container'>
            <h1>Log Information Search List</h1>
            {/* <h1>原木情報検索</h1> */}
            <TextField
                //label="Search"
                label="検索"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column}>{column}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataToDisplay.map((row, index) => (
                                <TableRow key={row.logID} onClick={(event) => handleRowClick(row, event)}
                                    style={{ backgroundColor: selectedRows.includes(row.logID) ? 'lightblue' : (clickedRow === row.logID ? 'lightblue' : 'inherit') }}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.includes(row.logID)}
                                            onChange={() => handleCheckboxChange(row.logID)}
                                        />
                                    </TableCell>
                                    <TableCell>{startIndex + index + 1}</TableCell>
                                    <TableCell>{row.growPlace}</TableCell>
                                    <TableCell>{formatDate(row.growDay)}</TableCell>
                                    <TableCell>{row.typename}</TableCell>
                                    <TableCell>{row.size}</TableCell>
                                    <TableCell>{row.shapename}</TableCell>
                                    <TableCell style={{ color: 'green' }}>pre-shipped</TableCell>
                                    <TableCell>{row.qualityname}</TableCell>
                                    <TableCell>
                                        {row.img_file && (
                                            <a href={`http://localhost:8081/${row.img_file}`} target="_blank" rel="noopener noreferrer">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>

                                                    <span>{row.remarks}</span>
                                                </div>
                                            </a>
                                        )}
                                    </TableCell>


                                    <TableCell>
                                        <IconButton className="ci-menu-kebab" onClick={(event) => handleRowClick(row, event)}>
                                            <CiMenuKebab />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleCloseMenu}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                        >
                                            {/* <MenuItem onClick={handleView}>View</MenuItem> */}
                                            <MenuItem onClick={handleView}>ビュー</MenuItem>
                                            {/* <MenuItem onClick={handleEdit}>Edit</MenuItem> */}
                                            <MenuItem onClick={handleEdit}>編集</MenuItem>
                                            {/* <MenuItem onClick={handleDelete}>Delete</MenuItem> */}
                                            <MenuItem onClick={handleDelete}>消去</MenuItem>
                                            {/* <MenuItem onClick={handlePrintQRCode}>Print QR Code</MenuItem> */}
                                            <MenuItem onClick={handlePrintQRCode}> QRコードを印刷する</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className='pagination'>
                        <button className='btn' onClick={() => setPage(page - 1)} disabled={page === 1}>
                            Previous
                            {/* 前ページ */}
                        </button>
                        <span>{`Page ${page}`}</span>
                        <button className='btn' onClick={() => setPage(page + 1)}
                            disabled={endIndex >= filteredData.length}
                        >
                            {/* 次ページ */}
                            Next
                        </button>
                    </div>
                </TableContainer>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {selectedRows.length > 0 && (
                    <button className='btn' onClick={handleBulkDeletion}>Bulk deletion</button>
                    // <button className='btn' onClick={handleBulkDeletion}>一括削除</button> 

                )}
                {/* <button className='btn'>Return</button> */}
                <button className='btn'> 戻る</button>
            </div>
            <Dialog open={openDialogforEdit} onClose={handleCloseDialog} fullWidth maxWidth="lg" maxHeight='auto'>
                <DialogContent >
                    {selectedRowData && (
                        <div>
                            <form >
                                <h1>Edit Log Information </h1>
                                {/* <h1>ログ情報を編集する</h1> */}
                                <div className='sub-entry'>
                                    <label>growing Day</label>
                                    {/* <label>生育日</label> */}
                                    <input type="date" name="Grow Day" value={formatDate(editedValues.growDay)} onChange={(e) => handleFieldChange('growDay', e.target.value)}
                                    />
                                </div>
                                <div className='sub-entry'>
                                    <label>Growing Place</label>
                                    {/* <label>生育場所</label> */}
                                    <input type="text" name="Grow Place" value={editedValues.growPlace} onChange={(e) => handleFieldChange('growPlace', e.target.value)}>
                                    </input>
                                </div>
                                <div className='sub-entry'>
                                    <label>Felling Date</label>
                                    {/* <label>伐採日</label> */}
                                    <input type="date" name="Felling Date" value={formatDate(editedValues.fellDate)} onChange={(e) => handleFieldChange('fellDate', e.target.value)}
                                    />
                                </div>
                                <div className='sub-entry'>
                                    {/* <label>種別</label> */}
                                    <label>Type</label>
                                    <select name="type" value={editedValues.type} onChange={(e) => handleFieldChange('type', e.target.value)}>
                                        {typeOptions && Array.isArray(typeOptions) && typeOptions.map((option) => (
                                            <option key={option.m_id} value={option.m_id}>
                                                {option.m_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='sub-entry'>
                                    <label>Size</label>
                                    {/* <label>寸法</label> */}
                                    <input type='text' value={editedValues.size} onChange={(e) => handleFieldChange('size', e.target.value)} />
                                </div>
                                <div className='sub-entry'>
                                    <label>shape</label>
                                    {/* <label>形状</label> */}
                                    <select name="shape" value={editedValues.shape} onChange={(e) => handleFieldChange('shape', e.target.value)}>
                                        {shapeOptions && Array.isArray(shapeOptions) && shapeOptions.map((option, index) => (
                                            <option key={option.m_id} value={option.m_id}>
                                                {option.m_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='sub-entry'>
                                    <label>strength</label>
                                    {/* <label>強度</label> */}
                                    <input type='text' value={editedValues.strength} onChange={(e) => handleFieldChange('shape', e.target.value)} />
                                </div>
                                <div className='sub-entry'>
                                    <label>durability</label>
                                    {/* <label>耐久性</label> */}
                                    <input type='text' value={editedValues.durability} onChange={(e) => handleFieldChange('durability', e.target.value)} />
                                </div>
                                <div className='sub-entry'>
                                    <label>Quality</label>
                                    {/* <label>品質</label> */}
                                    <select name="quality" required="required" value={editedValues.quality} onChange={(e) => handleFieldChange('quality', e.target.value)}>
                                        {qualityOptions && Array.isArray(qualityOptions) && qualityOptions.map((option) => (
                                            <option key={option.m_id} value={option.m_id}>
                                                {option.m_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="sub-entry">
                                    <label>
                                        {editedValues.img_file && (
                                            <a href={`http://localhost:8081/${editedValues.img_file}`} target="_blank" rel="noopener noreferrer">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    {/* <span>{editedValues.remarks}</span> */}
                                                </div>
                                            </a>
                                        )}
                                    </label>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <label style={{ marginBottom: '10px' }}>Remarks</label>
                                        <label>{editedValues.remarks}</label>
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
                                                        <span>{editedValues.remarks}</span>
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
                                            <i className="icon-note-2" onClick={openCamera} style={{ fontSize: '44px', marginLeft: '180px', cursor: 'pointer', color: '#248771' }}>
                                                <BsCamera />
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                    }
                </DialogContent >
                {isCameraOpen && (
                    <CameraCapture
                        onCapture={captureImageFromCamera}
                        onClose={closeCamera}
                        onImageUpdate={updateImageURL}
                        setEditedValues={setEditedValues}
                        stream={stream}
                    />
                )}
                <DialogActions className='dialogActions'>
                    <button onClick={handleSaveEditForm}>
                        Submit
                        {/* 保存 */}
                    </button>
                    <button onClick={handleCloseDialog}>
                        {/* キャンセル */}
                        Cancel
                    </button>
                </DialogActions>
            </Dialog >
            <Dialog open={openDialogforView} onClose={handleCloseDialog} className='dialog' fullWidth maxWidth="lg">
                <h1 style={{ margin: "20px 10px" }}>Traceability information list</h1>
                <h3 style={{ margin: "10px" }}>Log Information</h3>
                <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '30px', margin: '10px' }}>
                    <DialogContent className='dialogcontent'>
                        {selectedRowData && (
                            <div>
                                <label style={{ fontWeight: 'bold' }}>{selectedRowData.growDay}</label>
                                <label style={{ fontWeight: 'bold' }}>{selectedRowData.growPlace}</label>
                                <label style={{ fontWeight: 'bold' }}>{selectedRowData.fellDate}</label>
                                <label style={{ fontWeight: 'bold' }}>{selectedRowData.type}</label>
                                <label style={{ fontWeight: 'bold' }}>{selectedRowData.size}</label>
                                <label style={{ fontWeight: 'bold' }}>{selectedRowData.shape}</label>
                                <label style={{ fontWeight: 'bold' }}>{selectedRowData.strength}</label>
                                <label style={{ fontWeight: 'bold' }}>{selectedRowData.quality}</label>
                                <label style={{ fontWeight: 'bold' }}>{selectedRowData.durability}</label>
                                <label style={{ fontWeight: 'bold' }}>{selectedRowData.remarks}</label>
                            </div>
                        )}
                    </DialogContent>
                </div>
                <div style={{ margin: "10px" }}>
                    <h3>History Information</h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns1.map((column) => (
                                    <TableCell key={column}>{column}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    </Table>
                </div>
                <DialogActions className='dialogActions'>
                    <button id="printButton" onClick={handlePrint} color="primary" >
                        {/* Print */}
                        印刷する
                    </button>
                    <button id="returnButton" onClick={handleCloseDialog} color="primary">
                        近い
                        {/* Return */}
                    </button>
                </DialogActions>
            </Dialog >
            <Dialog open={openDialogforPrintQR} onClose={handleCloseDialog} className='dialog' fullWidth maxWidth="md">
                {/* <h1 id='titledialog' style={{ textAlign: 'center' }}>Print QR Code</h1> */}
                <h1 id='titledialog' style={{ textAlign: 'center' }}>QRコードを印刷する</h1>
                <DialogContent className='dialogcontent' style={{ textAlign: 'center' }}>
                    {selectedRowData && (
                        <div style={{ textAlign: 'center' }}>
                            <QRCode value={generateQRCodeLink()} />
                        </div>
                    )}
                </DialogContent>
                <DialogActions className='dialogActions' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <button id="printButton2" onClick={handlePrint2} color="primary">
                        {/* Print */}
                        印刷する
                    </button>
                    <button id="returnButton" onClick={() => setOpenDialogforPrintQR(false)} color="primary">
                        近い
                        {/* Close */}
                    </button>
                </DialogActions>
            </Dialog>
        </div >
    );
};
export default DataTable;
