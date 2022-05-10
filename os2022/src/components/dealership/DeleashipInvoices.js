import React from 'react'


const DealershipInvoices = ( { testCriteria } ) => {
    const dealer = testCriteria.dealers.find(d => d.id + "" === testCriteria.setDealerSelected + "")

    return (
        <>
            Dealer invoices main content
        </>
    )   
}

export default DealershipInvoices