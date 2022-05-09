
const MyApplications = ({testCriteria}) => { 
    return (
        <>
            <h3>Application History</h3>
            <div className="myapp-history">

            </div>
            <h3>New Appliaction</h3>
            <div className="myapp-newapp">
                <div>Business Application </div>
                <div>Business Application for New and Used (Franchise) Only </div>
                <div>Business Application for Out of Province </div>
                { (testCriteria.portalUser.regStatusId === "NONE" || testCriteria.portalUser.regStatusId === "NOTREG") && (<div>Individual Application</div>)}
                { (testCriteria.portalUser.regStatusId === "TERM" && testCriteria.portalUser.regExpiryDate === "Over60DaysAgo") && (<div>Individual Reapply Application Expired over 60 days </div>)}
                { (testCriteria.portalUser.regStatusId === "NONE" || testCriteria.portalUser.regStatusId === "NOTREG") && (<div>Outside Ontario Individual Application</div>)}
                { (testCriteria.portalUser.regStatusId === "TERM" && testCriteria.portalUser.regExpiryDate === "Over60DaysAgo") && (<div>Outside Ontario Individual Reapply Application</div>)}
                { (testCriteria.portalUser.regStatusId === "REG" || (testCriteria.portalUser.regStatusId === "TERM" && testCriteria.portalUser.regExpiryDate === "InTheFuture")) && (<div>Sales Change Application</div>)}
                { (testCriteria.portalUser.regStatusId === "REG" && testCriteria.portalUser.regExpiryDate === "InNext60Days") && (<div>Sales Short Form</div>)}
                { (testCriteria.portalUser.regStatusId === "TERM" && testCriteria.portalUser.regExpiryDate === "WithinPast60Days") && (<div>Individual Reapply Application Expired within 60 days</div>)}
                <div>TODO: Outside Ontario Sales Short Form</div>
            </div>
        </>
    )
}

export default MyApplications;