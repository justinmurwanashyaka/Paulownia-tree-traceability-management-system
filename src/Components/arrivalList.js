import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField, TablePagination, } from '@mui/material';

const ArrivalList = ({ data, columns, onPageChange }) => {
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
              <div style={{ display: 'flex', justifyContent: 'space-between',}}>
                <button className='btn'> Show all</button>
                             <button className='btn'>Show only in transportation</button>
                <button className='btn'>Only items in stock</button>
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
                                <TableCell>{row.shippingsource}</TableCell>
                                <TableCell>{row.destinationaddress}</TableCell>
                                <TableCell>{row.shippingdate}</TableCell>
                                <TableCell>{row.shipment}</TableCell>
                                <TableCell>{row.transportmethod}</TableCell>
                                <TableCell>{row.expectedarrivaldate}</TableCell>
                                <TableCell>{row.marks}</TableCell>
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

export default ArrivalList;
