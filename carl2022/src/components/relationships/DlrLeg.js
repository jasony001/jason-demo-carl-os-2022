import React from 'react'
import dataAPIs from '../../data/data-apis';
import FirebaseDataAPIs from '../../data/firebase-data-apis';

const DlrLegRltn = ( { dlrPartyId, legPartyId, lookupData} ) => {
    const [rltnList, setRltnList] = React.useState([]);

    const loadLeg = (lp) => {
        FirebaseDataAPIs.getDocById("legList", lp)
        .then(leg => {
            setRltnList(prev => {
                return prev.map(r => {
                    return r.legPartyId === lp ? {...r, leg: leg} : r
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
        // getRltns()
        dataAPIs.getRltnList(undefined, dlrPartyId, legPartyId, 'DL')
        .then(d => {
            setRltnList(d)

            d.forEach(r => {
                loadLeg(r.legPartyId);
                loadDlr(r.dlrPartyId);
            })
        })
    }, [dlrPartyId, legPartyId])

    const getRoleDescription = (roleId) => {
        let lr = lookupData.luPartyRltnRoleList.find(rr => rr.PartyRltnRoleID === roleId)

        return lr ? lr.description : roleId;
    }

    return (
        <>
            <div className='section-title'>
                { legPartyId ? 'Dealerships' : 'Legal Entity' }
            </div>
            {
                rltnList && rltnList.length > 0 && (
                    <div className='relationship-grid'>
                        <div className='header'>Dealer</div>
                        <div className='header'>Legal Entity</div>
                        <div className='header'>Relationship</div>
                        <div className='header'>--new--</div>
                        {
                            rltnList.map((r, index) => {
                                let className = (index % 2) ? 'data-row data-row--even' : 'data-row data-row--odd'
                                return (
                                    <React.Fragment key={r.PartyRltnID}>
                                        <div className={className}>{ r.dlr ? ( `${r.dlr.DlrName} ${r.dlr.DlrName && r.dlr.legName ? " / " : ""} ${r.dlr.legName}` ) : r.dlrPartyId}</div>
                                        <div className={className}>{ r.leg ? r.leg.legname : r.legPartyId } </div>
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
                    There is no legael entity / dealership relationships
                </div>
            }
        </>
    )
}


export default DlrLegRltn;