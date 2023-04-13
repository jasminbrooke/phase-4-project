import React from 'react'
import { TextField, Button } from '@mui/material';

const RecipeForm = ({ handleCreateRecipe, handleName, handleDescription, handleInstructions }) => {
    return (
        <form onSubmit={(e) => handleCreateRecipe(e)}>
            <div id="recipe-fields">
                <div className="user-edit-field">
                    <TextField
                        onChange={(e) => handleName(e.target.value)}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        size="small"
                    />
                </div>
                <div className="user-edit-field">
                    <TextField
                        onChange={(e) => handleDescription(e.target.value)}
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        size="medium"
                        multiline
                        rows={4}
                    />
                </div>
                <div className="user-edit-field">
                    <TextField
                        onChange={(e) => handleInstructions(e.target.value)}
                        id="outlined-basic"
                        label="Instructions"
                        variant="outlined"
                        size="medium"
                        multiline
                        rows={10}
                    />
                </div>
            </div>
            <Button type="submit">Create New Recipe</Button>
        </form>
    )
} 
export default RecipeForm