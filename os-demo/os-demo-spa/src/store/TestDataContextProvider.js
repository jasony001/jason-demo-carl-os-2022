import React from "react";
import testDataApi from "../data-api/testDataApi";
import testDataContext from "./test-data-context";

const TestDataContextProvider = (props) => {
    const [testData, setTestData] = React.useState({
        status: "LOADING",
        dataSet: {
            data: null,
            lookupData: null,
        },
        loggedInUser: null,
        selectedDealerPartyId: null,
    });

    React.useEffect(() => {
        testDataApi.loadLocalSavedTestData().then((d) => {
            const party = d.data.individuals[0];
            const loggedInUser = {
                partyId: party.partyId,
                firstName: party.firstName,
                lastName: party.lastName,
            };

            let localSavedTestDataSet = {
                status: d.data ? "OK" : "EMPTY",
                dataSet: { ...d.data },
                loggedInUser: loggedInUser,
                lookupData: { ...d.lookupData },
            };


            setTestData(localSavedTestDataSet);
        });
    }, []);

    return (
        <testDataContext.Provider value={{ testData, setTestData }}>
            {props.children}
        </testDataContext.Provider>
    );
};

export default TestDataContextProvider;
