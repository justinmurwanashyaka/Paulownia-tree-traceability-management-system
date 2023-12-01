import React, { useEffect, useState } from 'react';
import DataTable from './datatable';

const columns = [
    'ID',
    'Growing Site',
    'Planting Date',
    'Type',
    'Dimension',
    'Shape',
    'Status',
    'Quality',
    'Image',
    'Menu'
];

const ParentComponent = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);

    const onPageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        // Fetch data from the server when the component mounts
        fetch('http://your-backend-api-url/logsView') // Replace with your server URL
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Data Table Example</h1>
            <DataTable columns={columns} data={data} onPageChange={onPageChange} />
        </div>
    );
};

export default ParentComponent;
