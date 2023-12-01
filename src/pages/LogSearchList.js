import React from 'react';
import DataTable from '../Components/datatable';

const LogSearchList = ({user_compID}) => {
    return (
        <div className="container">
            <div className="table-container">
                <DataTable user_compID={user_compID}/>
            </div>
        </div>
    );
};

export default LogSearchList;
