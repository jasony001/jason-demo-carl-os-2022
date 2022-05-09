
const MyProfile = ({testCriteria}) => {
    let { RegStatusID, RegExpiry, RefusedRevoked, RltnInRegDealer, RltnInNotRegDealer, 
        DealerRegStatusID, DealerOpStatusID, DealerRefusedRevoked, DealerIsBranch,
        DealerClassID, DealerSubclassID,
        DealerRegExpiry } = testCriteria
      
    
    return (
        <h1>Profile</h1>
    )
}

export default MyProfile;