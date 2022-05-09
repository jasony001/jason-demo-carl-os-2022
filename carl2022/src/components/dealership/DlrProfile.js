
import React from 'react'
import dataAPIs from '../../data/data-apis'

const DlrProfile = ({ data, lookupData }) => {
    const [mode, setMode] = React.useState('read')
    const [updatedDlr, setUpdatedDlr] = React.useState(data)

    const handleChange = e => {
        setUpdatedDlr(prev => {
            return {...prev, [e.target.name] : e.target.value.toUpperCase()}
        })
    }

    const discardChanges = () => {
        setUpdatedDlr(data)
    }

    const saveChanges = () => {
        dataAPIs.saveRecord("dlrList", "PartyID", { ...updatedDlr, id:updatedDlr.PartyID })
    }

    /**
     * 

RegStatusID "TERM"
RegStatusReasonID "LAPSED" 
     */
    return (
        <>
            <div className='section-title'>Profile</div>
            <div className='profile-grid'>
                <div>Class</div>
                <div>
                    {
                        mode === "read" &&  lookupData.luDlrClassList.find(r => r.DlrClassID === updatedDlr.DlrClassID).description
                    }
                    {
                        (mode === "edit" || mode === "add") &&
                        ( <input name="DlrClassID" value={updatedDlr.DlrClassID} onChange={e=>handleChange(e)}/>)
                    }
                </div>
                <div>Name</div>
                <div>
                    {
                        mode === "read" &&  updatedDlr.DlrName
                    }
                    {
                        (mode === "edit" || mode === "add") &&
                        ( <input name="DlrName" value={ updatedDlr.DlrName } onChange={e=>handleChange(e)}/>)
                    }
                </div>            
                <div>Type</div>
                <div>
                    
                    {
                        mode === "read" && updatedDlr.DlrTypeID &&  lookupData.luDlrTypeList.find(r => r.DlrTypeID === updatedDlr.DlrTypeID).description
                    }
                    {
                        (mode === "edit" || mode === "add") && updatedDlr.DlrTypeID &&
                        ( <input name="DlrTypeID" value={updatedDlr.DlrTypeID} onChange={e=>handleChange(e)}/>)
                    }      
                </div>
                <div>Legal Party ID</div>
                <div>{ updatedDlr.LegPartyID }</div>
                <div>PartyID</div>
                <div>
                    { updatedDlr.PartyID }
                </div>
                
                <div>RegNumber</div>
                <div>
                    { updatedDlr.RegNumber }
                </div>
                <div>RegExpiryDate</div>
                <div>
                    {mode === "read" &&  updatedDlr.RegExpiryDate}
                    {
                        (mode === "edit" || mode === "add") &&
                        ( <input name="RegExpiryDate" value={updatedDlr.RegExpiryDate} onChange={e=>handleChange(e)}/>)
                    }   
                </div>
                <div>RegStatusDate</div>
                <div>
                    {mode === "read" &&  updatedDlr.RegStatusDate}
                    {
                        (mode === "edit" || mode === "add") &&
                        ( <input name="RegStatusDate" value={updatedDlr.RegStatusDate} onChange={e=>handleChange(e)}/>)
                    }
                </div>
                <div>RegStatusReasonID</div>
                <div>
                    {
                        mode === "read" &&  lookupData.luRegStatusReasonList.find(r => r.RegStatusReasonID === updatedDlr.RegStatusReasonID).description
                    }
                    {
                        (mode === "edit" || mode === "add") &&
                        ( <input name="RegStatusReasonID" value={updatedDlr.RegStatusReasonID} onChange={e=>handleChange(e)}/>)
                    }
                </div>

                <div>RegStatusID</div>
                <div>
                    {
                        mode === "read" &&  lookupData.luRegStatusList.find(r => r.RegStatusID === updatedDlr.RegStatusID).description
                    }
                    {
                        (mode === "edit" || mode === "add") &&
                        ( <input name="RegStatusID" value={updatedDlr.RegStatusID} onChange={e=>handleChange(e)}/>)
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
        </>
    )
}

export default DlrProfile;