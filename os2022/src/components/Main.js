import Navbar from "./nav/Navbar";
import Home from "./common/Home";
import React from 'react'
import MyProfile from './individual/MyProfile'
import MyApplications from './individual/MyApplications'
import MyInvoices from "./individual/MyInvoices";
import ChangePassword from "./common/ChangePassword";
import OMVICEvents from "./common/OMVICEvents";
import Support from './common/Support'
import TestCriteriaSideBar from './test-criteria/TestCriteriaSideBar'
import OmvicCertificate  from "./individual/OmvicCertificate";
import DeashipMain from './dealership/DealershipMain'
import { getMenuItemById } from "./nav/menuItemsData";
import '../styles/main.css'

const Main = ({ testCriteria, pageId, mainComponentChanged, setMenuItems, menuItems, selectDealer }) => {
    return (
        <div className="main">
            <Navbar 
                mainComponentChanged= {mainComponentChanged} 
                testCriteria = {testCriteria }
                menuItems = {menuItems}
                setMenuItems={setMenuItems}
            />
            <div className="main-page">
                {
                    getMenuItemById(menuItems, pageId) && (
                    <>
                        {/* <header className="main-page-header">{ getMenuItemById(pageId).label }</header> */}
                        <div className = "main-page-main">
                            <TestCriteriaSideBar testCriteria={testCriteria}/>
                            { pageId === "t00" && (<Home testCriteria = {testCriteria} mainComponentChanged= {mainComponentChanged}/>) }
                            { pageId === "s1010" && (<MyProfile testCriteria = {testCriteria}/>) }
                            { pageId === "s1020" && (<MyApplications testCriteria = {testCriteria}/>) }
                            { pageId === "s1030" && (<MyInvoices testCriteria = {testCriteria}/>) }
                            { pageId === "t30" && (<ChangePassword testCriteria = {testCriteria}/>) }
                            { pageId === "t40" && (<OMVICEvents testCriteria = {testCriteria}/>) }
                            { pageId === "t50" && (<Support testCriteria = {testCriteria}/>) }
                            { pageId === "s1040" && (<OmvicCertificate testCriteria = {testCriteria}/>) }

                            { pageId.startsWith("s20") && (<DeashipMain testCriteria = {testCriteria} selectDealer={selectDealer} pageId={pageId} menuItems={menuItems} />) }
                            {/* { pageId === "s2020" && (<DealershipApplications testCriteria = {testCriteria} selectDealer={selectDealer} />) }
                            { pageId === "s2030" && (<DealershipInvoices testCriteria = {testCriteria} selectDealer={selectDealer} />) }
                            { pageId === "s2040" && (<DealershipNotifications testCriteria = {testCriteria} selectDealer={selectDealer} />) }
                            { pageId === "s2050" && (<AssignDAs testCriteria = {testCriteria} selectDealer={selectDealer} />) } */}
                        </div>
                    </>
                )}
            </div>




            

        </div>
        
    )
}


export default Main;