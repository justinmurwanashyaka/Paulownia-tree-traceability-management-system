import React from 'react';

import ArrivalSearchList from '../Components/arrivalsearchlist.js';

const ArrivalInformationSearchList = ({ user_compID, user_role }) => {
    return (
        <div className="container">
            <div className="table-container">
                <ArrivalSearchList user_compID={user_compID} user_role={user_role} />
            </div>
        </div>
    );
};

export default ArrivalInformationSearchList;
