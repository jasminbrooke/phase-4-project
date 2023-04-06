import React, { useEffect, useState } from 'react'
import { TextField, Alert, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RecipeList from './RecipeList';
import UserEditForm from './UserEditForm'

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




    return (
        <div>
            
            Welcome, {currentUser?.name}!
            <Button onClick={() => handleLogout()}>Log Out</Button>
            <UserEditForm currentUser={currentUser} handleLogin={handleLogin}/>
            <Button onClick={() => handleDelete()}>Delete Account</Button>

            {/* <RecipeList /> */}
        </div>
    )
}


export default UserHome;
