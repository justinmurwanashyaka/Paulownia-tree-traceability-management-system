import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';

const StatusList = ({ onPageChange, userRole }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [unshippeddata, setUnshipedData] = useState([]);
    const [recentshippmentddata, setrecentshipementdData] = useState([]);
    const [productdata, setProductData] = useState([]);
    const [arrivaldata, setArrivalData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/productList')
            .then((res) => res.json())
            .then((data) => setProductData(data))
            .catch((err) => console.error(err));

        fetch('http://localhost:8081/arrivalsearchList')
            .then((res) => res.json())
            .then((data) => setArrivalData(data))
            .catch((err) => console.error(err));
    }, []);

    const handleChangePage = (event, newPage) => {
        onPageChange(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const renderUnshippedTable = () => {
        return (
            <div>
                <h1>Unshipped information</h1>
                <div>
                    <button className='btn'>Details</button>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>PRODUCT NAME</TableCell>
                                <TableCell>PRODUCT DATE</TableCell>
                                <TableCell>QUANTITY</TableCell>
                                <TableCell>SIZE</TableCell>
                                <TableCell>NOTES</TableCell>
                                <TableCell>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {unshippeddata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.prodID}>
                                    <TableCell>{row.prodID}</TableCell>
                                    <TableCell>{row.product_name}</TableCell>
                                    <TableCell>{row.production_date}</TableCell>
                                    <TableCell>{row.qty}</TableCell>
                                    <TableCell>{row.size}</TableCell>
                                    <TableCell>{row.remarks}</TableCell>
                                    <TableCell>
                                        <CiMenuKebab />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button className='btn'>Printing</button>
                    <button className='btn'>Return</button>
                </div>
            </div>
        );
    };
    const renderRecentShipmentTable = () => {
        return (
            <div>
                <h1>Recent Shipment information</h1>
                <div>
                    <button className='btn'>Details</button>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>PRODUCT NAME</TableCell>
                                <TableCell>PRODUCT DATE</TableCell>
                                <TableCell>QUANTITY</TableCell>
                                <TableCell>PLACE</TableCell>
                                <TableCell>SIZE</TableCell>
                                <TableCell>SHIPPING</TableCell>
                                <TableCell>NOTES</TableCell>
                                <TableCell>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentshippmentddata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.prodID}>
                                    <TableCell>{row.prodID}</TableCell>
                                    <TableCell>{row.product_name}</TableCell>
                                    <TableCell>{row.production_date}</TableCell>
                                    <TableCell>{row.qty}</TableCell>
                                    <TableCell>{row.place}</TableCell>
                                    <TableCell>{row.size}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{row.shipping}</TableCell>
                                    <TableCell>{row.remarks}</TableCell>
                                    <TableCell>
                                        <CiMenuKebab />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button className='btn'>Printing</button>
                    <button className='btn'>Return</button>
                </div>
            </div>
        );
    };

    const renderNewArrivalTable = () => {
        return (
            <div>
                <h1>New arrival information</h1>
                <div>
                    <button className='btn'>Details</button>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>PRODUCT NAME</TableCell>
                                <TableCell>STOCK DATE</TableCell>
                                <TableCell>QUANTITY</TableCell>
                                <TableCell>PLACE</TableCell>
                                <TableCell>SIZE</TableCell>
                                <TableCell>SHIPPING COMPANY</TableCell>
                                <TableCell>SITUATION</TableCell>
                                <TableCell>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arrivaldata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.prodID}>
                                    <TableCell>{row.prodID}</TableCell>
                                    <TableCell>{row.arrivalName}</TableCell>
                                    <TableCell>{row.arrivalDay}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.storageLocation}</TableCell>
                                    <TableCell>{row.size}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{row.recvCompanyID.name}</TableCell>
                                    <TableCell>
                                        <CiMenuKebab />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button className='btn'>Printing</button>
                    <button className='btn'>Return</button>
                </div>
            </div>
        );
    };

    const renderProductInformationTable = () => {
        return (
            <div>
                <h1>Purchased Product Information</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>PRODUCT ID</TableCell>
                                <TableCell>PRODUCT NAME</TableCell>
                                <TableCell>CATEGORY</TableCell>
                                <TableCell>PRICE</TableCell>
                                <TableCell>QUANTITY</TableCell>
                                <TableCell>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.prodID}>
                                    <TableCell>{row.prodID}</TableCell>
                                    <TableCell>{row.product_name}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.qty}</TableCell>
                                    <TableCell>
                                        <CiMenuKebab />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button className='btn'>Printing</button>
                    <button className='btn'>Return</button>
                </div>
            </div>
        );
    };

    const renderTable = () => {
        console.log("userRole:", userRole);

        if (userRole === 1) {
            return (
                <div>
                    {renderUnshippedTable()}
                    {renderRecentShipmentTable()}
                </div>
            );

        } else if (userRole === 2 || userRole === 3) {
            return (
                <div>
                    {renderUnshippedTable()}
                    {renderRecentShipmentTable()}
                    {renderNewArrivalTable()}
                </div>
            );
        } else if (userRole === 4) {
            return (
                <div>
                    {renderProductInformationTable()}
                </div>
            )
        } else {
            return <div>No data available for the selected role.</div>;
        }
    };

    return <div>{renderTable()}</div>;
};

export default StatusList;
