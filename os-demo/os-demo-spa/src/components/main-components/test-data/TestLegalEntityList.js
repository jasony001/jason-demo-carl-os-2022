import React from "react";
import styles from "./TestLegalEntityList.module.css";
import testDataContext from "../../../store/test-data-context";

const TestLegalEntityList = (props) => {
    const { testData, setTestData } = React.useContext(testDataContext);
    return (
        <div className={styles["test-dealersip-list"]}>
            <table className={styles.leg}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Party Id</th>
                        <th>Legal Entity Name</th>
                        <th>Legal Entity Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        testData.dataSet.legalEntities.map(l => (
                            <tr key={l.partyId}>
                                <td><i className="fa-solid fa-pen-fancy"></i></td>
                                <td>{ l.partyId }</td>
                                <td>{ l.legName }</td>
                                <td>{ l.legTypeId ?  l.legTypeId : 'NULL' }</td>

                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TestLegalEntityList;
