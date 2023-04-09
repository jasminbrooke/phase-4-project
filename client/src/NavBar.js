import React, { useContext } from 'react'
import { UserContext } from "./App";
import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const NavBar = () => {
    const currentUser = useContext(UserContext)
    return (
        <AppBar>
            <Toolbar id='navbar'>
                <NavLink to={`/users/${currentUser.id}/recipes`}>View My Recipes</NavLink>
                <NavLink to={`/users/${currentUser.id}`}>Manage Account</NavLink>
                <NavLink to="/recipes">Create a Recipe</NavLink>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
