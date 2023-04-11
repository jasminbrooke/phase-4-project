import React from 'react'
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const IngredientCard = ({ userIngredient }) => {
    const { note, ingredient } = userIngredient
  return (
    <Box gridColumn="span 3">
      <Card style={{"float": "left"}} sx={{ maxWidth: 345, minWidth: 275 }}>
        <CardHeader
          title={ingredient.name}
        />
        <CardContent>
            {note?.split("| New Note: ").map((n, i) => <Typography key={i} variant="body2" color="text.secondary">{n}</Typography>)}
        </CardContent>
      </Card>
    </Box>
  )
}

export default IngredientCard