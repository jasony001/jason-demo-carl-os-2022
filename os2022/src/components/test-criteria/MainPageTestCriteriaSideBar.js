import React from 'react'
const MainPageTestCriteriaSideBar = ({testCriteria}) => {
    const getDealers = () => {
        const filteredDealers = testCriteria.dealers.filter(d => d.userIsDA || d.userHasODPSRole)
        return filteredDealers
    }

    const getSelectedDealerName = () => {
        const selectedDealer = testCriteria.dealers.find(d => d.id+"" === testCriteria.selectedDealerId+"")
        const name = selectedDealer ? selectedDealer.name : ""
        return name
    }
    // const dealersWithDAODPSRole = testCriteria.dealers.filter(d => d.userIsDA || d.userHasODPSRole)
    // const selectedDealer = 
    //     testCriteria.selectedDealerId ? testCriteria.dealers.find(d => d.id === testCriteria.selectedDealerId) :
    //     dealersWithDAODPSRole.length === 0 ? undefined :
    //     (        dealersWithDAODPSRole.length === 1 ? dealersWithDAODPSRole[0] : testCriteria.dealers.find(d => d.id === testCriteria.selectedDealerId));


    return (
        <div className = "main-page-test-criteria">
            {
                testCriteria && (
                    <>
                        <div className='test-criteria-sidebar-header'>Portal User</div>
                        <div className='test-criteria-sidebar-header'></div>                        
                        {
                            Object.keys(testCriteria.portalUser).map(k => {
                                return (
                                    <React.Fragment key={k}>
                                        <div>{k}: </div>
                                        <div>
                                            {
                                            (typeof(testCriteria.portalUser[k]) === "boolean") ? (testCriteria.portalUser[k]?"Yes":"No") : testCriteria.portalUser[k]
                                            }
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }

                                <>
                                    <div className='test-criteria-sidebar-header'>Selected Dealer</div>
                                    <div className='test-criteria-sidebar-header'></div>  
                                    <div>{ getSelectedDealerName() }</div>
                                    <div></div>
                                </>
                          
                        {
                            getDealers().length > 0 && (
                                <>
                                    <div className='test-criteria-sidebar-header'>Dealers</div>
                                    <div className='test-criteria-sidebar-header'></div>
                                    {
                                        getDealers().map(d => {
                                            return (
                                                <React.Fragment key={d.id}>
                                                    <div className='test-criteria-sidebar-subheader'>{d.name}</div>
                                                    <div className='test-criteria-sidebar-subheader'></div> 
                                                    <>
                                                    {
                                                        Object.keys(d).map(k => {
                                                            if (k !== "id" && k !=="name"){
                                                            return (
                                                                <React.Fragment key={k}>
                                                                    <div>{k}: </div>
                                                                    <div>
                                                                        {(typeof(d[k]) === "boolean") ? (d[k]?"Yes":"No") : d[k]}
                                                                    </div>
                                                                </React.Fragment>
                                                            )}
                                                        })
                                                    }
                                                    </>                                                   
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                        
                    </>
                )
            }

        </div>
    )
}

export default MainPageTestCriteriaSideBar;