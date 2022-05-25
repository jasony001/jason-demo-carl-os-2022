import React from "react";
import styles from "./TestDealershipList.module.css";
import testDataContext from "../../../store/test-data-context";

const TestDealershipList = (props) => {
    const { testData, setTestData } = React.useContext(testDataContext);
    return (
        <div className={styles["test-dealersip-list"]}>
            <table className={styles.dlr}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Party Id</th>
                        <th>Dealer Name</th>
                        <th>Dealer Class</th>
                        <th>Dealer Type</th>
                        <th>Reg. Status</th>
                        <th>Reg. Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        testData.dataSet.dealerships.map(d => (
                            <tr key={d.partyId}>
                                <td><i className="fa-solid fa-pen-fancy"></i></td>
                                <td>{ d.partyId }</td>
                                <td>{ d.dlrName }</td>
                                <td>{ d.dlrClassId }</td>
                                <td>{ d.dlrTypeId ? d.dlrTypeId : 'NULL' }</td>
                                <td>{ d.regStatusId ? d.regStatusId : 'NULL'  }</td>
                                <td>{ d.regExpryDate ? d.regExpryDate : 'NULL' }</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TestDealershipList;
