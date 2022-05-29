import React from "react";
import styles from "./CreateTestDataSet.module.css";
import testDataContext from "../../../../store/test-data-context";
import testDataApi from "../../../../data-api/testDataApi";
import { useHistory } from "react-router-dom";

const CreateTestDataSet = () => {

    let history = useHistory();
    const { testData, setTestData } = React.useContext(testDataContext);

    const [formData, setFormData] = React.useState({ name: "", tester: "" });

    const submitHandler = (e) => {
        e.preventDefault();

        if (
            formData.name.trim().length === 0 ||
            formData.tester.trim().length === 0
        ) {
            alert("both fields are required");
            return;
        }

        testDataApi
            .createTestDataSet(formData.name, formData.tester)
            .then((d) => {
                localStorage.setItem("testDataSetId", d.info.id);
                setTestData({ status: "OK", dataSet: d });
                history.push("/TestDataSet");
            });
    };

    const changeHandler = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    return (
        <div className={styles["create-data-set"]}>
            <h2>create test data</h2>
            {testData.status === "EMPTY" && (
                <p>
                    To use the demo applicaation, please create a test data set
                </p>
            )}
            <form onSubmit={submitHandler} className={styles.form}>
                <label>Test Data Set Name: </label>
                <input
                    name="name"
                    vaue={formData.name}
                    onChange={changeHandler}
                />
                <label>Tester: </label>
                <input
                    name="tester"
                    vaue={formData.tester}
                    onChange={changeHandler}
                />
                <button className={styles["submit-botton"]}>Create</button>
            </form>
        </div>
    );
};

export default CreateTestDataSet;
