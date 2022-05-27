import React from "react";
import styles from "./MenuBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { getMenuItems } from "./menu-items-data";
import testDataContext from "../../store/test-data-context";

const MenuBar = (initHide) => {
    const [expandedMenuItemId, setExpandedMenuItemId] = React.useState("");
    const { testData, setTestData } = React.useContext(testDataContext);

    const pathname = useLocation().pathname;

    const menuItems = getMenuItems(testData);

    const expandSubMenu = (menuItemId) => {
        if (expandedMenuItemId && expandedMenuItemId === menuItemId)
            setExpandedMenuItemId("");
        else {
            let menuItem = menuItems.find((m) => m.id === menuItemId);
            if (menuItem) {
                setExpandedMenuItemId(menuItem.id);
            }
        }
    };

    const [hideOnSmallScreen, setHideOnSmallScreen] = React.useState(initHide);

    const toggleUl = () => {
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
onClick={e=>{setHideOnSmallScreen(e.target.tagName.toUpperCase() === "A")}}
            >
                {getMenuItems(testData).map((tm) => (
                    <li key={tm.id} onClick={() => expandSubMenu(tm.id)}>
                        <div>
                            <div>
                                {tm.link ? (
                                    <NavLink
                                        activeClassName={styles.active}
                                        to={tm.link}
                                    >
                                        {tm.label}
                                    </NavLink>
                                ) : (
                                    <>
                                        <span
                                            className={
                                                tm.submenu.some(
                                                    (sm) => sm.link === pathname
                                                )
                                                    ? styles.active
                                                    : ""
                                            }
                                        >
                                            {`${tm.label} `} 
                                        </span>
                                        <>
                                            {expandedMenuItemId === tm.id
                                                ? <i className="fa-solid fa-angle-up"></i>
                                                : <i className="fa-solid fa-angle-down"></i>}
                                        </>
                                    </>
                                )}
                            </div>

                            {expandedMenuItemId === tm.id && (
                                <div className={styles.submenu}>
                                    {tm.submenu.map((sm) => (
                                        <NavLink
                                            key={sm.id}
                                            activeClassName={styles.active}
                                            to={sm.link}
                                        >
                                            {sm.label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuBar;
