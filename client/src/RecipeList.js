import React from 'react'
import { Box } from '@mui/material';
import RecipeCard from './RecipeCard'

const RecipeList = ({ recipes, removeFromUserRecipes, updateUserRecipes, addToUserIngredients, ingredientList }) => {

    return (
        <Box className='nav-component' display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            {
                recipes?.map((recipe, i) => 
                    <RecipeCard
                        key={i}
                        recipe={recipe}
                        removeFromUserRecipes={removeFromUserRecipes}
                        updateUserRecipes={updateUserRecipes}
                        addToUserIngredients={addToUserIngredients}
                        ingredientList={ingredientList}
                    />
                )
            }
        </Box>
    )    

}

export default RecipeList;
