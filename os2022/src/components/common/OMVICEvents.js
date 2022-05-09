const OMVICEvents = ({testCriteria}) => {
    let { RegStatusID, RegExpiry, RefusedRevoked, RltnInRegDealer, RltnInNotRegDealer, 
        DealerRegStatusID, DealerOpStatusID, DealerRefusedRevoked, DealerIsBranch,
        DealerClassID, DealerSubclassID,
        DealerRegExpiry } = testCriteria
      
    return (
        <h1>OMVIC Events</h1>
    )
}

export default OMVICEvents