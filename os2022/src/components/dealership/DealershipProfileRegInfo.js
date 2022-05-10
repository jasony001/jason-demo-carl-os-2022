
import React from 'react'
const DealershipProfileBasicInfo = ({dealer}) => {
    return (
        <div>
            <div className="myprofile-aboutme-grid">
                <div>Registration Number </div><div>654321</div>
                <div>Registration Status </div><div>{dealer.regStatusId}</div>
                <div>Registration Expiry Date </div><div>{dealer.regExpiryDate}</div>
            </div>
        </div>
    )
}

export default DealershipProfileBasicInfo;