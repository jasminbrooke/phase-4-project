import React from 'react'
import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const NavBar = () => {
    return (
        <AppBar>
            <Toolbar id='navbar'>
                <NavLink to="/my_recipes">View My Recipes</NavLink>
                <NavLink to="/manage_account">Manage Account</NavLink>
                <NavLink to="/create_a_recipe">Create a Recipe</NavLink>
                <NavLink to="/view_ingredients">View All Ingredients</NavLink>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
