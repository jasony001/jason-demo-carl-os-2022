import React from "react";
import styles from "./TestRelationshipList.module.css";
import testDataContext from "../../../store/test-data-context";
import { Link } from "react-router-dom";

const TestRelationshipList = (props) => {
    const { testData, setTestData } = React.useContext(testDataContext);
    return (
        <div className={styles["test-dealersip-list"]}>
            <table className={styles.rltn}>
                <thead>
                    <tr>
                        <th>
                            <Link to={`/TestDataSet/RelationshipDetails/-1`}>
                                <i className="fa-solid fa-plus"></i>
                            </Link>
                        </th>
                        <th>PartyRltn Id</th>
                        <th>Ind</th>
                        <th>Dlr</th>
                        <th>Leg</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {testData.dataSet.partyRltns.map((r) => (
                        <tr key={r.partyRltnId}>
                            <td className={styles.icon}>
                                <Link
                                    to={`/TestDataSet/RelationshipDetails/${r.partyRltnId}`}
                                >
                                    <i className="fa-solid fa-pen-fancy"></i>
                                </Link>
                            </td>
                            <td>{r.partyRltnId}</td>
                            <td>{r.indPartyId ? r.indPartyId : "NULL"}</td>
                            <td>{r.dlrPartyId ? r.dlrPartyId : "NULL"}</td>
                            <td>{r.legPartyId ? r.legPartyId : "NULL"}</td>
                            <td>{r.partyRltnRoleId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestRelationshipList;
