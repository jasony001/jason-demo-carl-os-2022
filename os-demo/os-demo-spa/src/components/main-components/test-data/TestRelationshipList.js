import React from "react";
import styles from "./TestRelationshipList.module.css";
import testDataContext from "../../../store/test-data-context";

const TestRelationshipList = (props) => {
    const { testData, setTestData } = React.useContext(testDataContext);
    return (
        <div className={styles["test-dealersip-list"]}>
            <table className={styles.rltn}>
                <thead>
                    <tr>
                        <th></th>
                        <th>PartyRltn Id</th>
                        <th>Ind</th>
                        <th>Dlr</th>
                        <th>Leg</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        testData.dataSet.partyRltns.map(r => (
                            <tr key={r.partyRltnId}>
                                <td><i className="fa-solid fa-pen-fancy"></i></td>
                                <td>{ r.partyRltnId }</td>
                                <td>{ r.indPartyId ?  r.indPartyId : 'NULL' }</td>
                                <td>{ r.dlrPartyId ?  r.dlrPartyId : 'NULL' }</td>
                                <td>{ r.legPartyId ?  r.legPartyId : 'NULL' }</td>
                                <td>{ r.partyRltnRoleId }</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TestRelationshipList;
