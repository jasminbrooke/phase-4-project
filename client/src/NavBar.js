import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const NavBar = () => {
    return (
        <AppBar>
            <Toolbar id='navbar'>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/UserHome">Manage Account</NavLink>
                <NavLink to="/NewRecipeForm">Create a Recipe</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
