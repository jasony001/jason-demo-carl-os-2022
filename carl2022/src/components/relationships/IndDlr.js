import React from 'react'
import dataAPIs from '../../data/data-apis';
import FirebaseDataAPIs from '../../data/firebase-data-apis';

const IndDlrRltn = ( {indPartyId, dlrPartyId, lookupData} ) => {
    const [rltnList, setRltnList] = React.useState([]);

    const loadInd = (ip) => {
        FirebaseDataAPIs.getDocById("indList", ip)
        .then(ind => {
            setRltnList(prev => {
                return prev.map(r => {
                    return r.indPartyId === ip ? {...r, ind: ind} : r
                })
            })
        })
    }

    const loadDlr = (dp) => {
        FirebaseDataAPIs.getDocById("dlrList", dp)
        .then(dlr => {
            FirebaseDataAPIs.getDocById("legList", dlr.LegPartyID)
            .then(leg => {
                dlr.legName = leg.legname

                setRltnList(prev => {
                    return prev.map(r => {
                        return r.dlrPartyId === dp ? {...r, dlr: dlr} : r
                    })
                })
            })
        })
    }

    React.useEffect(() => {
        dataAPIs.getRltnList(indPartyId, dlrPartyId, undefined, 'ID')
        .then(d => {
            console.log(d)
            setRltnList(d)

            d.forEach(r => {
                loadInd(r.indPartyId);
                loadDlr(r.dlrPartyId);
            })
        })
    }, [indPartyId, dlrPartyId])

    const getRoleDescription = (roleId) => {
        let lr = lookupData.luPartyRltnRoleList.find(rr => rr.PartyRltnRoleID === roleId)

        return lr ? lr.description : roleId;
    }

    return (
        <>
            <div className='section-title'>
                { indPartyId ? 'Dealerships' : 'Individuals' }
            </div>
            {
                rltnList && rltnList.length > 0 && (
                    <div className='relationship-grid'>
                        <div className='header'>Individual</div>
                        <div className='header'>Dealer</div>
                        <div className='header'>Relationship</div>
                        <div className='header'>--new--</div>
                        {
                            rltnList.map((r, index) => {
                                let className = (index % 2) ? 'data-row data-row--even' : 'data-row data-row--odd'
                                return (
                                    <React.Fragment key={r.PartyRltnID}>
                                        <div className={className}>{r.ind ? `${r.ind.FirstName} ${r.ind.LastName}` : r.indPartyId} </div>
                                        <div className={className}>{r.dlr ? ( `${r.dlr.DlrName} ${r.dlr.DlrName && r.dlr.legName ? " / " : ""} ${r.dlr.legName}` ) : r.dlrPartyId}</div>
                                        <div className={className}>
                                            { getRoleDescription(r.PartyRltnRoleID) }
                                        </div>
                                        <div className={className}>--edit--delete--</div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                )
            }
            {
                ( !rltnList || rltnList.length === 0 ) &&
                <div className='relationship-grid--nodata'>
                    There is no individual / dealership relationships
                </div>
            }
        </>
    )
}


export default IndDlrRltn;