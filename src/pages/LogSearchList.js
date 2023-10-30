import React from 'react';
import {data} from '../data.js'
import DataTable from '../Components/datatable';


const columns = ['#','GROWING SITE','GROWING DATE','TYPE','DIMENSION','SHAPE','STATUS','ACTION'];

const LogList = () => {
    return (
        <div className="container">
            <div className="table-container">
                <h1>Log Information Search List </h1>
                <DataTable data={data} columns={columns}/>
               
            </div>
        </div>
    );
};

export default LogList;
