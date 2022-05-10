import './App.css';

import React from 'react'
import TestCriteria from './components/test-criteria/TestCriteria';
import Main from './components/Main'
import { getMenuItems } from './components/nav/menuItemsData';

function App() {

    const defaultTestCriteria = {
        portalUser: {
            regStatusId: 'REG',
            regExpiryDate: 'InNext60Days',
            tc: false
        },
        selectedDealerId:"",
        dealers: [
            {
                userIsDA: false,
                userHasODPSRole: false,
                id: 1,
                regStatusId: 'REG',
                regExpiryDate: 'InNext60Days',

                name: "Dealer A",

                dlrClassId: "OOP",
                dlrTypeId: "NUMV",
                opStatusId: "Active",
                suspended: false,
                revoked: false,
                refused: false,
                isBranch: false,
                tc: false
            },
            {
                id: 2,
                userIsDA: true,
                userHasODPSRole: true,
                regStatusId: 'REG',
                regExpiryDate: 'InNext60Days',

                name: "Dealer B",

                dlrClassId: "GEN",
                dlrTypeId: "NUMV",
                opStatusId: "Active",
                suspended: false,
                revoked: false,
                refused: false,
                isBranch: false,
                tc: false
            }
        ]
    }
    const [testCriteria, setTestCriteria] = React.useState(undefined)
    const [pageId, setPageId] = React.useState("t00")
    const [menuItems, setMenuItems] = React.useState(getMenuItems(defaultTestCriteria))
    const [showTestCriteria, setShowTestCriteria] = React.useState(false)


    const mainComponentChanged = (newPageId) => {
        setPageId(newPageId)
    }

    const toggleTestCriteria = () => {
        setShowTestCriteria(prev => !prev)
    }

    const getSliderClass = () => {
        return showTestCriteria ? "slider slider--left" : "slider slider--right";
    }

    React.useEffect(() => {
        const clean = localStorage.getItem("clean")
        if (!clean){
            localStorage.clear()
            localStorage.setItem("clean", (1 + Math.random()) + "")
        }
        const savedCriteriaString = localStorage.getItem("testCriteria");
        let tc 
        if (savedCriteriaString) {
            let savedCriteria = JSON.parse(savedCriteriaString)

            tc = savedCriteria
        } else if (!testCriteria) {
            tc = defaultTestCriteria
        }

        setTestCriteria(tc)
    }, [])

    const getUpdatedTestCriteria = (ct, name, value) => {
        let updatedTestCriteria

        if (name.startsWith('portalUser-')) {
            name = name.split('-')[1];
            let updatedPortalUser = { ...ct.portalUser, [name]: value }
            updatedTestCriteria = { ...ct, portalUser: updatedPortalUser }
        } else if (name.startsWith('dealer-')) {
            let [rest, id, key] = name.split('-')

            let updatedDealer = ct.dealers.find(d => d.id + "" === id + "")
            updatedDealer = { ...updatedDealer, [key]: value }
            let updatedDealerList = ct.dealers.map(d => (d.id + "" === id + "") ? updatedDealer : d);
            updatedTestCriteria = { ...ct, dealers: updatedDealerList }
        } else {
            updatedTestCriteria = { ...testCriteria, [name]: value }

        }

        return updatedTestCriteria;
    }

    const testCriteriaChanged = (name, value) => {
        setTestCriteria(prev => {
            let ut = getUpdatedTestCriteria(prev, name, value)

            localStorage.setItem("testCriteria", JSON.stringify(ut))
            return ut;
        })
    }

    const selectDealer = (dealerId) => {
        setTestCriteria(prev => { return { ...prev, selectedDealerId: dealerId } } )
    }

    return (
    <>
{/* 
        <div className="App">
            <TestCriteria testCriteria={testCriteria} testCriteriaChanged={testCriteriaChanged} />
        </div> */}



        <div className="App" onClick={() => { setMenuItems(getMenuItems(testCriteria)) }}>
            {showTestCriteria && <TestCriteria testCriteria={testCriteria} testCriteriaChanged={testCriteriaChanged} />}
            <div className={getSliderClass()} onClick={toggleTestCriteria}></div>
            
            {(showTestCriteria === undefined || !showTestCriteria) && testCriteria &&
                <Main
                    testCriteria={testCriteria}
                    pageId={pageId}
                    mainComponentChanged={mainComponentChanged}
                    setMenuItems={setMenuItems}
                    menuItems={menuItems}
                    selectDealer = { selectDealer }
                />
            }
        </div>

    </>

    );
}

export default App;
