
import React from 'react'

const MyProfileRegInfo = ({testCriteria}) => {
    return (
        <>
            <div className="myprofile-aboutme-grid">
                <div>Registration Number </div><div>654321</div>
                <div>Registration Status </div><div>{testCriteria.portalUser.regStatusId}</div>
                <div>Registration Expiry Date </div><div>{testCriteria.portalUser.regExpiryDate}</div>
            </div>
        </>
    )
}

export default MyProfileRegInfo