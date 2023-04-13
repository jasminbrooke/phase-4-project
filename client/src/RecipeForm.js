import React from 'react'
import { TextField, Button } from '@mui/material';

const RecipeForm = ({ handleRecipe, handleName, handleDescription, handleInstructions, currentRecipe = null }) => {

    const editMode = currentRecipe ? true : false

    return (
        <form onSubmit={(e) => handleRecipe(e)}>
            <div id="column">
                <div className="user-edit-field">
                    <TextField
                        defaultValue={editMode ? currentRecipe.name : null}
                        onChange={(e) => handleName(e.target.value)}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        size="small"
                    />
                </div>
                <div className="user-edit-field">
                    <TextField
                        defaultValue={editMode ? currentRecipe.description : null}
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
                        defaultValue={editMode ? currentRecipe.instructions : null}
                        onChange={(e) => handleInstructions(e.target.value)}
                        id="outlined-basic"
                        label="Instructions"
                        variant="outlined"
                        size="medium"
                        multiline
                        rows={10}
                    />
                </div>
                <Button type="submit">{editMode ? 'Update Recipe' : 'Create New Recipe'}</Button>
            </div>
        </form>
    )
} 
export default RecipeForm