import React from "react";
import styles from "./TestDealershipList.module.css";
import testDataContext from "../../../../store/test-data-context";
import { Link } from "react-router-dom";

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
                    {testData.dataSet.dealerships.map((d) => (
                        <tr key={d.partyId}>
                            <td>
                                <Link
                                    to={`/TestDataSet/Dealerships/${d.partyId}`}
                                >
                                    <button>
                                        <i className="fa-solid fa-pen-fancy"></i>
                                    </button>
                                </Link>
                            </td>
                            <td>{d.partyId}</td>
                            <td>{d.dlrName}</td>
                            <td>{
                                d.dlrClassId ?
                                testData.lookupData.dlrClassLookup.find(
                                    (lt) => lt.dlrClassId === d.dlrClassId
                                ).description
                                : 'NULL'
                            }</td>
                            <td>{d.dlrTypeId ? testData.lookupData.dlrTypeLookup.find(
                                    (lt) => lt.dlrTypeId === d.dlrTypeId
                                ).description : "NULL"}</td>
                            <td>{d.regStatusId ? testData.lookupData.regStatusLookup.find(
                                    (lt) => lt.regStatusId === d.regStatusId
                                ).description : "NULL"}</td>
                            <td>
                                {d.regExpirydateId
                                    ? testData.lookupData.regExpirydateLookup.find(
                                          (l) =>
                                              l.regExpirydateId ===
                                              d.regExpirydateId
                                      ).description
                                    : "NULL"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestDealershipList;
