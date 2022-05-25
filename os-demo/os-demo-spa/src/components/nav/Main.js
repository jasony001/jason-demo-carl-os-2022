import React from "react";
import { Redirect, Switch,Route } from "react-router-dom";
import styles from "./Main.module.css";
import testDataContext from "../../store/test-data-context";
import Header from "./Header";

// import all the 'main' components. next level routing will happen in the 'main components
import Home from "../main-components/Home";
import IndividualMain from '../main-components/individual/IndividualMain'
import DealershipMain from '../main-components/dealership/DealershipMain'
import AccountMain from '../main-components/account/AccountMain'
import OMVICEvents from "../main-components/dealership/OMVICEvents";
import Support from "../main-components/dealership/Support";
import TestDataSetMain from "../main-components/test-data/TestDataSetMain";

function Main() {
    const { testData } = React.useContext(testDataContext);

    return (
        <div className={styles.main}>
            <Header />
            {testData.status === "LOADING" && <>LOADING</>}
            {testData.status === "EMPTY" && (
                <Redirect to="/TestDataSet/Create"></Redirect>
            )}
            <Switch>
                <Route path="/TestDataSet">
                    <TestDataSetMain />
                </Route>
                <Route path="/Individual">
                    <IndividualMain/>
                </Route>
                <Route path="/Dealership">
                    <DealershipMain/>
                </Route>
                <Route path="/Account">
                    <AccountMain/>
                </Route>
                <Route path="/OMVICEvents">
                    <OMVICEvents/>
                </Route>
                <Route path="/Support">
                    <Support/>
                </Route>
                <Route path="/Home">
                    <Home/>
                </Route>
                <Route path="/">
                    <Redirect to="/Home"/>
                </Route>
            </Switch>
        </div>
    );
}

export default Main;
