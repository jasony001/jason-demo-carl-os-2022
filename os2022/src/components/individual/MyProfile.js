import React from 'react'
import MyProfileAboutMe from './MyProfileAboutMe'
import MyProfileContactInfo from './MyProfileContactInfo'
import MyProfileRegInfo from './MyProfileRegInfo'
import MyProfileTC from './MyProfileTC'
import MyProfileEmpInfo from './MyProfileEmpInfo'

const MyProfile = ({testCriteria}) => {
  
    const [selectedTab, setSelectedTab] = React.useState(4)
    const getTabHeaderClass = (tabIndex) => {
        return tabIndex === selectedTab ? "tab-header tab-header--selected" : "tab-header"
    }
    return (
        <>
            <div className="tab">
                <div className="tab-header-row">
                    <div className={getTabHeaderClass(0)} onClick={() => setSelectedTab(0)}>About Me </div>
                    <div className={getTabHeaderClass(1)} onClick={() => setSelectedTab(1)}>contact info</div>
                    <div className={getTabHeaderClass(2)} onClick={() => setSelectedTab(2)}>Registration Information</div>
                    { 
                        testCriteria.portalUser.tc && (
                            <div className={getTabHeaderClass(3)} onClick={() => setSelectedTab(3)}>Terms and Conditions</div>
                        )
                    }
                    <div className={getTabHeaderClass(4)} onClick={() => setSelectedTab(4)}>Employment Information</div>

                </div>
                <div className="tab-main">
                    { selectedTab === 0 && (<MyProfileAboutMe testCriteria = {testCriteria}/>) }
                    { selectedTab === 1 && (<MyProfileContactInfo testCriteria = {testCriteria}/>) }
                    { selectedTab === 2 && (<MyProfileRegInfo testCriteria = {testCriteria} />) }
                    { selectedTab === 3 && (<MyProfileTC testCriteria = {testCriteria}/>) }
                    { selectedTab === 4 && (<MyProfileEmpInfo testCriteria = {testCriteria}/>) }
                </div>
            </div>
        </>
    )
}

export default MyProfile;