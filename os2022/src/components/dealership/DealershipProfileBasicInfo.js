import React from 'react'

const DealershipProfileBasicInfo = ({ dealer }) => {
    const getClassName = () => {
        return [
            ["BROKER", "Broker"],
            ["EXPORT", "Exporter"],
            ["FLEET", "Fleet Lessor"],
            ["GEN", "General Dealer"],
            ["LEASIN", "Lease Finance Dealer"],
            ["MANUFA", "Manufacturer"],
            ["NFP", "Not for Profit"],
            ["OOP", "Out of Province"],
            ["UNKNOW", "Unknown"],
            ["WHOLES", "Wholesaler"]
        ].find(a => a[0] === dealer.dlrClassId)[1]
    }

    const getSubclassName = () => {
        return (dealer.dlrClassId === "GEN" && dealer.dlrTypeId === "NUMV") ? "New and Used Dealer" : "";
    }

    return (
        <div className="myprofile-aboutme-grid">
            <div>Legal Name</div><div>Yang's Auto</div>
            <div>Business Name</div><div>Scarborough Lexus</div>
            <div>Type</div><div>I though [type] = [subclass]?</div>
            <div>Class</div><div>{getClassName()}</div>
            <div>Subclass</div><div>{getSubclassName()}</div>
            <div>RINs</div><div><input value="12345, 67890, 65432"/></div>

        </div>
    )
}

export default DealershipProfileBasicInfo;