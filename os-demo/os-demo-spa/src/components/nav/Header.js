import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/logo.jpg";
import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles["title-and-menu"]}>
                <h3>Online Services Demo</h3>
                <MenuBar />
            </div>
            <Link to="/Start">
                <img src={logo} className={styles.logo} alt="Start Page" />
            </Link>
        </header>
    );
};

export default Header;
