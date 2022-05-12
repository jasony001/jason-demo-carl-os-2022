import React from 'react'
const TestCriteriaSideBar = ({testCriteria}) => {
    const [minimized, setMinimized] = React.useState(true)
    const getDealers = () => {
        const filteredDealers = testCriteria.dealers.filter(d => d.userIsDA || d.userHasODPSRole)
        return filteredDealers
    }

    const getSelectedDealerName = () => {
        const selectedDealer = testCriteria.dealers.find(d => d.id+"" === testCriteria.selectedDealerId+"")
        const name = selectedDealer ? selectedDealer.name : ""
        return name
    }

    return (
        <>
            
            <div className = "test-criteria-sidebar">
                {
                    testCriteria && (
                        <>
                            { minimized && <i className="fa-solid fa-chevron-down" onClick={ () => setMinimized(prev => !prev)}></i>}
                            {
                                !minimized && (
                                    <>
                                        <div className='test-criteria-sidebar-header' onClick={ () => setMinimized(prev => !prev)}><div>Portal User</div> <i className="fa-solid fa-chevron-up"></i></div>
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
                            
                        </>
                    )
                }

            </div>
        </>
    )
}

export default TestCriteriaSideBar;