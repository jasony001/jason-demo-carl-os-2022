import MenuItem from './MenuItem'
import React from 'react'

const Navbar = ({mainComponentChanged, menuItems, setMenuItems}) => {

    return (

        <nav className="top-menu">
            {
                menuItems && menuItems.length > 0 && 
            <ul>
                {
                    menuItems.sort((m1, m2) => m1.id > m2.id).map((l, index) => {
                        return <MenuItem
                            key={index} 
                            data={l} 
                            menuItems={menuItems}
                            mainComponentChanged={mainComponentChanged}
                            setMenuItems={setMenuItems}
                        />
                    })
                }
            </ul>
}       
        </nav>
    );
}

export default Navbar;