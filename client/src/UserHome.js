import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, NavLink, Routes as Switch } from "react-router-dom";
import NavBar from './NavBar'
import { TextField, Alert, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RecipeList from './RecipeList';
import UserEditForm from './UserEditForm'
import NewRecipeForm from './NewRecipeForm';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IngredientList from './IngredientList'
import CancelIcon from '@mui/icons-material/Cancel';


const UserHome = ({ currentUser, handleLogin, handleLogout }) => {

  const [editmode, setEditmode] = useState(false)
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    setRecipes(currentUser.recipes)
  }, [currentUser])

    // const confirmDelete = () => {
    //     return (
    //         <Alert
    //             action={
    //                 <Button onClick={() => handleDelete()} color="inherit" size="small">
    //                 Yes
    //                 </Button>
    //             }
    //         >
    //             Are you sure?
    //         </Alert>
    //     )
    // }
    
  const handleDelete = () => {
    fetch(`/users/${currentUser.id}`, {
      method: 'DELETE',
    })
    .then(() => handleLogout())
  }

  const handleEditModeClick = () => setEditmode(true);


    // return (
    //     <div>
    //         <div>
    //         <Card>Welcome, {currentUser?.name}! <Button onClick={() => handleLogout()}>Log Out</Button></Card>
    //         <div>Create New Recipe<NewRecipeForm currentUser={currentUser}/></div>           
            

            
    //         <UserEditForm currentUser={currentUser} handleLogin={handleLogin}/>
    //         <Button onClick={() => handleDelete()}>Delete Account</Button>
    //         </div>
    //         {/* <RecipeList /> */}
    //     </div>
    // )
  const addToUserRecipes = (newRecipe) => setRecipes(prevState => [...prevState, newRecipe])
    
  return (
    <div>
      <div id="navContainer">
        <BrowserRouter>
          <NavBar />
          <div>
            <Switch>
              <Route exact path="/NewRecipeForm" element={<NewRecipeForm currentUser={currentUser} addToUserRecipes={addToUserRecipes}/>}/>
            </Switch>
            <Switch>
              <Route exact path="/UserEditForm" element={<UserEditForm currentUser={currentUser} handleLogin={handleLogin} handleDelete={handleDelete}/>}/>
            </Switch>
            <Switch>
              <Route exact path="/RecipeList" element={<RecipeList recipes={recipes}/>}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
      Welcome, <AccountCircleIcon/> {currentUser?.name}!
      <Button onClick={() => handleLogout()}>Log Out</Button>
      {/* <Box gridColumn="span 3">  
        {editmode 
          ? <div> 
              <UserEditForm currentUser={currentUser} handleLogin={handleLogin}/> <Button onClick={() => setEditmode(false)}> <CancelIcon/> </Button>
            </div>
          : <Button onClick={() => handleEditModeClick()}>Edit Profile</Button>
        }
        <div id='userHomeDiv'>
          <Button onClick={() => handleDelete()}>Delete Account</Button>
        </div>
        <div>
          <Card style={{"float": "left"}} sx={{ maxWidth: 345 }}>
            Create New Recipe
            <NewRecipeForm currentUser={currentUser} addToUserRecipes={addToUserRecipes} />
          </Card>
        </div >
        <RecipeList recipes={recipes}/>
        <IngredientList ingredients={currentUser.ingredients}/> 
      </Box> */}
    </div>
  );
}


export default UserHome;
