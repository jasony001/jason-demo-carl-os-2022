import React from "react"
import '../styles/start-page.css'
import TopBanner from './common/TopBanner'

const Start = ( { selectMainFunction } ) => {
    return (
        <main className="start-page-main">
            <section className="start-page-section start-page-section--main">
                <div>
                    <span>Start Demo</span><img src='./images/right-arrow.png' alt='->' onClick={ () => selectMainFunction('demo') }/>
                    <span>Define Test Criterias </span>
                        <img src='./images/right-arrow.png' alt='-> ' onClick={ () => selectMainFunction('setTestCriterias') }/>
                </div>
            </section>
        </main>
    )
}

export default Start;