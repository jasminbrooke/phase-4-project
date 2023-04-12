import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "./App";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import NavBar from './NavBar'
import { Button } from '@mui/material';
import RecipeList from './RecipeList';
import UserEditForm from './UserEditForm'
import NewRecipeForm from './NewRecipeForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IngredientList from './IngredientList';

const UserHome = ({ handleLogin, handleLogout }) => {

  const [recipes, setRecipes] = useState([])

  const currentUser = useContext(UserContext)

  useEffect(() => {
    setRecipes(currentUser.recipes)
  }, [currentUser])
    
  const handleDelete = () => {
    fetch(`/users/${currentUser.id}`, {
      method: 'DELETE',
    })
    .then(() => handleLogout())
  }

  const addToUserRecipes = (newRecipe) => setRecipes(prevState => prevState.map(recipe => recipe.id === newRecipe.id ? newRecipe : recipe))
  const removeFromUserRecipes = (recipe) =>  setRecipes(prevState => prevState.filter(r => r !== recipe))
    
  return (
    <div>
      <div id="navContainer">
        <BrowserRouter>
          <NavBar />
          <div>
            <Switch>
              <Route exact path="/create_a_recipe" element={<NewRecipeForm
                currentUser={currentUser}
                addToUserRecipes={addToUserRecipes}
                />}
              />
            </Switch>
            <Switch>
              <Route exact path="/manage_account" element={<UserEditForm handleLogin={handleLogin} handleDelete={handleDelete}/>}/>
            </Switch>
            <Switch>
              <Route exact path="/my_recipes" element={<RecipeList recipes={recipes} removeFromUserRecipes={removeFromUserRecipes}/>}/>
            </Switch>
            <Switch>
              <Route exact path="/view_ingredients" element={<IngredientList />}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
      Welcome, <AccountCircleIcon/> {currentUser?.name}!
      <Button onClick={() => handleLogout()}>Log Out</Button>
    </div>
  );
}

export default UserHome;
