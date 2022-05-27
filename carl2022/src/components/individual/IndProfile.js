
import React from 'react'
import dataAPIs from '../../data/data-apis'

const IndProfile = ({ data, lookupData, defaultMode, cancelAddingNewInd }) => {
    const [mode, setMode] = React.useState(defaultMode)
    const [updatedInd, setUpdatedInd] = React.useState(data)

    React.useEffect(() => {
        if (defaultMode === "add") {
            setUpdatedInd( {
                "FirstName": "",
                "LastName": "",
                "Birthdate": "1974-09-24T00:00:00",
                "Gender": "M",
                "PartyID": 35709,
                "EmailHome": "",
                "RegNumber": 4537338,
                "RegExpiryDate": "2010-09-07T00:00:00",
                "RegTerminationDate": "2009-09-08T21:00:00",
                "RegStatusDate": "2009-09-08T21:00:00",
                "RegStatusReasonID": "",
                "RegStatusID": ""
            })
        }
    }, [])

    const handleChange = e => {

        setUpdatedInd(prev => {
            return {...prev, [e.target.name] : e.target.value.toUpperCase()}
        })
            
    }

    const discardChanges = () => {
        setUpdatedInd(data)

        if (defaultMode === "add"){
            cancelAddingNewInd()
        }
    }

    const saveChanges = () => {
        dataAPIs.saveRecord("indList", "PartyID", { ...updatedInd, id:updatedInd.PartyID })
    }

    return (
        <>
            {
                updatedInd && 
                (
                    <div className='ind-profile'>
                        <div className='section-title'>Profile</div>
                        <div className='profile-grid'>
                            <div>FirstName</div>
                            <div>
                                {
                                    mode === "read" &&  updatedInd.FirstName
                                }
                                {
                                    (mode === "edit" || mode === "add") &&
                                    ( <input name="FirstName" value={updatedInd.FirstName} onChange={e=>handleChange(e)}/>)
                                }
                            </div>
                            <div>LastName</div>
                            <div>
                                {
                                    mode === "read" &&  updatedInd.LastName
                                }
                                {
                                    (mode === "edit" || mode === "add") &&
                                    ( <input name="LastName" value={updatedInd.LastName} onChange={e=>handleChange(e)}/>)
                                }
                            </div>            
                            <div>Birthdate</div>
                            <div>
                                {mode === "read" &&  updatedInd.Birthdate}
                                {
                                    (mode === "edit" || mode === "add") &&
                                    ( <input name="Birthdate" value={updatedInd.Birthdate} onChange={e=>handleChange(e)}/>)
                                }      
                            </div>
                            <div>Gender</div>
                            <div>
                                {mode === "read" &&  updatedInd.Gender}
                                {
                                    (mode === "edit" || mode === "add") &&
                                    ( <input name="Gender" value={updatedInd.Gender} onChange={e=>handleChange(e)}/>)
                                }   
                            </div>
                            <div>PartyID</div>
                            <div>
                                {updatedInd.PartyID}
                            </div>
                            <div>EmailHome</div>
                            <div>
                                {mode === "read" &&  updatedInd.EmailHome}
                                {
                                    (mode === "edit" || mode === "add") &&
                                    ( <input name="EmailHome" value={updatedInd.EmailHome} onChange={e=>handleChange(e)}/>)
                                }   
                            </div>
                            <div>RegNumber</div>
                            <div>
                                { updatedInd.RegNumber }
                            </div>
                            <div>RegExpiryDate</div>
                            <div>
                                {mode === "read" &&  updatedInd.RegExpiryDate}
                                {
                                    (mode === "edit" || mode === "add") &&
                                    ( <input name="RegExpiryDate" value={updatedInd.RegExpiryDate} onChange={e=>handleChange(e)}/>)
                                }   
                            </div>
                            <div>RegTerminationDate</div>
                            <div>
                                {mode === "read" &&  updatedInd.RegTerminationDate}
                                {
                                    (mode === "edit" || mode === "add") &&
                                    ( <input name="RegTerminationDate" value={updatedInd.RegTerminationDate} onChange={e=>handleChange(e)}/>)
                                }   
                            </div>
                            <div>RegStatusDate</div>
                            <div>
                                {mode === "read" &&  updatedInd.RegStatusDate}
                                {
                                    (mode === "edit" || mode === "add") &&
                                    ( <input name="RegStatusDate" value={updatedInd.RegStatusDate} onChange={e=>handleChange(e)}/>)
                                }
                            </div>
                            <div>RegStatusReasonID</div>
                            <div>
                                {
                                    mode === "read" &&  lookupData.luRegStatusReasonList.find(r => r.RegStatusReasonID === updatedInd.RegStatusReasonID).description
                                }
                                {
                                    (mode === "edit" || mode === "add") &&
                                    ( <input name="RegStatusReasonID" value={updatedInd.RegStatusReasonID} onChange={e=>handleChange(e)}/>)
                                }
                            </div>

                            <div>RegStatusID</div>
                            <div>
                                {
                                    mode === "read" &&  lookupData.luRegStatusList.find(r => r.RegStatusID === updatedInd.RegStatusID).description
                                }
                                {
                                    (mode === "edit" || mode === "add") &&
                                    ( <input name="RegStatusID" value={updatedInd.RegStatusID} onChange={e=>handleChange(e)}/>)
                                }
                            </div>
                            <div className='profile-buttons'>
                                {
                                    mode === "read" && (
                                        <i className="fa-solid fa-pen" onClick={() => { setMode('edit') }}></i>
                                    )
                                }
                                {
                                    (mode === "edit" || mode === "add") && (
                                        <>
                                            <i className="fa-solid fa-floppy-disk" onClick={() => { saveChanges(); setMode('read') }}></i>
                                            <i className="fa-solid fa-xmark" onClick={() => { discardChanges(); setMode('read') }}></i>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default IndProfile;