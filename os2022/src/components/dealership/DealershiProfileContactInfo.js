import React from 'react'

const DealershiProfileContactInfo = ({dealer}) => {
    return (
        <div className="myprofile-aboutme-grid">
            <div>Business Phone </div><div><input value="416-123-4567"/></div>
            <div>Alternate Phone</div><div><input value="905-123-4567"/></div>
            <div>Business Fax</div><div><input value="416-765-4321"/></div>
            <div>Toll Free</div><div><input value="1-888-1234567"/></div>
            <div>URL</div><div><input value="www.yangsauto.com"/></div>
            <div>Business Address</div><div>1 king st</div>
            <div>Dwelling Address</div><div></div>
            <div>Mailing Address</div><div>1 king st</div>
            <div>Recor Storage Address</div><div>some place in China</div>
        </div>
    )
}

export default DealershiProfileContactInfo;