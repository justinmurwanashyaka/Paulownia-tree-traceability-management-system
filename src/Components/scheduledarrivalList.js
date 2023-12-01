import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, Checkbox, Menu, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Scheledarrivallist = ({ user_compID }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [clickedRow, setClickedRow] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isduringtransportionClicked, setIsduringTransportation] = useState(false);
    const [page, setPage] = useState(1);

    const rowsPerPage = 5;
    useEffect(() => {
        fetch('http://localhost:8081/scheduledArrivallist', {
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
                console.log('Data received shiplist:', responseData);
                setData(responseData ?? []);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError(err);
            });
    }, [user_compID]);
    const filteredData = Array.isArray(data)
        ? data.filter((row) => {
            return (
                (row.shippingsource?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
                (row.shippingName?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
                (row.shipDate?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
            );
        })
        : [];
    const handleShowAll = async (e) => {
        fetch('http://localhost:8081/showAllscheduledArrivallist', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('showAllAPI Response:', data);
                setData(data);
                console.log('after fetch show all:', user_compID);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };
    const handleonlyintransport = async (e) => {
        fetch('http://localhost:8081/showonlyintransportcheduledArrivallist', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('showAllAPI Response:', data);
                setData(data);
                console.log('after fetch show all:', user_compID);
                setIsduringTransportation(true);
            })

            .then(data => console.log(data))
            .catch(err => console.log(err));
    };
    const handleonlyininstock = async (e) => {
        fetch('http://localhost:8081/showonlyitemconfirmedtobeinstockcheduledArrivallist', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('showAllAPI Response:', data);
                setData(data);
                console.log('after fetch show all:', user_compID);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
        setClickedRow(null);
    };
    const handleArrivalConfirmation = () => {
        console.log('arrivalconfarmaiton clicked!');
    }
    const handleRowClick = (row, event) => {
        const isCheckboxClick = event.target.type === 'checkbox';
        const isCiMenuKebabClick = event.target.closest('.ci-menu-kebab') !== null;
        if (isCiMenuKebabClick) {
            setSelectedRowData(row);
            setAnchorEl(event.currentTarget);
            setClickedRow(row.logID);
        }
    };
    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        setSelectedRows(selectAll ? [] : data.map((row) => row.logID));
    };
    // Calculate the range of data to display based on the current page
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const dataToDisplay = filteredData.slice(startIndex, endIndex);

    const columns = ['#', 'SHIPPING SOURCE', 'DESTINATION ADDRESS', 'SHIPPING DATE', 'SHIPMENT', 'TRANSPORT METHOD', 'EXPECTED ARRIVAL DATE', 'MARKS', 'ACTION'];

    return (
        <div>
            <h1>Sheduled Arrival List</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className='btn' onClick={handleShowAll}> Show all</button>
                <button className='btn' onClick={handleonlyintransport}>Show only in transportation</button>
                <button className='btn' onClick={handleonlyininstock}>Only items in stock</button>
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
                        {dataToDisplay.map((row) => (
                            <TableRow key={row.shippingsource}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.shippingsource}</TableCell>
                                <TableCell>{row.shipAddress}</TableCell>
                                <TableCell>{row.shipDate}</TableCell>
                                <TableCell>{row.shippingName}</TableCell>
                                <TableCell>{row.transMethod}</TableCell>
                                <TableCell>{row.expArrivalDate}</TableCell>
                                <TableCell>{row.remarks}</TableCell>
                                <TableCell>
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
                                        {isduringtransportionClicked && (
                                            <>
                                                <MenuItem key="arrivalconfiramation" onClick={handleArrivalConfirmation}>Arrival Confirmation</MenuItem>
                                                <MenuItem key="cancellation">Cancellation</MenuItem>
                                            </>
                                        )}

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
                <button className='btn'>Bulk deletion</button>
                <button className='btn'>Return</button>
            </div>
        </div>
    );
};

export default Scheledarrivallist;
