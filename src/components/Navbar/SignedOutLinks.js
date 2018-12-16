import React from 'react'
import { NavLink } from 'react-router-dom'
const signedOutLinks = (props)=> {
    return (
        <ul className={props.isSideNav? 'side-nav': "right hide-on-med-and-down"}>
            <li><NavLink to="/signin">Login</NavLink></li>
        </ul>
    )
}

export default signedOutLinks