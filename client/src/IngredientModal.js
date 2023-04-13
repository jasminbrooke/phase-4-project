import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "./App";
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import IngredientForm from './IngredientForm'

const IngredientModal = ({ addToUserIngredients, ingredientList, currentRecipe, handleModal, openModal }) => {
    const currentUser = useContext(UserContext)

    const [errors, setErrors] = useState([])
    const [ingredientsAdded, setIngredientsAdded] = useState(false)
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [ingredientName, setIngredientName] = useState('')

    const handleIngredientName = (value) => setIngredientName(value)
    const handleIngredientsAdded = (value) => setIngredientsAdded(value)

    useEffect(() => {
        console.log(currentRecipe)
        
    }, [])

    const handleNewIngredient = (e) => {
        e.preventDefault();
        fetch(`/ingredients`, {
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
                setErrors(data.errors)
            } else {
                addToUserIngredients(data)
            }
        })
    }

    const handleCheckbox = (e, ingredient) => {
        if (e.target.checked) {
            setSelectedIngredients((prevState => [...prevState, ingredient]))
        } else {
            setSelectedIngredients((prevState => prevState.filter(ing => ing !== ingredient)))
        }
    }
    // currentRecipe.ingredients = [{quantity: 2, ingredient: {ingredient stuff}}]
    // const existingIngredients = currentRecipe?.ingredient_with_quantities?.map(ing => ing.ingredient)
    // const filteredIngredients = ingredientList.filter(ing => !existingIngredients?.includes(ing))

    return (
        <div className='nav-component'>
            <Modal open={openModal} onClose={() => handleModal(false)}>
                <ModalDialog
                    aria-labelledby="layout-modal-title"
                    aria-describedby="layout-modal-description"
                >
                    <ModalClose />
                    <IngredientForm
                        handleNewIngredient={handleNewIngredient}
                        handleIngredientName={handleIngredientName}
                        handleIngredientsAdded={handleIngredientsAdded}
                        handleCheckbox={handleCheckbox}
                        ingredientList={ingredientList}
                    />
                    {errors.map((error, i) => <Typography key={i}>Error: { error }</Typography>)}
                </ModalDialog>
            </Modal>
        </div>
    )

}
export default IngredientModal