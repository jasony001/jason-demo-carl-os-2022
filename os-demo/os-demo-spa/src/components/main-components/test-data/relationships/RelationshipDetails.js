import React from "react";
import { useParams } from "react-router-dom";
import testDataApi from "../../../../data-api/testDataApi";
import testDataContext from "../../../../store/test-data-context";
import styles from "./RelationshipDetails.module.css";
import { useHistory } from "react-router-dom";

const RelationshipDetails = (props) => {
    const history = useHistory();
    const { rltnId } = useParams();
    const { testData, setTestData } = React.useContext(testDataContext);
    const [mode, setMode] = React.useState("edit");
    const [updatedRelationship, setUpdatedRelationship] = React.useState({
        partyRltnId: -1,
        testDataSetId: testData.dataSet.info.id,
        partyRltnRoleCatId: "",
        partyRltnRoleId: "",
        isPrimary: "",
        isApproved: "",
        indPartyId: "",
        dlrPartyId: "",
        legPartyId: "",
        partyRltnBranchId: "",
        isReviewed: "",
        isPersonInCharge: "",
    });
    const { individuals, dealerships, legalEntities } = testData.dataSet;

    React.useEffect(() => {
        if (rltnId > 0) {
            testDataApi.getRelationshipById(rltnId).then((d) => {
                if (d.partyRltnRoleId) {
                    let r = {
                        ...d,
                        partyRltnRoleCatId: d.partyRltnRoleCatId ?? "",
                        partyRltnRoleId: d.partyRltnRoleId ?? "",
                        isPrimary: d.isPrimary ?? "",
                        isApproved: d.isApproved ?? "",
                        indPartyId: d.indPartyId ?? "",
                        dlrPartyId: d.dlrPartyId ?? "",
                        legPartyId: d.legPartyId ?? "",
                        partyRltnBranchId: d.partyRltnBranchId ?? "",
                        isReviewed: d.isReviewed ?? "",
                        isPersonInCharge: d.isPersonInCharge ?? "",
                    };
                    setUpdatedRelationship(r);
                } else {
                    setMode("add");
                }
            });
        } else {
            setMode("add");
        }
    }, [rltnId]);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (!updatedRelationship.partyRltnRoleCatId) {
            alert("partyRltnRoleCatId is required");
            return;
        }
        if (!updatedRelationship.partyRltnRoleId) {
            alert("partyRltnRoleId is required");
            return;
        }
        if (
            updatedRelationship.partyRltnRoleCatId === "ID" &&
            (!updatedRelationship.indPartyId || !updatedRelationship.dlrPartyId)
        ) {
            alert("ind and dlr are required");
            return;
        }
        if (
            updatedRelationship.partyRltnRoleCatId === "IL" &&
            (!updatedRelationship.indPartyId || !updatedRelationship.legPartyId)
        ) {
            alert("ind and leg are required");
            return;
        }
        if (
            updatedRelationship.partyRltnRoleCatId === "DL" &&
            (!updatedRelationship.dlrPartyId || !updatedRelationship.legPartyId)
        ) {
            alert("leg and dlr are required");
            return;
        }

        if (
            testData.dataSet.partyRltns.some(
                (r) =>
                    r.partyRltnId * 1 !== updatedRelationship.partyRltnId * 1 &&
                    "R-" +
                        r.partyRltnRoleId +
                        " I-" +
                        (r.indPartyId ?? "") +
                        " D-" +
                        (r.dlrPartyId ?? "") +
                        " L-" +
                        (r.legPartyId ?? "") ===
                        "R-" +
                            updatedRelationship.partyRltnRoleId +
                            " I-" +
                            (updatedRelationship.indPartyId ?? "") +
                            " D-" +
                            (updatedRelationship.dlrPartyId ?? "") +
                            " L-" +
                            (updatedRelationship.legPartyId ?? "")
            )
        ) {
            alert(
                "Same relationship " +
                    updatedRelationship.partyRltnRoleId +
                    " already exists between the selected two parties "
            );
            return;
        }

        if (!updatedRelationship.isPrimary) {
            updatedRelationship.isPrimary = false;
        }

        if (!updatedRelationship.isApproved) {
            updatedRelationship.isApproved = false;
        }

        if (!updatedRelationship.isReviewed) {
            updatedRelationship.isReviewed = false;
        }

        if (!updatedRelationship.isPersonInCharge) {
            updatedRelationship.isPersonInCharge = false;
        }

        let rltn = { ...updatedRelationship };
        if (!rltn.indPartyId) rltn.indPartyId = null;
        if (!rltn.dlrPartyId) rltn.dlrPartyId = null;
        if (!rltn.legPartyId) rltn.legPartyId = null;
        if (rltn.partyRltnBranchId === "") rltn.partyRltnBranchId = null;

        let error;
        if (mode === "add") {
            testDataApi
                .createReletionship(rltn)
                .then((r) => {
                    if (!r.status) {
                        setTestData((prev) => {
                            return {
                                ...prev,
                                dataSet: {
                                    ...prev.dataSet,
                                    partyRltns: [...prev.dataSet.partyRltns, r],
                                },
                            };
                        });
                    } else {
                        error = r.status;
                    }
                })
                .catch((err) => {
                    error = err.message;
                });
        } else {
            testDataApi
                .saveRelationship(rltn)
                .then((r) => {
                    if (!r.status) {
                        setTestData((prev) => {
                            return {
                                ...prev,
                                dataSet: {
                                    ...prev.dataSet,
                                    partyRltns: [
                                        ...prev.dataSet.partyRltns.map((er) =>
                                            er.partyRltnId === r.partyRltnId
                                                ? r
                                                : er
                                        ),
                                    ],
                                },
                            };
                        });
                    } else {
                        error = r.status;
                    }
                })
                .catch((err) => {
                    error = err.message;
                });
        }

        if (!error) {
            history.push("/TestDataSet/Setup");
        } else {
            alert(error);
        }
    };

    const inputChangeHandler = (e) => {
        let newValue =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setUpdatedRelationship((prev) => {
            return {
                ...prev,
                [e.target.name]: newValue,
            };
        });
    };

    const partyRltnRoleCatIdChangeHandler = (e) => {
        const catId = e.target.value;
        setUpdatedRelationship({
            partyRltnId: updatedRelationship.partyRltnId,
            testDataSetId: testData.dataSet.info.id,
            partyRltnRoleCatId: catId,
            partyRltnRoleId: "",
            isPrimary: "",
            isApproved: "",
            indPartyId: "",
            dlrPartyId: "",
            legPartyId: "",
            partyRltnBranchId: "",
            isReviewed: "",
            isPersonInCharge: "",
        });
    };

    return (
        <div className={styles["relationship-details"]}>
            <h1>Relationship Details </h1>
            <form
                onSubmit={formSubmitHandler}
                className={styles["relationship-form"]}
            >
                <label>Id</label>
                <label>
                    {updatedRelationship.partyRltnId > 0
                        ? updatedRelationship.partyRltnId
                        : ""}
                </label>
                <label>Category</label>
                <select
                    name="partyRltnRoleCatId"
                    value={updatedRelationship.partyRltnRoleCatId}
                    onChange={partyRltnRoleCatIdChangeHandler}
                >
                    <option value="">&lt;select&gt;</option>
                    {testData.lookupData.partyRltnRoleCatLookup
                        .filter((c) => {
                            return (
                                c.partyRltnRoleCatId[0] !==
                                c.partyRltnRoleCatId[1]
                            );
                        })
                        .map((c) => {
                            return (
                                <option
                                    value={c.partyRltnRoleCatId}
                                    key={c.partyRltnRoleCatId}
                                >
                                    {c.description}
                                </option>
                            );
                        })}
                </select>
                <label>Role</label>
                <select
                    name="partyRltnRoleId"
                    value={updatedRelationship.partyRltnRoleId}
                    onChange={inputChangeHandler}
                    disabled={!updatedRelationship.partyRltnRoleCatId}
                >
                    <option value="">&lt;select&gt;</option>
                    {testData.lookupData.partyRltnRoleLookup
                        .filter(
                            (r) =>
                                r.partyRltnRoleCatId ===
                                updatedRelationship.partyRltnRoleCatId
                        )
                        .sort((r1, r2) => r1.description > r2.description)
                        .map((r) => {
                            return (
                                <option
                                    value={r.partyRltnRoleId}
                                    key={r.partyRltnRoleId}
                                >
                                    {r.description}
                                </option>
                            );
                        })}
                </select>
                {updatedRelationship.partyRltnRoleCatId === "DL" && (
                    <>
                        <label>Branch / Head Office</label>
                        <select
                            name="partyRltnBranchId"
                            value={updatedRelationship.partyRltnBranchId}
                            onChange={inputChangeHandler}
                            disabled={
                                !updatedRelationship.partyRltnRoleCatId ||
                                updatedRelationship.partyRltnRoleCatId !== "DL"
                            }
                        >
                            <option value="">&lt;select&gt;</option>
                            {testData.lookupData.partyRltnBranchLookup
                                .sort(
                                    (r1, r2) => r1.description > r2.description
                                )
                                .map((r) => {
                                    return (
                                        <option
                                            value={r.partyRltnBranchId}
                                            key={r.partyRltnBranchId}
                                        >
                                            {r.description}
                                        </option>
                                    );
                                })}
                        </select>
                    </>
                )}

                <label>Individual</label>
                <select
                    name="indPartyId"
                    value={updatedRelationship.indPartyId}
                    onChange={inputChangeHandler}
                    disabled={
                        !updatedRelationship.partyRltnRoleCatId ||
                        updatedRelationship.partyRltnRoleCatId === "DL"
                    }
                >
                    <option value="">&lt;select&gt;</option>
                    {individuals.map((i) => {
                        return (
                            <option value={i.partyId} key={i.partyId}>
                                {i.firstName + " " + i.lastName}
                            </option>
                        );
                    })}
                </select>
                <label>Dealership</label>
                <select
                    name="dlrPartyId"
                    value={updatedRelationship.dlrPartyId}
                    onChange={inputChangeHandler}
                    disabled={
                        !updatedRelationship.partyRltnRoleCatId ||
                        updatedRelationship.partyRltnRoleCatId === "IL"
                    }
                >
                    <option value="">&lt;select&gt;</option>
                    {dealerships.map((d) => {
                        return (
                            <option value={d.partyId} key={d.partyId}>
                                {d.dlrName}
                            </option>
                        );
                    })}
                </select>
                <label>legalEntities</label>
                <select
                    name="legPartyId"
                    value={updatedRelationship.legPartyId}
                    onChange={inputChangeHandler}
                    disabled={
                        !updatedRelationship.partyRltnRoleCatId ||
                        updatedRelationship.partyRltnRoleCatId === "ID"
                    }
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
                <label>Is Primary</label>
                <input
                    type="checkbox"
                    name="isPrimary"
                    checked={updatedRelationship.isPrimary}
                    onChange={inputChangeHandler}
                    disabled={!updatedRelationship.partyRltnRoleCatId}
                />
                <label>Is Approved</label>
                <input
                    type="checkbox"
                    name="isApproved"
                    checked={updatedRelationship.isApproved}
                    onChange={inputChangeHandler}
                    disabled={!updatedRelationship.partyRltnRoleCatId}
                />

                <label>Is Reviewed</label>
                <input
                    type="checkbox"
                    name="isReviewed"
                    checked={updatedRelationship.isReviewed}
                    onChange={inputChangeHandler}
                    disabled={!updatedRelationship.partyRltnRoleCatId}
                />
                <label>Is Person In Charge</label>
                <input
                    type="checkbox"
                    name="isPersonInCharge"
                    checked={updatedRelationship.isPersonInCharge}
                    onChange={inputChangeHandler}
                    disabled={!updatedRelationship.partyRltnRoleCatId}
                />

                <button>{mode === "add" ? "Add" : "Save"}</button>
            </form>
        </div>
    );
};

export default RelationshipDetails;
