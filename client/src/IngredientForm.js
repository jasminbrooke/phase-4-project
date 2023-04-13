import React from 'react'
import { TextField, Button } from '@mui/material';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

const IngredientForm = ({ handleNewIngredient, handleIngredientName, handleIngredientsAdded, handleCheckbox, ingredientList }) => {
    return(
        <form onSubmit={(e) => handleNewIngredient(e)}>
            <div id='ingredient-list'>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {
                            ingredientList.map((ingredient, i) => {
                                return(
                                    <div className="ingredient-form" key={i}>
                                        <Checkbox label={ingredient.name} variant="soft" onChange={(e) => handleCheckbox(e, ingredient)} />
                                    </div>
                                )
                            })
                        }
                </Box>
            </div>
            <TextField
                    sx={{ marginTop: '10px' }}
                    onChange={(e) => handleIngredientName(e.target.value)}
                    id="outlined-basic"
                    label="New Ingredient Name"
                    variant="outlined"
                    size="small"
                />
            <Button type="submit">Create New Ingredient</Button>
            <Button onClick={() => handleIngredientsAdded(true)}>Continue with Selected Ingredients</Button>
        </form>
    )
}
export default IngredientForm