import React from 'react'
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

const IngredientCard = ({ ingredient }) => {
    
  return (
    <Box gridColumn="span 3">
      <Card style={{"float": "left"}} sx={{ maxWidth: 345, minWidth: 275 }}>
        <CardHeader
          title={ingredient.name}
        />
        <CardContent>
          <hr></hr>
          Recipes:
          <ul>
            {ingredient.recipes?.map((recipe, i) => <li key={i}>{recipe.name}</li>)}

          </ul>
        </CardContent>
      </Card>
    </Box>
  )
}

export default IngredientCard