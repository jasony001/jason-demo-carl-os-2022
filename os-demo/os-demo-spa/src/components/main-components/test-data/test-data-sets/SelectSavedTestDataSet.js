import React from "react";
import styles from "./SelectSavedTestDataSet.module.css";
import testDataApi from "../../../../data-api/testDataApi";
import testDataContext from "../../../../store/test-data-context";
import { useHistory, Link } from "react-router-dom";

const SelectSavedTestDataSet = (props) => {
    const { testData, setTestData } = React.useContext(testDataContext);
    const history = useHistory();

    const [allTestDataSets, setAllTestDataSets] = React.useState([]);

    const [filterBy, setFilterBy] = React.useState("");

    const filteredTestDataSets = allTestDataSets.filter(
        (d) =>
            d.name.toLowerCase().includes(filterBy) ||
            d.tester.toLowerCase().includes(filterBy)
    );
    const filterChanged = (e) => {
        setFilterBy(e.target.value);
        const filterString = e.target.value.trim().toLowerCase() ?? "";
        setFilterBy(filterString);
    };

    const deleteTestDataSet = (id) => {
        testDataApi.deleteTestDataSet(id).then(() => {
            setAllTestDataSets((prev) => prev.filter((ds) => ds.id !== id));
            setTestData((prev) => {
                return {
                    ...prev,
                    status: "EMPTY",
                    dataSet: undefined,
                    loggedInUser: undefined,
                };
            });
        });
    };

    React.useEffect(() => {
        testDataApi.getAllTestDataSets().then((d) => {
            setAllTestDataSets(d);
        });
    }, []);

    const selectTestDataSet = (id) => {
        testDataApi.getTestDataSetFromDB(id).then((d) => {
            const party = d.individuals[0];
            const loggedInUser = {
                partyId: party.partyId,
                firstName: party.firstName,
                lastName: party.lastName,
            };

            let testDataSet = {
                status: d ? "OK" : "EMPTY",
                dataSet: { ...d },
                loggedInUser: loggedInUser,
                lookupData: { ...testData.lookupData },
            };

            setTestData(testDataSet);
            history.push("/TestDataSet/Setup");
            localStorage.setItem("testDataSetId", id)
        });
    };

    return (
        <div className={styles["all-data-sets"]}>
            <h1>Select Saved Test Data Set</h1>
            {testData.status === "EMPTY" && (
                <p>
                    To use the demo applicaation, please select a test data set or click the + button to create a new one
                </p>
            )}
            <div className={styles.filter}>
                <i className="fa-solid fa-filter"></i>{" "}
                <input
                    name="filter"
                    value={filterBy}
                    onChange={filterChanged}
                ></input>
            </div>

            <table className={styles["data-set-list"]}>
                <thead>
                    <tr>
                        <th>Test Data Set Name</th>
                        <th>Created By</th>
                        <th>Created Date</th>
                        <th>
                            <Link to="/TestDataSet/Create">
                                <i className="fa-solid fa-plus"></i>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTestDataSets
                        .sort((d1, d2) => d1.id < d2.id)
                        .map((d) => (
                            <tr key={d.id}>
                                <td>{d.name}</td>
                                <td>{d.tester}</td>
                                <td>
                                    {new Date(d.id).toLocaleString("en-CA", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            selectTestDataSet(d.id)
                                        }
                                    >
                                        <i className="fa-solid fa-pen-fancy"></i>
                                    </button>
                                    <button
                                        onClick={() => deleteTestDataSet(d.id)}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default SelectSavedTestDataSet;
