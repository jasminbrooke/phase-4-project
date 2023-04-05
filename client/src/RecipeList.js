import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';
import RecipeCard from './RecipeCard'

const RecipeList = ({ recipes }) => {

    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            {
                recipes.map((recipe, i) => 
                    <RecipeCard
                        key={i}
                        recipe={recipe}
                    />
                )
            }
        </Box>
    )    

}

export default RecipeList;
