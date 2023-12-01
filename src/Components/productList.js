import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination } from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai';
import { CiMenuKebab } from 'react-icons/ci'

const ProductList = ({ user_compID }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8081/productListinformation', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('API Response for product list:', data);
                setData(data);
                console.log('after fetch productlist compid:', user_compID);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }, [user_compID]);



    const handleShowAll = async (e) => {
        fetch('http://localhost:8081/showAllproductInformationList', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('showAllAPI Response for productlist:', data);
                setData(data);
                console.log('after fetch show all:', user_compID);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    const handleonlyshippedproducts = async (e) => {
        fetch('http://localhost:8081/showAonlyshippedproductsInformationList', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('showAllAPI Response for productlist:', data);
                setData(data);
                console.log('after fetch show all:', user_compID);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };
    const handleunshippedproducts = async (e) => {
        fetch('http://localhost:8081/showunshippedproductsInformationList', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log('showAllAPI Response for productlist:', data);
                setData(data);
                console.log('after fetch show all:', user_compID);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };


    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const dataToDisplay = data.slice(startIndex, endIndex);


    const columns = ['#', 'PRODUCT NAME ', 'PRODUCT DATE', 'QUANTITY', 'MANIFACTURING LOCATION', 'SIZE', 'MANIFACTURING MANAGER', 'SITUATION', 'NOTES', 'ACTION'];
    return (
        <div>
            <h1>Product Information Search</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className='btn' onClick={handleShowAll}> Show all</button>
                <button className='btn' onClick={handleunshippedproducts}>only unshipped products</button>
                <button className='btn' onClick={handleonlyshippedproducts}>only shipped products</button>
            </div>
            <div>
                <div style={{ textAlign: 'right' }}>
                    <button className='btn' style={{ color: 'white' }}>
                        <AiOutlinePlus />
                        &nbsp;&nbsp;&nbsp;&nbsp;Product registration
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
                            {dataToDisplay.slice(startIndex, endIndex).map((row) => (
                                <TableRow key={row.product_name}>
                                    <TableCell>{row.prodID}</TableCell>
                                    <TableCell>{row.product_name}</TableCell>
                                    <TableCell>{row.production_date}</TableCell>
                                    <TableCell>{row.qty}</TableCell>
                                    <TableCell>{row.manufLocation}</TableCell>
                                    <TableCell>{row.size}</TableCell>
                                    <TableCell>{row.manufaManager}</TableCell>
                                    <TableCell>{row.situation}</TableCell>
                                    <TableCell>{row.remarks}</TableCell>
                                    <TableCell><CiMenuKebab /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className='pagination'>
                        <button
                            className='btn'
                            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
                            disabled={page === 0}
                        >
                            Previous
                        </button>
                        <span>{`Page ${page + 1}`}</span>
                        <button
                            className='btn'
                            onClick={() => setPage((prevPage) => prevPage + 1)}
                            disabled={endIndex >= dataToDisplay.length}
                        >
                            Next
                        </button>
                    </div>

                </TableContainer>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className='btn'>Bulk deletion</button>
                <button className='btn'>Return</button>
            </div>
        </div>
    );
};

export default ProductList;
