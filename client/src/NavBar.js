import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const NavBar = () => {
    return (
        <AppBar>
            <Toolbar id='navbar'>
                <NavLink to="/users/:user_id/recipes">View My Recipes</NavLink>
                <NavLink to="/users/:id">Manage Account</NavLink>
                <NavLink to="/recipes">Create a Recipe</NavLink>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
