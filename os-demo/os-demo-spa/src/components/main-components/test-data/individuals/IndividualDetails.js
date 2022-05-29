import React from "react";
import styles from "./IndividualDetails.module.css";
import { useParams, useHistory } from "react-router-dom";
import testDataApi from "../../../../data-api/testDataApi";
import testDataContext from "../../../../store/test-data-context";

const IndividualDetails = () => {
    const history = useHistory();
    const { indPartyId } = useParams();
    const { testData, setTestData } = React.useContext(testDataContext);

    const [updatedIndividual, setUpdatedIndividual] = React.useState({
        partyId: -1,
        testDataSetId: testData.dataSet.info.id,
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        gender: "",
        studentId: "",
        certRequired: "",
        certDate: "",
        certRequireDate: "",
        regNumber: "",
        regStatusId: "",
        regExpirydateId: "",
        tC: "",
    });

    React.useEffect(() => {
        if (indPartyId > 0) {
            testDataApi.getIndividualById(indPartyId).then((d) => {
                if (d.testDataSetId) {
                    let r = {
                        ...d,
                        firstName: d.firstName ?? "",
                        lastName: d.lastName ?? "",
                        birthDate: d.birthDate ?? "",
                        email: d.email ?? "",
                        gender: d.gender ?? "",
                        studentId: d.studentId ?? "",
                        certRequired: d.certRequired ?? "",
                        certDate: d.certDate ?? "",
                        certRequireDate: d.certRequireDate ?? "",
                        regNumber: d.regNumber ?? "",
                        regStatusId: d.regStatusId ?? "",
                        regExpirydateId: d.regExpirydateId ?? "",
                        tC: d.tC ?? "",
                    };
                    setUpdatedIndividual(r);
                }
            });
        }
    }, [indPartyId]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let ind = { ...updatedIndividual };

        if (!ind.firstName) ind.firstName = null;
        if (!ind.lastName) ind.firstName = null;
        if (!ind.birthDate) ind.birthDate = null;
        if (!ind.email) ind.email = null;
        if (!ind.gender) ind.gender = null;
        if (!ind.studentId) ind.studentId = null;
        if (ind.certRequired === "") ind.certRequired = null;
        if (!ind.certDate) ind.certDate = null;
        if (!ind.certRequireDate) ind.certRequireDate = null;
        if (!ind.regNumber) ind.regNumber = null;
        if (!ind.regStatusId) ind.regStatusId = null;
        if (!ind.regExpirydateId) ind.regExpirydateId = null;
        if (!ind.tC) ind.tC = null;
        
        testDataApi.saveIndividual(ind).then((r) => {
            if (!r.status) {
                setTestData((prev) => {
                    return {
                        ...prev,
                        dataSet: {
                            ...prev.dataSet,
                            individuals: [
                                ...prev.dataSet.individuals.map((er) =>
                                    er.partyId === r.partyId ? r : er
                                ),
                            ],
                        },
                    };
                });
            }
        });
        history.push("/TestDataSet/Setup");
    };

    const inputChangeHandler = (e) => {
        let newValue =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setUpdatedIndividual((prev) => {
            return {
                ...prev,
                [e.target.name]: newValue,
            };
        });
    };

    return (
        <div className={styles["individual-details"]}>
            <h1>Individual Details </h1>
            <form
                onSubmit={formSubmitHandler}
                className={styles["individual-form"]}
            >
                <label>Id</label>
                <label>
                    {updatedIndividual.partyId > 0
                        ? updatedIndividual.partyId
                        : ""}
                </label>

                <label>First Name</label>
                <input
                    name="firstName"
                    value={updatedIndividual.firstName}
                    onChange={inputChangeHandler}
                ></input>

                <label>Last Name</label>
                <input
                    name="lastName"
                    value={updatedIndividual.lastName}
                    onChange={inputChangeHandler}
                ></input>

                <label>Birth Date</label>
                <input
                    type="date"
                    name="birthDate"
                    value={updatedIndividual.birthDate.toLocaleString("en-CA")}
                    onChange={inputChangeHandler}
                ></input>

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={updatedIndividual.email}
                    onChange={inputChangeHandler}
                ></input>
                <label>Gender</label>
                <select
                    name="gender"
                    value={updatedIndividual.gender}
                    onChange={inputChangeHandler}
                >
                    <option value="">&lt;select&gt;</option>
                    {testData.lookupData.genderLookup.map((c) => {
                        return (
                            <option value={c.genderId} key={c.genderId}>
                                {c.description}
                            </option>
                        );
                    })}
                </select>

                <label>Reg. Number</label>
                <input
                    name="regNumber"
                    value={updatedIndividual.regNumber}
                    type="number"
                    onChange={inputChangeHandler}
                    min={654321}
                ></input>
                <label>Reg.Status Id</label>
                <select
                    name="regStatusId"
                    value={updatedIndividual.regStatusId}
                    onChange={inputChangeHandler}
                >
                    <option value="">&lt;select&gt;</option>
                    {testData.lookupData.regStatusLookup.map((c) => {
                        return (
                            <option value={c.regStatusId} key={c.regStatusId}>
                                {c.description}
                            </option>
                        );
                    })}
                </select>

                <label>Reg. Exp. Date</label>
                <select
                    name="regExpirydateId"
                    value={updatedIndividual.regExpirydateId}
                    onChange={inputChangeHandler}
                >
                    <option value="">&lt;select&gt;</option>
                    {testData.lookupData.regExpirydateLookup.map((c) => {
                        return (
                            <option
                                value={c.regExpirydateId}
                                key={c.regExpirydateId}
                            >
                                {c.description}
                            </option>
                        );
                    })}
                </select>

                <label>Cert Requi</label>
                <input
                    type="checkbox"
                    name="certRequired"
                    checked={updatedIndividual.certRequired}
                    onChange={inputChangeHandler}
                />

                <label>Cet Date</label>
                <input
                    type="date"
                    name="certDate"
                    value={updatedIndividual.certDate}
                    onChange={inputChangeHandler}
                ></input>

                <label>Cert Required Date</label>
                <input
                    type="date"
                    name="certRequireDate"
                    value={updatedIndividual.certRequireDate}
                    onChange={inputChangeHandler}
                ></input>

                <label>Terms &amp; Conditions</label>
                <input
                    type="checkbox"
                    name="tC"
                    checked={updatedIndividual.tC}
                    onChange={inputChangeHandler}
                />

                <button>Save</button>
            </form>
        </div>
    );
};

export default IndividualDetails;
