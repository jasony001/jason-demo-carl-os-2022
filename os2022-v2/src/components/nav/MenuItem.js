import React from 'react'

const MenuItem = ({data, mainComponentChanged, menuItems, setMenuItems}) => {
    const menuClicked = (e, mi) => {
        let index = menuItems.findIndex(m => m.id === mi.id)
        let clickedMenuItem = menuItems[index]
        
        if (clickedMenuItem && clickedMenuItem.submenu !== undefined && clickedMenuItem.submenu.length > 0) {
            setMenuItems(menuItems.map((m, i) => (i === index) ? {...m, showSubmenu: !m.showSubmenu} : {...m, showSubmenu: false}))
        } else {
            setMenuItems(menuItems.map( m => {return {...m, showSubmenu: false } }  ))
            mainComponentChanged(mi.id);
        }
        e.stopPropagation();
    }

    if (data.submenu && data.submenu.length > 0) {
        return  (
            <li key={data.label} onClick={ e => { menuClicked(e, data); } }>
                <div className="topmenu-item">
                    <span>{data.label}</span>
                    <span className={ data.showSubmenu ? "submenu-toggler submenu-toggler--up" : "submenu-toggler submenu-toggler--down" }></span>
                </div>
                
                <ul className={ data.showSubmenu ? "submenu submenu--show" : "submenu submenu--hide" }>
                    { data.submenu.sort((m1, m2) => m1.id > m2.id).map(s => <li key={s.label} onClick={ e => { menuClicked(e, s); } }>{s.label}</li>) }
                </ul>
            </li>
        )
    } else 
    {
        return <li key={data.label} onClick={ e => { menuClicked(e, data); } }>{data.label}</li> 
    }
    
}

export default MenuItem;