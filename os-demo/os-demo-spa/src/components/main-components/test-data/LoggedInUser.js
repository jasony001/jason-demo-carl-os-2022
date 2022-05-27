import React from "react";
import styles from "./LoggedInUser.module.css";
import testDataContext from "../../../store/test-data-context";

const LoggedInUser = (props) => {
    const { testData, setTestData } = React.useContext(testDataContext);

    if (testData.status !== "OK") return <></>;

    const portalUsers = testData.dataSet.individuals.filter(
        (i) => i.usesOmsWeb
    );
    return (
        <div className={styles["logged-in-user"]}>
            {/* <h1>LoggedInUser</h1>
            {portalUsers.length === 0 &&
                "None of the test individual is set to Online Services User"}
            {portalUsers.length > 0 && (
                <>
                    <div>
                        Please specify which of the following portal users are
                        the logged in user
                    </div>
                    {
                        portalUsers.map(u => <div>{u.firstName + ' ' + u.lastName}</div>)
                    }
                </>
            )} */}
        </div>
    );
};

export default LoggedInUser;
