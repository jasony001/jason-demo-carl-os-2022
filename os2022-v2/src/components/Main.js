import Navbar from "./nav/Navbar";
import Home from "./common/Home";
import React from 'react'
import MyProfile from './individual/MyProfile'
import MyApplications from './individual/MyApplications'
import MyInvoices from "./individual/MyInvoices";
import ChangePassword from "./common/ChangePassword";
import OMVICEvents from "./common/OMVICEvents";
import Support from './common/Support'
import MainPageTestCriteriaSideBar from './test-criteria/MainPageTestCriteriaSideBar'
import OmvicCertificate  from "./individual/OmvicCertificate";
import DealershipProfile from "./dealership/DealershipProfile";
import DealershipApplications from './dealership/DealershipApplications'

const Main = ({ testCriteria, pageId, mainComponentChanged, setMenuItems, menuItems }) => {

    const getMenuItemById = (id) => {
        let xmi;        
        if (menuItems && menuItems.length > 0){
            menuItems.forEach(mi => {
                if (mi.id === id){
                    xmi = mi;
                }

                if (mi.submenu && mi.submenu.length > 0) {
                    mi.submenu.forEach(smi => {
                        if (smi.id === id) {
                            xmi = smi;
                        }
                    })
                }
            })
        }
        
        return xmi;
    }


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
                    getMenuItemById(pageId) && (
                    <>
                        <header className="main-page-header">{ getMenuItemById(pageId).label }</header>
                        <div className = "main-page-main">
                            <MainPageTestCriteriaSideBar testCriteria={testCriteria}/>
                            { pageId === "t00" && (<Home testCriteria = {testCriteria} mainComponentChanged= {mainComponentChanged}/>) }
                            { pageId === "s1010" && (<MyProfile testCriteria = {testCriteria}/>) }
                            { pageId === "s1020" && (<MyApplications testCriteria = {testCriteria}/>) }
                            { pageId === "s1030" && (<MyInvoices testCriteria = {testCriteria}/>) }
                            { pageId === "t30 password" && (<ChangePassword testCriteria = {testCriteria}/>) }
                            { pageId === "t40" && (<OMVICEvents testCriteria = {testCriteria}/>) }
                            { pageId === "t50" && (<Support testCriteria = {testCriteria}/>) }
                            { pageId === "s1040" && (<OmvicCertificate testCriteria = {testCriteria}/>) }
                            { pageId === "s2010" && (<DealershipProfile testCriteria = {testCriteria}/>) }
                            { pageId === "s2020" && (<DealershipApplications testCriteria = {testCriteria}/>) }
                        </div>
                    </>
                )}
            </div>




            

        </div>
        
    )
}


export default Main;