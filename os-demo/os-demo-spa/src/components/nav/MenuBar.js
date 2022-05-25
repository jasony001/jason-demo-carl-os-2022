import React from "react";
import styles from "./MenuBar.module.css";
import { Link } from "react-router-dom";

const MenuBar = (initHide) => {
    const [hideOnSmallScreen, setHideOnSmallScreen] = React.useState(initHide);
    console.log("rendering menu");
    console.log(hideOnSmallScreen);
    const toggleUl = () => {
        console.log(hideOnSmallScreen);
        console.log(
            hideOnSmallScreen ? styles["menu-bar-hide-on-small-screen"] : ""
        );
        setHideOnSmallScreen((prev) => !prev);
    };
    const hamburgerClassList = `fa-solid fa-bars ${styles["hamburger"]}`;

    return (
        <div className={styles["menu-bar"]}>
            <i className={hamburgerClassList} onClick={toggleUl}></i>
            <ul
                className={
                    hideOnSmallScreen
                        ? styles["menu-bar-hide-on-small-screen"]
                        : ""
                }
                onClick={() => {
                    setHideOnSmallScreen(true);
                }}
            >
                <li>
                    <Link to="/Home">Home</Link>
                </li>
                <li>
                    <Link to="/Individual">Individual</Link>
                </li>
                <li>Dealership</li>
                <li>Account</li>
                <li>OMVIC Events</li>
                <li>Support</li>
                <li>Test Data</li>
            </ul>
        </div>
    );
};

export default MenuBar;
