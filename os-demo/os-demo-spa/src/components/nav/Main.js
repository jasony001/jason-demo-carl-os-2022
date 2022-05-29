import React from "react";
import { Redirect, Switch, Route, useLocation } from "react-router-dom";
import styles from "./Main.module.css";
import testDataContext from "../../store/test-data-context";
import Header from "./Header";

// import all the 'main' components. next level routing will happen in the 'main components
import Home from "../main-components/Home";
import IndividualMain from "../main-components/individual/IndividualMain";
import DealershipMain from "../main-components/dealership/DealershipMain";
import AccountMain from "../main-components/account/AccountMain";
import OMVICEvents from "../main-components/OMVICEvents";
import Support from "../main-components/Support";
import TestDataSetMain from "../main-components/test-data/TestDataSetMain";
import Loading from "./Loading";
import LoginControl from "./LoginControl";
import CreateTestDataSet from "../main-components/test-data/test-data-sets/CreateTestDataSet";
import SelectSavedTestDataSet from "../main-components/test-data/test-data-sets/SelectSavedTestDataSet";

function Main() {
    const { testData } = React.useContext(testDataContext);

    let location = useLocation().pathname.toLowerCase();
    if (
        location === "/testdataset/create" ||
        location === "/testdataset/select"
    ) {
        return (
            <div className={styles.main}>
                <Header />

                <Switch>
                    <Route path="/TestDataSet/Create" exact>
                        <CreateTestDataSet />
                    </Route>
                    <Route path="/TestDataSet/Select" exact>
                        <SelectSavedTestDataSet />
                    </Route>
                </Switch>
            </div>
        );
    }

    return (
        <div className={styles.main}>
            <Header />

            <Switch>
                <Route path="/TestDataSet/Create" exact>
                    <CreateTestDataSet />
                </Route>
                <Route path="/TestDataSet/Select" exact>
                    <SelectSavedTestDataSet />
                </Route>
            </Switch>

            {testData.status === "LOADING..." && <Loading />}
            {testData.status === "EMPTY" &&
                (!testData.allTestDataSets ||
                    testData.allTestDataSets.length <= 0) && (
                    <CreateTestDataSet />
                )}
            {testData.status === "EMPTY" &&
                testData.allTestDataSets &&
                testData.allTestDataSets.length > 0 && (
                    <SelectSavedTestDataSet />
                )}

            {testData.status === "OK" && (
                <div className={styles["main-content"]}>
                    <LoginControl />
                    <Switch>
                        <Route path="/TestDataSet">
                            <TestDataSetMain />
                        </Route>
                        <Route path="/Individual">
                            <IndividualMain />
                        </Route>
                        <Route path="/Dealership">
                            <DealershipMain />
                        </Route>
                        <Route path="/Account">
                            <AccountMain />
                        </Route>
                        <Route path="/OMVICEvents">
                            <OMVICEvents />
                        </Route>
                        <Route path="/Support">
                            <Support />
                        </Route>
                        <Route path="/Home">
                            <Home />
                        </Route>
                        <Route path="/">
                            <Redirect to="/Home" />
                        </Route>
                    </Switch>
                </div>
            )}
        </div>
    );
}

export default Main;
