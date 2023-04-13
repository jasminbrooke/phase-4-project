import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "./App";
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import RecipeForm from './RecipeForm'

const RecipeEditModal = ({ removeFromUserRecipes, addToUserRecipes, currentRecipe, handleModal, openModal }) => {

    const currentUser = useContext(UserContext)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setName(currentRecipe.name)
        setDescription(currentRecipe.description)
        setInstructions(currentRecipe.instructions)
    }, [])

    const handleName = (value) => setName(value)
    const handleDescription = (value) => setDescription(value)
    const handleInstructions = (value) => setInstructions(value)

    const handleRecipe = (e) => {
        e.preventDefault()
        fetch(`users/${currentUser.id}/recipes/${currentRecipe.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description,
                instructions: instructions,
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                setErrors(data.errors)
            } else {
                addToUserRecipes(data)
                handleModal(false)
            }
        })
    }

    const handleDelete = () => {
        fetch(`/users/${currentUser.id}/recipes/${currentRecipe.id}`,{
          method: 'DELETE'
        })
        .then(() => {
            removeFromUserRecipes(currentRecipe)
            handleModal(false)
        })
      }
    // add edit to each indiviual ingredient, add button to add more ingredients, pass in the ingredientsList filtered by ingredients already on the recipe
    return (
        <div className='nav-component'>
            <Modal open={openModal} onClose={() => handleModal(false)}>
                <ModalDialog
                    aria-labelledby="layout-modal-title"
                    aria-describedby="layout-modal-description"
                >
                    <ModalClose />
                    <RecipeForm
                        currentRecipe={currentRecipe}
                        handleName={handleName}
                        handleDescription={handleDescription}
                        handleInstructions={handleInstructions}
                        handleRecipe={handleRecipe}
                    />
                    <Button onClick={() => handleDelete()}>Delete Recipe</Button>
                    {errors.map((error, i) => <Typography key={i}>Error: { error }</Typography>)}
                </ModalDialog>
            </Modal>
        </div>
    )

}
export default RecipeEditModal