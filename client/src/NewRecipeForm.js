import React, { useEffect, useState } from 'react'
import { TextField, Alert, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RecipeList from './RecipeList';
import UserEditForm from './UserEditForm'

const NewRecipeForm = ( { currentUser, addToUserRecipes } ) => {
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [instructions, setInstructions] = useState("")
const [errors, setErrors] = useState([])


const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/recipes', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            description: description,
            instructions: instructions,
            user_id: currentUser.id
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.errors) {
            setErrors(data.errors)
        } else {
            addToUserRecipes(data)
        }
    })
  }

  return (
    <div>
        <Card sx={{ maxWidth: 250 }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
            //  error={errors.productname}
            // helperText={errors.productname}
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
        />
        <TextField
            //  error={errors.productname}
            // helperText={errors.productname}
            defaultValue={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            id="outlined-basic"
            label="Instructions"
            variant="outlined"
            size="small"
        />
        <TextField
            //  error={errors.productname}
            // helperText={errors.productname}
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
        />
        <Button type="submit">Create New Recipe</Button>
      </form>
      {/* {errors.map((error, i) => <Typography key={i}>{ error }</Typography>)} */}
      </Card>
    </div>
  )}


export default NewRecipeForm