import React from "react";
import styles from "./DealershipDetails.module.css";
import { useParams, useHistory } from "react-router-dom";
import testDataApi from "../../../../data-api/testDataApi";
import testDataContext from "../../../../store/test-data-context";

const DealershipDetails = () => {
    const history = useHistory();
    const { dlrPartyId } = useParams();
    const { testData, setTestData } = React.useContext(testDataContext);
    const [updatedDealership, setUpdatedDealership] = React.useState({
        partyId: -1,
        testDataSetId: testData.dataSet.info.id,
        legPartyId: "",
        dlrName: "",
        dlrClassId: "",
        email: "",
        dlrTypeId: "",
        dlrOpStatusId: "",
        dlrOpStatusReasonId: "",
        isPrivateSale: "",
        regNumber: "",
        regStatusId: "",
        regExpirydateId: "",
        tC: "",
    });

    const { legalEntities } = testData.dataSet;

    React.useEffect(() => {
        if (dlrPartyId > 0) {
            testDataApi.getDealershipById(dlrPartyId).then((d) => {
                if (d.testDataSetId) {
                    let r = {
                        ...d,
                        legPartyId: d.legPartyId ?? "",
                        dlrName: d.dlrName ?? "",
                        dlrClassId: d.dlrClassId ?? "",
                        email: d.email ?? "",
                        dlrTypeId: d.dlrTypeId ?? "",
                        dlrOpStatusId: d.dlrOpStatusId ?? "",
                        dlrOpStatusReasonId: d.dlrOpStatusReasonId ?? "",
                        isPrivateSale: d.isPrivateSale ?? "",
                        regNumber: d.regNumber ?? "",
                        regStatusId: d.regStatusId ?? "",
                        regExpirydateId: d.regExpirydateId ?? "",
                        tC: d.tC ?? "",
                    };
                    setUpdatedDealership(r);
                }
            });
        }
    }, [dlrPartyId]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let dlr = { ...updatedDealership };

        if (!dlr.legPartyId) {
            alert("a legal entity must be selected");
            return;
        }
        if (!dlr.dlrClassId) {
            alert("class must be selected");
            return;
        }

        if (!dlr.legPartyId) dlr.legPartyId = null;
        if (!dlr.dlrName) dlr.dlrName = null;
        if (!dlr.dlrClassId) dlr.dlrClassId = null;
        if (!dlr.email) dlr.email = null;
        if (!dlr.dlrTypeId) dlr.dlrTypeId = null;
        if (!dlr.dlrOpStatusId) dlr.dlrOpStatusId = null;
        if (!dlr.dlrOpStatusReasonId) dlr.dlrOpStatusReasonId = null;
        if (!dlr.isPrivateSale) dlr.isPrivateSale = null;
        if (!dlr.regNumber) dlr.regNumber = null;
        if (!dlr.regStatusId) dlr.regStatusId = null;
        if (!dlr.regExpirydateId) dlr.regExpirydateId = null;
        if (!dlr.tC) dlr.tC = null;

        testDataApi.saveDealership(dlr).then((r) => {
            if (!r.status) {
                setTestData((prev) => {
                    return {
                        ...prev,
                        dataSet: {
                            ...prev.dataSet,
                            dealerships: [
                                ...prev.dataSet.dealerships.map((er) =>
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

        setUpdatedDealership((prev) => {
            return {
                ...prev,
                [e.target.name]: newValue,
            };
        });
    };

    const dlrClassChangeHandler = (e) => {
        let newValue =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setUpdatedDealership((prev) => {
            let n = {
                ...prev,
                [e.target.name]: newValue,
                dlrTypeId: "",
            };
            return n;
        });
    };

    return (
        <div className={styles["dealership-details"]}>
            <h1>Dealership Details </h1>
            <form
                onSubmit={formSubmitHandler}
                className={styles["dealership-form"]}
            >
                <label>Id</label>
                <label>
                    {updatedDealership.partyId > 0
                        ? updatedDealership.partyId
                        : ""}
                </label>
                <label>Name</label>
                <input
                    name="name"
                    value={updatedDealership.dlrName}
                    onChange={inputChangeHandler}
                ></input>

                <label>Legal Entity</label>
                <select
                    name="legPartyId"
                    value={updatedDealership.legPartyId}
                    onChange={inputChangeHandler}
                >
                    <option value="">&lt;select&gt;</option>
                    {legalEntities.map((l) => {
                        return (
                            <option value={l.partyId} key={l.partyId}>
                                {l.legName}
                            </option>
                        );
                    })}
                </select>
                <label>Reg. Number</label>
                <input
                    name="regNumber"
                    value={updatedDealership.regNumber}
                    type="number"
                    onChange={inputChangeHandler}
                    min={654321}
                ></input>
                <label>Reg.Status Id</label>
                <select
                    name="regStatusId"
                    value={updatedDealership.regStatusId}
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
                    value={updatedDealership.regExpirydateId}
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

                <label>Class</label>
                <select
                    name="dlrClassId"
                    value={updatedDealership.dlrClassId}
                    onChange={dlrClassChangeHandler}
                >
                    <option value="">&lt;select&gt;</option>
                    {testData.lookupData.dlrClassLookup.map((c) => {
                        return (
                            <option value={c.dlrClassId} key={c.dlrClassId}>
                                {c.description}
                            </option>
                        );
                    })}
                </select>
                <label>Subclass</label>
                <select
                    name="dlrTypeId"
                    value={updatedDealership.dlrTypeId}
                    onChange={inputChangeHandler}
                    disabled={
                        updatedDealership.dlrClassId !== "GEN" &&
                        updatedDealership.dlrClassId !== "FLEET"
                    }
                >
                    <option value="">&lt;select&gt;</option>
                    {testData.lookupData.dlrTypeLookup
                        .filter(
                            (r) => r.dlrClassId === updatedDealership.dlrClassId
                        )
                        .sort((r1, r2) => r1.description > r2.description)
                        .map((r) => {
                            return (
                                <option value={r.dlrTypeId} key={r.dlrTypeId}>
                                    {r.description}
                                </option>
                            );
                        })}
                </select>

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={updatedDealership.email}
                    onChange={inputChangeHandler}
                ></input>

                <label>Operating Status</label>
                <select
                    name="dlrOpStatusId"
                    value={updatedDealership.dlrOpStatusId}
                    onChange={inputChangeHandler}
                >
                    <option value="">&lt;select&gt;</option>
                    {testData.lookupData.dlrOpStatusLookup.map((c) => {
                        return (
                            <option
                                value={c.dlrOpStatusId}
                                key={c.dlrOpStatusId}
                            >
                                {c.description}
                            </option>
                        );
                    })}
                </select>
                <label>Op. Status Reason</label>
                <select
                    name="dlrOpStatusReasonId"
                    value={updatedDealership.dlrOpStatusReasonId}
                    onChange={inputChangeHandler}
                    disabled={updatedDealership.dlrClassId === "ACTIVE"}
                >
                    <option value="">&lt;select&gt;</option>
                    {testData.lookupData.dlrOpStatusReasonLookup
                        .filter(
                            (r) =>
                                r.dlrOpStatusId ===
                                updatedDealership.dlrOpStatusId
                        )
                        .sort((r1, r2) => r1.description > r2.description)
                        .map((r) => {
                            return (
                                <option
                                    value={r.dlrOpStatusReasonId}
                                    key={r.dlrOpStatusReasonId}
                                >
                                    {r.description}
                                </option>
                            );
                        })}
                </select>

                <label>Private Sale</label>
                <input
                    type="checkbox"
                    name="isPrivateSale"
                    checked={updatedDealership.isPrivateSale}
                    onChange={inputChangeHandler}
                />
                <label>Terms &amp; Conditions</label>
                <input
                    type="checkbox"
                    name="tC"
                    checked={updatedDealership.tC}
                    onChange={inputChangeHandler}
                />

                <button>Save</button>
            </form>
        </div>
    );
};

export default DealershipDetails;
