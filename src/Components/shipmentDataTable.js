
import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField, TablePagination, Checkbox, Menu, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci'
import { FiUpload } from 'react-icons/fi';
import { BsCamera } from 'react-icons/bs';

import ShippingForm from './shippingForm';
const shipmentDataTable = ({ user_compID }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [clickedRow, setClickedRow] = useState(null);
    const [openDialogforView, setOpenDialogforView] = useState(false);
    const [openDialogforEdit, setOpenDialogforEdit] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isUnshippedItemClicked, setIsUnshippedItemClicked] = useState(false);
    const [isduringtransportionClicked, setIsduringTransportation] = useState(false);
    const [shipmentdata, setShipmentData] = useState();
    console.log('before fetch:', user_compID);
    useEffect(() => {
        fetch('http://localhost:8081/shippingInformationList', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('API Response:', data);
                setData(data);
                console.log('after fetch:', user_compID);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }, [user_compID]);

    useEffect(() => {
        if (selectedRowData) {
            fetch('http://localhost:8081/shippingNameGrower', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${selectedRowData.logID}`
                }
            })
                .then(res => res.text())
                .then((data) => {
                    console.log('shipment before save', data);
                    setShipmentData(data);
                    console.log('shipment logid after fetch:', selectedRowData.logID);
                })
                .catch(err => console.log(err));
        }
    }, [selectedRowData]);

    const filteredData = Array.isArray(data)
        ? data.filter((row) => {
            return (
                (row.transMethod?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
                (row.expArrivalDate?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())

            );
        })
        : [];
    const handleShowAll = async (e) => {
        fetch('http://localhost:8081/showAllshippingInformationList', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('showAllAPI Response:', data);
                setData(data);
                console.log("show all filtered data:", filteredData);
                console.log("show all data to display:", filteredData);
                console.log('after fetch show all:', user_compID);
                setIsUnshippedItemClicked(false);

            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    const handleonlyunshippeditem = async (e) => {
        fetch('http://localhost:8081/onlyunShippedItemshippingInformationList', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('showOnly unshipped Response:', data);
                setData(data);
                console.log('after fetch show all:', user_compID);
                setIsUnshippedItemClicked(true);
                setIsduringTransportation(false);
                hanldegettingShipmentName();
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };
    const handleduringtransportionitem = async (e) => {
        fetch('http://localhost:8081/onlyduringtransportiontemshippingInformationList', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('showOnly During transport Response:', data);
                setData(data);
                console.log('after fetch show all:', user_compID);
                setIsUnshippedItemClicked(false);
                setIsduringTransportation(true);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));

    };
    const handleconfirmedtobeinstockitem = async (e) => {
        fetch('http://localhost:8081/confirmedTobeinstockitemshippingInformationList', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('showOnly During transport Response:', data);
                setData(data);
                console.log('after fetch show all:', user_compID);
                setIsUnshippedItemClicked(false);
                setIsduringTransportation(false);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
        setClickedRow(null);
    };
    const handleView = () => {
        console.log('View clicked');
        setOpenDialogforView(true);
        handleCloseMenu();
    };
    const [editedValues, setEditedValues] = useState({
        shippingName: '',
        shipAddress: '',
        shippingDestination: '',
        shipDate: '',
        shipment: '',
        transMethod: '',
        expArrivalDate: ''
    });
    const handleEdit = () => {

        setEditedValues({
            shippingName:selectedRowData.shippingName,
            shipAddress: selectedRowData.shipAddress,
            id: selectedRowData.id,
            shippingDestination: selectedRowData.shippingDestination,
            shipDate: selectedRowData.shipDate,
            shipment: shipmentdata,
            transMethod: selectedRowData.transMethod,
            expArrivalDate: selectedRowData.expArrivalDate,
        });
        setOpenDialogforEdit(true);
        handleCloseMenu();
    };
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8081/deleteteshipmentrowselected/${selectedRowData.logID}`, {
                method: 'PUT', // or 'PATCH' depending on your server implementation
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_compID}`,
                },
                body: JSON.stringify(editedValues),
            });

            if (response.ok) {
                // Update the local state or perform any necessary actions
                console.log('shipmement updated successfully');

                // Fetch the updated data from the server
                handleShowAll();
                handleonlyunshippeditem();
                handleduringtransportionitem();
                handleconfirmedtobeinstockitem();
                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setData(updatedData ?? []);
                } else {
                    console.error('Error fetching updated data');
                    // Handle error cases
                }
            } else {
                console.error('Failed to update shipment');
                // Handle error cases
            }
        } catch (error) {
            console.error('Error during shimpement updated:', error);

        }
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
    const handleFieldChange = (fieldName, value) => {
        setEditedValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };
    const handleCloseDialog = () => {
        setOpenDialogforEdit(false);
        setOpenDialogforView(false)
    };
    const handleSaveEditForm = async () => {
        try {
            const response = await fetch(`http://localhost:8081/updateshipmentInformation/${selectedRowData.logID}`, {
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
                // handleShowAll();
                handleonlyunshippeditem();
                //handleduringtransportionitem();
                //handleconfirmedtobeinstockitem();

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
    const handlePrint = () => {
        const printButton = document.getElementById('printButton');
        const returnButton = document.getElementById('returnButton');
        if (printButton) {
            printButton.style.display = 'none';
            returnButton.style.display = 'none';

            window.print();
            setOpenDialogforView(false);
        }

    };
    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        setSelectedRows(selectAll ? [] : data.map((row) => row.logID));
    };

    const handleCheckboxChange = (logID) => {
        const isSelected = selectedRows.includes(logID);
        if (isSelected) {
            setSelectedRows((prevSelected) => prevSelected.filter((id) => id !== logID));
        } else {
            setSelectedRows((prevSelected) => [...prevSelected, logID]);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Handle form submission. eg. send data to a server

        const allInputData = { logID: FormData.logID, shipment: shipmentdata, shippingDestination: FormData.shippingDestination, contactPerson: formData.contactPerson, shippingAddress: formData.shippingAddress, transportationMethod: formData.transportationMethod, loadingMethod: formData.loadingMethod, shippingDate: formData.shippingDate, expectedArrivalDate: formData.expectedArrivalDate, remarks: formData.remarks };

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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const [formData, setFormData] = useState({
        logID: '',
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
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const dataToDisplay = filteredData.slice(startIndex, endIndex);
    const columns = ['#', 'SHIPPING DESTINATION', 'SHIPPING ADDRESS', 'SHIPPING DATE', 'SHIPMENT', 'METHOD OF TRANSPORT', 'EXPECTED ARRIVAL DATE', 'ACTION'];
    return (
        <div>
            <h1>Shipping Information List </h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <button className='btn' onClick={handleShowAll}> Show all</button>
                <button className='btn' onClick={handleonlyunshippeditem}>only unshipped items</button>
                <button className='btn' onClick={handleduringtransportionitem}>only during transportation</button>
                <button className='btn' onClick={handleconfirmedtobeinstockitem}>Only  confirmed to be in stock </button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {isduringtransportionClicked &&
                                    <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
                                }
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell key={column}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataToDisplay.map((row, index) => (
                            <TableRow key={row.id} onClick={(event) => handleRowClick(row, event)}

                                style={{ backgroundColor: selectedRows.includes(row.logID) ? 'lightblue' : (clickedRow === row.logID ? 'lightblue' : 'inherit') }}>
                                <TableCell>
                                    {isduringtransportionClicked && 
                                        <Checkbox
                                            checked={selectedRows.includes(row.logID)}
                                            onChange={() => handleCheckboxChange(row.logID)}
                                        />
                                    }
                                </TableCell>
                                <TableCell>{row.shippingName}</TableCell>
                                <TableCell>{row.shippingDestination}</TableCell>
                                <TableCell>{row.shipAddress}</TableCell>
                                <TableCell>{row.shipDate}</TableCell>
                                <TableCell>{row.shipment}</TableCell>
                                <TableCell>{row.transMethod}</TableCell>
                                <TableCell>{row.expArrivalDate}</TableCell>
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
                                       
                                        {isduringtransportionClicked && [
                                            <MenuItem key="arrivalconfirmation" onClick={handleEdit}>Arrival Confirmation</MenuItem>,
                                            <MenuItem key="cancellation" onClick={handleDelete}>Cancellation</MenuItem>
                                        ]}
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className='pagination'>
                    <button className='btn' onClick={() => setPage(page - 1)} disabled={page === 1}>
                        Previous
                    </button>
                    <span>{`Page ${page}`}</span>
                    <button className='btn' onClick={() => setPage(page + 1)}
                        disabled={endIndex >= filteredData.length}
                    >
                        Next
                    </button>
                </div>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {selectedRows.length > 0 && (
                    <button className='btn'>Bulk deletion</button>
                )}
                <button className='btn'>Return</button>
            </div>
            <Dialog open={openDialogforEdit} onClose={handleCloseDialog} fullWidth maxWidth="lg">
                <DialogContent >
                    {selectedRowData && (
                        <div>
                            <form>
                                <h1>Shipping Information Registration</h1>
                                <div className='form-cont'>
                                    <div className='sub-entry'>
                                        <input type='text' value={editedValues.shippingName} onChange={(e) => handleFieldChange('shippingName', e.target.value)} />
                                    </div>
                                    <div className='sub-entry'>
                                        <input type='text' value={shipmentdata} onChange={(e) => handleFieldChange('shipment', e.target.value)} />
                                    </div>
                                    <div className='sub-entry'>
                                        <input type='input' name="shipping Date" value={editedValues.shipDate} onChange={(e) => handleFieldChange('shipDate', e.target.value)} />
                                    </div>

                                    <div className='sub-entry'>
                                        <input type='input' name="shipping address" value={editedValues.shipAddress} onChange={(e) => handleFieldChange('shipAddress', e.target.value)} />
                                    </div>
                                    <div className='sub-entry'>
                                        <input type='input' name="Transportation method" value={editedValues.transMethod} onChange={(e) => handleFieldChange('transMethod', e.target.value)} />
                                    </div>
                                    <div className='sub-entry'>
                                        <input type='input' name="Expected Arrival Date" value={editedValues.expArrivalDate} onChange={(e) => handleFieldChange('expArrivalDate', e.target.value)} />
                                    </div>
                                    <div className='sub-entry'>
                                        <input type='input' name="Remarks" value={editedValues.remarks} onChange={(e) => handleFieldChange('remarks', e.target.value)} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </DialogContent>
                <DialogActions className='dialogActions'>
                    <button onClick={handleSaveEditForm} color="primary" >
                        Save
                    </button>
                    <button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDialogforView} onClose={handleCloseDialog} fullWidth maxWidth="lg" >
                <DialogContent >
                    {selectedRowData && (
                        <div>
                            <form onSubmit={handleSubmit}>
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
                                        <button className='btn' id="returnButton" onClick={handleCloseDialog}>Cancel</button>
                                    </div>
                                    <div className='sub-entry'>
                                        <input type="text" name="transportationMethod" required="required" value={FormData.transportationMethod} onChange={handleInputChange} placeholder='Transportation Method'></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default shipmentDataTable;
