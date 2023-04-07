import React from 'react'
import { Box, Typography } from '@mui/material';
import RecipeCard from './RecipeCard'

const RecipeList = ({ recipes, removeFromUserRecipes }) => {

    return (
        <Box className='nav-component' display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Typography variant="h1">Recipes</Typography>
            {
                recipes.map((recipe, i) => 
                    <RecipeCard
                        key={i}
                        recipe={recipe}
                        removeFromUserRecipes={removeFromUserRecipes}
                    />
                )
            }
        </Box>
    )    

}

export default RecipeList;
