import React from 'react';
import { productSearchListdata } from '../productSearchListdata.js';
import ProductList from '../Components/productList.js';


const columns = ['#', 'PRODUCT NAME ', 'PRODUCT DATE', 'QUANTITY',  'MANIFACTURING LOCATION', 'SIZE','MANIFACTURING MANAGER','SITUATION','NOTES', 'ACTION'];

const ProductInformationSearchList = () => {
    return (
        <div className="container">
            <div className="table-container">
                <h1>Product Information Search</h1>
                <ProductList data={productSearchListdata} columns={columns} />
            </div>
        </div>
    );
};

export default ProductInformationSearchList;
