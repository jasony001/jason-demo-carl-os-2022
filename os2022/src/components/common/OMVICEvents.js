const OMVICEvents = ({testCriteria}) => {
    let { RegStatusID, RegExpiry, RefusedRevoked, RltnInRegDealer, RltnInNotRegDealer, 
        DealerRegStatusID, DealerOpStatusID, DealerRefusedRevoked, DealerIsBranch,
        DealerClassID, DealerSubclassID,
        DealerRegExpiry } = testCriteria
      
    return (
        <div>[OMVIC Events] content</div>
    )
}

export default OMVICEvents