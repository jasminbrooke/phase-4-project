import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RecipeList from './RecipeList';

const UserHome = (user) => {


    return (
        <div>
            Welcome, {user}!

            <RecipeList />
        </div>
    )
}


export default UserHome;
