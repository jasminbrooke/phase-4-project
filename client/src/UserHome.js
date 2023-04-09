import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "./App";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import NavBar from './NavBar'
import { Button } from '@mui/material';
import RecipeList from './RecipeList';
import UserEditForm from './UserEditForm'
import NewRecipeForm from './NewRecipeForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserHome = ({ handleLogin, handleLogout }) => {

  const [recipes, setRecipes] = useState([])
  const [ingredients, setIngredients] = useState([])
  const currentUser = useContext(UserContext)

  useEffect(() => {
    setRecipes(currentUser.recipes)
    setIngredients(currentUser.ingredients)
  }, [currentUser])
    
  const handleDelete = () => {
    fetch(`/users/${currentUser.id}`, {
      method: 'DELETE',
    })
    .then(() => handleLogout())
  }

  const addToUserRecipes = (newRecipe) => setRecipes(prevState => [...prevState, newRecipe])
  const addToUserIngredients = (newIngredient) => setIngredients(prevState => [...prevState, newIngredient])
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
                ingredients={ingredients}
                addToUserRecipes={addToUserRecipes}
                addToUserIngredients={addToUserIngredients}
                />}
              />
            </Switch>
            <Switch>
              <Route exact path="/manage_account" element={<UserEditForm handleLogin={handleLogin} handleDelete={handleDelete}/>}/>
            </Switch>
            <Switch>
              <Route exact path="/recipes" element={<RecipeList recipes={recipes} removeFromUserRecipes={removeFromUserRecipes}/>}/>
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
