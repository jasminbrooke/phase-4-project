import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "./App";
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';

const NewRecipeForm = ( { addToUserRecipes } ) => {

    const currentUser = useContext(UserContext)
    const [response, setResponse] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [createdRecipe, setCreatedRecipe] = useState(null)
    const [ingredientsAdded, setIngredientsAdded] = useState(false)
    
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [ingredientName, setIngredientName] = useState('')
    const [ingredientList, setIngredientList] = useState([])
    const [ingredientQuantity, setIngredientQuantity] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [modalIngredient, setModalIngredient] = useState(null)

    const addToUserIngredients = (newIngredient) => setIngredientList(prevState => [...prevState, newIngredient])

    useEffect(() => {
        getIngredients();
    }, [])

    const getIngredients = () => {
        fetch('/ingredients')
        .then(response => response.json())
        .then(data => setIngredientList(data))
    }

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
                addToUserRecipes(data)
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
                // addToUserIngredients(data)
                addToUserRecipes(data)
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
                } else{
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

    const recipeForm = () => {
        return (
            <form onSubmit={(e) => handleCreateRecipe(e)}>
                <div id="recipe-fields">
                    <div className="user-edit-field">
                        <TextField
                            onChange={(e) => setName(e.target.value)}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            size="small"
                        />
                    </div>
                    <div className="user-edit-field">
                        <TextField
                            onChange={(e) => setDescription(e.target.value)}
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
                            onChange={(e) => setInstructions(e.target.value)}
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

    const ingredientForm = () => {
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
                    <TextField
                        sx={{ marginTop: '10px' }}
                        onChange={(e) => setIngredientName(e.target.value)}
                        id="outlined-basic"
                        label="Ingredient Name"
                        variant="outlined"
                        size="small"
                    />
                </div>
                <Button type="submit">Create New Ingredient</Button>
                <Button onClick={() => setIngredientsAdded(true)}>Continue with Selected Ingredients</Button>
            </form>
        )
    }

    const quantityForm = () => {
        return (
            <div id='ingredient-list'>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {
                        selectedIngredients.map((ingredient, i) => {
                            return(
                                <div className="ingredient-form" key={i}>
                                    <Button onClick={() => handleModal(ingredient)}>Add {ingredient.name} Quantity</Button>
                                </div>
                            )
                        })
                    }
                </Box>
                <Button onClick={() => returnToNewRecipe()}>Done With Recipe</Button>
            </div>
        )
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
                    {!ingredientsAdded && !createdRecipe && recipeForm()}
                    {!ingredientsAdded && createdRecipe && ingredientForm()}
                    {ingredientsAdded && quantityForm()}
                </div>
                {response.map((message, i) => <Typography key={i}>{ message }</Typography>)}
            </Card>
        </div>
    )}


export default NewRecipeForm