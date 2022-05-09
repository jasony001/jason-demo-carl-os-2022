
import React from 'react'
import IndProfile from './IndProfile';
import IndDlrRltn from '../relationships/IndDlr'
import IndLegRltn from '../relationships/IndLeg';

const IndMain = ({ setPage, setPageData, data, lookupData }) => {
    return (
        <div>
            <div className='party-id'>
                REG# {data.RegNumber ? data.RegNumber : "NONE"} {data.FirstName} {data.LastName} (PartyID {data.PartyID})
            </div>
            <div className='page-nav' onClick={() => setPage('Search')}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <IndProfile data={ data} lookupData = { lookupData } defaultMode="read"/>
            <IndDlrRltn indPartyId={data.PartyID} dlrPartyId={undefined} lookupData={ lookupData }/>
            <IndLegRltn indPartyId={data.PartyID} legPartyId={undefined} lookupData={ lookupData }/>

        </div>
    )
}


export default IndMain;