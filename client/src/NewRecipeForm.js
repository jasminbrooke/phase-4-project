import React, { useEffect, useState } from 'react'
import { TextField, Alert, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

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
    <div className='nav-component'>
        <Card sx={{ width: 350 }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="user-edit-field">
                    <TextField
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        size="small"
                    />
                </div>
                 <div className="user-edit-field">
                    <TextField
                        defaultValue={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        id="outlined-basic"
                        label="Instructions"
                        variant="outlined"
                        size="small"
                    />
                 </div>
                 <div className="user-edit-field">
                    <TextField
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        size="small"
                    />
                 </div>
                <Button type="submit">Create New Recipe</Button>
            </form>
            {errors.map((error, i) => <Typography key={i}>{ error }</Typography>)}
        </Card>
    </div>
  )}


export default NewRecipeForm