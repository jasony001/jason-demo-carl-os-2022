const getMenuItems = (testData) => {

    let loggedInUser = testData.loggedInUser;
    let loggedInIndividual = testData.dataSet.individuals.find(
        (i) => i.partyId === loggedInUser.partyId
    );
    let displayIndividualOMVICCertificate =
        loggedInIndividual.regStatusId === "REG";

    let DARoles = testData.dataSet.partyRltns.filter(
        (r) =>
            r.indPartyId === loggedInUser.partyId &&
            r.partyRltnRoleId === "DA" &&
            r.dlrPartyId
    );

    console.log(DARoles)

    let ODPSRoles = testData.dataSet.partyRltns.filter(
        (r) =>
            r.indPartyId === loggedInUser.partyId &&
            r.legPartyId &&
            "ILDIR ILOFF ILOWN ILPART ILSHAR".includes(r.partyRltnRoleId)
    );

    let dealerships = testData.dataSet.dealerships.filter(
        (d) =>
            DARoles.some((r) => r.dlrPartyId === d.partyId) ||
            ODPSRoles.some((r) => r.legPartyId === d.legPartyId)
    );

    console.log(dealerships)


    let selectedDealer = testData.selectedDealerId
        ? testData.dataSet.dealerships.find(
              (d) => d.partyId === testData.selectedDealerId
          )
        : undefined;

    let menuItems = [
        { id: "t00", label: "home", link: "/home", submenu: [], display: true },
        {
            id: "t10",
            label: "individual",
            link: "",
            display: true,
            submenu: [
                {
                    id: "s1010",
                    label: "my profile",
                    link: "/individual/profile",
                    display: true,
                },
                {
                    id: "s1020",
                    label: "my applications",
                    link: "/individual/applications",
                    display: true,
                },
                {
                    id: "s1030",
                    label: "my invoices",
                    link: "/individual/invoices",
                    display: true,
                },
                {
                    id: "s1040",
                    label: "OMVIC Certificate",
                    link: "/individual/OMVICCertificate",
                    display: displayIndividualOMVICCertificate,
                },
            ],
        },
        {
            id: "t20",
            label: "dealership",
            link: "",
            display: dealerships.length > 0,
            submenu: [
                {
                    id: "s2010",
                    label: "dealership profile",
                    link: "/dealership/profile",
                    display: true,
                },
                {
                    id: "s2020",
                    label: "dealership applications",
                    link: "/dealership/applications",
                    display: true,
                },
                {
                    id: "s2030",
                    label: "dealership invoices",
                    link: "/dealership/invoices",
                    display: true,
                },
                {
                    id: "s2040",
                    label: "notification subscription",
                    link: "/dealership/notificationsubscription",
                    display: true,
                },
                {
                    id: "s2050",
                    label: "Add/Remove Dealer Administrators",
                    link: "/dealership/manageDA",
                    display:
                        ODPSRoles.length > 0 &&
                        (!selectedDealer ||
                            ODPSRoles.some(
                                (r) =>
                                    r.legPartyId === selectedDealer.legPartyId
                            )),
                },
                {
                    id: "s2060",
                    label: "omvic certificate",
                    link: "/dealership/OMVICCertificate",
                    display: !selectedDealer
                        ? dealerships.some((d) => d.regStatusId === "REG")
                        : selectedDealer.regStatusId === "REG",
                },
            ],
        },
        {
            id: "t30",
            label: "account",
            link: "",
            display:true,
            submenu: [
                {
                    id: "s3010",
                    label: "change password",
                    link: "/account/changePassword",
                    display: true,
                }
            ],
        },
        { id: "t40", label: "omvic events", link: "/omvicevents", display:true,submenu: [] },
        { id: "t50", label: "support", link: "/support", display:true,submenu: [] },
        { id: "t60", label: "Test Data Set", display:true,submenu: [
            {
                id: "s6010",
                label: "Current test data",
                link: "/TestDataSet/Setup",
                display: true,
            },
            {
                id: "s6020",
                label: "Create",
                link: "/TestDataSet/Create",
                display: true,
            },
            {
                id: "s6030",
                label: "Saved test data set",
                link: "/TestDataSet/Select",
                display: true,
            },
        ] },
    ];

    return menuItems.filter(m => m.display).map(m => {
        return {...m, submenu: m.submenu.filter(sm => sm.display)}
    })
    
    
};

const getMenuItemById = (menuItems, id) => {
    let xmi;
    if (menuItems && menuItems.length > 0) {
        menuItems.forEach((mi) => {
            if (mi.id === id) {
                xmi = mi;
            }

            if (mi.submenu && mi.submenu.length > 0) {
                mi.submenu.forEach((smi) => {
                    if (smi.id === id) {
                        xmi = smi;
                    }
                });
            }
        });
    }

    return xmi;
};

export { getMenuItemById, getMenuItems };
