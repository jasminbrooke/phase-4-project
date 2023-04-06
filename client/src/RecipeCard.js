import React, { useState } from 'react'
// import CardMenu from './CardMenu'
// import CardDetails from './CardDetails'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { pink } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import SellIcon from '@mui/icons-material/Sell';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { renderMatches } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    return (
        <Box gridColumn="span 3">
            <Card>
                <p>{recipe.name}</p>
                {recipe.description}
            </Card>
        </Box>
    )
}


// // const {productname, favorite, available, description, cost, price, category, img_url} = product
// const [expanded, setExpanded] = useState(false);
// const [anchorEl, setAnchorEl] = useState(null)
// const open = Boolean(anchorEl)

// const handleCardMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
    
//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));



// return (
//     <Box gridColumn="span 3">
//       <CardMenu
//         anchorEl={anchorEl}
//         open={open}
//         handleClose={handleClose}
//         handleDelete={handleDelete}
//         handleOpen={handleOpen}
//         product={product}
//       />
//       <Card style={{"float": "left"}} sx={{ maxWidth: 345 }}>
//         <CardHeader
//           avatar={
//             <IconButton 
//             //   onClick={(e) => handleFavorite(e)}
//               aria-label="favorite"
//             >
//               {favorite ? <FavoriteIcon sx={{ color: pink[500] }} /> : <FavoriteIcon />}
//             </IconButton>
//           }
//           action={
//             <IconButton onClick={handleCardMenu}
//             aria-label="settings">
//               <MoreVertIcon />
//             </IconButton>
//           }
//         //   title={productname}
//         //   subheader={category}
//         />
//         <CardMedia
//           component="img"
//           height="194"
//         //   image={img_url}
//         //   alt={productname}
//         />
//         <CardContent>
//           <Typography variant="body2" color="text.secondary">
//             {/* {description} */}
//           </Typography>
//         </CardContent>
//         <CardActions disableSpacing>
//           <IconButton 
//             aria-label="change availability" 
//             // onClick={(e) => handleAvailable(e)}
//           >
//             {available ? <SellIcon color='success' /> : <SellIcon />}
//           </IconButton>
//           <ExpandMore
//             expand={expanded}
//             onClick={handleExpandClick}
//             aria-expanded={expanded}
//             aria-label="show more"
//           >
//             <ExpandMoreIcon />
//           </ExpandMore>
//         </CardActions>
//         <Collapse in={expanded} timeout="auto" unmountOnExit>
//           <CardContent>
//             <CardDetails cost={cost} price={price}/>
//           </CardContent>
//         </Collapse>
//       </Card>
//     </Box>
//   )
// }

export default RecipeCard