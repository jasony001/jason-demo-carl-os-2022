import React from "react";
import styles from "./TestInvidualList.module.css";
import testDataContext from "../../../store/test-data-context";

const TestInvidualList = (props) => {
    const { testData, setTestData } = React.useContext(testDataContext);
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
                    {
                        testData.dataSet.individuals.map(i => (
                            <tr key={i.partyId}>
                                <td><i className="fa-solid fa-pen-fancy"></i></td>
                                <td>{ i.partyId }</td>
                                <td>{ i.firstName}</td>
                                <td>{ i.lastName}</td>
                                <td>{ i.regStatusId ? i.regStatusId : `NULL`}</td>
                                <td>{ i.regExpryDate ? i.regStatusId : `NULL`}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TestInvidualList;
