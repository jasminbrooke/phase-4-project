import React, { useState, useContext  } from 'react'
import { UserContext } from "./App";
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

const NewRecipeForm = ( { addToUserRecipes, ingredients, addToUserIngredients } ) => {

    const currentUser = useContext(UserContext)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [response, setResponse] = useState([])
    const [ingredientName, setIngredientName] = useState('')


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
                user_id: currentUser.id,
                ingredients: selectedIngredients
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

    const handleNewIngredient = (e) => {
    e.preventDefault();
    fetch(`/users/${currentUser.id}/ingredients`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: ingredientName
        })
    })
    .then(response => response.json())
        .then(data => {
            if (data.errors){
                setResponse(data.errors)
            } else{
                addToUserIngredients(data)
            }
        })
    }

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setSelectedIngredients((prevState => [...prevState, e.target.value]))
        } else {
            setSelectedIngredients((prevState => prevState.filter(ing => ing !== e.target.value)))
        }
    }

    return (
        <div className='nav-component'>
            <Card sx={{ width: 750 }}>
                <div id='recipe-forms'>
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
                        <Button type="submit">Create New Recipe</Button>
                    </form>
                    <form onSubmit={(e) => handleNewIngredient(e)}>
                        <div id='ingredient-list'>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {ingredients.map((ingredient, i) => <Checkbox key={i} value={ingredient.id} label={ingredient.name} variant="soft" onChange={(e) => handleCheckbox(e)} />)}
                            </Box>
                            <TextField
                                sx={{ marginTop: '10px' }}
                                onChange={(e) => setIngredientName(e.target.value)}
                                id="outlined-basic"
                                label="Ingredient Name"
                                variant="outlined"
                                size="small"
                            />
                        </div>
                        <Button type="submit">Add Ingredient</Button>
                    </form>
                </div>
                {response.map((message, i) => <Typography key={i}>{ message }</Typography>)}
            </Card>
        </div>
    )}


export default NewRecipeForm