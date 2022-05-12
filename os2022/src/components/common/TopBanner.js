import React from 'react'

const TopBanner = ({titleText, selectMainFunction}) => {
    return (
        <div className="top-banner">  
            <center>{ titleText }</center>
            <img src='./favicon.jpg' className="logo" alt="OMVIC" onClick={() => selectMainFunction("")}></img>
        </div>
    )
}

export default TopBanner;