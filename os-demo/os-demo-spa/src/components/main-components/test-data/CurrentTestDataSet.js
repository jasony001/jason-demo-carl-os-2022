import React from "react";
import styles from "./CurrentTestDataSet.module.css";
import testDataContext from "../../../store/test-data-context";
import TestInvidualList from "./TestInvidualList";
import TestDealershipList from "./TestDealershipList";
import TestLegalEntityList from "./TestLegalEntityList";
import TestRelationshipList from "./TestRelationshipList";
import {Redirect} from 'react-router-dom'

const CurrentTestDataSet = (props) => {
    const { testData, setTestData } = React.useContext(testDataContext);


    if (testData.status === "LOADING") return <>LOADING...</>
    if (testData.status === "EMPTY") return <Redirect to="/TestDataSet/Create"></Redirect>
    

    return (
        <div className={styles["test-criteria"]}>
            <div className={styles["test-data-set-info"]}>
                <span className={styles["test-data-set-info-name"]}>
                    {testData.dataSet.info.name}
                </span>
                <span>created by {testData.dataSet.info.tester}</span>
            </div>
            <h2>Individuals</h2>
            <TestInvidualList />
            <h2>Dealerships</h2>
            <TestDealershipList />

            <h2>Legal Entities</h2>
            <TestLegalEntityList />

            <h2>Relationships</h2>
            <TestRelationshipList />
        </div>
    );
};

export default CurrentTestDataSet;