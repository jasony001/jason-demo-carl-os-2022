import React from 'react'
import dataAPIs from '../../data/data-apis';
import FirebaseDataAPIs from '../../data/firebase-data-apis';

const IndLegRltn = ( {indPartyId, legPartyId, lookupData} ) => {
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

    React.useEffect(() => {
        // getRltns()
        dataAPIs.getRltnList(indPartyId, undefined, legPartyId, 'IL')
        .then(d => {
            setRltnList(d)

            d.forEach(r => {
                loadInd(r.indPartyId);
                loadLeg(r.legPartyId);
            })
        })
    }, [indPartyId, legPartyId])

    const getRoleDescription = (roleId) => {
        let lr = lookupData.luPartyRltnRoleList.find(rr => rr.PartyRltnRoleID === roleId)

        return lr ? lr.description : roleId;
    }

    return (
        <>
            <div className='section-title'>
                { indPartyId ? 'Legal Entities' : 'Individuals' }
            </div>
            {
                rltnList && rltnList.length > 0 && (
                    <div className='relationship-grid'>
                        <div className='header'>Individual</div>
                        <div className='header'>Legal Entity</div>
                        <div className='header'>Relationship</div>
                        <div className='header'>--new--</div>
                        {
                            rltnList.map((r, index) => {
                                let className = (index % 2) ? 'data-row data-row--even' : 'data-row data-row--odd'
                                return (
                                    <React.Fragment key={r.PartyRltnID}>
                                        <div className={className}>{r.ind ? `${r.ind.FirstName} ${r.ind.LastName}` : r.indPartyId} </div>
                                        <div className={className}>{r.leg ? r.leg.legname : r.legPartyId}</div>
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
                    There is no Ind / Leg relationships
                </div>
            }
        </>
    )
}


export default IndLegRltn;