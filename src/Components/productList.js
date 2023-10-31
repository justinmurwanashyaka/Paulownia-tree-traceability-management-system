import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField, TablePagination, } from '@mui/material';
import {AiOutlinePlus} from 'react-icons/ai'

const ProductList = ({ data, columns, onPageChange }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');


    const filteredData = data.filter((row) => {
        return row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.shippingsource.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.destinationaddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.shippingdate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.shipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.transportmethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.expectedarrivaldate.toLowerCase().includes(searchTerm.toLowerCase());
    });


    const handleChangePage = (event, newPage) => {
        onPageChange(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    return (
        <div>
            {/* <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            /> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <button className='btn'> Show all</button>
                <button className='btn'>only undelivered products</button>
                <button className='btn'>only delivered products</button>
          
            </div>
            <div style={{textAlign:'right'}}>
                <button className='btn' style={{color:'white'}}><AiOutlinePlus/>&nbsp;&nbsp;&nbsp;&nbsp;Product registration
</button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.shippingsource}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.productname}</TableCell>
                                <TableCell>{row.productdate}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.manifacturinglocation}</TableCell>
                                <TableCell>{row.size}</TableCell>
                                <TableCell>{row.manifacturingmanager}</TableCell>
                                <TableCell>{row.situation}</TableCell>
                                <TableCell>{row.notes}</TableCell>
                                <TableCell>{row.action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                className='tablepagination'
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className='btn'>Bulk deletion</button>
                <button className='btn'>Return</button>
            </div>

        </div>
    );
};

export default ProductList;
