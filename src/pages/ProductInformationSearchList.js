import React from 'react';
import ProductList from '../Components/productList.js';

const ProductInformationSearchList = ({ user_compID }) => {
    return (
        <div className="container">
            <div className="table-container">

                <ProductList user_compID={user_compID} />
            </div>
        </div>
    );
};

export default ProductInformationSearchList;
