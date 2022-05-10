import React from 'react'
import DealershipProfile from "./DealershipProfile";
import DealershipApplications from './DealershipApplications'
import DealershipInvoices from './DeleashipInvoices'
import DealershipNotifications from './DeleashipNofications'
import DealershipOmvicCertificate from './DealershipOmvicCertificate';
import AssignDAs from "./AssignDAs";
import { getMenuItemById } from "../nav/menuItemsData";

const DealershipMain = ( { testCriteria, selectDealer, pageId, menuItems } ) => {
    const dealers = testCriteria.dealers.filter(d => d.userIsDA || d.userHasODPSRole)

    let dealer
    if (dealers.length === 1){
        dealer = dealers[0]
    } else if (testCriteria.selectedDealerId){
        dealer = dealers.find(d => d.id === testCriteria.selectedDealerId)
    } 

    const getRandomRegNumber = (dealerId) => {
        const dealer = testCriteria.dealers.find(d => d.id+"" === dealerId + "")
        if (dealer.regStatusId === "NONE") return " Reg# NONE"

        return `Reg# ${Math.floor(Math.random() * 700000)}`;
    }

    return (
        <>
            {
                dealers.length === 0 && (
                    <h3>You are not authorized to access this page</h3>
                )
            }
            {
                !dealer && dealers.length > 0 && (
                    <>
                        <h4 >{ getMenuItemById(menuItems, pageId).label }
                        </h4>       
                        <>
                            <h5>Please select a dealer you want to manage to continue</h5>
                            {
                                dealers.map(d => {
                                    return (
                                        <div className='home-option' key = {d.id} 
                                            onClick={ e => { selectDealer(d.id, e); } }>
                                            <div>{ d.name } {getRandomRegNumber(d.id)}</div>
                                        </div>
                                    )
                                })
                            }
                        </>        
                    </>
                    
                )
            }
            {
                dealer && (
                    (
                        <>
                            <h4 >{ getMenuItemById(menuItems, pageId).label } - { dealer.name } 
                            {
                                dealers.length > 1&& (
                                    <i onClick={() => { selectDealer(""); }}  className="fa-solid fa-shuffle" style={{marginLeft:"1em"}}></i>
                                )
                            }
                            </h4>
                            { pageId === "s2010" && (<DealershipProfile testCriteria = {testCriteria} dealer = { dealer }/>) }
                            { pageId === "s2020" && (<DealershipApplications testCriteria = {testCriteria} dealer = { dealer }/>) }
                            { pageId === "s2030" && (<DealershipInvoices testCriteria = {testCriteria} dealer = { dealer }/>) }
                            { pageId === "s2040" && (<DealershipNotifications testCriteria = {testCriteria} dealer = { dealer }/>) }
                            { pageId === "s2050" && (<AssignDAs testCriteria = {testCriteria} dealer = { dealer }/>) }                            
                            { pageId === "s2060" && (<DealershipOmvicCertificate testCriteria = {testCriteria} dealer = { dealer }/>) }                            
                        </>
                    )
                )
            }
            
        </>
    )   
}

export default DealershipMain