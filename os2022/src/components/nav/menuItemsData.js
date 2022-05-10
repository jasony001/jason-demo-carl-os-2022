
const getMenuItems = (testCriteria) => {   
        
    let hasODPSRole = testCriteria.dealers.some(d => d.userHasODPSRole)
    let hasDARole = testCriteria.dealers.some(d => d.userIsDA)

    let menuItems = 
        [
            { id: "t00", label: "home", link:"home", submenu:[] },
            {
                id: "t10",
                label: "my actions", 
                submenu:[
                    { id:  "s1010", label: "my profile", link:"my profile" },
                    { id:  "s1020", label: "my applications", link:"my applications" },
                    { id:  "s1030", label: "my invoices", link:"my invoices" },
                ],
                showSubmenu: false,
            },
            { id: "t30", label: "change password", link:"change password", submenu:[] },
            { id: "t40", label: "omvic events", link:"omvic events", submenu:[] },
            { id: "t50", label: "support", link:"support", submenu:[] },
        ]

    if (testCriteria.portalUser.regStatusID === "REG"){
        let myActions = menuItems.find(i => i.id ==="t10");
        myActions.submenu = [...myActions.submenu, { id:  "s1040", label: "omvic certificate", link:"omvic certificate" }]
    }

    if (hasDARole || hasODPSRole) {
        menuItems = [...menuItems, 
            {
                id: "t20",
                label: "dealership actions", 
                submenu:[
                    { id:"s2010", label: "dealership profile", link:"dealership profile" },
                    { id:"s2020", label: "dealership applications", link:"dealership applications" },
                    { id:"s2030", label: "dealership invoices", link:"dealership invoices" },
                    { id:"s2040", label: "notification subscription", link:"notification subscription" },
                ],
                showSubmenu: false
            }];
        
        let dealerActions = menuItems.find(i => i.id ==="t20");

        if (testCriteria.dealers.some(d => d.regStatusId === "REG" && d.opStatusId === "Active")) {
            dealerActions.submenu = [...dealerActions.submenu, { id:"s2060", label: "omvic certificate", link:"omvic certificate" }]
        }
    }

    if (hasODPSRole){
        if (!testCriteria.selectedDealerId || 
            testCriteria.dealers.find(d => d.id + "" === testCriteria.selectedDealerId + "").hasODPSRole)
            {
                let dealerActions = menuItems.find(i => i.id ==="t20");
                dealerActions.submenu = [...dealerActions.submenu, { id:"s2050", label: "Add/Remove Dealer Administrators", link:"add remove dealer administrators " }]
            }
    }

    
    return menuItems;
}

const getMenuItemById = (menuItems, id) => {
    let xmi;        
    if (menuItems && menuItems.length > 0){
        menuItems.forEach(mi => {
            if (mi.id === id){
                xmi = mi;
            }

            if (mi.submenu && mi.submenu.length > 0) {
                mi.submenu.forEach(smi => {
                    if (smi.id === id) {
                        xmi = smi;
                    }
                })
            }
        })
    }
    
    return xmi;
}

export { getMenuItemById, getMenuItems };