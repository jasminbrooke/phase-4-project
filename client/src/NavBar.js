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
                <NavLink to="/recipes">View My Recipes</NavLink>
                <NavLink to="/manage_account">Manage Account</NavLink>
                <NavLink to="/create_a_recipe">Create a Recipe</NavLink>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
