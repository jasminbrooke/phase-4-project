import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "./App";
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import RecipeForm from './RecipeForm'
import IngredientForm from './IngredientForm';
import QuantityForm from './QuantityForm'

const NewRecipeForm = ( { updateUserRecipes, addToUserIngredients, ingredientList } ) => {

    const currentUser = useContext(UserContext)
    const [response, setResponse] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [createdRecipe, setCreatedRecipe] = useState(null)
    const [ingredientsAdded, setIngredientsAdded] = useState(false)
    
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [ingredientName, setIngredientName] = useState('')
   
    const [ingredientQuantity, setIngredientQuantity] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [modalIngredient, setModalIngredient] = useState(null)

    
    const handleName = (value) => setName(value)
    const handleDescription = (value) => setDescription(value)
    const handleInstructions = (value) => setInstructions(value)

    const handleIngredientName = (value) => setIngredientName(value)
    const handleIngredientsAdded = (value) => setIngredientsAdded(value)

    const handleCreateRecipe = (event) => {
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
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                setResponse(data.errors)
            } else {
                updateUserRecipes(data)
                setCreatedRecipe(data)
            }
        })
    }

    const submitIngredientQuantity = (e, modalIngredient) => {
        e.preventDefault()
        // ADD CODE TO HAVE THE SEEDED DB CLEARED WHEN SEEDS IS RUN: User.destroy_all - for each reseource
        fetch(`/recipes/${createdRecipe.id}/ingredients`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ingredient_id: modalIngredient.id,
                quantity: ingredientQuantity
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors){
                setResponse(data.errors)
            } else {
                updateUserRecipes(data)
                setOpenModal(false)
            }
        })        
    }

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
                setResponse(data.errors)
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

    const handleModal = (ingredient) => {
        setModalIngredient(ingredient)
        setOpenModal(!openModal)
    }

    const returnToNewRecipe = () => {
        setIngredientsAdded(false)
        setCreatedRecipe(null)
    }

    return (
        <div className='nav-component'>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <ModalDialog
                    aria-labelledby="layout-modal-title"
                    aria-describedby="layout-modal-description"
                >
                    <ModalClose />
                    <form onSubmit={(e) => submitIngredientQuantity(e, modalIngredient)}>
                        <Typography id="layout-modal-title" component="h2">
                            {modalIngredient?.name}
                        </Typography>
                        <div className="ingredient-form">
                            <TextField
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
                </ModalDialog>
            </Modal>
            <Card sx={{ width: 800, height: 600 }}>
                <div id='recipe-forms'>
                    {
                        !ingredientsAdded && !createdRecipe && (
                            <RecipeForm
                                handleRecipe={handleCreateRecipe}
                                handleName={handleName}
                                handleDescription={handleDescription}
                                handleInstructions={handleInstructions}
                            />
                        )
                    }
                    {
                        !ingredientsAdded && createdRecipe && (
                            <IngredientForm 
                                handleNewIngredient={handleNewIngredient}
                                handleIngredientName={handleIngredientName}
                                handleIngredientsAdded={handleIngredientsAdded}
                                handleCheckbox={handleCheckbox}
                                ingredientList={ingredientList}
                            />
                        )
                    }
                    {
                        ingredientsAdded && (
                            <QuantityForm
                                selectedIngredients={selectedIngredients}
                                handleModal={handleModal}
                                returnToNewRecipe={returnToNewRecipe}
                            />
                        )
                    }
                </div>
                {response.map((message, i) => <Typography key={i}>Error: { message }</Typography>)}
            </Card>
        </div>
    )}


export default NewRecipeForm