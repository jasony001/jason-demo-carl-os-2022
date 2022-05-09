
const MyInvoices = ({testCriteria}) => {
    let { RegStatusID, RegExpiry, RefusedRevoked, RltnInRegDealer, RltnInNotRegDealer, 
        DealerRegStatusID, DealerOpStatusID, DealerRefusedRevoked, DealerIsBranch,
        DealerClassID, DealerSubclassID,
        DealerRegExpiry } = testCriteria
      
    return (
        <h1>My Invoices</h1>
    )
}

export default MyInvoices