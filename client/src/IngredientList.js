import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import IngredientCard from './IngredientCard'

const IngredientList = () => {
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        fetch("/user_ingredients")
        .then(response => response.json())
        .then(data => setIngredients(data))
    }, [])
    return (
        <Box className='nav-component' display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            {
                ingredients?.map((ingredient, i)=> <IngredientCard userIngredient={ingredient} key={i}/>)
            }
        </Box>
    )
}

export default IngredientList;
