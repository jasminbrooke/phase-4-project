import React from 'react'
import Box from '@mui/joy/Box';
import { Button } from '@mui/material';

const QuantityForm = ({ selectedIngredients, handleModal, returnToNewRecipe }) => {
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
export default QuantityForm