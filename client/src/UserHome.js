import React, { useEffect, useState } from 'react'
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


const UserHome = ({ currentUser, handleLogin, handleLogout }) => {

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


    return (
        <Box gridColumn="span 3">
              Welcome, <AccountCircleIcon/> {currentUser?.name}!
              <Button onClick={() => handleLogout()}>Log Out</Button>
              

            <div id='userHomeDiv'>
              <UserEditForm currentUser={currentUser} handleLogin={handleLogin}/>
              <Button onClick={() => handleDelete()}>Delete Account</Button>
          </div>

          <div>
            <Card style={{"float": "left"}} sx={{ maxWidth: 345 }}>
              Create New Recipe
              <NewRecipeForm currentUser={currentUser} />
            </Card>
            </div >
          <RecipeList recipes={currentUser.recipes}/>
        </Box>
      );
      
}


export default UserHome;
