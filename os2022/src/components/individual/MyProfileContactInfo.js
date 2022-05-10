
import React from 'react'

const MyProfileContactInfo = ({testCriteria}) => {
    return (
        <>
            <div className="myprofile-aboutme-grid">
                <div>Residence Address</div><div><input value="123 main st - open another input form"/></div>
                <div>Mailing Address</div><div><input value="1 microsoft ave - open another input form"/></div>
                <div>Home Phone </div><div><input value="425-000-0000 - open another input form"/></div>
                <div>Mobile Phone </div><div><input value="425-111-1111 - open another input form"/></div>
                <div>Alternate Phone </div><div><input value="425-222-2222 - open another input form"/></div>
                <div>Primary Email </div><div><input value="bill.gates@microsoft.com - open another input form"/></div>
                <div>Secondary Email </div><div><input value="bill.gates@aol.com - open another input form"/></div>
            </div>
        </>
    )
}

export default MyProfileContactInfo