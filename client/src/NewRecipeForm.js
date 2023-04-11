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
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [response, setResponse] = useState([])
    const [ingredientName, setIngredientName] = useState('')
    const [ingredientList, setIngredientList] = useState([])
    const [ingredientNotes, setIngredientNotes] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [modalIngredient, setModalIngredient] = useState(null)

    const addToUserIngredients = (newIngredient) => setIngredientList(prevState => [...prevState, newIngredient])

    useEffect(() => {
        getIngredients();
        setIngredientNotes(ingredientList.map(ingredient => {
            const key = ingredient.id
            return { key: ''}
        }))
    }, [])

    const getIngredients = () => {
        fetch('/ingredients')
        .then(response => response.json())
        .then(data => setIngredientList(data))
    }

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

    const handleIngredientNotes = (modalIngredient) => {
        debugger
        fetch('/update_or_create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                ingredient_id: modalIngredient.id,
                note: ingredientNotes
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                setResponse("Couldn't save ingredient note")
            }
            setOpenModal(false)
            setIngredientNotes(null)
        })
    }

    const updateIngredientNotes = (data) => setIngredientNotes(data)
        // Instead, make the texfields only pop up on a button click - you can only add a note for one ingredient at a time. That ingredient note field will have a simple piece of state

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

    const handleModal = (ingredient) => {
        setModalIngredient(ingredient)
        setOpenModal(!openModal)
    }

    return (
        <div className='nav-component'>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <ModalDialog
                aria-labelledby="layout-modal-title"
                aria-describedby="layout-modal-description"
                >
                    <ModalClose />
                    <Typography id="layout-modal-title" component="h2">
                        {modalIngredient?.name}
                    </Typography>
                    <div className="ingredient-form">
                        <TextField
                            onChange={(e) => updateIngredientNotes(e.target.value)}
                            id="outlined-basic"
                            label="Ingredient note"
                            variant="outlined"
                            size="small"
                            sx={{ margin:'5px' }}
                        />
                        <IconButton
                            onClick={(e) => handleIngredientNotes(modalIngredient)}
                            aria-label="settings">
                            <SaveIcon />
                        </IconButton>
                    </div>
                </ModalDialog>
            </Modal>
            <Card sx={{ width: 800, height: 600 }}>
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
                                    defaultValue={description}
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
                                    defaultValue={instructions}
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
                    <form onSubmit={(e) => handleNewIngredient(e)}>
                        <div id='ingredient-list'>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    {
                                        ingredientList.map((ingredient, i) => {
                                            return(
                                                <div className="ingredient-form" key={i}>
                                                        <Checkbox value={ingredient.id} label={ingredient.name} variant="soft" onChange={(e) => handleCheckbox(e)} />
                                                        <IconButton
                                                            value={ingredient.id}
                                                            onClick={() => handleModal(ingredient)}
                                                            aria-label="settings">
                                                            <AddIcon />
                                                        </IconButton>
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
                        <Button type="submit">Add Ingredient</Button>
                    </form>
                </div>
                {response.map((message, i) => <Typography key={i}>{ message }</Typography>)}
            </Card>
        </div>
    )}


export default NewRecipeForm