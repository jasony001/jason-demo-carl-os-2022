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
    });

    React.useEffect(() => {
        testDataApi.loadLocalSavedTestData().then((d) => {
            let localSavedTestDataSet = {
                status: d.data ? "OK" : "EMPTY",
                dataSet: { ...d.data },
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
