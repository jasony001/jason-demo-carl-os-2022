import React from 'react'
import styles from './Start.module.css'
import { Link } from 'react-router-dom'

const Start = () => {
   return (
       <div className={styles.start}>
           <h2>Demo - OMVIC OnlinServices</h2>
           <section className={styles["start-intro"]}>
               <h4>OMVIC Online Sservices Intro</h4>
               <p>OMVIC Online Services allow registrants to submit registration applications online, such as to renew their salesperson license.</p>
               <p>Dealership can assign a Dealer Administrator to manage the dealership's online applications</p>
           </section>
           <section className={styles["start-usages"]}>
               <h4>How to use this demo</h4>
               <p>Testers define the test criteria and navigate through pages that mimic OMVIC Online Services.</p>
               <p>Testers can create test data set, edit test ceiteria as needed, save it in the cloud</p>
               <p>Testers can also search and load previuosly saved test data set</p>
               <p>Each test data set contains 3 individuals, 3 dealerships, 3 legal entities, and unlimited numbers of relationships</p>
           </section>
           <Link to='/Main'><button>Enter</button></Link>

       </div>
   )
}

export default Start