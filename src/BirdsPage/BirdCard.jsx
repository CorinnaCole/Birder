import React from 'react';
import '../assets/BirdList.css';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import birdphotos from './planz.jsx';
import { alpha, styled } from '@mui/material/styles';
import { shadows } from '@mui/system';

const BirdCard = ({ bird, clicked }) => {
  const locations = ['The Park', 'Work', 'Friends House', 'The Bus Stop', 'The River', 'The Beach', 'The Lake House', 'The Cabbin in the Woods'];

  const CardStyle = styled(Card)(({ }) => ({
    width: 300,
    height: 400,
    background: 'white',
    color: '#953553',
    margin: 15,
    boxShadow: 5
  }));

  const AddButton = styled(AddIcon)(({ }) => ({
    color: 'white',
  }));

  return (
    <CardStyle onClick={() => { clicked(bird); }} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="200"
        // image = {bird.bird_photos[0]}
        image={birdphotos[bird.bird_id - 1]}
        alt={bird.common_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {bird.common_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bird.scentific_name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          personal note or first 100 charaters of it.

        </Typography>
        {/* <Fab  aria-label="quick add">
          <AddButton />
        </Fab> */}
      </CardContent>
    </CardStyle>
  );
};

export default BirdCard;

