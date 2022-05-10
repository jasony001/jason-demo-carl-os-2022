import React from "react"
import MainPageTestCriteriaSideBar from './MainPageTestCriteriaSideBar'

const TestCriteria = ({testCriteria, testCriteriaChanged}) => {


    const handleChange = e => {

        let key  = e.target.name
        let value = (e.target.type !== "checkbox") ? e.target.value.trim() : e.target.checked;

        testCriteriaChanged(key, value)
    }
    

    const regStatusIdList = [["REG", "Registered"], ["TERM", "Terminated"], ["NOTREG", "Not Registered"], ["NONE", "None"]]
    const regExiryDateOptions = [
            ["Over60DaysAgo", "Over 60 days ago"],
            ["WithinPast60Days", "Within the past 60 days"],
            ["InTheFuture", "In the future"],
            ["InNext60Days", "In next 60 days"],
        ]
    const dlrClassIdList = [
        ["BROKER", "Broker"],
        ["EXPORT", "Exporter"],
        ["FLEET", "Fleet Lessor"],
        ["GEN", "General Dealer"],
        ["LEASIN", "Lease Finance Dealer"],
        ["MANUFA", "Manufacturer"],
        ["NFP", "Not for Profit"],
        ["OOP", "Out of Province"],
        ["UNKNOW", "Unknown"],
        ["WHOLES", "Wholesaler"]
    ]

    

    return (
        <>
            {
                testCriteria && 
            
                <div className="test-criteria">
                    <div className="test-criteria-portal-user">
                        <div className="test-criteria-section-title">Portal User</div>
                        <div className='profile-grid'>
                            <div>Registration Status</div>
                            <div>
                                <select name="portalUser-regStatusId" onChange={ e => handleChange(e)} value={testCriteria.portalUser.regStatusId }>
                                    {
                                        regStatusIdList.map(s => {
                                            return (
                                                <option key={s[0]} value={s[0]}>{s[1]}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div>Registration Expiry Date</div>
                            <div>
                                <select name="portalUser-regExpiryDate" onChange={ e => handleChange(e)} value={testCriteria.portalUser.regExpiryDate }>
                                    {
                                        regExiryDateOptions.map(s => {
                                            return (
                                                <option key={s[0]} value={s[0]}>{s[1]}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div>T&amp;C or LAT T&amp;C</div>
                            <div>
                                <input type="checkbox" name="portalUser-tc" checked={testCriteria.portalUser.tc} onChange={ e => handleChange(e)}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="test-criteria-section-title">Selected Dealer</div>
                        <div style={{display:"flex",paddingLeft:"2em", paddingTop:"1em",paddingBottom:"1em"}}>
                            
                            {
                                testCriteria.dealers.map(d => {
                                    return (
                                        <div key={d.id} style={{paddingRight:"1em"}}>
                                            <label htmlFor={`select-dealer-${d.id}`} name='rbSelectDealer'>{d.name}</label>
                                            <input type="radio" 
                                                id={`select-dealer-${d.id}`} 
                                                name='selectedDealerId' 
                                                onChange={ e => handleChange(e)}
                                                checked={testCriteria.selectedDealerId+"" === d.id+""}
                                                value={d.id}
                                            ></input>

                                        </div>
                                    )
                                })
                            }
                            <div>
                                <label htmlFor={`select-dealer-0`} name='rbSelectDealer'>Deselect all</label>
                                <input type="radio" 
                                    id={`select-dealer-0`} 
                                    name='selectedDealerId' 
                                    onChange={ e => handleChange(e)}
                                    checked={!testCriteria.selectedDealerId}
                                    value=""
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="test-criteria-dealer-section">
                        {
                            testCriteria.dealers.map(d => {
                                return (
                                    <div className="test-criteria-dealer" key={d.id}>
                                        <div className="test-criteria-section-title">{ d.name }</div>
                                        <div className='profile-grid'>
                                            <div>name:</div>
                                            <div><input name={`dealer-${d.id}-name`} value={d.name} onChange={ e => handleChange(e)}></input></div>
                                            <div>Registration Status</div>
                                            <div>
                                                <select name={`dealer-${d.id}-regStatusId`} 
                                                    onChange={ e => handleChange(e)} value={d.regStatusId }>
                                                    {
                                                        regStatusIdList.map(s => {
                                                            return (
                                                                <option key={s[0]} value={s[0]}>{s[1]}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div>Registration Expiry Date</div>
                                            <div>
                                                <select name={`dealer-${d.id}-regExpiryDate`} 
                                                    onChange={ e => handleChange(e)} value={d.regExpiryDate }>
                                                    {
                                                        regExiryDateOptions.map(s => {
                                                            return (
                                                                <option key={s[0]} value={s[0]}>{s[1]}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div>user is DA</div>
                                            <div>
                                                <input type="checkbox" name={`dealer-${d.id}-userIsDA`} checked={d.userIsDA} onChange={ e => handleChange(e)}/>
                                            </div>
                                            <div>user has ODPS Role</div>
                                            <div>
                                                <input type="checkbox" name={`dealer-${d.id}-userHasODPSRole`} checked={d.userHasODPSRole} onChange={ e => handleChange(e)}/>
                                            </div>
                                            <div>Dealer class</div>
                                            <div>
                                                <select name={`dealer-${d.id}-dlrClassId`} 
                                                    onChange={ e => handleChange(e)} value={d.dlrClassId }>
                                                    {
                                                        dlrClassIdList.map(s => {
                                                            return (
                                                                <option key={s[0]} value={s[0]}>{s[1]}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div>operation status id</div>
                                            <div>
                                                <label htmlFor={`dealer-${d.id}-opStatusId-active`}  >Active</label>
                                                <input type="radio" 
                                                    name={`dealer-${d.id}-opStatusId`}  
                                                    id ={`dealer-${d.id}-opStatusId-active`} 
                                                    checked={d.opStatusId==="Active"}
                                                    onChange={ e => handleChange(e)}
                                                    value="Active"
                                                    />
                                                <label htmlFor={`dealer-${d.id}-opStatusId-inactive`}  >Inactive</label>
                                                <input type="radio" 
                                                    name={`dealer-${d.id}-opStatusId`} 
                                                    id={`dealer-${d.id}-opStatusId-inactive`}  
                                                    checked={d.opStatusId==="Inactive"}
                                                    onChange={ e => handleChange(e)}
                                                    value="Inactive"/>
                                            </div>


                                            <div>suspended</div>
                                            <div>
                                                <input type="checkbox" name={`dealer-${d.id}-suspended`} checked={d.suspended} onChange={ e => handleChange(e)}/>
                                            </div> 
                                            <div>revoked</div>
                                            <div>
                                                <input type="checkbox" name={`dealer-${d.id}-revoked`} checked={d.revoked} onChange={ e => handleChange(e)}/>
                                            </div> 
                                            <div>refused</div>
                                            <div>
                                                <input type="checkbox" name={`dealer-${d.id}-refused`} checked={d.refused} onChange={ e => handleChange(e)}/>
                                            </div> 
                                            <div>is branch</div>
                                            <div>
                                                <input type="checkbox" name={`dealer-${d.id}-isBranch`} checked={d.isBranch} onChange={ e => handleChange(e)}/>
                                            </div> 
                                            <div>T&C or LAT T&C</div>
                                            <div>
                                                <input type="checkbox" name={`dealer-${d.id}-tc`} checked={d.tc} onChange={ e => handleChange(e)}/>
                                            </div> 
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>

                </div>
            }
            <MainPageTestCriteriaSideBar testCriteria={testCriteria}/>
        </>
    )
}

export default TestCriteria