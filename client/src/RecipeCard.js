import React, { useState, useContext } from 'react'
import { UserContext } from "./App";
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import RecipeEditModal from './RecipeEditModal'
import QuantityEditModal from './QuantityEditModal'
import IngredientModal from './IngredientModal';

const RecipeCard = ({ recipe, removeFromUserRecipes, updateUserRecipes, addToUserIngredients, ingredientList }) => {

  const {description, instructions, name, ingredients_with_quantities} = recipe
  const [expanded, setExpanded] = useState(false);
  const currentUser = useContext(UserContext)
  const [openEditRecipeModal, setOpenEditRecipeModal] = useState(false)
  const [openEditQuantityModal, setOpenEditQuantityModal] = useState(false)
  const [openIngredientModal, setOpenIngredientModal] = useState(false)
  const [editingIngredient, setEditingIngredient] = useState(null)

 

  const handleEditRecipe = () => setOpenEditRecipeModal(!openEditRecipeModal)
  const handleEditQuantity = (ingredient) => {
    setEditingIngredient(ingredient)
    setOpenEditQuantityModal(!openEditQuantityModal)
  }

  const handleIngredientModal = () => {
    setOpenIngredientModal(!openIngredientModal)
  }
    
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // ingredients_with_quantities = [{quantity: 2, ingredient: {ingredient data}}]
  const existingIngredients = ingredients_with_quantities?.map(ing => ing.ingredient.id) // array of ingredient ids that are already in this recipe
  const filteredIngredients = ingredientList.filter(ing => !existingIngredients.includes(ing.id)) 
  // filter out ingredients from ingredientList(all ingredients) if their id is in the list of ingredients in this recipe already

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
      <RecipeEditModal 
        currentRecipe={recipe}
        handleModal={handleEditRecipe}
        openModal={openEditRecipeModal}
        updateUserRecipes={updateUserRecipes}
        removeFromUserRecipes={removeFromUserRecipes}
      />
      <QuantityEditModal
        handleModal={handleEditQuantity}
        openModal={openEditQuantityModal}
        editingIngredient={editingIngredient}
        currentRecipe={recipe}
        updateUserRecipes={updateUserRecipes}
      />
      <IngredientModal
        currentRecipe={recipe}
        addToUserIngredients={addToUserIngredients}
        ingredientList={filteredIngredients}
        handleModal={handleIngredientModal}
        openModal={openIngredientModal}
        updateUserRecipes={updateUserRecipes}
      />
      <Card style={{"float": "left"}} sx={{ maxWidth: 345, minWidth: 275 }}>
        <CardHeader
          title={name}
          action={
            <IconButton
              onClick={() => handleEditRecipe()}
              aria-label="settings">
              <EditIcon  />
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
            <br/>
            {
              ingredients_with_quantities?.map((ing, i) => (
                <Button
                  key={i}
                  variant="outlined"
                  size="small"
                  onClick={() => handleEditQuantity(ing)}
                >
                  {ing.ingredient.name}: {ing.quantity}
                </Button>
                )
              )
            }
            <br/>
            <Button
              onClick={() => handleIngredientModal()}
            >
              Add Ingredients
            </Button>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  )
}

export default RecipeCard