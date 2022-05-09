import React from 'react'
import dataAPIs from '../data/data-apis'
import IndProfile from './individual/IndProfile'

const Search = ({ setPage, setPageData, lookupData }) => {
    const [searchKey, setSearchKey] = React.useState('')
    const [searchResult, setSearchResult] = React.useState({indList:[], dlrList:[]})
    const [addingNewInd, setAddingNewInd] = React.useState(false)

    const searcKeyChanged = e => {
        if (e.target.name === 'searchKey') {
            if (e.key === 'Enter'){
                performSearch();
            } else {
                setSearchKey(e.target.value)
            }
        }
    }

    const selectedInd = (ind) => {
        setPage('Individual');
        setPageData(ind)
    }

    const selectedDlr = (dlr) => {
        setPage('Dealer');
        setPageData(dlr)
    }

    const performSearch = async (e) => {
        e.preventDefault();
        setSearchResult(`searched by ${searchKey}.`);
        let data = await dataAPIs.searchRegistrant(searchKey)
        setSearchResult(data);
    }


    return (
        <>
            <div className='search'>
                <form onSubmit={e => performSearch(e)} className='search-form'>
                    <input name="searchKey" onChange={e => searcKeyChanged(e)} value={searchKey}></input>
                    <button>Search</button>
                </form>
                <div className='search-new-entity'>
                    <div><button onClick={() => setAddingNewInd(true)}>+ Individual</button></div>
                    <div><button>+ Dearship</button></div>
                    <div><button>+ Legal Entity</button></div>
                </div>
                {
                    searchResult && 
                    (
                        <div className='search-result'>
                        { 
                            searchResult.indList && (searchResult.indList.length > 0) &&
                            (
                                <div>
                                    <h3>Matching individual(s)</h3>
                                    {searchResult.indList.map(i => {
                                        return (
                                            <div className='search-result-record' 
                                                key={i.PartyID}
                                                onClick={ () => selectedInd(i) }
                                            >{i.RegNumber ? i.RegNumber : "[NONE]" } {i.FirstName} {i.LastName} </div>
                                        )
                                    })}
                                </div>
                            )
                        }
                        { 
                            searchResult.dlrList && (searchResult.dlrList.length > 0) &&
                            (
                                <div>
                                    <h3>Matching dealership(s)</h3>
                                    {searchResult.dlrList.map(d => {
                                        return (
                                            <div className='search-result-record' 
                                                key={d.PartyID}
                                                onClick={ () => selectedDlr(d) }
                                            >{d.RegNumber} {d.DlrName ? d.DlrName : ""} { d.DlrName && d.legname ? " / " : ""} { `${d.legname ? d.legname : ""}` }</div>
                                        )
                                    })}
                                </div>
                            )
                        }
                        
                        </div>
                    )
                
                }
            </div>
            { addingNewInd && 
            (<div className='modal'>
                <div className='modal-back'>

                </div>
                <div className='modal-dialog'>
                    <IndProfile data={ undefined } lookupData = { lookupData } defaultMode="add" cancelAddingNewInd = { () => { setAddingNewInd(false) } }/>

                </div>
            </div>)}
        </>
    )
}

export default Search