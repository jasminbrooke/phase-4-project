import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { renderMatches } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {

  const {description, instructions, name, ingredients} = recipe
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleCardMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    
  const handleExpandClick = () => {
    console.log(recipe)
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
            <IconButton onClick={handleCardMenu}
            aria-label="settings">
              <MoreVertIcon />
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
            {ingredients.map(ing => <p>#{ing.name}</p>)}
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  )
}

export default RecipeCard