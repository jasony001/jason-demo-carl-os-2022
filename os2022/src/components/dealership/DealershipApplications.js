
const DealershipApplications = ({testCriteria}) => {
    const dealersWithDAODPSRole = testCriteria.dealers.filter(d => d.userIsDA || d.userHasODPSRole)
    const dealer = dealersWithDAODPSRole.length === 1 ? dealersWithDAODPSRole[0] : testCriteria.dealers.find(d => d.id === testCriteria.selectedDealerId);
      

        return (
            <>
                {
                    !dealer && <div>You need to select a dealer to manage</div>
                }
                {
                    dealer && (
                    <>
                    <h3>Application History</h3>
                    <div className="myapp-history">
        
                    </div>
                    {
                        !(dealer.suspended || dealer.revoked || dealer.refused) && (
                            <>
                                <h3>New Appliaction</h3>
                                <div className="myapp-newapp">
                                    <div>Branch Application</div>
                                    { (!dealer.isBranch && dealer.regStatusId === "TERM" && dealer.regExpiryDate === "Over60DaysAgo" && dealer.dlrClassId !== "OOP") && (<div>Business Reapply Application-Expired over 60 days</div>)} 
                                    { (!dealer.isBranch && dealer.regStatusId === "TERM" && dealer.regExpiryDate === "Over60DaysAgo" && dealer.dlrClassId === "GEN" && dealer.dlrTypeId ==="NUMV") && (<div>Business Reapply Application for New and Used (Franchise) Only </div>)}
                                    { (dealer.isBranch && dealer.regStatusId === "TERM" && dealer.regExpiryDate === "Over60DaysAgo") && (<div>Branch Reapply Application</div>)}
                                    { (dealer.regStatusId === "TERM" && dealer.regExpiryDate === "WithinPast60Days" && dealer.dlrClassId !== "OOP") && (<div>Business Reapply Application-Expired within 60 days</div>)}
                                    { (dealer.regStatusId === "REG" && dealer.regExpiryDate === "InNext60Days" && dealer.dlrClassId !== "OOP") && (<div>Business Short Form</div>)}
                                    { (dealer.regStatusId === "TERM" && dealer.regExpiryDate === "Over60DaysAgo" && dealer.dlrClassId === "OOP") && (<div>Outside Ontario Business Reapply Application</div>)}
                                    { (dealer.regStatusId === "REG" && dealer.regExpiryDate === "InNext60Days" && dealer.dlrClassId === "OOP") && (<div>Outside Ontario Business Short Form</div>)}
                                    { (dealer.regStatusId === "REG") && (<div>Business Change Notice – Address</div>)}
                                    { (dealer.regStatusId === "REG") && (<div>Business Change Notice – Amalgamation </div>)}
                                    { (dealer.regStatusId === "REG") && (<div>Business Change Notice – Add/Remove Individuals  </div>)}
                                    { (dealer.regStatusId === "REG") && (<div>Business Change Notice – Name   </div>)}
                                    { (dealer.regStatusId === "REG") && (<div>Salesperson Cancellation Notice</div>)}
                                    { (dealer.regStatusId === "REG") && (<div>Dealership Classification Change Application </div>)}
                                    { (dealer.regStatusId === "REG" && dealer.dlrClassId === "GEN" && dealer.opStatusId === "Active") && (<div>Offsite Trade Application</div>)}
                                    { (dealer.regStatusId === "REG" || dealer.regStatusId === "TERM") && (<div>Override Request</div>)}
                                    <div>TODO: Request for Release of Letter of Credit </div>
                                    { (dealer.regStatusId === "REG" && "BROKERWHOLESLEASINFLEET".includes(dealer.dlrClassId)) && (<div>Request for Records Storage Address </div>)}
                                    {
                                        dealer.regStatusId === "REG" &&(<div>Termination</div>)
                                    }
                                    {
                                        dealer.regStatusId === "REG" &&(<div>Deactivation </div>)
                                    }
                                    {
                                        dealer.regStatusId === "REG" &&(<div>Business Change Notice Add/Remove Individuals </div>)
                                    }
                                </div>
                            </>
                        )
                    }
                </>)}
            </>
        )
}

export default DealershipApplications