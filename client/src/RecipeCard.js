import React, { useState, useContext } from 'react'
import { UserContext } from "./App";
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const RecipeCard = ({ recipe, removeFromUserRecipes }) => {

  const {description, instructions, name, ingredients_with_quantities} = recipe
  const [expanded, setExpanded] = useState(false);
  const currentUser = useContext(UserContext)

  const handleDelete = () => {
    fetch(`/users/${currentUser.id}/recipes/${recipe.id}`,{
      method: 'DELETE'
    })
    .then(() => removeFromUserRecipes(recipe))
  }
    
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <Box gridColumn="span 3">
      <Card style={{"float": "left"}} sx={{ maxWidth: 345, minWidth: 275 }}>
        <CardHeader
          title={name}
          action={
            <IconButton
            onClick={() => handleDelete()}
            aria-label="settings">
            <DeleteForeverIcon  />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {instructions}
            <br/>
            <hr></hr>
            Ingredients:
            {ingredients_with_quantities?.map((ing, i) => <p key={i}>{ing.ingredient.name}: {ing.quantity}</p>)}
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  )
}

export default RecipeCard