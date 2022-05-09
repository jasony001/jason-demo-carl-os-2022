

import React from 'react'
import DlrProfile from './DlrProfile';
import IndDlrRltn from '../relationships/IndDlr';
import DlrLegRltn from '../relationships/DlrLeg';
import FirebaseDataAPIs from '../../data/firebase-data-apis';

const DlrMain = ({ setPage, setPageData, data, lookupData }) => {
    const [leg, setLeg] = React.useState({})
    React.useEffect(() => {
        FirebaseDataAPIs.getDocById("legList", data.LegPartyID)
        .then(leg => {
            setLeg(leg)
        })
    }, [data.LegPartyID])


    return (
        <div>
            <div className='party-id'>
                <div>REG# {data.RegNumber ? data.RegNumber : "NONE"}</div> 
                <div>{`${data.DlrName} ${data.DlrName && leg && leg.legname ? " / " : ""} ${leg.legname}`}</div>
                <div>(PartyID {data.PartyID})</div>

            </div>

            <DlrProfile data={ data} lookupData = { lookupData }/>
            <IndDlrRltn indPartyId={undefined} dlrPartyId={data.PartyID} lookupData={ lookupData }/>
            <DlrLegRltn legPartyId={undefined} dlrPartyId={data.PartyID} lookupData={ lookupData }/>

            <div className='page-nav' onClick={() => setPage('Search')}>
                <i className="fa-brands fa-searchengin"></i>
            </div>
        </div>
    )
}


export default DlrMain;