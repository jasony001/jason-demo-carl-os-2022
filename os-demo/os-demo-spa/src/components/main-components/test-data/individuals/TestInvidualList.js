import React from "react";
import styles from "./TestInvidualList.module.css";
import testDataContext from "../../../../store/test-data-context";
import { Link } from "react-router-dom";

const TestInvidualList = (props) => {
    const { testData } = React.useContext(testDataContext);
    return (
        <div className={styles["test-individual-list"]}>
            <table className={styles.ind}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Party Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Reg. Status</th>
                        <th>Reg. Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {testData.dataSet.individuals.map((i) => (
                        <tr key={i.partyId}>
                            <td>
                                <Link
                                    to={`/TestDataSet/Individuals/${i.partyId}`}
                                >
                                    <button>
                                        <i className="fa-solid fa-pen-fancy"></i>
                                    </button>
                                </Link>
                            </td>
                            <td>{i.partyId}</td>
                            <td>{i.firstName}</td>
                            <td>{i.lastName}</td>
                            <td>
                                {i.regStatusId
                                    ? testData.lookupData.regStatusLookup.find(
                                          (l) => l.regStatusId === i.regStatusId
                                      ).description
                                    : `NULL`}
                            </td>
                            <td>
                                {i.regExpirydateId
                                    ? testData.lookupData.regExpirydateLookup.find(
                                          (l) =>
                                              l.regExpirydateId ===
                                              i.regExpirydateId
                                      ).description
                                    : `NULL`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestInvidualList;
