import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/logo.jpg";
import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";
import testDataContext from "../../store/test-data-context";

const Header = ({showMenu}) => {
    let hideMenu = (showMenu === undefined) ? false : !showMenu
    const { testData, setTestData } = React.useContext(testDataContext);

    hideMenu = hideMenu || (testData.status !== "OK")
    return (
        <header className={styles.header}>
            <div className={styles["title-and-menu"]}>
                <h3>Online Services Demo</h3>
                { !hideMenu && <MenuBar /> }
            </div>
            <Link to="/Start">
                <img src={logo} className={styles.logo} alt="Start Page" />
            </Link>
        </header>
    );
};

export default Header;
