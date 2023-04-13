import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import { TextField, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';

const QuantityEditModal = ({ updateUserRecipes, currentRecipe, editingIngredient, handleModal, openModal }) => {
    const [ingredientQuantity, setIngredientQuantity] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setIngredientQuantity(editingIngredient?.quantity)
    }, [editingIngredient])

    const submitIngredientQuantity = (e) => {
        e.preventDefault()
        fetch(`/recipes/${currentRecipe.id}/ingredients/${editingIngredient.ingredient.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quantity: ingredientQuantity
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                setErrors(data.errors)
            } else {
                updateUserRecipes(data)
                handleModal(false)
            }
        })
    }

    const handleDelete = () => {
        fetch(`/recipes/${currentRecipe.id}/ingredients/${editingIngredient.ingredient.id}`,{
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            updateUserRecipes(data)
            handleModal(false)
        })
    }
    // add edit to each indiviual ingredient - will use the normal quantity modal but add a "remove ingredient from recipe" button
    // add button to add more ingredients, pass in the ingredientsList filtered by ingredients already on the recipe
    return (
        <div className='nav-component'>
            <Modal open={openModal} onClose={() => handleModal(false)}>
                <ModalDialog
                    aria-labelledby="layout-modal-title"
                    aria-describedby="layout-modal-description"
                >
                    <ModalClose />
                    <form onSubmit={(e) => submitIngredientQuantity(e)}>
                        <Typography id="layout-modal-title" component="h2">
                            {editingIngredient?.ingredient?.name}
                        </Typography>
                        <div className="ingredient-form">
                            <TextField
                                defaultValue={ingredientQuantity}
                                onChange={(e) => setIngredientQuantity(e.target.value)}
                                id="outlined-basic"
                                label="Ingredient quantity"
                                variant="outlined"
                                size="small"
                                sx={{ margin:'5px' }}
                            />
                            <IconButton
                                type="submit"
                                aria-label="settings">
                                <SaveIcon />
                            </IconButton>
                        </div>
                    </form>
                    <Button onClick={() => handleDelete()}>Remove Ingredient From Recipe</Button>
                    {errors.map((error, i) => <Typography key={i}>Error: { error }</Typography>)}
                </ModalDialog>
            </Modal>
        </div>
    )

}
export default QuantityEditModal