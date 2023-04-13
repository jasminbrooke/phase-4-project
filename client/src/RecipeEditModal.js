import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "./App";
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';

const RecipeEditModal = ({ currentRecipe, ingredients, handleModal }) => {

    return (
        <div className='nav-component'>
            <Modal open={openModal} onClose={() => handleModal(false)}>
                <ModalDialog
                    aria-labelledby="layout-modal-title"
                    aria-describedby="layout-modal-description"
                >
                    <ModalClose />
                    
                </ModalDialog>
            </Modal>
            {/* <Card sx={{ width: 800, height: 600 }}>
                <div id='recipe-forms'>
                    {!ingredientsAdded && !createdRecipe && recipeForm()}
                    {!ingredientsAdded && createdRecipe && ingredientForm()}
                    {ingredientsAdded && quantityForm()}
                </div>
                {response.map((message, i) => <Typography key={i}>{ message }</Typography>)}
            </Card> */}
        </div>
    )

}
export default RecipeEditModal