import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const NewRecipeForm = ( { currentUser, addToUserRecipes } ) => {
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [instructions, setInstructions] = useState("")
const [response, setResponse] = useState([])


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
    .then(response => { 
        if (response.ok) {
            response.json().then(data => {
                setResponse(["Recipe Successfully Created"])
                addToUserRecipes(data)
            })
        } else {
            response.json().then(data => setResponse(data.errors))
        }
    })
  }

  return (
    <div className='nav-component'>
        <Card sx={{ width: 350 }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div id="recipe-fields">
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
                </div>
                <div id='ingredient-list'>
                    <p>This will be a scrollable div where we will map all ingredients over a MUI Checkbox component</p>
                    <p>The selected ingredients will be saved as recipe-ingredient join records</p>
                    <p>make ingredients a limited list through seeds</p>
                    <p>get rid of ingredient to user relationship</p>

                </div>
                <Button type="submit">Create New Recipe</Button>
            </form>
            {response.map((message, i) => <Typography key={i}>{ message }</Typography>)}
        </Card>
    </div>
  )}


export default NewRecipeForm