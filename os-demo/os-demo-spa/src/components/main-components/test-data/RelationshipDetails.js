import React from 'react'
import styles from './RelationshipDetails.module.css'
import {useParams} from 'react-router-dom'

const RelationshipDetails = (props) => {
    const { rltnId } = useParams();
   return (
       <div>
           <h1>{rltnId}</h1>
       </div>
   )
}

export default RelationshipDetails