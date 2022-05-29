import React from "react";
import styles from "./TestRelationshipList.module.css";
import testDataContext from "../../../../store/test-data-context";
import { Link } from "react-router-dom";
import testDataApi from "../../../../data-api/testDataApi";

const TestRelationshipList = (props) => {
    const { testData, setTestData } = React.useContext(testDataContext);
    const deleteRelationship = (partyRltnId) => {
        testDataApi.deleteRelationship(partyRltnId).then(() => {
            setTestData((prev) => {
                return {
                    ...prev,
                    dataSet: {
                        ...prev.dataSet,
                        partyRltns: prev.dataSet.partyRltns.filter(
                            (r) => r.partyRltnId !== partyRltnId
                        ),
                    },
                };
            });
        });
    };
    return (
        <div className={styles["test-dealersip-list"]}>
            <table className={styles.rltn}>
                <thead>
                    <tr>
                        <th>
                            <Link to={`/TestDataSet/Relationships/-1`}>
                                <button><i className="fa-solid fa-plus"></i></button>
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
                                    to={`/TestDataSet/Relationships/${r.partyRltnId}`}
                                >
                                    <button><i className="fa-solid fa-pen-fancy"></i></button>
                                </Link>
                                <button style={{ marginLeft: "15px" }}><i
                                    className="fa-solid fa-trash"
                                    
                                    onClick={() =>
                                        deleteRelationship(r.partyRltnId)
                                    }
                                ></i></button>
                            </td>
                            <td>{r.partyRltnId}</td>
                            <td>{r.indPartyId ? 
                                testData.dataSet.individuals.find(i => i.partyId === r.indPartyId).firstName + ' ' +
                                testData.dataSet.individuals.find(i => i.partyId === r.indPartyId).lastName
                            : "NULL"}</td>
                            <td>{r.dlrPartyId ? 
                            testData.dataSet.dealerships.find(i => i.partyId === r.dlrPartyId).dlrName
                            : "NULL"}</td>
                            <td>{r.legPartyId ? 
                            testData.dataSet.legalEntities.find(i => i.partyId === r.legPartyId).legName
                            : "NULL"}</td>
                            <td>
                            {r.partyRltnRoleId ? testData.lookupData.partyRltnRoleLookup.find(
                                (lt) => lt.partyRltnRoleId === r.partyRltnRoleId
                            ).description : "NULL"}
                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestRelationshipList;
