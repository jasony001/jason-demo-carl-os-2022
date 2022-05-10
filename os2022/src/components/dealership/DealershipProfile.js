import React from 'react'
import DealershipProfileBasicInfo from './DealershipProfileBasicInfo'
import DealershiProfileContactInfo from './DealershiProfileContactInfo'
import DealershipProfileRegInfo from './DealershipProfileRegInfo'
import DealershiProfileTC from './DealershiProfileTC'
import DealershipProfileRltns from './DealershipProfileRltns'

const DealershipProfile = ( { testCriteria, dealer } ) => {

    const [selectedTab, setSelectedTab] = React.useState(0)
    const getTabHeaderClass = (tabIndex) => {
        return tabIndex === selectedTab ? "tab-header tab-header--selected" : "tab-header"
    }

    return (
        <div className="tab">
                <div className="tab-header-row">
                    <div className={getTabHeaderClass(0)} onClick={() => setSelectedTab(0)}>Basic information</div>
                    <div className={getTabHeaderClass(1)} onClick={() => setSelectedTab(1)}>contact info</div>
                    <div className={getTabHeaderClass(2)} onClick={() => setSelectedTab(2)}>Registration Information</div>
                    { 
                        dealer.tc && (
                            <div className={getTabHeaderClass(3)} onClick={() => setSelectedTab(3)}>Terms and Conditions</div>
                        )
                    }
                    <div className={getTabHeaderClass(4)} onClick={() => setSelectedTab(4)}>Business Makeup</div>

                </div>
                <div className="tab-main">
                    { selectedTab === 0 && (<DealershipProfileBasicInfo testCriteria = {testCriteria} dealer={dealer}/>) }
                    { selectedTab === 1 && (<DealershiProfileContactInfo testCriteria = {testCriteria} dealer={dealer}/>) }
                    { selectedTab === 2 && (<DealershipProfileRegInfo testCriteria = {testCriteria} dealer={dealer}/>) }
                    { selectedTab === 3 && (<DealershiProfileTC testCriteria = {testCriteria} dealer={dealer}/>) }
                    { selectedTab === 4 && (<DealershipProfileRltns testCriteria = {testCriteria} dealer={dealer}/>) }
                </div>
            </div>
    )   
}

export default DealershipProfile