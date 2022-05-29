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
        // 1. load lookup data
        // 2. load saved data set list
        // 3. if localStorage has item testDataSetId, load data
        //     if retrieve failed, localStorage remove item
        const lastUsedDataSetId = localStorage.getItem("testDataSetId");
        let promiseArray = [
            testDataApi.getLookupDataFromDB(),
            testDataApi.getAllTestDataSets(),
        ];
        if (lastUsedDataSetId)
            promiseArray = [
                ...promiseArray,
                testDataApi.getTestDataSetFromDB(lastUsedDataSetId),
            ];

        Promise.all(promiseArray).then((d) => {
            let [lookupData, allDataSets, currentDataSet] = [...d];
            if (!currentDataSet || !currentDataSet.individuals || currentDataSet.individuals.length <= 0){
                localStorage.removeItem("testDataSetId");
                setTestData({
                    status: "EMPTY",
                    dataSet: undefined,
                    loggedInUser: undefined,
                    lookupData: { ...lookupData },
                    allTestDataSets: allDataSets
                });
            } else {
                const party = currentDataSet.individuals[0];
                const loggedInUser = {
                    partyId: party.partyId,
                    firstName: party.firstName,
                    lastName: party.lastName,
                };

                setTestData( {
                    status: "OK",
                    dataSet: { ...currentDataSet },
                    loggedInUser: loggedInUser,
                    lookupData: { ...lookupData },
                    allTestDataSets: allDataSets
                });
            }
        });
    }, []);

    return (
        <testDataContext.Provider value={{ testData, setTestData }}>
            {props.children}
        </testDataContext.Provider>
    );
};

export default TestDataContextProvider;
