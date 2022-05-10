import React from 'react'


const DealershipInvoices = ( { testCriteria } ) => {
    const dealer = testCriteria.dealers.find(d => d.id + "" === testCriteria.setDealerSelected + "")

    return (
        <div className='myprofile-rltns'>
        <div className='rltn-grid-section-title'>Unpaid Invoices</div>
        <div className='rltn-grid'>
            <div className='rltn-grid-header'>Invoice ID </div>
            <div className='rltn-grid-header'>Status</div>
            <div className='rltn-grid-header'>Invoice Date </div>
            <div className='rltn-grid-header'>Total Amount </div>
            <div className='rltn-grid-header'>PDF of Invoice</div>
            <div className='rltn-grid-header'></div>

            <div className='rltn-grid-odd-row'>12345</div>
            <div className='rltn-grid-odd-row'>processing</div>
            <div className='rltn-grid-odd-row'>Dec 31 2099</div>
            <div className='rltn-grid-odd-row'>$100 M</div>
            <div className='rltn-grid-odd-row'><a href="#">PDF of Invoice</a></div>
            <div className='rltn-grid-odd-row icons-cell'>
                <i class="fa-solid fa-eye"></i> <i class="fa-solid fa-pen"></i>
            </div>

            <div className='rltn-grid-even-row'>12345</div>
            <div className='rltn-grid-even-row'>processing</div>
            <div className='rltn-grid-even-row'>Dec 31 2099</div>
            <div className='rltn-grid-even-row'>$100 M</div>
            <div className='rltn-grid-even-row'><a href="#">PDF of Invoice</a></div>
            <div className='rltn-grid-even-row icons-cell'>
                <i class="fa-solid fa-eye"></i> <i class="fa-solid fa-pen"></i>
            </div>


            <div className='rltn-grid-odd-row'>12345</div>
            <div className='rltn-grid-odd-row'>processing</div>
            <div className='rltn-grid-odd-row'>Dec 31 2099</div>
            <div className='rltn-grid-odd-row'>$100 M</div>
            <div className='rltn-grid-odd-row'><a href="#">PDF of Invoice</a></div>
            <div className='rltn-grid-odd-row icons-cell'>
                <i class="fa-solid fa-eye"></i> <i class="fa-solid fa-pen"></i>
            </div>
        </div>
        <div className='rltn-grid-section-title'>Paid Invoices</div>
        <div className='paid-invoice-grid'>
            <div className='rltn-grid-header'>Invoice ID </div>
            <div className='rltn-grid-header'>Status</div>
            <div className='rltn-grid-header'>Invoice Date </div>
            <div className='rltn-grid-header'>Total Amount </div>
            <div className='rltn-grid-header'>View Invoice</div>
            <div className='rltn-grid-header'>View Receipt</div>
            <div className='rltn-grid-header'>Request Refund</div>
            <div className='rltn-grid-header'></div>


            <div className='rltn-grid-odd-row'>12345</div>
            <div className='rltn-grid-odd-row'>processing</div>
            <div className='rltn-grid-odd-row'>Dec 31 2099</div>
            <div className='rltn-grid-odd-row'>$100 M</div>
            <div className='rltn-grid-odd-row'><a href="#">PDF of Invoice</a></div>
            <div className='rltn-grid-odd-row'><a href="#">PDF of Receipt</a></div>
            <div className='rltn-grid-odd-row'><a href="#">Request Refund</a></div>
            <div className='rltn-grid-odd-row icons-cell'>
                <i class="fa-solid fa-eye"></i> <i class="fa-solid fa-pen"></i>
            </div>

            <div className='rltn-grid-even-row'>12345</div>
            <div className='rltn-grid-even-row'>processing</div>
            <div className='rltn-grid-even-row'>Dec 31 2099</div>
            <div className='rltn-grid-even-row'>$100 M</div>
            <div className='rltn-grid-even-row'><a href="#">PDF of Invoice</a></div>
            <div className='rltn-grid-even-row'><a href="#">PDF of Receipt</a></div>
            <div className='rltn-grid-even-row'><a href="#">Request Refund</a></div>
            <div className='rltn-grid-even-row icons-cell'>
                <i class="fa-solid fa-eye"></i> <i class="fa-solid fa-pen"></i>
            </div>


            <div className='rltn-grid-odd-row'>12345</div>
            <div className='rltn-grid-odd-row'>processing</div>
            <div className='rltn-grid-odd-row'>Dec 31 2099</div>
            <div className='rltn-grid-odd-row'>$100 M</div>
            <div className='rltn-grid-odd-row'><a href="#">PDF of Invoice</a></div>
            <div className='rltn-grid-odd-row'><a href="#">PDF of Receipt</a></div>
            <div className='rltn-grid-odd-row'><a href="#">Request Refund</a></div>
            <div className='rltn-grid-odd-row icons-cell'>
                <i class="fa-solid fa-eye"></i> <i class="fa-solid fa-pen"></i>
            </div>        
        </div>
    </div>
    )   
}

export default DealershipInvoices