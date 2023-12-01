import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField, TablePagination, IconButton, Menu, MenuItem } from '@mui/material';
import { BiSolidDownload } from 'react-icons/bi';
import { CiMenuKebab } from 'react-icons/ci';
import * as XLSX from 'xlsx';

const ArrivalSearchList = ({ onPageChange, user_compID, user_role }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/arrivalsearchList', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_compID}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                setData(data);
            })
            .catch(err => console.log(err));
    }, [user_compID]);

    const filteredData = Array.isArray(data)
        ? data.filter((row) => (
            (row.arrivalName?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
            (row.arrivalDay?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
            (row.recvCompanyname?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
            (row.receivingCompany?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
            (row.quantity?.toString().toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
            (row.storageLocation?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
        ))
        : [];

    const handleExport = () => {
        //const headers = ['#', 'INCOMING CARGO', 'RECEIVING COMPANY', 'ARRIVAL DAY', 'QUANTITY', 'IN STOCK STATUS', 'STORAGE LOCATION', 'MARKS', 'ACTION'];
        const headers = ['#', '入荷物', '入荷元事業者', '入荷日', '数量', '入荷状態', '保管場所', '備考（画像）', 'アクション'];
        const exportData = [headers, ...filteredData.map((row, index) => (
            [index + 1, row.arrivalName, row.recvCompanyname, row.arrivalDay, row.quantity, row.inStockStatus, row.storageLocation, row.remarks, '']
        ))];
        const ws = XLSX.utils.aoa_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        XLSX.writeFile(wb, 'exported_data.xlsx');
    };
    const handleChangePage = (event, newPage) => {
        onPageChange(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const columns = ['#', '入荷物', '入荷元事業者', '入荷日', '数量', '入荷状態', '保管場所', '備考（画像）', 'アクション'];
    //const columns = ['#', 'INCOMING CARGO ', 'RECEIVING COMPANY', 'ARRIVAL DAY', 'QUANTITY', 'IN STOCK STATUS', 'STORAGE LOCATION', 'MARKS', 'ACTION'];

    return (
        <div>
            {/* <h1>Arrival Information List</h1> */}
            <h1>入荷情報一覧</h1>
            <div>
                <TextField
                    // label="Search"
                    label="検索"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <div style={{ textAlign: 'right', margin: '2% 0' }}>
                    <button className='btn' style={{ padding: '0px' }} onClick={handleExport}><BiSolidDownload />&nbsp;&nbsp;&nbsp;&nbsp;データを Excel にエクスポートする</button>
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
                                <TableRow key={row.arrivalday}>
                                    <TableCell>{row.arrivalID}</TableCell>
                                    <TableCell>{row.arrivalName}</TableCell>
                                    <TableCell>{row.recvCompanyname}</TableCell>
                                    <TableCell>{row.arrivalDay}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.inStockStatus}</TableCell>
                                    <TableCell>{row.storageLocation}</TableCell>
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
                                        <IconButton className="ci-menu-kebab" onClick={(event) => (row, event)}>
                                            <CiMenuKebab />
                                        </IconButton>
                                        <Menu
                                        >
                                            <MenuItem >Edit</MenuItem>
                                            <MenuItem >Product Registration</MenuItem>

                                        </Menu>
                                    </TableCell>
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
                    //style={{ padding:'2px' }} 
                    className='tablepagination'
                />
                <div>
                    {/* <button className='btn' style={{ margin: '1% 30%' }}>Return</button> */}
                    <button className='btn' style={{ margin: '1% 30%' }}>戻る</button>
                </div>

            </div>
        </div>
    );
};

export default ArrivalSearchList;
