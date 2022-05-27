import React from "react";
import styles from "./LoginControl.module.css";
import testDataContext from "../../store/test-data-context";

const LoginControl = (props) => {
    const [showPortalUserList, setShowPortalUserList] = React.useState(false);
    const { testData, setTestData } = React.useContext(testDataContext);

    const togglePortalUserList = () => {
        setShowPortalUserList((prev) => !prev);
    };

    const login = (partyId) => {
        setShowPortalUserList(false);
        const party = testData.dataSet.individuals.find(
            (i) => i.partyId === partyId
        );
        setTestData((prev) => {
            return {
                ...prev,
                loggedInUser: {
                    partyId: partyId,
                    firstName: party.firstName,
                    lastName: party.lastName,
                },
            };
        });
    };

    return (
        <div className={styles["login"]}>
            {!testData.loggedInUser && <>LOGIN </>}
            {testData.loggedInUser && (
                <>
                    {`${testData.loggedInUser.firstName} ${testData.loggedInUser.lastName} `}
                </>
            )}
            <button onClick={togglePortalUserList}>
                <i className="fa-solid fa-circle-arrow-down"></i>
            </button>
            {showPortalUserList && (
                <div className={styles["portal-user-list"]}>
                    {!testData.loggedInUser
                        ? testData.dataSet.individuals.map((i) => (
                              <div key={i.partyId}
                                  onClick={() => login(i.partyId)}
                                  className={styles["portal-user-list"]}
                              >{`${i.firstName} ${i.lastName} `}</div>
                          ))
                        : testData.dataSet.individuals
                              .filter(
                                  (i) =>
                                      i.partyId !==
                                      testData.loggedInUser.partyId
                              )
                              .map((i) => (
                                  <div key={i.partyId}
                                      onClick={() => login(i.partyId)}
                                      className={styles["portal-user-list"]}
                                  >{`${i.firstName} ${i.lastName} `}</div>
                              ))}
                </div>
            )}
        </div>
    );
};

export default LoginControl;
