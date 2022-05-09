import React from 'react'

const Home = ({testCriteria, headerText, mainComponentChanged}) => {
    let hasODPSRole = testCriteria.dealers.some(d => d.userHasODPSRole)
    let hasDARole = testCriteria.dealers.some(d => d.userIsDA)

    const [stage, setStage] = React.useState("0")

    const list = 
    [
        { key: "0", value:(<div>What would you like to do today? </div>), display: true },
            { key: "0.1", value:(<div>Apply to become a salesperson</div>), extra:(<div>definitions about requirements to apply, what salesperson means, list preconditions</div>), display: true },
                { key: "0.1.1", value:(<div>I am applying to work for an Ontario Dealer</div>), extra: "Some text explanation", display: true },
                    { key: "0.1.1.1", value:(<div onClick={() => mainComponentChanged("s1020")}>Start my Individual Application</div>), display: (testCriteria.portalUser.regStatusID === "NONE" || testCriteria.portalUser.regStatusID === "NOTREG") },
                    { key: "0.1.1.2", value: (<div onClick={() => mainComponentChanged("s1020")}>Start my Individual Reapply Application – Expired over 60 days</div>), display: (testCriteria.portalUser.regStatusID === "TERM" && testCriteria.portalUser.regExpiry === "ExpiredOver60Days") },
        
                { key: "0.1.2", value:(<div>I am applying to work for an Out of Province dealer</div>), display:true, extra:"Some text explaining about out of province"},
                    { key: "0.1.2.1", value:(<div onClick={() => mainComponentChanged("s1020")}>Start my Outside Ontario Individual Application</div>), display: (testCriteria.portalUser.regStatusID === "NONE" || testCriteria.portalUser.regStatusID === "NOTREG")},
                    { key: "0.1.2.2", value:(<div onClick={() => mainComponentChanged("s1020")}>Start my Outside Ontario Individual Reapply Application – Expired over 60 days</div>), display: (testCriteria.portalUser.regStatusID === "TERM" && testCriteria.portalUser.regExpiry === "ExpiredOver60Days") },
        
            { key: "0.2", value:(<div>Apply to become a dealer</div>), extra:"Display definitions, requirements to apply, list preconditions"},
                { key: "0.2.1", value:(<div>I am applying for registration as an Ontario dealer</div>), display:true, extra: (<><div>Some text explanation</div><div>Do you have a Dealer Sales and Service Agreement (DSSA) with a manufacturer?</div></>) },
                    { key: "0.2.1.1", value:(<div>Yes</div>), display:true}, 
                        { key: "0.2.1.1.1", value:(<div onClick={() => mainComponentChanged("s1020")}>Start my Business Application for New and Used (Franchise) Only</div>), display: true},
                        { key: "0.2.1.1.2", value:(<div onClick={() => mainComponentChanged("s1020")}>Start my Business Reapply Application for New and Used (Franchise) Only</div>), display: true},

                    { key: "0.2.1.2", value:(<div>No</div>), display:true}, 
                        { key: "0.2.1.2.1", value:(<div onClick={() => mainComponentChanged("s1020")}>Start my Business Application</div>),  display: true},
                        { key: "0.2.1.2.2", value:(<div onClick={() => mainComponentChanged("s1020")}>Start my Business Reapply Application</div>),  display: true},

                    { key: "0.2.1.3", value:(<div>Not Sure</div>),  display:true}, 
                        { key: "0.2.1.3.1", value:(<div onClick={() => mainComponentChanged("s1020")}>Start my Business Application</div>),  display: true},
                        { key: "0.2.1.3.2", value:(<div onClick={() => mainComponentChanged("s1020")}>Start my Business Reapply Application</div>),  display: true},
        
                { key: "0.2.2", value:(<div>I am applying for registration as an Out of Province dealer</div>), display:true, extra: "Some text explaining about out of province" },
                    { key : "0.2.2.1", value:(<div onClick={() => mainComponentChanged("s1020")}>Start my Outside Ontario Business Application</div>), display:true},
                    { key : "0.2.2.2", value:(<div onClick={() => mainComponentChanged("s1020")}>Start my Outside Ontario Business Reapply Application</div>), display:true},

            { key:"0.3", value:(<div>I received an email invitation to complete an OMVIC Application (link to My Applications)</div>) },
            { key:"0.4", value:(<div onClick={() => mainComponentChanged("s1010")}>Review my profile (link to My Profile)</div>)},
            { key: "0.5", value:(<div onClick={() => mainComponentChanged("s1020")}>Submit an application</div>), display:true},
            { key: "0.6", value:(<div onClick={() => mainComponentChanged("s1040")}>View my OMVIC certificate</div>), display: (testCriteria.portalUser.regStatusID==="REG")},
            { key: "0.7", value:(<div onClick={() => mainComponentChanged("s1030")}>View an invoice or receipt</div>), display:true},
            { key: "0.8", value:(<div onClick={() => mainComponentChanged("s2020")}>Submit an application for my dealer </div>), display: hasDARole },
            { key: "0.9", value:(<div>View dealer’s OMVIC certificate</div>), display: hasDARole||hasODPSRole },
            { key: "0.a", value:(<div onClick={() => mainComponentChanged("s2010")}>Review dealer profile</div>), display: hasDARole||hasODPSRole },
            { key: "0.b", value:(<div>View an invoice or receipt for my dealer</div>), display: hasDARole||hasODPSRole },
            { key: "0.c", value:(<div>Add or remove a dealer administrator</div>), display: hasDARole||hasODPSRole },

    ]

    const getAncestors = () => {
        let keyList = []
        let level = 1;

        while(stage.length > level * 2){
            keyList.push(stage.substring(0, stage.length - level *2))
            level ++
        }

        let plist = list.filter(kv => (kv.display === undefined || kv.display) && keyList.includes(kv.key)).reverse()

        return plist.reverse();
    }

    const getChildren = (key) => {
        const children = list.filter(kv => (kv.display === undefined || kv.display) && kv.key.startsWith(key) && kv.key.length === key.length + 2)
        return children;
    }

    return (
        <div className='home'>
            {`[current stage]${stage}[current stage]`}
            {
                (
                <>
                    <div className='home-selected'>  { 
                        getAncestors().map((kv, index) => { 
                            return (
                                <div key={kv.key} onClick={ () => setStage(kv.key)} className={`home-selected home-selected--${index}`}>
                                    { kv.value }
                                </div>
                            )
                        })
                        }   
                        
                    </div>
                    <div className={`home-selected home-selected--current home-selected--${getAncestors().length}`}> {list.find(l => l.key === stage).value}</div>
                    {
                        list.find(l => l.key === stage).extra &&
                        (
                            <div className={`home-extra home-selected--${getAncestors().length + 1}`}> 
                                {list.find(l => l.key === stage).extra}
                            </div>
                        )
                    }           

                    <div className='home-options'> 
                        {getChildren(stage).map(kv => 
                        { 
                            return (
                                <div key={kv.key} onClick={ () => setStage(kv.key)} className={`home-option home-selected--${getAncestors().length + 1}`}>
                                    { kv.value }
                                </div>
                            )
                        })
                    } </div>
                </>
                )
            }
        </div>
    )
}

export default Home;