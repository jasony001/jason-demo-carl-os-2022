
import React from 'react'
import Search from './Search'
import IndMain from './individual/IndMain'
import DlrMain from './dealership/DlrMain'

const Main = ({ lookupData }) => {

    const [page, setPage] = React.useState('Search')
    const [pageData, setPageData]  = React.useState(undefined)

    let MainComponent = () => {
        switch(page) {
            case 'Search':
                return <Search setPage = { setPage } setPageData = { setPageData } lookupData = { lookupData }/>
            case 'Individual':
                return <IndMain setPage = { setPage } setPageData = { setPageData } data={ pageData} lookupData = { lookupData }/>
            case 'Dealer':
                return <DlrMain setPage = { setPage } setPageData = { setPageData } data={ pageData} lookupData = { lookupData }/>
            default:
                return <Search setPage = { setPage } setPageData = { setPageData } lookupData = { lookupData }/>
        } 
    }

    return (
        <div className='main'>
            <MainComponent/>
        </div>
    )
}

export default Main